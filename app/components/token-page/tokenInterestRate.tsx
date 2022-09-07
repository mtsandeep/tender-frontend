/* eslint-disable @typescript-eslint/consistent-type-imports */

import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";

function TokenInterestRate() {
  const data = [
    { aa: "0", ss: "0", dd: "0" },
    { aa: 1, ss: "0.05", dd: "5.40", isCurrent: false },
    { aa: 2, ss: "0.21", dd: "11.08", isCurrent: false },
    { aa: 3, ss: "0.47", dd: "17.08", isCurrent: false },
    { aa: 4, ss: "0.84", dd: "23.39", isCurrent: false },
    { aa: 5, ss: "1.32", dd: "30.04", isCurrent: false },
    { aa: "5.46", ss: "1.58", dd: "33.23", isCurrent: true },
    { aa: 6, ss: "1.91", dd: "37.06", isCurrent: false },
    { aa: 7, ss: "2.61", dd: "44.45", isCurrent: false },
    { aa: 8, ss: "3.42", dd: "52.23", isCurrent: false },
    { aa: 9, ss: "4.35", dd: "60.44", isCurrent: false },
    { aa: 10, ss: "5.40", dd: "69.08", isCurrent: false },
    { aa: 11, ss: "6.57", dd: "78.19", isCurrent: false },
    { aa: 12, ss: "7.86", dd: "87.79", isCurrent: false },
    { aa: 13, ss: "9.29", dd: "97.91", isCurrent: false },
    { aa: 14, ss: "10.85", dd: "108.57", isCurrent: false },
    { aa: 15, ss: "12.55", dd: "119.80", isCurrent: false },
    { aa: 16, ss: "14.40", dd: "131.64", isCurrent: false },
    { aa: 17, ss: "16.40", dd: "144.10", isCurrent: false },
    { aa: 18, ss: "18.56", dd: "157.24", isCurrent: false },
    { aa: 19, ss: "20.89", dd: "171.09", isCurrent: false },
    { aa: 20, ss: "23.39", dd: "185.68", isCurrent: false },
    { aa: 21, ss: "26.08", dd: "201.05", isCurrent: false },
    { aa: 22, ss: "28.96", dd: "217.24", isCurrent: false },
    { aa: 23, ss: "32.04", dd: "234.30", isCurrent: false },
    { aa: 24, ss: "35.34", dd: "252.28", isCurrent: false },
    { aa: 25, ss: "38.87", dd: "271.23", isCurrent: false },
    { aa: 26, ss: "42.64", dd: "291.18", isCurrent: false },
    { aa: 27, ss: "46.66", dd: "312.21", isCurrent: false },
    { aa: 28, ss: "50.96", dd: "334.37", isCurrent: false },
    { aa: 29, ss: "55.54", dd: "357.71", isCurrent: false },
    { aa: 30, ss: "60.44", dd: "382.30", isCurrent: false },
    { aa: 31, ss: "65.66", dd: "408.21", isCurrent: false },
    { aa: 32, ss: "71.23", dd: "435.51", isCurrent: false },
    { aa: 33, ss: "77.17", dd: "464.28", isCurrent: false },
    { aa: 34, ss: "83.51", dd: "494.58", isCurrent: false },
    { aa: 35, ss: "90.27", dd: "526.50", isCurrent: false },
    { aa: 36, ss: "97.49", dd: "560.13", isCurrent: false },
    { aa: 37, ss: "105.20", dd: "595.57", isCurrent: false },
    { aa: 38, ss: "113.44", dd: "632.90", isCurrent: false },
    { aa: 39, ss: "122.23", dd: "672.22", isCurrent: false },
    { aa: 40, ss: "131.64", dd: "713.66", isCurrent: false },
    { aa: 41, ss: "141.69", dd: "757.30", isCurrent: false },
    { aa: 42, ss: "152.43", dd: "803.29", isCurrent: false },
    { aa: 43, ss: "163.94", dd: "851.73", isCurrent: false },
    { aa: 44, ss: "176.25", dd: "902.76", isCurrent: false },
    { aa: 45, ss: "189.44", dd: "956.52", isCurrent: false },
    { aa: 46, ss: "203.58", dd: "1013.16", isCurrent: false },
    { aa: 47, ss: "218.74", dd: "1072.82", isCurrent: false },
    { aa: 48, ss: "235.01", dd: "1135.67", isCurrent: false },
    { aa: 49, ss: "252.47", dd: "1201.88", isCurrent: false },
    { aa: 50, ss: "271.23", dd: "1271.63", isCurrent: false },
    { aa: 51, ss: "291.39", dd: "1345.10", isCurrent: false },
    { aa: 52, ss: "313.08", dd: "1422.50", isCurrent: false },
    { aa: 53, ss: "336.42", dd: "1504.03", isCurrent: false },
    { aa: 54, ss: "361.56", dd: "1589.91", isCurrent: false },
    { aa: 55, ss: "388.66", dd: "1680.38", isCurrent: false },
    { aa: 56, ss: "417.88", dd: "1775.68", isCurrent: false },
    { aa: 57, ss: "449.42", dd: "1876.06", isCurrent: false },
    { aa: 58, ss: "483.49", dd: "1981.80", isCurrent: false },
    { aa: 59, ss: "520.31", dd: "2093.19", isCurrent: false },
    { aa: 60, ss: "560.13", dd: "2210.51", isCurrent: false },
    { aa: 61, ss: "603.25", dd: "2334.10", isCurrent: false },
    { aa: 62, ss: "649.95", dd: "2464.27", isCurrent: false },
    { aa: 63, ss: "700.58", dd: "2601.39", isCurrent: false },
    { aa: 64, ss: "755.51", dd: "2745.81", isCurrent: false },
    { aa: 65, ss: "815.16", dd: "2897.94", isCurrent: false },
    { aa: 66, ss: "879.98", dd: "3058.17", isCurrent: false },
    { aa: 67, ss: "950.47", dd: "3226.95", isCurrent: false },
    { aa: 68, ss: "1027.20", dd: "3404.72", isCurrent: false },
    { aa: 69, ss: "1110.77", dd: "3591.96", isCurrent: false },
    { aa: 70, ss: "1201.88", dd: "3789.17", isCurrent: false },
    { aa: 71, ss: "1301.29", dd: "3996.89", isCurrent: false },
    { aa: 72, ss: "1409.84", dd: "4215.67", isCurrent: false },
    { aa: 73, ss: "1528.48", dd: "4446.09", isCurrent: false },
    { aa: 74, ss: "1658.24", dd: "4688.79", isCurrent: false },
    { aa: 75, ss: "1800.29", dd: "4944.41", isCurrent: false },
    { aa: 76, ss: "1955.92", dd: "5213.63", isCurrent: false },
    { aa: 77, ss: "2126.59", dd: "5497.18", isCurrent: false },
    { aa: 78, ss: "2313.89", dd: "5795.81", isCurrent: false },
    { aa: 79, ss: "2519.63", dd: "6110.33", isCurrent: false },
    { aa: 80, ss: "2745.81", dd: "6441.59", isCurrent: false },
    { aa: 81, ss: "2994.69", dd: "6790.46", isCurrent: false },
    { aa: 82, ss: "3268.78", dd: "7157.88", isCurrent: false },
    { aa: 83, ss: "3570.88", dd: "7544.84", isCurrent: false },
    { aa: 84, ss: "3904.16", dd: "7952.37", isCurrent: false },
    { aa: 85, ss: "4272.16", dd: "8381.56", isCurrent: false },
    { aa: 86, ss: "4678.84", dd: "8833.56", isCurrent: false },
    { aa: 87, ss: "5128.67", dd: "9309.58", isCurrent: false },
    { aa: 88, ss: "5626.67", dd: "9810.89", isCurrent: false },
    { aa: 89, ss: "6178.48", dd: "10338.83", isCurrent: false },
    { aa: 90, ss: "6790.46", dd: "10894.82", isCurrent: false },
    { aa: 91, ss: "7469.77", dd: "11480.33", isCurrent: false },
    { aa: 92, ss: "8224.48", dd: "12096.93", isCurrent: false },
    { aa: 93, ss: "9063.73", dd: "12746.27", isCurrent: false },
    { aa: 94, ss: "9997.81", dd: "13430.08", isCurrent: false },
    { aa: 95, ss: "11038.37", dd: "14150.18", isCurrent: false },
    { aa: 96, ss: "12198.58", dd: "14908.50", isCurrent: false },
    { aa: 97, ss: "13493.38", dd: "15707.06", isCurrent: false },
    { aa: 98, ss: "14939.66", dd: "16547.98", isCurrent: false },
    { aa: 99, ss: "16556.61", dd: "17433.50", isCurrent: false },
    { aa: 100, ss: "18366.00", dd: "18366.00", isCurrent: false },
  ];

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
            {Number(
              data.find(
                (item: any) =>
                  Number(item.ss) === Number(props.payload[1].payload.ss) &&
                  Number(item.dd) === Number(props.payload[2].payload.dd)
              )?.aa
            )}
            %
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
      <div className="leading-[22px] font-semibold mb-[20px] text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] p-[15px] md:p-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="relative h-[200px] md:h-[390px] pb-[0px] pr-[10px] pl-[10px] md:pl-[25px]  md:pr-[25px] flex flex-col items-end justify-start">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.map((item) => ({
                ...item,
                aa: Math.trunc(
                  Math.max(
                    Number(
                      data.reduce((prev: any, cur: any) => {
                        if (Number(prev.dd) > Number(cur.dd)) {
                          return prev;
                        }
                        return cur;
                      }).dd
                    ),
                    Number(
                      data.reduce((prev: any, cur: any) => {
                        if (Number(prev.ss) > Number(cur.ss)) {
                          return prev;
                        }
                        return cur;
                      }).ss
                    )
                  ) * 1.1
                ),
              }))}
              margin={{ top: -10, right: 8, left: 8, bottom: 43 }}
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
          <div className="absolute flex flex-col items-center top-[12px] left-[20px] md:top-[31px] md:left-[50px]">
            <span className="w-[2px] h-[50px] bg-[#282C2B]"></span>
            <span className="font-nova text-base text-white">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenInterestRate;
