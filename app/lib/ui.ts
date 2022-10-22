import { roundNumber } from "./tender";
import * as HRNumbers from "human-readable-numbers";
import * as math from "mathjs";

/**
 * Used on deposit, withdraw, borrow, and repay modals
 *
 * @param len Lenght of input value
 * @returns corresponding tailwind text size class
 */
const shrinkyInputClass = (len: number): string => {
  let className = "text-5xl md:text-6xl";

  if (len > 22) {
    className = "text-md";
  } else if (len > 14) {
    className = "text-xl md:text-2xl";
  } else if (len > 12) {
    className = "text-2xl md:text-3xl";
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
export const toCryptoString = (v: number, precision: number = 6): string => {
  let s: string;

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

// return decimal with precision 4 for values less than 1 and round to 2 decimals for number greater than 1
export const getDisplayPriceString = (v: number) =>
  Intl.NumberFormat("en-US", {
    notation: "standard",
    maximumSignificantDigits: v < 1 ? 4 : undefined,
  }).format(v);

const formatMaxString = (v: number, precision: number = 6): string =>
  math.format(v, { notation: "fixed", precision });

export const toExactString = (v: number) =>
  math.format(v, { notation: "fixed" });

export { shrinkyInputClass };
