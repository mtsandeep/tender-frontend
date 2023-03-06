import type { JsonRpcSigner } from "@ethersproject/providers";
import { useState, useEffect } from "react";
import { liquidationThresholdForToken } from "~/lib/tender";
import type { TokenPair } from "~/types/global";
import { ethers } from "ethers";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";

export function useLiquidationThresholdMantissa(
  signer: JsonRpcSigner | undefined | null,
  comptrollerAddress: string,
  tokenPair: TokenPair
): number {
  let [liquidationThresholdMantissa, setliquidationThresholdMantissa] =
    useState<number>(0);

  useEffect(() => {
    if (!signer || !tokenPair || !comptrollerAddress) {
      return;
    }

    let comptrollerContract = new ethers.Contract(
      comptrollerAddress,
      SampleComptrollerAbi,
      signer
    );

    liquidationThresholdForToken(signer, comptrollerContract, tokenPair).then(
      (cf) => setliquidationThresholdMantissa(cf)
    );
  }, [signer, comptrollerAddress, tokenPair]);

  return liquidationThresholdMantissa;
}
