import { toExactString } from "~/lib/ui";

interface MaxProps {
  updateValue: Function;
  maxValue: number;
  maxValueLabel: string;
  label?: string;
  color: string;
}

export default function Max(props: MaxProps) {
  let label = props.label || "Max";

  return (
    <div className="absolute custom_max top-[100px] right-0 mr-3.5 text-right sm:mr-10 ">
      <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
        Max Available
      </div>

      <div
        className={`text-[${props.color}] custom_max_text font-nova font-bold text-xs sm:text-base mb-4`}
      >
        {toExactString(props.maxValue) + " " + props.maxValueLabel}
      </div>

      <button
        onClick={() => props.updateValue()}
        className={`text-xs custom_max_btn border-2 border-[${props.color}] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[${props.color}]`}
      >
        {label}
      </button>
    </div>
  );
}
