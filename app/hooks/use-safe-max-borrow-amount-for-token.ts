import { useState, useEffect } from "react";
import { safeMaxBorrowAmountForToken } from "~/lib/tender";
import type { Market, TokenPair } from "~/types/global";

export function useSafeMaxBorrowAmountForToken(
  market: Market,
  borrowLimit: number,
  totalBorrowed: number,
  comptrollerAddress: string,
  tokenPair: TokenPair,
  maxBorrowLiquidity: number
): number {
  let [safeMaxBorrowAmount, setSafeMaxBorrowAmountForToken] =
    useState<number>(0);

  useEffect(() => {
    safeMaxBorrowAmountForToken(borrowLimit, totalBorrowed, tokenPair).then(
      (v) => {
        let max = Math.min(v, maxBorrowLiquidity);
        setSafeMaxBorrowAmountForToken(max);
      }
    );
  }, [
    market,
    borrowLimit,
    totalBorrowed,
    comptrollerAddress,
    tokenPair,
    maxBorrowLiquidity,
  ]);

  return safeMaxBorrowAmount;
}
