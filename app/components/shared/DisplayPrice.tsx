import { getDisplayPrice, roundPrice, truncatePrice } from "~/lib/ui";
import BigNumber from "bignumber.js";

const BASE_CURRENCY_CODE = "USD";
const LOCALE = "en-US";
const LARGE_NUMBER = 100000;

type DisplayPriceProps = {
  amount?: string;
  decimals?: number;
  tokenSymbol?: string;
  baseFactor?: string;
  baseFactorDecimals?: number;
  maxDecimals?: number; // how many max decimals to show
  isCompact?: boolean; // when you want to show short string like 10K, 10M, 10B. if true, maxDecimals is not considered
  disableGrouping?: boolean; // remove thousand separator
  disableRounding?: boolean; // when using maxDecimals, disableRounding will use truncating instead of rounding
  hideBaseCurrencyCode?: boolean;
  disableFormatting?: boolean; // only maxDecimals has effect when disableFormatting is present
};

// USD values will have 2 decimals rounded. Other tokens will be truncated to 6 decimals, use truncatingDecimals to override
const DisplayPrice: React.FC<DisplayPriceProps> = ({
  amount,
  decimals,
  tokenSymbol,
  baseFactor,
  baseFactorDecimals,
  maxDecimals,
  isCompact,
  disableGrouping,
  disableRounding,
  hideBaseCurrencyCode,
  disableFormatting,
}) => {
  let displayPrice = getDisplayPrice(
    amount,
    decimals,
    baseFactor,
    baseFactorDecimals
  );

  const hasBaseFactor = baseFactor !== undefined;
  const trailingTokenSymbol = hasBaseFactor
    ? hideBaseCurrencyCode
      ? ""
      : BASE_CURRENCY_CODE
    : tokenSymbol || "";
  const trimmer = disableRounding ? truncatePrice : roundPrice;

  if (displayPrice === "") return null;

  if (disableFormatting) {
    return (
      <>{maxDecimals ? trimmer(displayPrice, maxDecimals) : displayPrice}</>
    );
  }

  const isLargeNumber = BigNumber(displayPrice)
    .abs()
    .isGreaterThan(LARGE_NUMBER);

  if (isCompact && isLargeNumber) {
    return (
      <>
        {`${Intl.NumberFormat(LOCALE, {
          notation: "compact",
          compactDisplay: "short",
          maximumFractionDigits: 2,
          minimumFractionDigits: 0, // remove trailing zero
          style: hasBaseFactor ? "currency" : "decimal",
          currency: BASE_CURRENCY_CODE,
          useGrouping: !disableGrouping,
        }).format(displayPrice)} ${trailingTokenSymbol}`}
        {/* typescript not supporting string type here but is valid. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format */}
      </>
    );
  }

  let trimmedPrice;
  let maximumFractionDigits = 2;
  if (hasBaseFactor) {
    trimmedPrice = BigNumber(displayPrice).toFixed(2); // for all dollar values, we show 2 decimals
  } else if (BigNumber(displayPrice).abs().isLessThan(10)) {
    maximumFractionDigits = maxDecimals ?? 6;
    trimmedPrice = trimmer(displayPrice, maximumFractionDigits);
  } else if (BigNumber(displayPrice).abs().isLessThan(1000)) {
    maximumFractionDigits = maxDecimals ?? 4;
    trimmedPrice = trimmer(displayPrice, maximumFractionDigits);
  } else {
    maximumFractionDigits = maxDecimals ?? 2;
    trimmedPrice = trimmer(displayPrice, maximumFractionDigits);
  }

  // remove negative symbol from zero, like -0 -> 0
  if (BigNumber(trimmedPrice).abs().isEqualTo(0)) {
    trimmedPrice = "0";
  }

  return (
    <>
      {`${Intl.NumberFormat(LOCALE, {
        style: hasBaseFactor ? "currency" : "decimal",
        currency: BASE_CURRENCY_CODE,
        maximumFractionDigits,
        useGrouping: !disableGrouping,
      }).format(trimmedPrice)} ${trailingTokenSymbol}`}
    </>
  );
};

export default DisplayPrice;
