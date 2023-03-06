import { useState, useEffect, useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import { getliquidationThresholdUsed } from "~/lib/tender";
import { useInterval } from "./use-interval";

export function useLiquidationThresholdUsed(
  borrowedAmount: number,
  liquidationThresholdInUsd: number
): string {
  let [liquidationThresholdUsed, setliquidationThresholdUsed] =
    useState<string>("");

  let { currentTransaction } = useContext(TenderContext);
  let pollKey = useInterval(7_000);

  useEffect(() => {
    getliquidationThresholdUsed(borrowedAmount, liquidationThresholdInUsd).then(
      (b) => setliquidationThresholdUsed(b)
    );
  }, [borrowedAmount, liquidationThresholdInUsd, currentTransaction, pollKey]);

  return liquidationThresholdUsed;
}
