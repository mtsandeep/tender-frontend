/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useState } from "react";
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
  },
  {
    totalBorrow: 96,
    borrowAPY: 96,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 84,
    borrowAPY: 84,
  },
  {
    totalBorrow: 91,
    borrowAPY: 91,
  },
  {
    totalBorrow: 98,
    borrowAPY: 98,
  },
  {
    totalBorrow: 105,
    borrowAPY: 105,
  },
  {
    totalBorrow: 112,
    borrowAPY: 112,
  },
  {
    totalBorrow: 120,
    borrowAPY: 120,
  },
  {
    totalBorrow: 127,
    borrowAPY: 127,
  },
  {
    totalBorrow: 132,
    borrowAPY: 132,
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
  },
  {
    totalBorrow: 137,
    borrowAPY: 137,
  },
  {
    totalBorrow: 132,
    borrowAPY: 132,
  },
  {
    totalBorrow: 125,
    borrowAPY: 125,
  },
  {
    totalBorrow: 118,
    borrowAPY: 118,
  },
  {
    totalBorrow: 112,
    borrowAPY: 112,
  },
  {
    totalBorrow: 105,
    borrowAPY: 105,
  },
  {
    totalBorrow: 98,
    borrowAPY: 98,
  },
  {
    totalBorrow: 91,
    borrowAPY: 91,
  },
  {
    totalBorrow: 85,
    borrowAPY: 85,
  },
  {
    totalBorrow: 78,
    borrowAPY: 78,
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
  },
  {
    totalBorrow: 58,
    borrowAPY: 58,
  },
  {
    totalBorrow: 51,
    borrowAPY: 51,
  },
  {
    totalBorrow: 46,
    borrowAPY: 46,
  },
  {
    totalBorrow: 39,
    borrowAPY: 39,
  },
  {
    totalBorrow: 32,
    borrowAPY: 32,
  },
  {
    totalBorrow: 42,
    borrowAPY: 42,
  },
  {
    totalBorrow: 49,
    borrowAPY: 49,
  },
  {
    totalBorrow: 57,
    borrowAPY: 57,
  },
  {
    totalBorrow: 63,
    borrowAPY: 63,
  },
  {
    totalBorrow: 70,
    borrowAPY: 70,
  },
  {
    totalBorrow: 77,
    borrowAPY: 77,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 87,
    borrowAPY: 87,
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
  },
  {
    totalBorrow: 59,
    borrowAPY: 59,
  },
  {
    totalBorrow: 65,
    borrowAPY: 65,
  },
  {
    totalBorrow: 72,
    borrowAPY: 72,
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
  },
  {
    totalBorrow: 80,
    borrowAPY: 80,
  },
  {
    totalBorrow: 82,
    borrowAPY: 82,
  },
  {
    totalBorrow: 82,
    borrowAPY: 82,
  },
];

const ChartBorrow = () => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);

  const [dotY, setDotY] = useState<string | number>(0);

  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label text-[14px] md:text-[16px]">{`${payload[0].payload.borrowAPY}%`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-[12px] md:text-[14px] leading-5  ">
            Borrow APY
          </p>
        </div>
      );
    }

    return null;
  };

  const TotalTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label text-[14px] md:text-[16px]">{`$${payload[0].payload.totalBorrow}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-[12px] md:text-[14px] leading-5">
            Total Borrow
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
      height="200"
      viewBox="0 0 1 200"
    >
      <path
        d="M1.25 543.75L1.25 0.25"
        stroke="#282C2B"
        strokeWidth="2"
        strokeDasharray="6 6"
      />
    </svg>
  );

  const CustomDot = (props: any) => {
    setDotY(props.cy);
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
    <div className="custom__scroll min-h-[350px] w-full flex-col pt-[63px] pb-[50px] md:pb-[0px] relative custom__chart">
      <div className="min-w-[800px]">
        <ResponsiveContainer width="100%" height={180}>
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
          height={130}
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
      </div>
    </div>
  );
};

export default ChartBorrow;
