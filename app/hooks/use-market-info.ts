import { useContext, useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";

const getLatestBlock = async function (graphUrl: string) {
    const response = await request(graphUrl, gql`
      {
        _meta {
          block {
            number
          }
        }
      }
    `);

    return response?._meta?.block?.number ? response._meta.block.number : 0;
};

const getStatsQuery = function (address: string, blockNumber: any, secondsPerBlock: number): string {
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
            }
        `;
  }

  return query;
};

export function useMarketInfo(tokenId: string | undefined) {
  const [marketInfo, setMarketInfo] = useState({
    market: false,
    historicalData: false,
  });
  const {networkData, tokenPairs} = useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  useEffect(() => {
    console.log("useMarketInfo called");

    if (!networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketInfo = async () => {
      const graphUrl = networkData.graphUrl;
      const secondsPerBlock = networkData.secondsPerBlock;
      const tokenPair = tokenPairs.find((tp) => tp.token.symbol === String(tokenId));

      if (!tokenPair) {
          return;
      }

      const token = tokenPair.token;
      const address = token.cToken.address.toLowerCase();
      const underlyingPriceUSD = token.priceInUsd;

            const blockNumber = await getLatestBlock(graphUrl);

            if (blockNumber === 0) {
                return;
            }

      const statsQuery = getStatsQuery(address, blockNumber, secondsPerBlock);

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

      market.totalBorrowersCount = response.accountCTokens.filter(
        (account: { storedBorrowBalance: number }) =>
          account.storedBorrowBalance > 0
      ).length;
      market.totalSuppliersCount = response.accountCTokens.filter(
        (account: { cTokenBalance: number }) =>
          account.cTokenBalance > 0
      ).length;

      // @todo refactor
        const daysPerYear = 365;
        const blocksPerDay = (60 * 60 * 24) / secondsPerBlock;
        const ethBlocksPerYear = 2102400; // subgraph uses 2102400

        const supplyRate = market.supplyRate / ethBlocksPerYear;
        market.supplyApy = (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

        const borrowRate = market.borrowRate / ethBlocksPerYear;
        market.borrowApy = (Math.pow(borrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;

        market.totalSupplyUSD = (
            parseFloat(market.cash) + parseFloat(market.totalBorrows) - parseFloat(market.reserves)
        ) * market.underlyingPriceUSD;
        market.totalBorrowUSD = market.totalBorrows * market.underlyingPriceUSD;

      delete response.markets;
      delete response.accountCTokens;

      const historicalData = {};
      Object.keys(response)
        .map((key) => parseInt(key.substring(1)))
        .sort((a, b) => a - b)
        .forEach((key) => {
          // @ts-ignore
          historicalData[key] = response[`b${key}`].length > 0 ? response[`b${key}`] : [{
              supplyRate: 0,
              borrowRate: 0,
              totalBorrows: 0,
              cash: 0,
              reserves: 0,
              underlyingPriceUSD: 0,
          }];
        });

      setMarketInfo({
        market: market,
        historicalData: historicalData,
      });
    };

    getMarketInfo();
    }, [networkData, tokenId, signer, tokenPairs]);

  return marketInfo;
}
