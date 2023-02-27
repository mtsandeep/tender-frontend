import { useContext, useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";
import { useGlpApy } from "./use-glp-apy";
import {
  calculateApy,
  getGlpAprPerBlock,
  getGmxAprPerBlock,
} from "~/lib/apy-calculations";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useInterval } from "~/hooks/use-interval";
import { useGmxApy } from "./use-gmx-apy";



const getStatsQuery = function (
  address: string,
  blockNumber: any,
  secondsPerBlock: number
): string {
  if (!blockNumber) {
    return "";
  }

  const blocksPerDay = Math.round((60 * 60 * 24) / secondsPerBlock);
  const numOfPeriods = 60;
  let query = "";

  for (let i = 0; i < numOfPeriods; i++) {
    const block = blockNumber - blocksPerDay * i;
    query += gql`
            b${block}:markets (
                block:{number: ${block}}
                where: {id: "${address}"}
            ) {
                supplyRate
                borrowRate
                totalBorrows
                cash
                reserves
                underlyingPriceUSD
                totalSupply
                aum0
                aum1
                feeGmxSupply
                tokensPerInterval
                nativeTokenPrice
                performanceFee
            }
        `;
  }

  return query;
};

export function useMarketInfo(tokenId: string | undefined) {
  const [marketInfo, setMarketInfo] = useState<{
    market: any;
    historicalData: any;
  }>({
    market: false,
    historicalData: false,
  });
  const pollingKey = useInterval(30_000);
  const { networkData, tokenPairs, currentTransaction } =
    useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  const tokenPair = tokenPairs.find(
    (tp) => tp.token.symbol === String(tokenId)
  );
  const getGlpApy = useGlpApy();
  const getGmxApy = useGmxApy();

  useEffect(() => {
    console.log("useMarketInfo called");

    if (!signer || !networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketInfo = async () => {
      const graphUrl = networkData.graphUrl;
      const secondsPerBlock = networkData.secondsPerBlock;
      const l2SecondsPerBlock = networkData.l2SecondsPerBlock;

      if (!tokenPair) {
        return;
      }

      const token = tokenPair.token;
      const address = token.cToken.address.toLowerCase();
      const underlyingPriceUSD = token.priceInUsd;

      // sometimes there is a lag between this block and the graph indexer,
      // so subtract 10
      const blockNumber = await signer.provider.getBlockNumber() - 10 

      if (blockNumber === 0) {
        return;
      }

      const statsQuery = getStatsQuery(address, blockNumber, l2SecondsPerBlock);

      if (statsQuery.length === 0) {
        return;
      }

      const response = await request(
        graphUrl,
        gql`
    {
  markets(where: {id: "${address}"}) {
    borrowRate
    cash
    collateralFactor
    exchangeRate
    interestRateModelAddress
    name
    reserves
    supplyRate
    symbol
    id
    totalBorrows
    totalSupply
    underlyingAddress
    underlyingName
    underlyingPrice
    underlyingSymbol
    accrualBlockNumber
    blockTimestamp
    borrowIndex
    reserveFactor
    underlyingPriceUSD
    underlyingDecimals
  },
    accountCTokens (where: {enteredMarket: true, symbol: "${token?.cToken?.symbol}"}) {
      cTokenBalance
      storedBorrowBalance
    },
    ${statsQuery}
}
`
      );

      if (
        !response ||
        typeof response.markets === "undefined" ||
        typeof response.accountCTokens === "undefined"
      ) {
        return;
      }

      const market = response.markets[0];

      market.icon = token?.icon;
      market.tokenSymbol = token?.symbol;
      market.cTokenSymbol = token?.cToken?.symbol;
      market.underlyingPriceUSD = underlyingPriceUSD;

      market.reserveFactor = market.reserveFactor / Math.pow(10, 16);

      market.totalBorrowersCount = response.accountCTokens.filter(
        (account: { storedBorrowBalance: number }) =>
          account.storedBorrowBalance > 0
      ).length;
      market.totalSuppliersCount = response.accountCTokens.filter(
        (account: { cTokenBalance: number }) => account.cTokenBalance > 0
      ).length;

      // @todo refactor
      const daysPerYear = 365;
      const blocksPerDay = (60 * 60 * 24) / secondsPerBlock;
      const ethBlocksPerYear = 2102400; // subgraph uses 2102400

      const supplyRate = market.supplyRate / ethBlocksPerYear;
      if (tokenPair.token.symbol === "GLP") {
        const glpApy = await getGlpApy(signer, tokenPair);
        market.supplyApy = glpApy;
      } else if (tokenPair.token.symbol === "GMX") {
        const gmxApy = await getGmxApy(
          signer,
          tokenPair,
          networkData.Contracts.PriceOracle
        );
        const tokenSupplyApy =
          (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
        market.supplyApy = gmxApy + tokenSupplyApy;
      } else {
        market.supplyApy =
          (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
      }

      market.isBorrowable = tokenPair.token.symbol !== "GLP";
      const borrowRate = market.borrowRate / ethBlocksPerYear;
      market.borrowApy =
        (Math.pow(borrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

      market.totalSupplyUSD =
        (parseFloat(market.cash) +
          parseFloat(market.totalBorrows) -
          parseFloat(market.reserves)) *
        market.underlyingPriceUSD;
      market.totalBorrowUSD = market.totalBorrows * market.underlyingPriceUSD;

      delete response.markets;
      delete response.accountCTokens;

      const historicalData = {};
      Object.keys(response)
        .map((key) => parseInt(key.substring(1)))
        .sort((a, b) => a - b)
        .forEach((key) => {
          // @ts-ignore
          historicalData[key] =
            response[`b${key}`].length > 0
              ? response[`b${key}`]
              : [
                  {
                    supplyRate: 0,
                    borrowRate: 0,
                    totalBorrows: 0,
                    cash: 0,
                    reserves: 0,
                    underlyingPriceUSD: 0,
                  },
                ];
          if (
            tokenPair.token.symbol === "GLP" &&
            response[`b${key}`].length > 0
          ) {
            const ETHEREUM_SECONDS_PER_BLOCK = 12.05; // ethereum blocktime as blocktime is calulated in L1 blocktime
            const {
              aum0,
              aum1,
              tokensPerInterval,
              nativeTokenPrice,
              totalSupply,
              performanceFee,
              ...rest
            } = response[`b${key}`][0];

            const glpAprPerBlock = getGlpAprPerBlock(
              [BigNumber.from(aum0), BigNumber.from(aum1)],
              parseUnits(totalSupply, 8),
              BigNumber.from(tokensPerInterval),
              BigNumber.from(nativeTokenPrice),
              BigNumber.from(performanceFee),
              ETHEREUM_SECONDS_PER_BLOCK
            );

            // @ts-ignore
            historicalData[key] = [
              {
                ...rest,
                supplyRate: calculateApy(
                  glpAprPerBlock,
                  ETHEREUM_SECONDS_PER_BLOCK
                ),
              },
            ];
          }

          if (
            tokenPair.token.symbol === "GMX" &&
            response[`b${key}`].length > 0
          ) {
            const ETHEREUM_SECONDS_PER_BLOCK = 12.05; // ethereum blocktime as blocktime is calulated in L1 blocktime
            const {
              feeGmxSupply,
              tokensPerInterval,
              nativeTokenPrice,
              totalSupply,
              performanceFee,
              supplyRate,
              ...rest
            } = response[`b${key}`][0];

            const gmxAprPerBlock = getGmxAprPerBlock(
              BigNumber.from(feeGmxSupply),
              parseUnits(rest.underlyingPriceUSD, 18),
              BigNumber.from(tokensPerInterval),
              BigNumber.from(nativeTokenPrice),
              BigNumber.from(performanceFee),
              ETHEREUM_SECONDS_PER_BLOCK
            );

            // @ts-ignore
            historicalData[key] = [
              {
                ...rest,
                supplyRate: calculateApy(
                  gmxAprPerBlock,
                  ETHEREUM_SECONDS_PER_BLOCK
                ),
              },
            ];
          }
        });

      setMarketInfo({
        market: market,
        historicalData: historicalData,
      });
    };

    getMarketInfo();
  }, [
    networkData,
    tokenId,
    signer,
    tokenPairs,
    tokenPair,
    getGlpApy,
    currentTransaction,
    pollingKey,
    getGmxApy,
  ]);

  return marketInfo;
}
