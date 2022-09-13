/* eslint-disable @typescript-eslint/consistent-type-imports */

import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

function TokenInterestRate({data}: {data: any[]}) {
  /*const data = [
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
      ss: 85,
      dd: 80,
    },
    {
      aa: 90,
      ss: 85,
      dd: 80,
    },
  ];*/

  const CustomLine = (props: any) => (
    <svg x={props.points[0].x} width="1" height="300" viewBox="0 0 1 544">
      <path
        d="M1.25 543.75L1.25 0.25"
        stroke="transparent"
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

  const CustomTooltip = (props: any) => {
    if (props.payload?.length) {
      return (
        <div className="bg-[#282C2B] p-[10px]">
          <p className={`label text-[${props.payload[0].stroke}]`}>
            {props.payload[0].value}%
          </p>
          <p className={`label text-[${props.payload[1].stroke}]`}>
            {props.payload[1].value}%
          </p>
          <p className={`label text-[${props.payload[2].stroke}]`}>
            {props.payload[2].value}%
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="font-[ProximaNova] w-full mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[20px] text-[16px] md:text-[18px] font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] p-[15px] md:p-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="h-[200px] md:h-[390px] pb-[0px] pr-[10px] pl-[10px] md:pl-[25px]  md:pr-[25px] flex items-end justify-start">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: -10, right: 8, left: 8, bottom: 0 }}
            >
              <Line
                type="monotone"
                dataKey="aa"
                stroke="#FFFFFF"
                strokeWidth={2}
                className="current__line"
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
              <Tooltip content={<CustomTooltip />} cursor={<CustomLine />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default TokenInterestRate;
