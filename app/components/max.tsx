import { toExactString } from "~/lib/ui";

interface MaxProps {
  updateValue: Function;
  maxValue: number;
  maxValueLabel: string;
  label?: string;
  color: string;
  borrowLimitUsed?: number;
  maxPercentage?: number;
}

export default function Max(props: MaxProps) {
  let label = props.label || "Max";
  const maxValue: string = props.maxValue > 0 ? toExactString(props.maxValue) : '0';

  return (
    <div className="absolute custom_max top-[100px] md:top-[90px] right-0 mr-3.5 text-right sm:mr-10 z-10">
      <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
        Max Available
      </div>

      <div
        className={`text-[${props.color}] custom_max_text font-nova font-bold text-xs sm:text-base mb-1`}
      >
        {maxValue + " " + props.maxValueLabel}
      </div>

      {props.maxValue > 0
          && (!props.borrowLimitUsed || !props.maxPercentage || props.borrowLimitUsed < props.maxPercentage) && (
        <button
          tabIndex={0}
          onClick={() => props.updateValue()}
          className={`text-xs custom_max_btn border-2 border-[${props.color}] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[${props.color}]`}
        >
          {label}
        </button>
      )}
    </div>
  );
}
