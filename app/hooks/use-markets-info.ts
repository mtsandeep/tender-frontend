import {useContext, useEffect, useState} from "react";
import {gql, request} from "graphql-request";
import {hooks as Web3Hooks} from "~/connectors/meta-mask";
import {useWeb3Signer} from "~/hooks/use-web3-signer";
import {TenderContext} from "~/contexts/tender-context";

export function useMarketsInfo() {
    const [marketsInfo, setMarketsInfo] = useState<object>({
        markets: false,
        total: false,
    });
    const {networkData} = useContext(TenderContext);
    const provider = Web3Hooks.useProvider();
    const signer = useWeb3Signer(provider);

    useEffect(() => {
        console.log('useMarketsInfo called');

        if (!networkData) {
            return;
        }

        const getMarketsInfo = async () => {
            const markets = {};
            const secondsPerBlock = networkData.secondsPerBlock;
            const graphUrl = networkData.graphUrl;
            const tokens = networkData.Tokens;
            const addresses: string[] = [];
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

            const response = await request(graphUrl, gql`
    {
  markets(where: {id_in: ["${searchStr}"]}) {
    borrowRate
    cash
    collateralFactor
    exchangeRate
    interestRateModelAddress
    reserves
    supplyRate
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
    accountCTokens (where: {enteredMarket: true}) {
      id
      totalUnderlyingBorrowed
      totalUnderlyingSupplied
    }
}
`);

            if (!response
                || typeof response.markets === 'undefined'
                || typeof response.accountCTokens === 'undefined') {
                return;
            }

            const total = {
                supply: {
                    count: 0,
                    usd: 0,
                    topMarkets: [],
                },
                borrow: {
                    count: 0,
                    usd: 0,
                    topMarkets: [],
                },
            };

            const daysPerYear = 365;
            const blocksPerDay = Math.round(60 * 60 * 24 / secondsPerBlock);
            const ethBlocksPerYear = 2102400; // subgraph uses 2102400
            const uniqueSuppliers = {};
            const uniqueBorrowers = {};

            response.markets.forEach((m: {
                reserves: string;
                borrowRate: number;
                underlyingPriceUSD: any;
                totalBorrows: any;
                cash: string;
                supplyRate: number;
                id: string
            }) => {
                const id = m.id.toLowerCase();

                const supplyRate = m.supplyRate / ethBlocksPerYear;
                markets[id].supplyApy = (((Math.pow((supplyRate * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
                markets[id].totalSupplyUsd = (parseFloat(m.cash) + parseFloat(m.totalBorrows) - parseFloat(m.reserves)) * m.underlyingPriceUSD;

                const borrowRate = m.borrowRate / ethBlocksPerYear;
                markets[id].borrowApy = (((Math.pow((borrowRate * blocksPerDay) + 1, daysPerYear))) - 1) * 100;
                markets[id].totalBorrowUsd = m.totalBorrows * m.underlyingPriceUSD;

                markets[id].totalBorrowersCount = response.accountCTokens.filter(
                    (account: {
                        id: string;
                        totalUnderlyingBorrowed: number;
                    }) => {
                        const [accountMarketId, accountId] = account.id.split('-');
                        const valid = account.totalUnderlyingBorrowed > 0
                            && accountMarketId.toLowerCase() === id;

                        if (valid) {
                            uniqueBorrowers[accountId] = true;
                        }

                        return valid;
                    }).length;

                markets[id].totalSuppliersCount = response.accountCTokens.filter(
                    (account: {
                        id: string;
                        totalUnderlyingSupplied: number;
                    }) => {
                        const [accountMarketId, accountId] = account.id.split('-');
                        const valid = account.totalUnderlyingSupplied > 0
                            && accountMarketId.toLowerCase() === id;

                        if (valid) {
                            uniqueSuppliers[accountId] = true;
                        }

                        return valid;
                    }
                ).length;

                total.borrow.usd += markets[id].totalBorrowUsd;
                total.supply.usd += markets[id].totalSupplyUsd;
            });

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

            setMarketsInfo({
                markets: markets,
                total: total,
            });
        };

        getMarketsInfo();
    }, [networkData, signer]);

    return marketsInfo;
}
