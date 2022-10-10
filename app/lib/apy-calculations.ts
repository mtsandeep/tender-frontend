import { BigNumber, ethers } from "ethers";
import sampleCTokenAbi from "~/config/sample-ctoken-abi";
import type { Token, cToken, TokenPair } from "~/types/global";
import type { JsonRpcSigner } from "@ethersproject/providers";
import {
  getCurrentlySupplying,
  getTotalSupplyBalanceInUsd,
  getCurrentlyBorrowing,
} from "./tender";

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

// TODO: If we passed in the market here we wouldn't have to re-query supply and borrow amounts
async function getNetGainOrLoss(
  s: JsonRpcSigner,
  p: TokenPair,
  secondsPerBlock: number
): Promise<number> {
  let supplied: number = await getCurrentlySupplying(s, p.cToken, p.token);
  let supplyApy: number =
    (await calculateDepositApy(p.token, p.cToken, s, secondsPerBlock)) * 0.01;

  let borrowed: number = await getCurrentlyBorrowing(s, p.cToken, p.token);
  let borrowApy: number =
    (await calculateBorrowApy(p.token, p.cToken, s, secondsPerBlock)) * 0.01;

  return (
    supplied * p.token.priceInUsd * supplyApy -
    borrowed * p.token.priceInUsd * borrowApy
  );
}

async function netApy(
  signer: JsonRpcSigner,
  tokenPairs: TokenPair[],
  secondsPerBlock: number
): Promise<number | null> {
  let weightedValues: number[] = await Promise.all(
    tokenPairs.map(async (p): Promise<number> => {
      return await getNetGainOrLoss(signer, p, secondsPerBlock);
    })
  );

  let sum: number = weightedValues.reduce((acc, curr) => acc + curr, 0);

  let totalSupplied: number = await getTotalSupplyBalanceInUsd(
    signer,
    tokenPairs
  );

  // This is a percent value, i.e., if the function returns 0.1 it's 0.1%;
  let result = (sum / totalSupplied) * 100;

  if (Number.isNaN(result)) {
    return 0;
  }

  return result;
}

export {
  formattedDepositApy,
  formattedBorrowApy,
  netApy,
  calculateApy,
  formatApy,
};
