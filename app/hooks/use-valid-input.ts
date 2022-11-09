import BigNumber from "bignumber.js";
import { useState, useEffect } from "react";
import { toMaxNumber } from "~/lib/ui";

enum InputValidationDetail {
  NON_NUMERIC_INPUT = "Please enter an amount",
  INSUFFICIENT_LIQUIDITY = "Insufficient liquidity",
  INSUFFICIENT_EQUITY = "This would result in liquidation",
  NEGATIVE_OR_ZERO = "Please enter a value",
}

export function useValidInput(
  inputValue: string,
  floor: number,
  ceil: number,
  borrowLimitUsed: number,
  precision: number
): [boolean, InputValidationDetail | null] {
  let [isValid, setIsValid] = useState<boolean>(false);
  let [reason, setReason] = useState<InputValidationDetail | null>(null);
  useEffect(() => {
    // Reset reason on each run
    setReason(null);

    try {
      if (ceil === 0) {
        setReason(InputValidationDetail.INSUFFICIENT_LIQUIDITY);
        throw "Ceil is zero";
      }

      // Remove insignificant 0's
      let value = inputValue.replace(/^0+|0+$/g, "");

      // 0 pad values leading with a `.` to simplify checking for
      // value coercion while parsing later in this function
      value = value.indexOf(".") === 0 ? `0${value}` : value;

      // If trailing decimal, remove
      value =
        value.indexOf(".") === value.length - 1
          ? value.substring(0, value.length - 1)
          : value;

      let isNaNValue: boolean = isNaN(parseFloat(value));
      if (isNaNValue) {
        setReason(InputValidationDetail.NON_NUMERIC_INPUT);
        throw "NaN";
      }

      let v: number = parseFloat(value);

      if (v <= floor) {
        setReason(InputValidationDetail.NEGATIVE_OR_ZERO);
        setIsValid(false);
      } else if (v > ceil) {
        setReason(InputValidationDetail.INSUFFICIENT_LIQUIDITY);
        setIsValid(false);
      } else if (borrowLimitUsed > 100 || borrowLimitUsed < -0) {
        setReason(InputValidationDetail.INSUFFICIENT_EQUITY);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (e) {
      setIsValid(false);
    }
  }, [inputValue, floor, ceil, borrowLimitUsed]);

  return [isValid, reason];
}

/**
 * validate input with messages
 * @param inputValue 
 * @param floor 
 * @param ceil 
 * @param borrowLimitUsed 
 * @returns [isValid, reasonString]
 */
export function useValidInputV2(
  inputValue: string,
  floor: string,
  ceil: string,
  borrowLimitUsed: string,
): [boolean, InputValidationDetail | null] {
  console.log("san1", ceil)
  let [isValid, setIsValid] = useState<boolean>(false);
  let [reason, setReason] = useState<InputValidationDetail | null>(null);
  useEffect(() => {
    // Reset reason on each run
    setReason(null);

    try {
      if (BigNumber(ceil).isEqualTo(0)) {
        setReason(InputValidationDetail.INSUFFICIENT_LIQUIDITY);
        throw "Ceil is zero";
      }

      const value = BigNumber(inputValue)

      let isNaNValue: boolean = BigNumber(value).isNaN();
      if (isNaNValue) {
        setReason(InputValidationDetail.NON_NUMERIC_INPUT);
        throw "NaN";
      }

      if (value.isLessThanOrEqualTo(floor)) {
        setReason(InputValidationDetail.NEGATIVE_OR_ZERO);
        setIsValid(false);
      } else if (value.isGreaterThan(ceil)) {
        setReason(InputValidationDetail.INSUFFICIENT_LIQUIDITY);
        setIsValid(false);
      } else if (BigNumber(borrowLimitUsed).isGreaterThan(100) || BigNumber(borrowLimitUsed).isLessThan(-0)) {
        setReason(InputValidationDetail.INSUFFICIENT_EQUITY);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (e) {
      setIsValid(false);
    }
  }, [inputValue, floor, ceil, borrowLimitUsed]);

  return [isValid, reason];
}
