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
    totalSupply: 96,
    supplyAPY: 96,
  },
  {
    totalSupply: 96,
    supplyAPY: 96,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 84,
    supplyAPY: 84,
  },
  {
    totalSupply: 91,
    supplyAPY: 91,
  },
  {
    totalSupply: 98,
    supplyAPY: 98,
  },
  {
    totalSupply: 105,
    supplyAPY: 105,
  },
  {
    totalSupply: 112,
    supplyAPY: 112,
  },
  {
    totalSupply: 120,
    supplyAPY: 120,
  },
  {
    totalSupply: 127,
    supplyAPY: 127,
  },
  {
    totalSupply: 132,
    supplyAPY: 132,
  },
  {
    totalSupply: 137,
    supplyAPY: 137,
  },
  {
    totalSupply: 137,
    supplyAPY: 137,
  },
  {
    totalSupply: 137,
    supplyAPY: 137,
  },
  {
    totalSupply: 137,
    supplyAPY: 137,
  },
  {
    totalSupply: 137,
    supplyAPY: 137,
  },
  {
    totalSupply: 132,
    supplyAPY: 132,
  },
  {
    totalSupply: 125,
    supplyAPY: 125,
  },
  {
    totalSupply: 118,
    supplyAPY: 118,
  },
  {
    totalSupply: 112,
    supplyAPY: 112,
  },
  {
    totalSupply: 105,
    supplyAPY: 105,
  },
  {
    totalSupply: 98,
    supplyAPY: 98,
  },
  {
    totalSupply: 91,
    supplyAPY: 91,
  },
  {
    totalSupply: 85,
    supplyAPY: 85,
  },
  {
    totalSupply: 78,
    supplyAPY: 78,
  },
  {
    totalSupply: 72,
    supplyAPY: 72,
  },
  {
    totalSupply: 65,
    supplyAPY: 65,
  },
  {
    totalSupply: 58,
    supplyAPY: 58,
  },
  {
    totalSupply: 51,
    supplyAPY: 51,
  },
  {
    totalSupply: 46,
    supplyAPY: 46,
  },
  {
    totalSupply: 39,
    supplyAPY: 39,
  },
  {
    totalSupply: 32,
    supplyAPY: 32,
  },
  {
    totalSupply: 42,
    supplyAPY: 42,
  },
  {
    totalSupply: 49,
    supplyAPY: 49,
  },
  {
    totalSupply: 57,
    supplyAPY: 57,
  },
  {
    totalSupply: 63,
    supplyAPY: 63,
  },
  {
    totalSupply: 70,
    supplyAPY: 70,
  },
  {
    totalSupply: 77,
    supplyAPY: 77,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 87,
    supplyAPY: 87,
  },
  {
    totalSupply: 80,
    supplyAPY: 80,
  },
  {
    totalSupply: 72,
    supplyAPY: 72,
  },
  {
    totalSupply: 65,
    supplyAPY: 65,
  },
  {
    totalSupply: 59,
    supplyAPY: 59,
  },
  {
    totalSupply: 65,
    supplyAPY: 65,
  },
  {
    totalSupply: 72,
    supplyAPY: 72,
  },
  {
    totalSupply: 80,
    supplyAPY: 80,
  },
  {
    totalSupply: 80,
    supplyAPY: 80,
  },
  {
    totalSupply: 82,
    supplyAPY: 82,
  },
  {
    totalSupply: 82,
    supplyAPY: 82,
  },
];

const ChartSupply = () => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [dotY, setDotY] = useState<number>(0);
  // const [dotX, setDotX] = useState<number>(0);

  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label text-sm md:text-base">{`${payload[0].payload.supplyAPY}%`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-xs md:text-sm leading-5  ">
            Supply APY
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
          <p className="label text-sm md:text-base">{`$${payload[0].payload.totalSupply}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-xs md:text-sm leading-5">
            Total Supply
          </p>
        </div>
      );
    }

    return null;
  };

  function tooltipSync(state: CategoricalChartState): void {
    if (state.isTooltipActive) {
      setActiveTooltip(state.activeTooltipIndex);
    } else {
      setActiveTooltip(undefined);
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
    // setDotX(props.cx);
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
                dataKey="totalSupply"
                stroke="#14F195"
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
              <Bar dataKey="totalSupply" radius={[3, 3, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={activeTooltip === index ? "#14F195" : "#282C2B"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <div
        style={{ left: Math.round(dotX) }}
        className="absolute translate-x-[-50%] text-[#ADB5B3] text-xs font-medium bottom-[-30px]"
      >
        May 24
      </div> */}
    </div>
  );
};

export default ChartSupply;
