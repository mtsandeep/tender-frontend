import type { cToken, Token } from "~/types/global";
import { Signer, Contract, utils } from "ethers";
import { ethers, BigNumber } from "ethers";

import SampleCTokenAbi from "~/config/sample-ctoken-abi";
import SampleErc20Abi from "~/config/sample-erc20-abi";
import SampleComptrollerAbi from "~/config/sample-comptroller-abi";
import SampleCEtherAbi from "~/config/sample-CEther-abi";
import SamplePriceOracleAbi from "~/config/sample-price-oracle-abi";

import type { TokenPair } from "~/types/global";
import { formatUnits } from "ethers/lib/utils";
import type {
  TransactionReceipt,
  JsonRpcSigner,
} from "@ethersproject/providers";
import sampleCEtherAbi from "~/config/sample-CEther-abi";

const MINIMUM_REQUIRED_APPROVAL_BALANCE = BigNumber.from("1");
interface Txn {
  wait: (n?: number) => TransactionReceipt;
  hash: string;
}

function formatBigNumber(value: BigNumber, decimals: number): number {
  // formatUnits returns a string with the decimals in the appropriate place,
  // and it needs to be made a float.
  let formattedUnit = formatUnits(value, decimals);
  let val = parseFloat(formattedUnit);
  return val;
}

export function roundNumber(val: number): number {
  // toFixed(2) rounds the float to two decimals, and returns a string,
  // so we need to make it a float again. :(
  return val > 1 ? parseFloat(val.toFixed(2)) : parseFloat(val.toFixed(6));
}

/**
 * Enable
 *
 * @param signer
 * @param token
 * @param cToken
 */
async function enable(
  signer: Signer,
  token: Token,
  cToken: cToken
): Promise<void> {
  // Eth is always enabled
  if (token.symbol === "ETH") return

  // @ts-ignore
  let contract = new ethers.Contract(token.sGLPAddress || token.address, SampleErc20Abi, signer);
  let approvalVal = BigNumber.from(2).pow(256).sub(1).toString(); // Max approval value, 2^256 - 1
  await contract.approve(cToken.address, approvalVal);
}

/**
 *
 * @param signer
 * @param token
 * @returns
 */
async function getWalletBalance(signer: Signer, token: Token): Promise<number> {
  // ETH is a special case
  if (token.symbol === "ETH")  {
    const balance = await signer.getBalance();
    const balanceInEth = ethers.utils.formatEther(balance);
    return parseFloat(balanceInEth);
  }

  let contract = new ethers.Contract(token.address, SampleErc20Abi, signer);
  let address: string = await signer.getAddress();
  let balance: BigNumber = await contract.balanceOf(address);

  return formatBigNumber(balance, token.decimals);
}

/**
 * -------------------------------
 * Depost Flow
 * -------------------------------
 */

/**
 * Deposit
 *
 * @param value
 * @param signer
 * @param cToken
 * @param token
 */
