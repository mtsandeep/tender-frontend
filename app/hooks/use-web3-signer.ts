import type {
  AlchemyProvider,
  Web3Provider,
} from "@ethersproject/providers";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { useState, useEffect } from "react";

export function useWeb3Signer(
  provider: Web3Provider | AlchemyProvider | undefined | null
) {
  let [signer, setSigner] = useState<JsonRpcSigner>();
  useEffect(() => {
    if (!provider) {
      return;
    }
    setSigner(provider.getSigner());
  }, [provider]);
  return signer;
}
