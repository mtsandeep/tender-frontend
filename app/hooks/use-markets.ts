import { useState, useEffect, useContext } from "react";
import type { Market, TokenPair } from "~/types/global";
import type { JsonRpcSigner } from "@ethersproject/providers";
import { calculateApy, formatApy } from "~/lib/apy-calculations";
import {
  getBorrowLimitUsed,
  formatBigNumber,
  MINIMUM_REQUIRED_APPROVAL_BALANCE,
} from "~/lib/tender";
import { useInterval } from "./use-interval";
import { TenderContext } from "~/contexts/tender-context";
import { BigNumber, ethers, utils } from "ethers";
import SampleCTokenAbi from "~/config/sample-ctoken-abi";
import SampleCEtherAbi from "~/config/sample-CEther-abi";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";
import { providers as mcProviders } from "@0xsequence/multicall";
import { formatUnits } from "ethers/lib/utils";
import SampleErc20Abi from "~/config/sample-erc20-abi";
import GlpManager from "~/config/abi/glp/GlpManager.json";
import RewardTracker from "~/config/abi/glp/RewardTracker.json";
import Vault from "~/config/abi/glp/Vault.json";
import sampleErc20Abi from "~/config/sample-erc20-abi";
import sampleCtokenAbi from "~/config/sample-ctoken-abi";

