import { useState, useEffect } from "react";
import { getMaxBorrowAmount } from "~/lib/tender";
import { getTruncatedNumber } from "~/lib/ui";
import type { TokenPair } from "~/types/global";

export function useMaxBorrowAmount(
  borrowLimit: number,
  totalBorrowed: number,
  tokenPair: TokenPair
): number {
  let [maxBorrowAmount, setMaxBorrowAmount] = useState<number>(0);

  useEffect(() => {
    if (!tokenPair) {
      return;
    }

    getMaxBorrowAmount(borrowLimit, totalBorrowed, tokenPair).then((v) =>
      setMaxBorrowAmount(getTruncatedNumber(v, tokenPair.token.decimals))
    );
  }, [borrowLimit, totalBorrowed, tokenPair]);

  return maxBorrowAmount;
}
