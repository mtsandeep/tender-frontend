import type { JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import { getCurrentlyBorrowing } from "~/lib/tender";
import type { cToken, Token } from "~/types/global";

export function useCurrentlyBorrowing(
  signer: JsonRpcSigner | undefined | null,
  cToken: cToken,
  token: Token
): BigNumber {
  let [currentlyBorrowing, setCurrentlyBorrowing] = useState(BigNumber.from(0));

  useEffect(() => {
    if (!signer) {
      return;
    }

    getCurrentlyBorrowing(signer, cToken, token).then((c) => {
      setCurrentlyBorrowing(c);
    });
  }, [signer, cToken, token]);

  return currentlyBorrowing;
}