// @todo maybe refactor (remove duplicate code from tender.ts, merge changes, etc.)
export function useMarkets(
  signer: JsonRpcSigner | null | undefined,
  supportedTokenPairs: TokenPair[],
  comptrollerAddress: string | undefined,
  secondsPerBlock: number | undefined
) {
  let [markets, setMarkets] = useState<Market[]>([]);

  let pollingKey = useInterval(7_000);
  let { currentTransaction } = useContext(TenderContext);

  useEffect(() => {
    if (!signer || !comptrollerAddress || !secondsPerBlock) {
      return;
    }

    const mcProvider = new mcProviders.MulticallProvider(signer.provider);

    const getMarkets = async () => {
      const comptrollerContract = new ethers.Contract(
          comptrollerAddress,
          SampleComptrollerAbi,
          mcProvider
      );

      const address: string = await signer.getAddress();

      const tokenPromises = supportedTokenPairs.map((tp) => {
        const abi = tp.token.symbol === "ETH" ? SampleCEtherAbi : SampleCTokenAbi;
        const cTokenContract = new ethers.Contract(
            tp.cToken.address,
            abi,
            mcProvider
        );

        // getTotalBorrowedInUsd -> getCurrentlyBorrowing
        const borrowBalancePromise = cTokenContract.borrowBalanceStored(address);

        // getAccountBorrowLimitInUsd -> borrowLimitForTokenInUsd ->
        // -> getCurrentlySupplying
        const balancePromise = cTokenContract.callStatic.balanceOf(address);
        const exchangeRateCurrentPromise = cTokenContract.exchangeRateStored();

        // -> collateralFactorForToken
        const collateralFactorPromise = comptrollerContract.markets(tp.cToken.address);

        // getCurrentlySupplying -> ...
        // getCurrentlyBorrowing -> ...

        // getMaxBorrowLiquidity
        let cashPromise = cTokenContract.getCash();

        // getMarketData ->
        // -> formattedDepositApy -> calculateDepositApy
        const supplyRatePerBlockPromise = cTokenContract.supplyRatePerBlock();

        // -> formattedBorrowApy -> calculateBorrowApy
        const borrowRatePerBlockPromise = cTokenContract.borrowRatePerBlock();

        // -> getTotalBorrowed
        const totalBorrowsPromise = cTokenContract.totalBorrows();

        // -> getTotalSupply
        const totalReservesPromise = cTokenContract.totalReserves();

        // getWalletBalance
        let walletBalancePromise;

        if (tp.token.symbol === "ETH") {
          walletBalancePromise = signer.getBalance();
        } else {
          const tokenContract = new ethers.Contract(
              tp.token.address,
              SampleErc20Abi,
              mcProvider
          );
          walletBalancePromise = tokenContract.balanceOf(address);
        }

        // hasSufficientAllowance
        let allowancePromise;
        const allowanceAddress = tp.token.sGLPAddress || tp.token.address;

        if (allowanceAddress) { // workaround for native token
          let allowanceContract = new ethers.Contract(
              allowanceAddress,
              SampleErc20Abi,
              mcProvider
          );
          allowancePromise = allowanceContract.allowance(address, tp.cToken.address);
        }

        const autocompoundPromise = cTokenContract.autocompound();
        /*const performanceFeePromise = cTokenContract.performanceFee();
        const withdrawFeePromise = cTokenContract.withdrawFee();*/

        return {
          borrowBalance: borrowBalancePromise,
          balance: balancePromise,
          exchangeRateCurrent: exchangeRateCurrentPromise,
          collateralFactor: collateralFactorPromise,
          cash: cashPromise,
          supplyRatePerBlock: supplyRatePerBlockPromise,
          borrowRatePerBlock: borrowRatePerBlockPromise,
          totalBorrows: totalBorrowsPromise,
          totalReserves: totalReservesPromise,
          tokenPair: tp,
          walletBalance: walletBalancePromise,
          allowance: allowancePromise,
          autocompound: autocompoundPromise,
          /*performanceFee: performanceFeePromise,
          withdrawFee: withdrawFeePromise,*/
        };
      });

      const tokens = [];

      for (const tokenPromise of tokenPromises) {
        tokens.push({
          borrowBalance: await tokenPromise.borrowBalance,
          balance: await tokenPromise.balance,
          exchangeRateCurrent: await tokenPromise.exchangeRateCurrent,
          collateralFactor: await tokenPromise.collateralFactor,
          cash: await tokenPromise.cash,
          supplyRatePerBlock: await tokenPromise.supplyRatePerBlock,
          borrowRatePerBlock: await tokenPromise.borrowRatePerBlock,
          totalBorrows: await tokenPromise.totalBorrows,
          totalReserves: await tokenPromise.totalReserves,
          tokenPair: tokenPromise.tokenPair,
          walletBalance: await tokenPromise.walletBalance,
          allowance: tokenPromise.allowance ? await tokenPromise.allowance : MINIMUM_REQUIRED_APPROVAL_BALANCE,
          autocompound: await tokenPromise.autocompound,
          /*performanceFee: await tokenPromise.performanceFee,
          withdrawFee: await tokenPromise.withdrawFee,*/
        });
      }

      // getTotalBorrowedInUsd
      const totalBorrowedAmountInUsd = tokens.map((token) => {
        return formatBigNumber(
            token.borrowBalance,
            token.tokenPair.token.decimals
        ) * token.tokenPair.token.priceInUsd;
      }).reduce((acc, curr) => acc + curr, 0);

      // getAccountBorrowLimitInUsd
      const accountBorrowLimitInUsd = tokens.map((token) => {
        // the exchange rate is scaled by 18 decimals
        const suppliedAmount = formatBigNumber(
            token.balance.mul(token.exchangeRateCurrent),
            token.tokenPair.token.decimals + 18
        );

        const collateralFactor = parseFloat(
            formatUnits(token.collateralFactor.collateralFactorMantissa, 18)
        );

        return suppliedAmount * token.tokenPair.token.priceInUsd * collateralFactor;
      }).reduce((acc, curr) => acc + curr, 0);

      const newMarkets = tokens.map(async (token): Promise<Market> => {
        const tp = token.tokenPair;
        const supplyBalance = formatBigNumber(
            token.balance.mul(token.exchangeRateCurrent),
            tp.token.decimals + 18
        );
        const borrowBalance = formatBigNumber(
            token.borrowBalance,
            tp.token.decimals
        );

        const supplyBalanceInUsd = supplyBalance * tp.token.priceInUsd;
        const borrowBalanceInUsd = borrowBalance * tp.token.priceInUsd;

        const maxBorrowLiquidity = parseFloat(utils.formatUnits(token.cash, tp.token.decimals));

        // walletBalance
        const walletBalance = token.walletBalance.toString()

        let depositApy;
        if (tp.token.symbol === "GLP") {
          const cTokenContract = new ethers.Contract(
            tp.cToken.address,
            sampleCtokenAbi,
            mcProvider
        );
          const tokenContract = new ethers.Contract(
            tp.token.glpAddress!,
            sampleErc20Abi,
            mcProvider
          );
          const glpManagerContract = new ethers.Contract(
            tp.token.glpManager!,
            GlpManager.abi,
            mcProvider
          );
          const rewardTrackerContract = new ethers.Contract(
            tp.token.rewardTracker!,
            RewardTracker.abi,
            mcProvider
          );
          const vaultContract = new ethers.Contract(
            tp.token.vault!,
            Vault.abi,
            mcProvider
          );
          const aumsPromise = glpManagerContract.getAums();
          const tokensPerIntervalPromise =
            rewardTrackerContract.tokensPerInterval();
          const nativeTokenPricePromise = vaultContract.getMinPrice(
            tp.token.nativeToken
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
          const performanceFeeFactor =
            BigNumber.from(10000).sub(performanceFee);
          const aprPerBlock = glpAprForNativeToken
            .mul(performanceFeeFactor)
            .div(10000)
            .div(BLOCKS_PER_YEAR);

          depositApy = formatApy(
            calculateApy(aprPerBlock, ETHEREUM_SECONDS_PER_BLOCK)
          );
        } else {
          // marketData
          depositApy = formatApy(
            calculateApy(token.supplyRatePerBlock, secondsPerBlock)
          );
        }

        const borrowApy = formatApy(
          calculateApy(token.borrowRatePerBlock, secondsPerBlock)
        );

        const totalBorrowed = formatBigNumber(token.totalBorrows, token.tokenPair.token.decimals);

        let marketSize = formatBigNumber(
            token.cash.add(token.totalBorrows).sub(token.totalReserves),
            token.tokenPair.token.decimals
        );

        return {
          id: tp.token.symbol,
          tokenPair: tp,
          marketData: {
            depositApy,
            borrowApy,
            totalBorrowed,
            marketSize,
          },
          walletBalance,
          supplyBalance,
          supplyBalanceInUsd,
          borrowBalance,
          borrowBalanceInUsd,
          comptrollerAddress,
          borrowLimit: accountBorrowLimitInUsd,
          totalBorrowedAmountInUsd,
          borrowLimitUsedOfToken: await getBorrowLimitUsed(
              borrowBalanceInUsd,
              accountBorrowLimitInUsd
          ),
          borrowLimitUsed: await getBorrowLimitUsed(
              totalBorrowedAmountInUsd,
              accountBorrowLimitInUsd
          ),
          maxBorrowLiquidity,
          hasSufficientAllowance: token.allowance.gte(MINIMUM_REQUIRED_APPROVAL_BALANCE),
          autocompound: token.autocompound,
        };
      });

      Promise.all(newMarkets).then((nm) => setMarkets(nm));
    };

    getMarkets();
  }, [
    signer,
    supportedTokenPairs,
    comptrollerAddress,
    pollingKey,
    currentTransaction,
    secondsPerBlock
  ]);

  return markets;
}
