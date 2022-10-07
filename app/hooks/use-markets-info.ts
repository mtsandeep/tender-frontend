import { useContext, useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";

const getPercentageChange = function (currentValue: number, prevValue: number): number {
    return ((currentValue - prevValue) / currentValue) * 100;
};

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

export function useMarketsInfo() {
  const [marketsInfo, setMarketsInfo] = useState<object>({
    markets: false,
    total: false,
  });
  const { networkData, tokenPairs } = useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  useEffect(() => {
    console.log("useMarketsInfo called");

    if (!networkData || tokenPairs.length === 0) {
      return;
    }

    const getMarketsInfo = async () => {
      const markets = {};
      const prevMarkets = {};
      const secondsPerBlock = networkData.secondsPerBlock;
      const graphUrl = networkData.graphUrl;
      const tokens = networkData.Tokens;
      const addresses: string[] = [];

      const blockNumber = await getLatestBlock(graphUrl);

      if (blockNumber === 0) {
          return;
      }

      const blocksPerDay = Math.round((60 * 60 * 24) / secondsPerBlock);
      const prevDayBlock = blockNumber - blocksPerDay;

      Object.keys(tokens).forEach((key) => {
        const address = tokens[key].cToken.address.toLowerCase();
        markets[address] = {
          name: tokens[key].name,
          symbol: tokens[key].symbol,
          icon: tokens[key].icon,
        };

        addresses.push(address);
      });

      const searchStr = addresses.join('","');

      const response = await request(
        graphUrl,
        gql`
    {
  markets(where: {id_in: ["${searchStr}"]}) {
    symbol
    underlyingSymbol
    borrowRate
    cash
    reserves
    supplyRate
    id
    totalBorrows
    underlyingPriceUSD
  },
  prevMarkets:markets(block:{number: ${prevDayBlock}} where: {id_in: ["${searchStr}"]}) {
    borrowRate
    cash
    reserves
    supplyRate
    id
    totalBorrows
    underlyingPriceUSD
  },
  borrowVolume:borrowEvents(where:{blockNumber_gt:${prevDayBlock}}) {
    underlyingSymbol
    amount
  },
  supplyVolume:mintEvents(where:{blockNumber_gt:${prevDayBlock}}) {
    cTokenSymbol
    underlyingAmount
  },
    accountCTokens (where: {enteredMarket: true}) {
      id
      totalUnderlyingBorrowed
      totalUnderlyingSupplied
    }
}
`
      );

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

      response.prevMarkets.forEach((m: {
          reserves: string;
          borrowRate: number;
          underlyingPriceUSD: any;
          totalBorrows: any;
          cash: string;
          supplyRate: number;
          id: string;
      }) => {
          prevMarkets[m.id.toLowerCase()] = m;
      });

      let prevSupplyUsd = 0;
      let prevBorrowUsd = 0;

      const usdPricesByCToken = {};
      const usdPricesByToken = {};

      response.markets.forEach(
        (m: {
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
          const tokenPair = tokenPairs.find((tp) => tp.cToken.address.toLowerCase() === id);
          const underlyingPriceUSD = tokenPair ? tokenPair.token.priceInUsd : m.underlyingPriceUSD;

          const supplyRate = m.supplyRate / ethBlocksPerYear;
          markets[id].supplyApy =
            (Math.pow(supplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
          markets[id].totalSupply = parseFloat(m.cash) + parseFloat(m.totalBorrows) - parseFloat(m.reserves);
          markets[id].totalSupplyUsd = markets[id].totalSupply * underlyingPriceUSD;

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
            (account: { id: string; totalUnderlyingSupplied: number }) => {
              const [accountMarketId, accountId] = account.id.split("-");
              const valid =
                account.totalUnderlyingSupplied > 0 &&
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
          if (typeof prevMarkets[id] !== 'undefined') {
              const prevSupplyRate = prevMarkets[id].supplyRate / ethBlocksPerYear;
              const prevSupplyApy = (Math.pow(prevSupplyRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
              const prevTotalSupplyUsd =
                  (parseFloat(prevMarkets[id].cash) +
                      parseFloat(prevMarkets[id].totalBorrows) -
                      parseFloat(prevMarkets[id].reserves)) *
                  prevMarkets[id].underlyingPriceUSD;

              const prevBorrowRate = prevMarkets[id].borrowRate / ethBlocksPerYear;
              const prevBorrowApy =
                  (Math.pow(prevBorrowRate * blocksPerDay + 1, daysPerYear) - 1) * 100;
              const prevTotalBorrowUsd = prevMarkets[id].totalBorrows * prevMarkets[id].underlyingPriceUSD;

              markets[id].supplyApyDiff = markets[id].supplyApy - prevSupplyApy;
              markets[id].totalSupplyUsdDiff = markets[id].totalSupplyUsd !== 0
                  ? getPercentageChange(markets[id].totalSupplyUsd, prevTotalSupplyUsd) : 0;

              markets[id].borrowApyDiff = markets[id].borrowApy - prevBorrowApy;
              markets[id].totalBorrowUsdDiff = markets[id].totalBorrowUsd !== 0
                  ? getPercentageChange(markets[id].totalBorrowUsd, prevTotalBorrowUsd) : 0;

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

      total.supply.usdDiff = getPercentageChange(total.supply.usd, prevSupplyUsd);
      total.borrow.usdDiff = getPercentageChange(total.borrow.usd, prevBorrowUsd);

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
      total.supply.volume = response.supplyVolume.map(
          (supply) => typeof usdPricesByCToken[supply.cTokenSymbol] !== 'undefined' ? supply.underlyingAmount * usdPricesByCToken[supply.cTokenSymbol] : 0
      ).reduce((previous: number, current: number) => previous + current, 0);
      total.borrow.volume = response.borrowVolume.map(
          (borrow) => typeof usdPricesByToken[borrow.underlyingSymbol] !== 'undefined' ? borrow.amount * usdPricesByToken[borrow.underlyingSymbol] : 0
      ).reduce((previous: number, current: number) => previous + current, 0);

      setMarketsInfo({
        markets: markets,
        total: total,
      });
    };

    getMarketsInfo();
  }, [networkData, signer, tokenPairs]);

  return marketsInfo;
}
