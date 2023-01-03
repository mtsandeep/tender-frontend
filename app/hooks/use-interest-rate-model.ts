import { ethers } from "ethers";
import sampleCTokenAbi from "~/config/sample-ctoken-abi";
import jumpRateModelV2Abi from "~/config/abi/jump-rate-model-v2.json";
import { useContext, useEffect, useState } from "react";
import { TenderContext } from "~/contexts/tender-context";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { calculateApy } from "~/lib/apy-calculations";
import { providers as mcProviders } from "@0xsequence/multicall";
import { toExactString } from "~/lib/ui";
import { useGmxApy } from "./use-gmx-apy";
import { TokenPair } from "~/types/global";

export default function useInterestRateModel(tokenId: string | undefined) {
  const [interestRateModel, setInterestRateModel] = useState<object[]>([]);
  const { networkData, tokenPairs } = useContext(TenderContext);
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  const getGmxApy = useGmxApy();

  useEffect(() => {
    console.log("useInterestRateModel called");

    if (!networkData || !signer || !provider) {
      return;
    }

    const mcProvider = new mcProviders.MulticallProvider(provider);

    const getInterestRateModel = async () => {
      const secondsPerBlock = networkData.secondsPerBlock;
      const tokens = networkData.Tokens;
      const tokenKey = Object.keys(tokens).find(
        (key) => tokens[key].symbol === String(tokenId)
      );
      const token = tokenKey && tokens[tokenKey];
      const address = token ? token.cToken.address.toLowerCase() : "";

      if (!signer || !address) {
        return [];
      }

      const cTokenContract = new ethers.Contract(
        address,
        sampleCTokenAbi,
        mcProvider
      );

      const [
        currentCash,
        currentBorrows,
        currentReserves,
        reserveFactorMantissa,
        interestRateModelAddress,
      ] = await Promise.all([
        cTokenContract.getCash(),
        cTokenContract.totalBorrows(),
        cTokenContract.totalReserves(),
        cTokenContract.reserveFactorMantissa(),
        cTokenContract.interestRateModel(),
      ]);

      const interestRateModelContract = new ethers.Contract(
        interestRateModelAddress,
        jumpRateModelV2Abi,
        mcProvider
      );

      const [currentUtil, currentBorrowRate, currentSupplyRate, kink] =
        await Promise.all([
          interestRateModelContract.utilizationRate(
            currentCash,
            currentBorrows,
            currentReserves
          ),
          interestRateModelContract.getBorrowRate(
            currentCash,
            currentBorrows,
            currentReserves
          ),
          interestRateModelContract.getSupplyRate(
            currentCash,
            currentBorrows,
            currentReserves,
            reserveFactorMantissa
          ),
          interestRateModelContract.kink(),
        ]);

      const currentBorrowApy = calculateApy(currentBorrowRate, secondsPerBlock);
      let additionalApy = 0;
      if (token && token?.symbol === "GMX") {
        const { cToken, ...rest } = token;
        const gmxTokenPair = { cToken, token: rest } as TokenPair;
        additionalApy =
          gmxTokenPair &&
          (await getGmxApy(
            signer,
            gmxTokenPair,
            networkData.Contracts.PriceOracle
          ));
      }
      const currentSupplyApy = calculateApy(currentSupplyRate, secondsPerBlock);
      const BASE = 1e18;
      const kinkMantissa = 1e16;
      const kinkPercentage = (kink / kinkMantissa).toFixed(2);
      const utilPercentage = parseFloat(
        (currentUtil / kinkMantissa).toFixed(2)
      ).toString();

      const currentValue = {
        aa: utilPercentage,
        ss: (additionalApy + currentSupplyApy).toFixed(2),
        dd: currentBorrowApy.toFixed(2),
        isCurrent: true,
        isOptimal: kinkPercentage === utilPercentage,
      };

      /*console.time('test')
            const rates = await Promise.all(
                Array.from({length: 100}, (_, i) => i + 1).map(
                    (i) => {
                        const util = i * 1e16;
                        const cash = Math.round(currentBorrows * BASE / util);

                        return interestRateModelContract.getBorrowRate(cash.toString(), currentBorrows, currentBorrows);
                    }
                ).concat(Array.from({length: 100}, (_, i) => i + 1).map(
                    (i) => {
                        const util = i * 1e16;
                        const cash = Math.round(currentBorrows * BASE / util);

                        return interestRateModelContract.getSupplyRate(cash.toString(), currentBorrows, currentBorrows, reserveFactorMantissa);
                    }
                ))
            );
            console.timeEnd('test')
            console.log('supplyRates', rates);return*/
      // console.time('test')
      const values = await Promise.all(
        [...Array(101).keys()].map(async (i) => {
          if (i === 0) {
            i = 0.0001;
          }

          const util = i * 1e16;
          const cash = Math.round((currentBorrows * BASE) / util);
          const borrowRate = await interestRateModelContract.getBorrowRate(
            toExactString(cash),
            currentBorrows,
            currentBorrows
          );
          const supplyRate = await interestRateModelContract.getSupplyRate(
            toExactString(cash),
            currentBorrows,
            currentBorrows,
            reserveFactorMantissa
          );

          return {
            aa: i.toString(),
            ss: (
              additionalApy + calculateApy(supplyRate, secondsPerBlock)
            ).toFixed(2),
            dd: calculateApy(borrowRate, secondsPerBlock).toFixed(2),
            isCurrent: false,
            isOptimal: kinkPercentage === i.toFixed(2),
          };
        })
      );

      if (currentValue.aa !== "0.00") {
        const equalIndex = values.findIndex(
          (item, i) => parseFloat(currentValue.aa) === parseFloat(i.toFixed(2))
        );

        if (equalIndex !== -1) {
          values[equalIndex] = currentValue;
        } else {
          const index = values.findIndex(
            (item, i) => parseFloat(currentValue.aa) < i
          );
          values.splice(index, 0, currentValue);
        }
      }

      setInterestRateModel(values);
    };

    getInterestRateModel();
  }, [networkData, provider, signer, tokenId]);

  return interestRateModel;
}
