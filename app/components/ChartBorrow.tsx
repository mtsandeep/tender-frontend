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
    totalBorrow: 450,
    borrowAPY: 450 / 2,
  },
  {
    totalBorrow: 450,
    borrowAPY: 450 / 2,
  },
  {
    totalBorrow: 450,
    borrowAPY: 450 / 2,
  },
  {
    totalBorrow: 450,
    borrowAPY: 450 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 523,
    borrowAPY: 523 / 2,
  },
  {
    totalBorrow: 234,
    borrowAPY: 234 / 2,
  },
  {
    totalBorrow: 124,
    borrowAPY: 124 / 2,
  },
  {
    totalBorrow: 125,
    borrowAPY: 125 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 333,
    borrowAPY: 333 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 223,
    borrowAPY: 223 / 2,
  },
  {
    totalBorrow: 450,
    borrowAPY: 450 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 523,
    borrowAPY: 523 / 2,
  },
  {
    totalBorrow: 234,
    borrowAPY: 234 / 2,
  },
  {
    totalBorrow: 124,
    borrowAPY: 124 / 2,
  },
  {
    totalBorrow: 125,
    borrowAPY: 125 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 333,
    borrowAPY: 333 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 223,
    borrowAPY: 223 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 367,
    borrowAPY: 367 / 2,
  },
  {
    totalBorrow: 143,
    borrowAPY: 143 / 2,
  },
  {
    totalBorrow: 745,
    borrowAPY: 745 / 2,
  },
  {
    totalBorrow: 234,
    borrowAPY: 234 / 2,
  },
  {
    totalBorrow: 422,
    borrowAPY: 422 / 2,
  },
  {
    totalBorrow: 432,
    borrowAPY: 432 / 2,
  },
  {
    totalBorrow: 452,
    borrowAPY: 452 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 352,
    borrowAPY: 352 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 523,
    borrowAPY: 523 / 2,
  },
  {
    totalBorrow: 234,
    borrowAPY: 234 / 2,
  },
  {
    totalBorrow: 124,
    borrowAPY: 124 / 2,
  },
  {
    totalBorrow: 125,
    borrowAPY: 125 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 333,
    borrowAPY: 333 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 223,
    borrowAPY: 223 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 431,
    borrowAPY: 431 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 423,
    borrowAPY: 423 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
  {
    totalBorrow: 444,
    borrowAPY: 444 / 2,
  },
  {
    totalBorrow: 324,
    borrowAPY: 324 / 2,
  },
  {
    totalBorrow: 542,
    borrowAPY: 542 / 2,
  },
  {
    totalBorrow: 349,
    borrowAPY: 349 / 2,
  },
  {
    totalBorrow: 429,
    borrowAPY: 429 / 2,
  },
  {
    totalBorrow: 239,
    borrowAPY: 239 / 2,
  },
  {
    totalBorrow: 288,
    borrowAPY: 288 / 2,
  },
  {
    totalBorrow: 420,
    borrowAPY: 420 / 2,
  },
  {
    totalBorrow: 394,
    borrowAPY: 394 / 2,
  },
  {
    totalBorrow: 487,
    borrowAPY: 487 / 2,
  },
  {
    totalBorrow: 382,
    borrowAPY: 382 / 2,
  },
  {
    totalBorrow: 396,
    borrowAPY: 396 / 2,
  },
  {
    totalBorrow: 124,
    borrowAPY: 124 / 2,
  },
  {
    totalBorrow: 125,
    borrowAPY: 125 / 2,
  },
  {
    totalBorrow: 412,
    borrowAPY: 412 / 2,
  },
  {
    totalBorrow: 333,
    borrowAPY: 333 / 2,
  },
  {
    totalBorrow: 123,
    borrowAPY: 123 / 2,
  },
];

const chartColor: string = "#00E0FF";

const ChartBorrow = () => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);

  const [dotY, setDotY] = useState<string | number>(0);
  const [dotX, setDotX] = useState<string | number>(0);

  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit">
          <p className="label">{`${payload[0].payload.borrowAPY}%`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-sm leading-5  ">
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
          <p className="label">{`$${payload[0].payload.totalBorrow}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-sm leading-5">
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
      height="544"
      viewBox="0 0 1 544"
    >
      <path
        d="M1.25 543.75L1.25 0.25"
        stroke="#282C2B"
        stroke-width="2"
        stroke-dasharray="6 6"
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
    <div className="min-h-[350px] w-full flex-col pt-[73px] relative">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          onMouseLeave={() => setActiveTooltip((val) => (val = undefined))}
          syncId="marketCharSynch"
          onMouseMove={tooltipSync}
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 50 }}
        >
          <Tooltip
            position={{ x: Number(dotX) - 35, y: -47 }}
            content={<ApyTooltip />}
            allowEscapeViewBox={{ y: true }}
            cursor={<CustomLine />}
          />
          <Line
            type="monotone"
            dataKey="totalBorrow"
            stroke={chartColor}
            strokeWidth={3}
            dot={false}
            activeDot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          onMouseLeave={() => setActiveTooltip((val) => (val = undefined))}
          syncId="marketCharSynch"
          data={data}
          onMouseMove={tooltipSync}
          margin={{ top: 30, bottom: 60 }}
        >
          <Tooltip
            cursor={false}
            allowEscapeViewBox={{ y: true }}
            content={<TotalTooltip />}
            position={{ x: Number(dotX) - 35, y: -30 }}
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
  );
};

export default ChartBorrow;
