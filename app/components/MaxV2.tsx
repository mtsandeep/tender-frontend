import { getDisplayPrice } from "~/lib/ui";
import DisplayPrice from "~/components/shared/DisplayPrice";

interface MaxProps {
  onMaxClick: (maxValue: string) => void;
  amount: string;
  tokenSymbol: string;
  decimals: number;
  label?: string;
  color: string;
}

export default function MaxV2(props: MaxProps) {
  let label = props.label || "Max";
  const displayPrice = getDisplayPrice(props.amount, props.decimals);
  return (
    <div className="absolute custom_max top-[100px] md:top-[90px] right-0 mr-3.5 text-right sm:mr-10 z-10">
      <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
        Max Available
      </div>

      <div
        className={`text-[${props.color}] custom_max_text font-nova font-bold text-xs sm:text-base mb-1`}
      >
        <DisplayPrice
          amount={props.amount}
          decimals={props.decimals}
          tokenSymbol={props.tokenSymbol}
          maxDecimals={props.decimals}
          disableFormatting
        />
      </div>

      <button
        tabIndex={0}
        onClick={() => props.onMaxClick(displayPrice)}
        className={`text-xs custom_max_btn border-2 border-[${props.color}] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[${props.color}]`}
      >
        {label}
      </button>
    </div>
  );
}
