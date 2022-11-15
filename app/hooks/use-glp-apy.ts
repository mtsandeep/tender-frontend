import { useCallback } from "react";
import { providers as mcProviders } from "@0xsequence/multicall";
import { BigNumber, ethers } from "ethers";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { calculateApy } from "~/lib/apy-calculations";
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
    const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
    const ETHEREUM_SECONDS_PER_BLOCK = 12.05; // ethereum blocktime as blocktime is calulated in L1 blocktime
    const BLOCKS_PER_YEAR = Math.round(
      SECONDS_PER_YEAR / ETHEREUM_SECONDS_PER_BLOCK
    );
    const BASIS_POINTS_DIVISOR = BigNumber.from(10).pow(18);
    let aum;
    if (aums && aums.length > 0) {
      aum = aums[0].add(aums[1]).div(2);
    }
    const glpPrice =
      glpSupply && glpSupply.gt(0)
        ? aum.mul(BigNumber.from(10).pow(18)).div(glpSupply)
        : BigNumber.from(0);
    const feeGlpTrackerAnnualRewardsUsd = tokensPerInterval
      .mul(SECONDS_PER_YEAR)
      .mul(nativeTokenPrice)
      .div(BigNumber.from(10).pow(18));
    const glpSupplyUsd = glpSupply
      .mul(glpPrice)
      .div(BigNumber.from(10).pow(18));
    const glpAprForNativeToken =
      glpSupplyUsd && glpSupplyUsd.gt(0)
        ? feeGlpTrackerAnnualRewardsUsd
            .mul(BASIS_POINTS_DIVISOR)
            .div(glpSupplyUsd)
        : BigNumber.from(0);
    const performanceFeeFactor = BigNumber.from(10000).sub(performanceFee);
    const aprPerBlock = glpAprForNativeToken
      .mul(performanceFeeFactor)
      .div(10000)
      .div(BLOCKS_PER_YEAR);

    return calculateApy(aprPerBlock, ETHEREUM_SECONDS_PER_BLOCK);
  }, []);
}
