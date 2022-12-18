import { useEffect, useState } from "react";
import { ethers } from "ethers";
import type { JsonRpcSigner } from "@ethersproject/providers";
import GlpManager from "~/config/abi/gmx/GlpManager.json";
import { providers as mcProviders } from "@0xsequence/multicall";
import { useInterval } from "./use-interval";

export function useGlpCooldown(
  signer: JsonRpcSigner | undefined | null,
  glpManagerAddress: string,
  cTokenAddress: string
) {
  const [isCoolingdown, setIsCoolingdown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState<number>();
  let pollingKey = useInterval(5_000);

  useEffect(() => {
    if (!signer) {
      return;
    }
    const mcProvider = new mcProviders.MulticallProvider(signer.provider);

    const glpManagerContract = new ethers.Contract(
      glpManagerAddress,
      GlpManager.abi,
      mcProvider
    );

    const calculateCooldown = async () => {
      const [lastAddedTimeInSeconds, cooldownDurationInSeconds] =
        await Promise.all([
          glpManagerContract.lastAddedAt(cTokenAddress),
          glpManagerContract.cooldownDuration(),
        ]);

      const redemptionTime: number = lastAddedTimeInSeconds
        ? lastAddedTimeInSeconds
            .add(cooldownDurationInSeconds)
            .mul(1000)
            .toNumber()
        : undefined;
      const inCooldownWindow = redemptionTime
        ? Date.now() < redemptionTime
        : false;
      setIsCoolingdown(inCooldownWindow);
      if (inCooldownWindow) {
        setCooldownTime(redemptionTime);
      }
    };
    calculateCooldown();
  }, [cTokenAddress, glpManagerAddress, signer, pollingKey]);

  return { isCoolingdown, cooldownTime };
}
