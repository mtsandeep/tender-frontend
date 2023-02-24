import { useContext, useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";
import { useGlpApy } from "./use-glp-apy";
import { useInterval } from "./use-interval";
import { useGmxApy } from "./use-gmx-apy";

const getPercentageChange = function (
  currentValue: number,
  prevValue: number
): number {
  return ((currentValue - prevValue) / currentValue) * 100;
};

type MarketMeta = {
  name: string;
  icon: string;
  symbol: string;
  totalSupply: number;
}

type MarketsInfo = {
  markets: Record<string, MarketMeta>| false,
  total: number | false
}

export function useMarketsInfo() {
  const pollingKey = useInterval(7_000);
  const [marketsInfo, setMarketsInfo] = useState<MarketsInfo>({
    markets: false,
    total: false,
  });
  const { networkData, tokenPairs } = useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  const getGlpApy = useGlpApy();
  const getGmxApy = useGmxApy();

  useEffect(() => {
    console.log("useMarketsInfo called");

    if (!signer || !networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketsInfo = async () => {
      const markets: Record<string, MarketMeta> = {};
      const prevMarkets = {};
      const secondsPerBlock = networkData.secondsPerBlock;
      const l2SecondsPerBlock = networkData.l2SecondsPerBlock;
      const graphUrl = networkData.graphUrl;
      const tokens = networkData.Tokens;
      const addresses: string[] = [];

      // arbitrum has a block time of ~.34 seconds, so sometimes
      // the graph endpoint cannot keep up with the latest block 
      const l2BlockNumber = await signer.provider.getBlockNumber() - 10

      if (l2BlockNumber === 0) {
        return;
      }

      const blocksPerDay = Math.round((60 * 60 * 24) / secondsPerBlock);
      const l2BlocksPerDay = Math.round((60 * 60 * 24) / l2SecondsPerBlock);
      const l2PrevDayBlock = l2BlockNumber - l2BlocksPerDay;

      Object.keys(tokens).forEach((key) => {
        const address = tokens[key].cToken.address.toLowerCase();
        markets[address] = {
          name: tokens[key].name,
          symbol: tokens[key].symbol,
          icon: tokens[key].icon,
        };

        addresses.push(address);
      });


      // make uri deterministic and more cacheable
      addresses.sort()
      let host = "https://api.tender.fi";
      // if running on prod, use api.tender.fi, which is behind cloudflare
      const request = await fetch(`${host}/api/marketsData?addresses=${addresses.join(",")}`);
      const response = await request.json()

      if (
        !response ||
        typeof response.markets === "undefined" ||
        typeof response.prevMarkets === "undefined" ||
        typeof response.borrowVolume === "undefined" ||
        typeof response.supplyVolume === "undefined" ||
        typeof response.accountCTokens === "undefined"
      ) {
        return;
      }

      const total = {
        supply: {
          count: 0,
          usd: 0,
          usdDiff: 0,
          volume: 0,
          topMarkets: [],
        },
        borrow: {
          count: 0,
          usd: 0,
          usdDiff: 0,
          volume: 0,
          topMarkets: [],
        },
      };

      const daysPerYear = 365;
      const ethBlocksPerYear = 2102400; // subgraph uses 2102400
      const uniqueSuppliers = {};
      const uniqueBorrowers = {};

      response.prevMarkets.forEach(
        (m: {
          reserves: string;
          borrowRate: number;
          underlyingPriceUSD: any;
          totalBorrows: any;
          cash: string;
          supplyRate: number;
          id: string;
        }) => {
          prevMarkets[m.id.toLowerCase()] = m;
        }
      );

      let prevSupplyUsd = 0;
      let prevBorrowUsd = 0;

      const usdPricesByCToken = {};
      const usdPricesByToken = {};
      const glpTokenPair = tokenPairs.find((tp) => tp.token.symbol === "GLP");
      const gmxTokenPair = tokenPairs.find((tp) => tp.token.symbol === "GMX");
      const glpApy = await getGlpApy(signer, glpTokenPair!);
      const gmxApy = await getGmxApy(
        signer,
        gmxTokenPair!,
        networkData.Contracts.PriceOracle
      );

      response.markets.forEach(
        async (m: {
          reserves: string;
          borrowRate: number;
          underlyingPriceUSD: any;
          totalBorrows: any;
          cash: string;
          supplyRate: number;
          id: string;
          symbol: string;
          underlyingSymbol: string;
        }) => {
          const id = m.id.toLowerCase();
          const tokenPair = tokenPairs.find(
            (tp) => tp.cToken.address.toLowerCase() === id
          );
          const underlyingPriceUSD = tokenPair
            ? tokenPair.token.priceInUsd
            : m.underlyingPriceUSD;

          const supplyRate = m.supplyRate / ethBlocksPerYear;
          if (tokenPair?.token?.symbol === "GLP") {
            markets[id].supplyApy = glpApy;
          } else if (tokenPair?.token?.symbol === "GMX") {
            const tokenSupplyApy =
              (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
            markets[id].supplyApy = gmxApy + tokenSupplyApy;
          } else {
            markets[id].supplyApy =
              (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
          }

          markets[id].totalSupply =
            parseFloat(m.cash) +
            parseFloat(m.totalBorrows) -
            parseFloat(m.reserves);
          markets[id].totalSupplyUsd =
            markets[id].totalSupply * underlyingPriceUSD;

          const borrowRate = m.borrowRate / ethBlocksPerYear;
          markets[id].borrowApy =
            (Math.pow(borrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
          markets[id].totalBorrow = parseFloat(m.totalBorrows);
          markets[id].totalBorrowUsd = m.totalBorrows * underlyingPriceUSD;

          markets[id].totalBorrowersCount = response.accountCTokens.filter(
            (account: { id: string; totalUnderlyingBorrowed: number }) => {
              const [accountMarketId, accountId] = account.id.split("-");
              const valid =
                account.totalUnderlyingBorrowed > 0 &&
                accountMarketId.toLowerCase() === id;

              if (valid) {
                uniqueBorrowers[accountId] = true;
              }

              return valid;
            }
          ).length;

          markets[id].totalSuppliersCount = response.accountCTokens.filter(
            (account: { id: string; cTokenBalance: number }) => {
              const [accountMarketId, accountId] = account.id.split("-");
              const valid =
                account.cTokenBalance > 0 &&
                accountMarketId.toLowerCase() === id;

              if (valid) {
                uniqueSuppliers[accountId] = true;
              }

              return valid;
            }
          ).length;

          // total in usd
          total.borrow.usd += markets[id].totalBorrow * underlyingPriceUSD;
          total.supply.usd += markets[id].totalSupply * underlyingPriceUSD;

          usdPricesByCToken[m.symbol] = underlyingPriceUSD;
          usdPricesByToken[m.underlyingSymbol] = underlyingPriceUSD;

          // @todo refactor
          if (typeof prevMarkets[id] !== "undefined") {
            const prevSupplyRate =
              prevMarkets[id].supplyRate / ethBlocksPerYear;
            const prevSupplyApy =
              (Math.pow(prevSupplyRate * blocksPerDay + 1, daysPerYear) - 1) *
              100;
            const prevTotalSupplyUsd =
              (parseFloat(prevMarkets[id].cash) +
                parseFloat(prevMarkets[id].totalBorrows) -
                parseFloat(prevMarkets[id].reserves)) *
              prevMarkets[id].underlyingPriceUSD;

            const prevBorrowRate =
              prevMarkets[id].borrowRate / ethBlocksPerYear;
            const prevBorrowApy =
              (Math.pow(prevBorrowRate * blocksPerDay + 1, daysPerYear) - 1) *
              100;
            const prevTotalBorrowUsd =
              prevMarkets[id].totalBorrows * prevMarkets[id].underlyingPriceUSD;

            markets[id].supplyApyDiff = markets[id].supplyApy - prevSupplyApy;
            markets[id].totalSupplyUsdDiff =
              markets[id].totalSupplyUsd !== 0
                ? getPercentageChange(
                    markets[id].totalSupplyUsd,
                    prevTotalSupplyUsd
                  )
                : 0;

            markets[id].borrowApyDiff = markets[id].borrowApy - prevBorrowApy;
            markets[id].totalBorrowUsdDiff =
              markets[id].totalBorrowUsd !== 0
                ? getPercentageChange(
                    markets[id].totalBorrowUsd,
                    prevTotalBorrowUsd
                  )
                : 0;

            prevBorrowUsd += prevTotalBorrowUsd;
            prevSupplyUsd += prevTotalSupplyUsd;

            // console.log('prevMarkets',{prevSupplyApy,prevTotalSupplyUsd,prevBorrowApy,prevTotalBorrowUsd})
            // console.log('markets',markets[id])
          } else {
            markets[id].supplyApyDiff = 0;
            markets[id].totalSupplyUsdDiff = 0;
            markets[id].borrowApyDiff = 0;
            markets[id].totalBorrowUsdDiff = 0;
          }
        }
      );

      total.supply.usdDiff = getPercentageChange(
        total.supply.usd,
        prevSupplyUsd
      );
      total.borrow.usdDiff = getPercentageChange(
        total.borrow.usd,
        prevBorrowUsd
      );

      total.borrow.count = Object.keys(uniqueBorrowers).length;
      total.supply.count = Object.keys(uniqueSuppliers).length;

      total.supply.topMarkets = Object.keys(markets).sort((a, b) => {
        return markets[b].totalSupplyUsd - markets[a].totalSupplyUsd;
      });
      total.supply.topMarkets.length = 3;

      total.borrow.topMarkets = Object.keys(markets).sort((a, b) => {
        return markets[b].totalBorrowUsd - markets[a].totalBorrowUsd;
      });
      total.borrow.topMarkets.length = 3;

      // volumes
      const supplyVolume = response.supplyVolume
        .map((supply) =>
          typeof usdPricesByCToken[supply.cTokenSymbol] !== "undefined"
            ? supply.underlyingAmount * usdPricesByCToken[supply.cTokenSymbol]
            : 0
        )
        .reduce((previous: number, current: number) => previous + current, 0);
      const redeemVolume = response.redeemVolume
        .map((redeem) =>
          typeof usdPricesByCToken[redeem.cTokenSymbol] !== "undefined"
            ? redeem.underlyingAmount * usdPricesByCToken[redeem.cTokenSymbol]
            : 0
        )
        .reduce((previous: number, current: number) => previous + current, 0);
      const borrowVolume = response.borrowVolume
        .map((borrow) =>
          typeof usdPricesByToken[borrow.underlyingSymbol] !== "undefined"
            ? borrow.amount * usdPricesByToken[borrow.underlyingSymbol]
            : 0
        )
        .reduce((previous: number, current: number) => previous + current, 0);
      const repayVolume = response.repayVolume
        .map((repay) =>
          typeof usdPricesByToken[repay.underlyingSymbol] !== "undefined"
            ? repay.amount * usdPricesByToken[repay.underlyingSymbol]
            : 0
        )
        .reduce((previous: number, current: number) => previous + current, 0);

      total.supply.volume = supplyVolume - redeemVolume;
      total.borrow.volume = borrowVolume - repayVolume;

      setMarketsInfo({
        markets: markets,
        total: total,
      });
    };

    getMarketsInfo();
  }, [getGlpApy, networkData, signer, tokenPairs, pollingKey, getGmxApy]);

  return marketsInfo;
}
