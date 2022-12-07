import { useState, useEffect, useContext } from "react";
import {
  collateralFactorForToken,
  getAccountBorrowLimitInUsd,
} from "~/lib/tender";
import { TenderContext } from "~/contexts/tender-context";
import type { TokenPair } from "~/types/global";
import { ethers } from "ethers";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";
import type { JsonRpcSigner } from "@ethersproject/providers";

/**
 * @deprecated use getSafeMaxWithdrawAmountForToken instead
 * @param signer
 * @param comptrollerAddress
 * @param tokenPairs
 * @param tp
 * @param totalBorrowedAmountInUsd
 * @param borrowLimitUsed
 */
export function useSafeMaxWithdrawAmountForToken(
  signer: JsonRpcSigner | undefined | null,
  comptrollerAddress: string,
  tokenPairs: TokenPair[],
  tp: TokenPair,
  totalBorrowedAmountInUsd: number,
  borrowLimitUsed: number
): number {
  let [safeMaxWithdrawAmount, setSafeMaxWithdrawAmountForToken] =
    useState<number>(0);

  let { currentTransaction } = useContext(TenderContext);

  useEffect(() => {
    /**
     * //getBorrowLimitUsed
     * (borrowedAmount / borrowedLimit) * 100
     *
     * //projectBorrowLimit
     * borrowLimitChangeInUsd = tokenAmount * tp.token.priceInUsd * collateralFactor
     * borrowedLimit = currentBorrowLimitInUsd + borrowLimitChangeInUsd
     *
     * //result
     * borrowLimitUsed = (borrowedAmount / (currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor))) * 100
     * borrowLimitUsed / 100 = borrowedAmount / (currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor))
     * borrowedAmount / (borrowLimitUsed / 100) = currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor)
     * (borrowedAmount / (borrowLimitUsed / 100)) - currentBorrowLimitInUsd = tokenAmount * tp.token.priceInUsd * collateralFactor
     * (((borrowedAmount / (borrowLimitUsed / 100)) - currentBorrowLimitInUsd)) / (tp.token.priceInUsd * collateralFactor) = tokenAmount
     * */
    const getSafeMaxWithdrawAmountForToken = async () => {
      if (!signer) {
        return;
      }

      const currentBorrowLimitInUsd = await getAccountBorrowLimitInUsd(
        signer,
        comptrollerAddress,
        tokenPairs
      );

      const comptrollerContract = new ethers.Contract(
        comptrollerAddress,
        SampleComptrollerAbi,
        signer
      );

      const collateralFactor: number = await collateralFactorForToken(
        signer,
        comptrollerContract,
        tp
      );

      const amount: number = Math.abs(
        (totalBorrowedAmountInUsd / (borrowLimitUsed / 100) -
          currentBorrowLimitInUsd) /
          (tp.token.priceInUsd * collateralFactor)
      );
      console.log("safeMaxWithdrawAmount", amount);
      setSafeMaxWithdrawAmountForToken(amount);
    };

    getSafeMaxWithdrawAmountForToken();
  }, [
    currentTransaction,
    totalBorrowedAmountInUsd,
    borrowLimitUsed,
    comptrollerAddress,
    tp,
    signer,
    tokenPairs,
  ]);

  return safeMaxWithdrawAmount;
}
