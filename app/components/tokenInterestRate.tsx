/* eslint-disable @typescript-eslint/consistent-type-imports */

import { LineChart, TooltipProps, Line, Tooltip } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent";

function TokenInterestRate() {
  const data = [
    {
      name: "Page A",
      aa: 15000,
      ss: 3000,
      dd: 2000,
    },
    {
      name: "Page B",
      aa: 15000,
      ss: 3000,
      dd: 2000,
    },
    {
      name: "Page C",
      aa: 15000,
      ss: 3000,
      dd: 2000,
    },
    {
      name: "Page D",
      aa: 15000,
      ss: 7500,
      dd: 6000,
    },
    {
      name: "Page E",
      aa: 15000,
      ss: 10000,
      dd: 9000,
    },
    {
      name: "Page F",
      aa: 15000,
      ss: 12500,
      dd: 12000,
    },
    {
      name: "Page G",
      aa: 15000,
      ss: 15000,
      dd: 15000,
    },
  ];

  const CustomLine = (props: any) => (
    <svg x={props.points[0].x} width="1" height="300" viewBox="0 0 1 544">
      <path
        d="M1.25 543.75L1.25 0.25"
        stroke="#282C2B"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </svg>
  );

  const CustomDot = (props: any) => {
    const { cx, cy, borderColor } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        stroke={borderColor}
        style={{ opacity: "1" }}
        strokeWidth={4}
        fill={"#FFFFFF"}
      />
    );
  };

  return (
    <div className="font-[ProximaNova] w-full max-w-[600px] mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[18px] text-base md:text-lg md:leading-[25px]">
        Interest Rate Model
      </div>
      <div className="flex-col pane-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] pl-[15px] pt-[17px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="min-h-[253px] flex items-end justify-center">
          <LineChart
            width={550}
            height={300}
            data={data}
            margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
          >
            <Line
              type="monotone"
              dataKey="aa"
              stroke="#FFFFFF"
              strokeWidth={2}
              activeDot={<CustomDot borderColor="#282C2B" />}
            />
            <Line
              type="monotone"
              dataKey="ss"
              stroke="#14F195"
              strokeWidth={2}
              activeDot={<CustomDot borderColor="#000" />}
            />
            <Line
              type="monotone"
              dataKey="dd"
              stroke="#00E0FF"
              strokeWidth={2}
              activeDot={<CustomDot borderColor="#000" />}
            />
            <Tooltip
              content={<></>}
              allowEscapeViewBox={{ y: true }}
              cursor={<CustomLine />}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default TokenInterestRate;
