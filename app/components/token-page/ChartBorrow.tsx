/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useEffect, useState } from "react";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent";
import {
  BarChart,
  Bar,
  TooltipProps,
  LineChart,
  Line,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    totalBorrow: 96,
    borrowAPY: 96,
    date: "26 June",
  },
  {
    totalBorrow: 96,
    borrowAPY: 96,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "22 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "24 May",
  },
  {
    totalBorrow: 84,
    borrowAPY: 84,
    date: "24 May",
  },
  {
    totalBorrow: 91,
    borrowAPY: 91,
    date: "24 May",
  },
  {
    totalBorrow: 98,
    borrowAPY: 98,
    date: "24 May",
  },
  {
    totalBorrow: 105,
    borrowAPY: 105,
    date: "24 May",
  },
  {
    totalBorrow: 112,
    borrowAPY: 112,
    date: "3 May",
  },
  {
    totalBorrow: 120,
    borrowAPY: 120,
    date: "24 May",
  },
  {
    totalBorrow: 127,
    borrowAPY: 127,
    date: "24 May",
  },
  {
    totalBorrow: 132,
    borrowAPY: 132,
    date: "24 May",
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
    date: "1 May",
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
    date: "24 May",
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
    date: "24 May",
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
    date: "23 May",
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
    date: "24 May",
  },
  {
    totalBorrow: 132,
    borrowAPY: 132,
    date: "24 May",
  },
  {
    totalBorrow: 125,
    borrowAPY: 125,
    date: "31 May",
  },
  {
    totalBorrow: 118,
    borrowAPY: 118,
    date: "24 May",
  },
  {
    totalBorrow: 112,
    borrowAPY: 112,
    date: "5 May",
  },
  {
    totalBorrow: 105,
    borrowAPY: 105,
    date: "24 May",
  },
  {
    totalBorrow: 98,
    borrowAPY: 98,
    date: "24 May",
  },
  {
    totalBorrow: 91,
    borrowAPY: 91,
    date: "18 May",
  },
  {
    totalBorrow: 85,
    borrowAPY: 85,
    date: "24 May",
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
    date: "28 May",
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
    date: "24 May",
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
    date: "24 May",
  },
  {
    totalBorrow: 58,
    borrowAPY: 58,
    date: "24 May",
  },
  {
    totalBorrow: 51,
    borrowAPY: 51,
    date: "24 May",
  },
  {
    totalBorrow: 46,
    borrowAPY: 46,
    date: "26 May",
  },
  {
    totalBorrow: 39,
    borrowAPY: 39,
    date: "24 May",
  },
  {
    totalBorrow: 32,
    borrowAPY: 32,
    date: "24 May",
  },
  {
    totalBorrow: 42,
    borrowAPY: 42,
    date: "16 May",
  },
  {
    totalBorrow: 49,
    borrowAPY: 49,
    date: "24 May",
  },
  {
    totalBorrow: 57,
    borrowAPY: 57,
    date: "24 May",
  },
  {
    totalBorrow: 63,
    borrowAPY: 63,
    date: "13 May",
  },
  {
    totalBorrow: 70,
    borrowAPY: 70,
    date: "24 May",
  },
  {
    totalBorrow: 77,
    borrowAPY: 77,
    date: "24 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "17 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "24 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "24 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "21 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "24 May",
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
    date: "24 May",
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
    date: "23 May",
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
    date: "24 May",
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
    date: "24 May",
  },
  {
    totalBorrow: 59,
    borrowAPY: 59,
    date: "24 May",
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
    date: "24 May",
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
    date: "9 May",
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
    date: "24 May",
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
    date: "24 May",
  },
  {
    totalBorrow: 82,
    borrowAPY: 82,
    date: "24 May",
  },
  {
    totalBorrow: 82,
    borrowAPY: 82,
    date: "19 May",
  },
];

const ChartBorrow = () => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [dotY, setDotY] = useState<number>(0);
  const [dotX, setDotX] = useState<number>(0);

  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label text-sm md:text-base">{`${payload[0].payload.borrowAPY}%`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-xs md:text-sm leading-5  ">
            Borrow APY
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setIsLoadPage(true);
  }, []);
  const TotalTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label text-sm md:text-base">{`$${payload[0].payload.totalBorrow}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-xs md:text-sm leading-5">
            Total Borrow
          </p>
        </div>
      );
    }

    return null;
  };

  function tooltipSync(state: CategoricalChartState): void {
    if (state.isTooltipActive !== undefined) {
      setActiveTooltip(state.activeTooltipIndex);
    } else {
      setActiveTooltip(0);
    }
  }

  const CustomLine = (props: any) => (
    <svg
      x={props.points[0].x}
      y={dotY}
      width="1"
      height="160"
      viewBox="0 0 1 160"
    >
      <path
        d="M1.25 160.75L1.25 0.25"
        stroke="#282C2B"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </svg>
  );

  const CustomDot = (props: any) => {
    setDotY(props.cy);
    setDotX(props.cx);
    return (
      <circle
        cx={props.cx}
        cy={props.cy}
        r={8}
        stroke="#282C2B"
        style={{ opacity: "1" }}
        strokeWidth={4}
        fill={"#FFFFFF"}
      />
    );
  };

  return (
    <div className="relative">
      <div className="custom__scroll w-full flex-col pt-[63px] pb-[45px] lg:pb-[0px] relative custom__chart">
        <div className="min-w-[800px]">
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 180 : 88}
            className="mb-[30px] lg:mb-[0]"
          >
            <LineChart
              onMouseLeave={() =>
                setActiveTooltip((val: any) => (val = undefined))
              }
              syncId="marketCharSynch"
              onMouseMove={tooltipSync}
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <Tooltip
                position={{ y: -50 }}
                content={<ApyTooltip />}
                allowEscapeViewBox={{ y: true }}
                cursor={<CustomLine />}
              />
              <Line
                type="monotone"
                dataKey="totalBorrow"
                stroke="#00E0FF"
                strokeWidth={3}
                dot={false}
                activeDot={<CustomDot />}
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 130 : 85}
            className="custom__chart__bar"
          >
            <BarChart
              onMouseLeave={() =>
                setActiveTooltip((val: any) => (val = undefined))
              }
              syncId="marketCharSynch"
              data={data}
              onMouseMove={tooltipSync}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Tooltip
                cursor={false}
                allowEscapeViewBox={{ y: true }}
                content={<TotalTooltip />}
                position={{ y: -50 }}
              />
              <Bar dataKey="totalBorrow" radius={[3, 3, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={activeTooltip === index ? "#00E0FF" : "#282C2B"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {activeTooltip !== undefined ? (
            <div
              style={{ left: Math.round(dotX) < 50 ? 25 : Math.round(dotX) }}
              className="absolute translate-x-[-50%] text-[#ADB5B3] text-xs font-medium whitespace-nowrap bottom-[20px] block md:hidden pr-[10px]"
            >
              {activeTooltip !== undefined && data[activeTooltip].date}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {activeTooltip !== undefined ? (
        <div
          style={{ left: Math.round(dotX) }}
          className="absolute translate-x-[-50%] text-[#ADB5B3] text-xs font-medium bottom-[-30px] whitespace-nowrap hidden md:block"
        >
          {activeTooltip !== undefined && data[activeTooltip].date}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChartBorrow;
