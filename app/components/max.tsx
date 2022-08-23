import { toCryptoString } from "~/lib/ui";

interface MaxProps {
  updateValue: Function;
  maxValue: string;
  maxValueLabel: string;
  label?: string;
}
const formatMaxValue = (v: string): string => {
  return toCryptoString(Math.max(0, parseFloat(v)));
};
export default function Max(props: MaxProps) {
  let label = props.label || "Max";

  return (
    <div className="absolute custom_max top right-0 mr-3.5 text-right sm:mr-10">
      <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
        Max Available
      </div>

      <div className="text-[#14F195] custom_max_text font-nova font-bold text-xs sm:text-base mb-4">
        {formatMaxValue(props.maxValue)} {props.maxValueLabel}
      </div>

      <button
        onClick={() => props.updateValue()}
        className="text-xs custom_max_btn border-2 border-[#14f195] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[#14f195]"
      >
        {label}
      </button>
    </div>
  );
}
