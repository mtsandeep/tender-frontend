import { useCallback } from "react";
import { providers as mcProviders } from "@0xsequence/multicall";
import { ethers } from "ethers";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { calculateApy, getGmxAprPerBlock } from "~/lib/apy-calculations";
import RewardTracker from "~/config/abi/gmx/RewardTracker.json";
import Vault from "~/config/abi/gmx/Vault.json";
import sampleCtokenAbi from "~/config/sample-ctoken-abi";
import type { TokenPair } from "~/types/global";
import samplePriceOracleAbi from "~/config/sample-price-oracle-abi";


export function useGmxApy() {
  return useCallback(async (signer: JsonRpcSigner, tokenPair: TokenPair, priceOracleAddress:string) => {
    const mcProvider = new mcProviders.MulticallProvider(signer.provider);

    if (!tokenPair) {
      return 0;
    }

    const cTokenContract = new ethers.Contract(
      tokenPair.cToken.address,
      sampleCtokenAbi,
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
    const priceOracleContract = new ethers.Contract(
      priceOracleAddress,
      samplePriceOracleAbi,
      mcProvider
    );

    const gmxPricePromise = priceOracleContract.getUnderlyingPrice(tokenPair.cToken.address)

    const tokensPerIntervalPromise = rewardTrackerContract.tokensPerInterval();
    const feeGmxSupplyPromise = rewardTrackerContract.totalSupply();
    const nativeTokenPricePromise = vaultContract.getMinPrice(
      tokenPair.token.nativeToken
    );
    
    const performanceFeePromise = cTokenContract.performanceFee();

    const feeGmxSupply = await feeGmxSupplyPromise
    const tokensPerInterval = await tokensPerIntervalPromise;
    const nativeTokenPrice = await nativeTokenPricePromise;
    const gmxPrice = await gmxPricePromise;

    const performanceFee = await performanceFeePromise;
    const ETHEREUM_SECONDS_PER_BLOCK = 12.05; // ethereum blocktime as blocktime is calulated in L1 blocktime

    const aprPerBlock = getGmxAprPerBlock(
      feeGmxSupply,
      gmxPrice,
      tokensPerInterval,
      nativeTokenPrice,
      performanceFee,
      ETHEREUM_SECONDS_PER_BLOCK
    );
    return calculateApy(aprPerBlock, ETHEREUM_SECONDS_PER_BLOCK);
  }, []);
}
