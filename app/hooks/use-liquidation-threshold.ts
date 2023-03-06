import type { JsonRpcSigner } from "@ethersproject/providers";
import { useState, useEffect, useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import { getAccountLiquidationThresholdInUsd } from "~/lib/tender";
import type { TokenPair } from "~/types/global";
import { useInterval } from "./use-interval";

export function useLiquidationThreshold(
  signer: JsonRpcSigner | undefined,
  comptrollerAddress: string,
  tokenPairs: TokenPair[]
): number {
  let [liquidationThresholdInUsd, setliquidationThreshold] = useState<number>(0);

  let { currentTransaction } = useContext(TenderContext);
  let poll = useInterval(7_000);

  useEffect(() => {
    if (!signer || !tokenPairs) {
      return;
    }

    getAccountLiquidationThresholdInUsd(
      signer,
      comptrollerAddress,
      tokenPairs
    ).then((b) => setliquidationThreshold(b));
  }, [signer, comptrollerAddress, tokenPairs, poll, currentTransaction]);

  return liquidationThresholdInUsd;
}
