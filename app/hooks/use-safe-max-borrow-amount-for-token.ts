import { useState, useEffect, useContext } from "react";
import { safeMaxBorrowAmountForToken } from "~/lib/tender";
import { TenderContext } from "~/contexts/tender-context";
import type { TokenPair } from "~/types/global";

export function useSafeMaxBorrowAmountForToken(
  borrowLimit: number,
  totalBorrowed: number,
  comptrollerAddress: string,
  tokenPair: TokenPair,
  maxBorrowLiquidity: number
): number {
  let [safeMaxBorrowAmount, setSafeMaxBorrowAmountForToken] =
    useState<number>(0);
  let { currentTransaction } = useContext(TenderContext);

  useEffect(() => {
    safeMaxBorrowAmountForToken(borrowLimit, totalBorrowed, tokenPair).then(
      (v) => {
        let max = Math.min(v, maxBorrowLiquidity);
        setSafeMaxBorrowAmountForToken(max);
      }
    );
  }, [
    currentTransaction,
    borrowLimit,
    totalBorrowed,
    comptrollerAddress,
    tokenPair,
    maxBorrowLiquidity,
  ]);

  return safeMaxBorrowAmount;
}
