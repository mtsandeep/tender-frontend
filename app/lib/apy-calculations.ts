import { BigNumber } from "ethers";
import { ethers } from "ethers";
import sampleCTokenAbi from "~/config/sample-ctoken-abi";
import type { Token, cToken } from "~/types/global";
import type { JsonRpcSigner } from "@ethersproject/providers";

function formatApy(apy: number): string {
  return `${apy?.toFixed(2)}%`;
}

// https://compound.finance/docs#protocol-math

// Note: this is intentionally a number and not a BigNumber.
// If the ratePerBlock is way lower than the mantissa
// i.e., the rate per block is in the millions and the mantissa is 1e18
// it becomes 0 in the integer division math.
//
// This might be a mistake, but I get the correct APYs based on Compound on Rinkeby.
function calculateApy(
  ratePerBlock: BigNumber,
  secondsPerBlock: number
): number {
  const daysPerYear = 365;
  const blocksPerDay = Math.round((60 * 60 * 24) / secondsPerBlock); // an estimate with 10.9 second block time

  const underlyingAssetMantissa = 1e18;

  // source: https://docs.compound.finance/v2/#calculating-the-apy-using-rate-per-block
  const apy =
    (Math.pow(
      (ratePerBlock.toNumber() / underlyingAssetMantissa) * blocksPerDay + 1,
      daysPerYear
    ) -
      1) *
    100;

  return apy;
}

async function calculateDepositApy(
  token: Token,
  cToken: cToken,
  signer: JsonRpcSigner,
  secondsPerBlock: number
): Promise<number> {
  // TODO: Use different ABI for cEth and cWBTC
  const cTokenContract = new ethers.Contract(
    cToken.address,
    sampleCTokenAbi,
    signer
  );

  const supplyRatePerBlock = await cTokenContract.supplyRatePerBlock();

  const apy = calculateApy(supplyRatePerBlock, secondsPerBlock);

  return apy;
}

async function calculateBorrowApy(
  token: Token,
  cToken: cToken,
  signer: JsonRpcSigner,
  secondsPerBlock: number
): Promise<number> {
  // TODO: Use different ABI for cEth and cWBTC
  const cTokenContract = new ethers.Contract(
    cToken.address,
    sampleCTokenAbi,
    signer
  );

  const borrowRatePerBlock = await cTokenContract.borrowRatePerBlock();

  const apy = calculateApy(borrowRatePerBlock, secondsPerBlock);

  return apy;
}

async function formattedDepositApy(
  token: Token,
  cToken: cToken,
  signer: JsonRpcSigner,
  secondsPerBlock: number
): Promise<string> {
  let apy: number = await calculateDepositApy(
    token,
    cToken,
    signer,
    secondsPerBlock
  );

  return formatApy(apy);
}

async function formattedBorrowApy(
  token: Token,
  cToken: cToken,
  signer: JsonRpcSigner,
  secondsPerBlock: number
): Promise<string> {
  let apy: number = await calculateBorrowApy(
    token,
    cToken,
    signer,
    secondsPerBlock
  );

  return formatApy(apy);
}

function getGlpAprPerBlock(
  aums: BigNumber[],
  glpSupply: BigNumber,
  tokensPerInterval: BigNumber,
  nativeTokenPrice: BigNumber,
  performanceFee: BigNumber,
  ETHEREUM_SECONDS_PER_BLOCK: number
): BigNumber {
  const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
  const BLOCKS_PER_YEAR = Math.round(
    SECONDS_PER_YEAR / ETHEREUM_SECONDS_PER_BLOCK
  );
  const BASIS_POINTS_DIVISOR = BigNumber.from(10).pow(18);
  let aum = BigNumber.from(0);
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
  const glpSupplyUsd = glpSupply.mul(glpPrice).div(BigNumber.from(10).pow(18));
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

  return aprPerBlock;
}

function getGmxAprPerBlock(
  feeGmxSupply: BigNumber,
  gmxPrice: BigNumber,
  tokensPerInterval: BigNumber,
  nativeTokenPrice: BigNumber,
  performanceFee: BigNumber,
  ETHEREUM_SECONDS_PER_BLOCK: number
): BigNumber {
  const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
  const BLOCKS_PER_YEAR = Math.round(
    SECONDS_PER_YEAR / ETHEREUM_SECONDS_PER_BLOCK
  );
  const BASIS_POINTS_DIVISOR = BigNumber.from(10).pow(18);

  const feeGmxTrackerAnnualRewardsUsd = tokensPerInterval
    .mul(SECONDS_PER_YEAR)
    .mul(nativeTokenPrice)
    .div(BigNumber.from(10).pow(18));
  const feeGmxSupplyUsd = feeGmxSupply
    .mul(gmxPrice.mul(BigNumber.from(10).pow(12))) // gmxPrice is having additional 12 decimals in gmx
    .div(BigNumber.from(10).pow(18));
  const gmxAprForNativeToken =
    feeGmxSupplyUsd && feeGmxSupplyUsd.gt(0)
      ? feeGmxTrackerAnnualRewardsUsd
          .mul(BASIS_POINTS_DIVISOR)
          .div(feeGmxSupplyUsd)
      : BigNumber.from(0);
  const performanceFeeFactor = BigNumber.from(10000).sub(performanceFee);
  const aprPerBlock = gmxAprForNativeToken
    .mul(performanceFeeFactor)
    .div(10000)
    .div(BLOCKS_PER_YEAR);
  return aprPerBlock;
}

export {
  formattedDepositApy,
  formattedBorrowApy,
  calculateApy,
  formatApy,
  getGlpAprPerBlock,
  getGmxAprPerBlock,
};
