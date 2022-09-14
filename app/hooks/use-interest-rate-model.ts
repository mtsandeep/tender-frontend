import {ethers} from "ethers";
import sampleCTokenAbi from "~/config/sample-ctoken-abi";
import jumpRateModelV2Abi from "~/config/abi/jump-rate-model-v2.json";
import {useContext, useEffect, useState} from "react";
import {TenderContext} from "~/contexts/tender-context";
import {hooks as Web3Hooks} from "~/connectors/meta-mask";
import {useWeb3Signer} from "~/hooks/use-web3-signer";
import {calculateApy} from "~/lib/apy-calculations";

export default function useInterestRateModel(tokenId: string | undefined) {
    const [interestRateModel, setInterestRateModel] = useState<object[]>([]);
    const {networkData} = useContext(TenderContext);
    const provider = Web3Hooks.useProvider();
    const signer = useWeb3Signer(provider);

    useEffect(() => {
        console.log('useInterestRateModel called');

        if (!networkData) {
            return;
        }

        const getInterestRateModel = async () => {
            const secondsPerBlock = networkData.secondsPerBlock;
            const tokens = networkData.Tokens;
            const tokenKey = Object.keys(tokens).find(key => tokens[key].symbol === String(tokenId));
            const token = tokenKey && tokens[tokenKey];
            const address = token ? token.cToken.address.toLowerCase() : '';

            if (!signer || !address) {
                return [];
            }

            const cTokenContract = new ethers.Contract(address, sampleCTokenAbi, signer);
            const currentCash = (await cTokenContract.getCash()).toString();
            const currentBorrows = (await cTokenContract.totalBorrows()).toString();
            const currentReserves = (await cTokenContract.totalReserves()).toString();
            const reserveFactorMantissa = (await cTokenContract.reserveFactorMantissa()).toString();
            const interestRateModelAddress = await cTokenContract.interestRateModel();

            const interestRateModelContract = new ethers.Contract(interestRateModelAddress, jumpRateModelV2Abi, signer);
            const currentUtil = await interestRateModelContract.utilizationRate(currentCash, currentBorrows, currentReserves);
            const currentBorrowRate = await interestRateModelContract.getBorrowRate(currentCash, currentBorrows, currentReserves);
            const currentSupplyRate = await interestRateModelContract.getSupplyRate(currentCash, currentBorrows, currentReserves, reserveFactorMantissa);

            const currentBorrowApy = calculateApy(currentBorrowRate, secondsPerBlock);
            const currentSupplyApy = calculateApy(currentSupplyRate, secondsPerBlock);
            const BASE = 1e18;
            // const util2 = util / 1e16;
            const currentValue = {
                aa: (currentUtil / 1e16).toFixed(2),
                ss: currentSupplyApy.toFixed(2),
                dd: currentBorrowApy.toFixed(2),
                isCurrent: true,
            };
            /*const currentValue = {
                util: currentUtil.toString(),
                cash: currentCash.toString(),
                borrows: currentBorrows.toString(),
                reserves: currentReserves.toString(),
                borrowRate: currentBorrowRate.toString(),
                borrowApy: currentBorrowApy,
            };*/
            const values = [
                {
                    aa: '0',
                    ss: '0',
                    dd: '0',
                    isCurrent: false,
                }
            ];
            /*const values = [
                {
                    util: 0,
                    cash: 0,
                    borrows: 0,
                    reserves: 0,
                }
            ];*/
            //cash = borrows * BASE / utils

            let currentValueAdded = false;

            for (let i = 1; i <= 100; i++) {
                const util = i * 1e16;
                const cash = Math.round(currentBorrows * BASE / util);
                const borrowRate = await interestRateModelContract.getBorrowRate(cash.toString(), currentBorrows, currentBorrows);
                const supplyRate = await interestRateModelContract.getSupplyRate(cash.toString(), currentBorrows, currentBorrows, reserveFactorMantissa);

                if (!currentValueAdded && parseFloat(currentValue.aa) < i) {
                    values.push(currentValue);
                    currentValueAdded = true;
                }

                values.push({
                    aa: i.toString(),
                    ss: calculateApy(supplyRate, secondsPerBlock).toFixed(2),
                    dd: calculateApy(borrowRate, secondsPerBlock).toFixed(2),
                    isCurrent: false,
                });
                /*values.push({
                    util: util,
                    cash: cash,
                    borrows: currentBorrows.toString(),
                    reserves: currentBorrows.toString(),
                    borrowRate: borrowRate.toString(),
                    borrowApy: calculateApy(borrowRate)
                });*/
            }
            // const uCash = borrows * BASE / util;

            setInterestRateModel(values);
        };

        getInterestRateModel();
    }, [networkData, signer, tokenId]);

    return interestRateModel;
}
