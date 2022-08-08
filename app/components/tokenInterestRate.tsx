/* eslint-disable @typescript-eslint/consistent-type-imports */

import { LineChart, Line, Tooltip } from "recharts";

function TokenInterestRate() {
  const data = [
    {
      aa: 90,
      ss: 15,
      dd: 10,
    },
    {
      aa: 90,
      ss: 15,
      dd: 10,
    },
    {
      aa: 90,
      ss: 15,
      dd: 10,
    },
    {
      aa: 90,
      ss: 38,
      dd: 50,
    },
    {
      aa: 90,
      ss: 70,
      dd: 60,
    },
    {
      aa: 90,
      ss: 80,
      dd: 85,
    },
    {
      aa: 90,
      ss: 90,
      dd: 89,
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
    const { cx, cy, borderColor, value } = props;
    return (
      <>
        <circle
          cx={cx}
          cy={cy}
          r={6}
          stroke={borderColor}
          style={{ opacity: "1" }}
          strokeWidth={4}
          fill={"#FFFFFF"}
        />
        <span className="absolute text-[red]">{value}</span>
      </>
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
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <Line
              type="monotone"
              dataKey="aa"
              stroke="#FFFFFF"
              strokeWidth={2}
              dot={false}
              activeDot={<CustomDot borderColor="#282C2B" />}
            />
            <Line
              type="monotone"
              dataKey="ss"
              stroke="#14F195"
              strokeWidth={2}
              dot={false}
              activeDot={<CustomDot borderColor="#0D0D0D" />}
            />
            <Line
              type="monotone"
              dataKey="dd"
              stroke="#00E0FF"
              strokeWidth={2}
              dot={false}
              activeDot={<CustomDot borderColor="#0D0D0D" />}
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