async function deposit(
  value: string,
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<Txn> {
  let formattedValue;
  
  if (token.symbol === "ETH") {
    let contract = new ethers.Contract(cToken.address, SampleCEtherAbi, signer);
    console.log("supply() w/ cEth");
    formattedValue = ethers.utils.parseEther(value);
    console.log(formattedValue.toString())
    console.log("input value:", value, "formattedValue:", formattedValue.toString());
    return await contract.mint({value: formattedValue});

  } else {
    let contract = new ethers.Contract(cToken.address, SampleCTokenAbi, signer);
    console.log("supply() with Token", cToken.symbol, cToken.address);
    formattedValue = ethers.utils.parseUnits(value, token.decimals);
    console.log("input value:", value, "formattedValue:", formattedValue.toString());
    return await contract.mint(formattedValue);
  }
}

/**
 *
 * @param value
 * @param signer
 * @param cToken
 */
async function redeem(
  value: string,
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<Txn> {
  if (token.symbol === "ETH") {
    console.log("redeem() with cEth");
    let contract = new ethers.Contract(cToken.address, SampleCEtherAbi, signer);
  
    const formattedValue = ethers.utils.parseEther(value);
    console.log("input value:", value, "formattedValue:", formattedValue);

    return await contract.redeemUnderlying(formattedValue);
  }

  const formattedValue = ethers.utils.parseUnits(value, token.decimals);

  let cTokenContract = new ethers.Contract(
    cToken.address,
    SampleCTokenAbi,
    signer
  );
  return await cTokenContract.redeemUnderlying(formattedValue);
}

/**
 *
 * @param signer
 * @param cToken
 * @returns number the amount of underlying asset being supplied
 */
async function getCurrentlySupplying(
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<number> {
  let abi = cToken.symbol === "ETH" ? SampleCEtherAbi : SampleCTokenAbi;
  let contract = new ethers.Contract(cToken.address, abi, signer);
  let address = await signer.getAddress();

  const balance: BigNumber = await contract.callStatic.balanceOf(address);

  let exchangeRateCurrent = await contract.exchangeRateStored();
  let tokens = balance.mul(exchangeRateCurrent)

  // the exchange rate is scaled by 18 decimals
  return formatBigNumber(tokens, token.decimals + 18);
}

/**
 *
 * @param signer
 * @param cToken
 * @returns string
 */
async function getCurrentlyBorrowing(
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<number> {
  let contract: Contract = new ethers.Contract(
    cToken.address,
    SampleCTokenAbi,
    signer
  );
  let address: string = await signer.getAddress();
  let balance: BigNumber = await contract.borrowBalanceStored(address);

  return formatBigNumber(balance, token.decimals);
}

async function collateralFactorForToken(
  signer: Signer,
  comptrollerContract: Contract,
  tokenPair: TokenPair
): Promise<number> {
  let { 1: rawCollateralFactor } = await comptrollerContract.markets(
    tokenPair.cToken.address
  );

  // Collateral factors are always 1e18
  let collateralFactor: number = parseFloat(
    formatUnits(rawCollateralFactor, 18)
  );

  return collateralFactor;
}

async function borrowLimitForTokenInUsd(
  signer: Signer,
  comptrollerContract: Contract,
  tp: TokenPair
): Promise<number> {
  let suppliedAmount: number = await getCurrentlySupplying(
    signer,
    tp.cToken,
    tp.token
  );

  let collateralFactor: number = await collateralFactorForToken(
    signer,
    comptrollerContract,
    tp
  );

  let amount = suppliedAmount * tp.token.priceInUsd * collateralFactor;

  return amount;
}

/**
 *
 * @param signer
 * @param comptrollerAddress
 * @param tokenPairs
 * @returns
 *
 * Each token has a max amount you can borrow against it.
 * For example, DAI on Rinkeby has a 70% collateral factor, so you can borrow up to 70% of your supplied DAI.
 *
 * Summing all tokens you have supplied multiplied by their collateral limits gives the borrow limit.
 */
async function getAccountBorrowLimitInUsd(
  signer: Signer,
  comptrollerAddress: string,
  tokenPairs: TokenPair[]
): Promise<number> {
  let comptrollerContract = new ethers.Contract(
    comptrollerAddress,
    SampleComptrollerAbi,
    signer
  );

  let tokenBalancesInUsd = await Promise.all(
    tokenPairs.map(async (tokenPair: TokenPair): Promise<number> => {
      return borrowLimitForTokenInUsd(signer, comptrollerContract, tokenPair);
    })
  );

  let borrowLimit = tokenBalancesInUsd.reduce((acc, curr) => acc + curr, 0);

  return borrowLimit;
}

async function projectBorrowLimit(
  signer: Signer,
  comptrollerAddress: string,
  tokenPairs: TokenPair[],
  tp: TokenPair,
  tokenAmount: number
): Promise<number> {
  let currentBorrowLimitInUsd = await getAccountBorrowLimitInUsd(
    signer,
    comptrollerAddress,
    tokenPairs
  );

  let comptrollerContract = new ethers.Contract(
    comptrollerAddress,
    SampleComptrollerAbi,
    signer
  );

  let collateralFactor: number = await collateralFactorForToken(
    signer,
    comptrollerContract,
    tp
  );

  // Borrow limit changes by the dollar amount of this amount of tokens
  // times its collateral factor (what % of that dollar amount you can borrow against).
  // `tokenAmount` might be a negative number and thus reduce the limit.
  let borrowLimitChangeInUsd: number =
    tokenAmount * tp.token.priceInUsd * collateralFactor;

    console.log("CF", collateralFactor, tp.token.symbol, "price", tp.token.priceInUsd)
  return currentBorrowLimitInUsd + borrowLimitChangeInUsd;
}


/**
 *
 * @param borrowedAmount
 * @param borrowedLimit
 * @returns
 */
async function getBorrowLimitUsed(
  borrowedAmount: number,
  borrowedLimit: number
): Promise<string> {
  if (borrowedLimit === 0) return "0"; // Infinite Protection

  let borrowLimitUsed = ((borrowedAmount / borrowedLimit) * 100).toFixed(2);
  return borrowLimitUsed === "NaN" ? "0" : borrowLimitUsed; // NaN safeguard for new wallets
}

/**
 * -------------------------------
 * Withdraw Flow
 * -------------------------------
 */

/**
 *
 * @param value
 * @param signer
 * @param cToken
 */
async function repay(
  value: string,
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<Txn> {
  if (token.symbol === "ETH") {
    console.log("repay() with cEth");

    const formattedValue = ethers.utils.parseEther(value);
    console.log("input value:", value, "formattedValue:", formattedValue.toString());

    let contract = new ethers.Contract(cToken.address, sampleCEtherAbi, signer);
    return await contract.repayBorrow({value: formattedValue});
  }


  const formattedValue: BigNumber = ethers.utils.parseUnits(
    value,
    token.decimals
  );
  let contract = new ethers.Contract(cToken.address, SampleCTokenAbi, signer);
  return await contract.repayBorrow(formattedValue);
}

/**
 *
 * @param value
 * @param signer
 * @param cToken
 */
async function borrow(
  value: string,
  signer: Signer,
  cToken: cToken,
  token: Token
): Promise<Txn> {
  if (token.symbol === "ETH") {
      console.log("borrow() with cEth");

      const formattedValue = ethers.utils.parseEther(value);
      console.log("input value:", value, "formattedValue:", formattedValue);

      let contract = new ethers.Contract(cToken.address, sampleCEtherAbi, signer);
      return await contract.borrow(formattedValue);
    }
  else {

    const formattedValue: BigNumber = ethers.utils.parseUnits(
      value,
      token.decimals
    );

    let contract = new ethers.Contract(cToken.address, SampleCTokenAbi, signer);
    return await contract.borrow(formattedValue);
  }
}

async function getTotalSupply(signer: Signer, tp: TokenPair): Promise<number> {
  let contract = new ethers.Contract(
    tp.cToken.address,
    SampleCTokenAbi,
    signer
  );

  let cash: ethers.BigNumber = await contract.getCash();
  let borrows: ethers.BigNumber = await contract.totalBorrows();
  let reserves: ethers.BigNumber = await contract.totalReserves();
  let value = cash.add(borrows).sub(reserves);

  return formatBigNumber(value, tp.token.decimals);
}

async function getTotalBorrowed(
  signer: Signer,
  tp: TokenPair
): Promise<number> {
  let contract = new ethers.Contract(
    tp.cToken.address,
    SampleCTokenAbi,
    signer
  );
  let value: ethers.BigNumber = await contract.totalBorrows();

  return formatBigNumber(value, tp.token.decimals);
}

async function hasSufficientAllowance(
  signer: Signer,
  token: Token,
  cToken: cToken
): Promise<boolean> {
  const contractAddress = token.sGLPAddress || token.address;

  if (!contractAddress) { // workaround for native token
    return true;
  }

  // @ts-ignore
  let contract = new ethers.Contract(contractAddress, SampleErc20Abi, signer);
  let address = await signer.getAddress();
  let allowance: BigNumber = await contract.allowance(address, cToken.address);

  return allowance.gte(MINIMUM_REQUIRED_APPROVAL_BALANCE);
}

async function getAssetPriceInUsd(
  signer: Signer,
  priceOracleAddress: string,
  cToken: cToken,
  token: Token
): Promise<number> {
  // get the real eth price
  if (token.symbol === "ETH") {
    let res = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/sell")
    let json = await res.json()
    return parseFloat(json.data.amount)
  }

  let contract = new ethers.Contract(
    priceOracleAddress,
    SamplePriceOracleAbi,
    signer
  );

  let answer: BigNumber = await contract.getUnderlyingPrice(cToken.address);

  let priceInUsd = parseFloat(formatUnits(answer, token.priceDecimals));

  return priceInUsd;
}

async function getTotalSupplyBalanceInUsd(
  signer: Signer,
  tokenPairs: TokenPair[]
): Promise<number> {
  let suppliedAmounts = await Promise.all(
    tokenPairs.map(async (tp: TokenPair): Promise<number> => {
      let suppliedAmount: number = await getCurrentlySupplying(
        signer,
        tp.cToken,
        tp.token
      );

      return suppliedAmount * tp.token.priceInUsd;
    })
  );

  return suppliedAmounts.reduce((acc, curr) => acc + curr, 0);
}

async function getTotalBorrowedInUsd(
  signer: Signer,
  tokenPairs: TokenPair[]
): Promise<number> {
  let borrowedAmounts = await Promise.all(
    tokenPairs.map(async (tp: TokenPair): Promise<number> => {
      let borrowedAmount: number = await getCurrentlyBorrowing(
        signer,
        tp.cToken,
        tp.token
      );

      return borrowedAmount * tp.token.priceInUsd;
    })
  );

  return borrowedAmounts.reduce((acc, curr) => acc + curr, 0);
}

/**
 *
 * @param signer
 * @param borrowLimit
 * @param totalBorrowed
 * @param tp
 * @returns theoretical max borrow limit with a saftey margin of 80%
 */
async function safeMaxBorrowAmountForToken(
  borrowLimit: number,
  totalBorrowed: number,
  tp: TokenPair
): Promise<number> {
  // (borrowed_amount + x*priceInUsd) / borrow_limit = 0.8
  // (borrowed_amount + x*priceInUsd) = 0.8 * borrow_limit
  // x = ((0.8 * borrow_limit) - borrowed_amount) / priceInUsd
  let amount = (0.8 * borrowLimit - totalBorrowed) / tp.token.priceInUsd;

  return amount;
}

async function getMaxBorrowAmount(
  borrowLimit: number,
  totalBorrowed: number,
  tp: TokenPair
): Promise<number> {
  let borrowableAmountInUsd = borrowLimit - totalBorrowed;

  return borrowableAmountInUsd / tp.token.priceInUsd;
}

async function getMaxBorrowLiquidity(
  signer: JsonRpcSigner,
  tp: TokenPair
): Promise<number> {
  let cTokenContract = new ethers.Contract(
    tp.cToken.address,
    SampleCTokenAbi,
    signer
  );

  let balance: BigNumber = await cTokenContract.getCash();

  return parseFloat(utils.formatUnits(balance, tp.token.decimals));
}

export {
  enable,
  deposit,
  redeem,
  getWalletBalance,
  getCurrentlySupplying,
  getCurrentlyBorrowing,
  getAccountBorrowLimitInUsd,
  getBorrowLimitUsed,
  getTotalSupplyBalanceInUsd,
  repay,
  borrow,
  getTotalSupply,
  getTotalBorrowed,
  hasSufficientAllowance,
  projectBorrowLimit,
  getAssetPriceInUsd,
  getTotalBorrowedInUsd,
  safeMaxBorrowAmountForToken,
  getMaxBorrowAmount,
  getMaxBorrowLiquidity,
  collateralFactorForToken,
  formatBigNumber,
};
