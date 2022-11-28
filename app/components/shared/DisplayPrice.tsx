import { getDisplayPrice, truncatePrice } from "~/lib/ui";
import BigNumber from "bignumber.js";

const BASE_CURRENCY_CODE = "USD";
const LOCALE = "en-US";
const LARGE_NUMBER = "100000";

type DisplayPriceProps = {
  amount?: string;
  tokenSymbol?: string;
  decimals?: number;
  baseFactorDecimals?: number;
  baseFactor?: string;
  truncatingDecimals?: number; // how many max decimals to show
  isCompact?: boolean; // when you want to show short string like 10K, 10M, 10B
};

// USD values will have 2 decimals rounded. Other tokens will be truncated to 6 decimals, use truncatingDecimals to override
const DisplayPrice: React.FC<DisplayPriceProps> = ({
  amount,
  decimals,
  baseFactor,
  baseFactorDecimals,
  truncatingDecimals = 6,
  tokenSymbol,
  isCompact,
}) => {
  const displayPrice = getDisplayPrice(
    amount,
    decimals,
    baseFactor,
    baseFactorDecimals
  );

  if(displayPrice === '') return null

  const isLargeNumber = BigNumber(displayPrice).isGreaterThan(LARGE_NUMBER);

  if (isCompact && isLargeNumber) {
    return (
      <>
        {Intl.NumberFormat(LOCALE, {
          notation: "compact",
          maximumFractionDigits: 2,
          compactDisplay: "short",
          style: baseFactor ? "currency" : "decimal",
          currency: BASE_CURRENCY_CODE,
        }).format(BigNumber(displayPrice).toNumber())}{" "}
        {baseFactor ? BASE_CURRENCY_CODE : tokenSymbol || ""}
      </>
    );
  }

  return (
    <>
      {baseFactor
        ? `$${BigNumber(displayPrice).toFixed(2)} ${BASE_CURRENCY_CODE}`
        : `${truncatePrice(displayPrice, truncatingDecimals)} ${tokenSymbol}`}
    </>
  );
};

export default DisplayPrice;
