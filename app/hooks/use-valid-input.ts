import BigNumber from "bignumber.js";
import { useState, useEffect } from "react";

enum InputValidationDetail {
  NON_NUMERIC_INPUT = "Please enter an amount",
  INSUFFICIENT_LIQUIDITY = "Insufficient liquidity",
  INSUFFICIENT_EQUITY = "This would result in liquidation",
  NEGATIVE_OR_ZERO = "Please enter a value",
  TOO_LOW = "Amount too low to transact"
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
  inputValue: BigNumber.Value,
  floor: BigNumber.Value,
  ceil: BigNumber.Value,
  borrowLimitUsed: BigNumber.Value,
  isRepayingOrSupplying?: boolean
): [boolean, InputValidationDetail | null] {
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

      if (value.isEqualTo(0)) {
        setReason(InputValidationDetail.NEGATIVE_OR_ZERO);
        setIsValid(false);
      } else if (value.isLessThan(floor)) {
        setReason(InputValidationDetail.TOO_LOW);
        setIsValid(false);
      } else if (value.isGreaterThan(ceil)) {
        setReason(InputValidationDetail.INSUFFICIENT_LIQUIDITY);
        setIsValid(false);
      } else if ((!isRepayingOrSupplying && BigNumber(borrowLimitUsed).isGreaterThan(100)) || BigNumber(borrowLimitUsed).isLessThan(-0)) {
        setReason(InputValidationDetail.INSUFFICIENT_EQUITY);
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    } catch (e) {
      setIsValid(false);
    }
  }, [inputValue, floor, ceil, borrowLimitUsed, isRepayingOrSupplying]);

  return [isValid, reason];
}
