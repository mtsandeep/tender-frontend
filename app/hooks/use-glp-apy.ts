import { useCallback } from "react";
import { providers as mcProviders } from "@0xsequence/multicall";
import { BigNumber, ethers } from "ethers";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { calculateApy, getGlpAprPerBlock } from "~/lib/apy-calculations";
import GlpManager from "~/config/abi/glp/GlpManager.json";
import RewardTracker from "~/config/abi/glp/RewardTracker.json";
import Vault from "~/config/abi/glp/Vault.json";
import sampleErc20Abi from "~/config/sample-erc20-abi";
import sampleCtokenAbi from "~/config/sample-ctoken-abi";
import type { TokenPair } from "~/types/global";

export function useGlpApy() {
  return useCallback(async (signer: JsonRpcSigner, tokenPair: TokenPair) => {
    const mcProvider = new mcProviders.MulticallProvider(signer.provider);

    const cTokenContract = new ethers.Contract(
      tokenPair.cToken.address,
      sampleCtokenAbi,
      mcProvider
    );
    const tokenContract = new ethers.Contract(
      tokenPair.token.glpAddress!,
      sampleErc20Abi,
      mcProvider
    );
    const glpManagerContract = new ethers.Contract(
      tokenPair.token.glpManager!,
      GlpManager.abi,
      mcProvider
    );
    const rewardTrackerContract = new ethers.Contract(
      tokenPair.token.rewardTracker!,
      RewardTracker.abi,
      mcProvider
    );
    const vaultContract = new ethers.Contract(
      tokenPair.token.vault!,
      Vault.abi,
      mcProvider
    );
    const aumsPromise = glpManagerContract.getAums();
    const tokensPerIntervalPromise = rewardTrackerContract.tokensPerInterval();
    const nativeTokenPricePromise = vaultContract.getMinPrice(
      tokenPair.token.nativeToken
    );
    const glpSupplyPromise = tokenContract.totalSupply();
    const performanceFeePromise = cTokenContract.performanceFee();

    const aums = await aumsPromise;
    const tokensPerInterval = await tokensPerIntervalPromise;
    const nativeTokenPrice = await nativeTokenPricePromise;
    const glpSupply = await glpSupplyPromise;

    const performanceFee = await performanceFeePromise;
    const ETHEREUM_SECONDS_PER_BLOCK = 12.05; // ethereum blocktime as blocktime is calulated in L1 blocktime
    const aprPerBlock = getGlpAprPerBlock(
      aums,
      glpSupply,
      tokensPerInterval,
      nativeTokenPrice,
      performanceFee,
      ETHEREUM_SECONDS_PER_BLOCK
    );

    return calculateApy(aprPerBlock, ETHEREUM_SECONDS_PER_BLOCK);
  }, []);
}
