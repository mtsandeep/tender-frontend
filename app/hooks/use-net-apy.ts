import type { JsonRpcSigner } from "@ethersproject/providers";
import { useState, useEffect, useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import { netApy as netApyFn } from "~/lib/apy-calculations";
import type { TokenPair } from "~/types/global";
import { useInterval } from "./use-interval";

export function useNetApy(
  signer: JsonRpcSigner | undefined,
  tokenPairs: TokenPair[]
) {
  let [netApy, setNetApy] = useState<number | null>(null);
  let { currentTransaction, networkData } = useContext(TenderContext);
  let poll = useInterval(7_000);

  useEffect(() => {
    if (!signer || !networkData) {
      return;
    }

    const secondsPerBlock = networkData.secondsPerBlock;

    netApyFn(signer, tokenPairs, secondsPerBlock).then((n) => setNetApy(n));
  }, [signer, tokenPairs, poll, currentTransaction, networkData]);

  return netApy;
}
