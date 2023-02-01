import { roundNumber } from "./tender";
import * as HRNumbers from "human-readable-numbers";
import * as math from "mathjs";
import BigNumber from "bignumber.js"
import { BigNumberish, BigNumber as EthersBigNumber } from "@ethersproject/bignumber";
/**
 * Used on deposit, withdraw, borrow, and repay modals
 *
 * @param len Length of input value
 * @returns corresponding tailwind text size class
 */
const shrinkInputClass = (len: number): string => {
  let className = "text-5xl md:text-6xl";

  if (len > 22) {
    className = "text-md";
  } else if (len > 14) {
    className = "text-lg md:text-2xl";
  } else if (len > 12) {
    className = "text-xl md:text-3xl";
  } else if (len > 10) {
    className = "text-3xl md:text-4xl";
  } else if (len > 4) {
    className = "text-4xl md:text-5xl";
  }
  return className;
};

/**
 *
 * @param v Number to round
 * @param withPrefix Indicates weather to include currency prefix (i.e. $)
 * @returns A number that's rounded and localized
 */
export const toFiatString = (v: number): string => {
  let roundedNumber = parseFloat(v?.toFixed(2));
  return `${roundedNumber.toLocaleString("en-US", {
    // style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  })}`;
};

const A_BIG_NUMBER = 100000;
export const toShortFiatString = (v: number): string => {
  return `${v > A_BIG_NUMBER ? HRNumbers.toHumanString(v) : toFiatString(v)}`;
};

export const toShortCryptoString = (v: number): string => {
  let value = `${
    v > A_BIG_NUMBER
      ? HRNumbers.toHumanString(v)
      : toCryptoString(roundNumber(v))
  }`;
  return value.slice(0, 16);
};

/**
 *
 * @param v Crypto value
 * @param precision
 * @returns A human-readable string for this value
 */
export const toCryptoString = (value: number | string, precision: number = 6): string => {
  let s: string;
  let v: number = typeof value === "string" ? parseFloat(value) : value 

  if (v > 1) {
    // Applies commas to large numbers
    s = toFiatString(v);
  } else {
    s = formatMaxString(v, precision + 1) // round to "precision + 1" places instead of "precision"
      .slice(0, -1); // then drop the last digit because rounding up breaks the upper limit

    // note, safari does not support regexp look behind
    // If there is a decimal, remove trailing 0's, leaving at least one left
    if (s.indexOf(".") !== -1) s = s.replace(/0+$/g, "0");
  }
  return s;
};

export const toMaxString = (v: number, precision: number = 6): string => {
  // skip formatting for zero values
  if (v === 0) {
    return v.toString();
  }

  let formattedValue = formatMaxString(v, precision);

  // prevent rounding to bigger value
  if (parseFloat(formattedValue) > v) {
    formattedValue = formatMaxString(v, precision + 1);
    const decimals = (formattedValue.split(".")[1] || []).length;

    if (decimals > precision) {
      formattedValue = formattedValue.slice(0, precision - decimals);
    }
  }

  // remove trailing zeros
  return formattedValue.replace(/\.0+$|(\.\d*[1-9])(0+)$/, "$1");
};

export const toMaxNumber = (v: number, precision: number = 6): number =>
  parseFloat(formatMaxString(v, precision));

const formatMaxString = (v: number, precision: number = 6): string =>
  math.format(v, { notation: "fixed", precision });

export const toExactString = (v: number) =>
  math.format(v, { notation: "fixed" });


/**
 * Human readable BigNumber
 * 
 * amount = 1000000000000000000
 * decimals = 18
 * returns 1 as string
 * 
 * @param amount 
 * @param decimals 
 * @returns 
 */
export const getHumanReadableAmount = (
  amount: string,
  decimals: number | string
) => {
  return BigNumber(amount).div(BigNumber(10).pow(decimals));
};

/**
 * convert human readable number to smart contract BigNumber format with decimals added
 * 
 * amount = 1
 * decimals = 18
 * returns 1000000000000000000 as string
 * 
 * @param amount 
 * @param decimals 
 * @returns 
 */
export const getAmount = (amount: BigNumber.Value, decimals: number) => {
  return BigNumber(amount).multipliedBy(BigNumber(10).pow(decimals));
};

/**
 * Display price, only use for displaying DO NOT use for calculation
 * @param amount 
 * @param decimals 
 * @param multiplyFactor 
 * @param multiplyFactorDecimals 
 * @returns string
 */
export const getDisplayPrice = (
  amount?: string | BigNumberish,
  decimals?: number,
  multiplyFactor?: string,
  multiplyFactorDecimals?: number
) => {
  if (amount === undefined) {
    return "";
  }

  const displayPrice = BigNumber(amount.toString())
    .multipliedBy(multiplyFactor ?? 1)
    .div(BigNumber(10).pow((decimals || 0) + (multiplyFactorDecimals || 0)));

  return decimals ? displayPrice.dp(decimals, BigNumber.ROUND_DOWN).toFixed() : displayPrice.toFixed();
};

export const truncatePrice = (amount: string, decimals: number = 18) => {
  return BigNumber(amount).dp(decimals, BigNumber.ROUND_DOWN).toFixed();
};
export const roundPrice = (amount: string, decimals: number = 6) => {
  return BigNumber(amount).dp(decimals).toFixed();
};

/**
 * Temparory usage until we move all to BigNumber or find a better solution.
 * Returns float with token decimals applied ( same error will be there in precision)
 */
export const getAmountFloat = (amount:string, decimals:number) => {
  return parseFloat(BigNumber(amount).div(BigNumber(10).pow(decimals)).toFixed())
}

export const getPercentageString = (
  amount: string,
  basicPointDivisor = "10000"
) => {
  return `${BigNumber(amount)
    .div(basicPointDivisor)
    .multipliedBy(100)
    .dp(2)
    .toFixed()}%`;
};

export { shrinkInputClass };
