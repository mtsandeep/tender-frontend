/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useState } from "react";
import { CategoricalChartState } from "recharts/types/chart/generateCategoricalChart";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/src/component/DefaultTooltipContent";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    totalSupply: 450,
    supplyAPY: 450 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 523,
    supplyAPY: 523 / 2,
  },
  {
    totalSupply: 234,
    supplyAPY: 234 / 2,
  },
  {
    totalSupply: 124,
    supplyAPY: 124 / 2,
  },
  {
    totalSupply: 125,
    supplyAPY: 125 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 333,
    supplyAPY: 333 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 223,
    supplyAPY: 223 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 367,
    supplyAPY: 367 / 2,
  },
  {
    totalSupply: 143,
    supplyAPY: 143 / 2,
  },
  {
    totalSupply: 745,
    supplyAPY: 745 / 2,
  },
  {
    totalSupply: 234,
    supplyAPY: 234 / 2,
  },
  {
    totalSupply: 422,
    supplyAPY: 422 / 2,
  },
  {
    totalSupply: 432,
    supplyAPY: 432 / 2,
  },
  {
    totalSupply: 452,
    supplyAPY: 452 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 352,
    supplyAPY: 352 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 523,
    supplyAPY: 523 / 2,
  },
  {
    totalSupply: 234,
    supplyAPY: 234 / 2,
  },
  {
    totalSupply: 124,
    supplyAPY: 124 / 2,
  },
  {
    totalSupply: 125,
    supplyAPY: 125 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 333,
    supplyAPY: 333 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 223,
    supplyAPY: 223 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 431,
    supplyAPY: 431 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 423,
    supplyAPY: 423 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
  {
    totalSupply: 444,
    supplyAPY: 444 / 2,
  },
  {
    totalSupply: 324,
    supplyAPY: 324 / 2,
  },
  {
    totalSupply: 542,
    supplyAPY: 542 / 2,
  },
  {
    totalSupply: 349,
    supplyAPY: 349 / 2,
  },
  {
    totalSupply: 429,
    supplyAPY: 429 / 2,
  },
  {
    totalSupply: 239,
    supplyAPY: 239 / 2,
  },
  {
    totalSupply: 288,
    supplyAPY: 288 / 2,
  },
  {
    totalSupply: 420,
    supplyAPY: 420 / 2,
  },
  {
    totalSupply: 394,
    supplyAPY: 394 / 2,
  },
  {
    totalSupply: 487,
    supplyAPY: 487 / 2,
  },
  {
    totalSupply: 382,
    supplyAPY: 382 / 2,
  },
  {
    totalSupply: 396,
    supplyAPY: 396 / 2,
  },
  {
    totalSupply: 124,
    supplyAPY: 124 / 2,
  },
  {
    totalSupply: 125,
    supplyAPY: 125 / 2,
  },
  {
    totalSupply: 412,
    supplyAPY: 412 / 2,
  },
  {
    totalSupply: 333,
    supplyAPY: 333 / 2,
  },
  {
    totalSupply: 123,
    supplyAPY: 123 / 2,
  },
];

const chartColor: string = "#14F195";

const Chart = () => {
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
          <p className="label">{`${payload[0].payload.supplyAPY}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-sm leading-5  ">
            Sypply APY
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
          <p className="label">{`${payload[0].payload.totalSupply}`}</p>
          <p className="text-[#818987] font-[ProximaNova] font-normal text-sm leading-5">
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

  const СustomDot = (props: any) => {
    console.log(props);
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
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <Tooltip
            position={{ x: Number(dotX) - 35, y: -47 }}
            content={<ApyTooltip />}
            allowEscapeViewBox={{ y: true }}
            cursor={<CustomLine />}
          />
          <Line
            type="monotone"
            dataKey="totalSupply"
            stroke={chartColor}
            strokeWidth={3}
            dot={false}
            activeDot={<СustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          onMouseLeave={() => setActiveTooltip((val) => (val = undefined))}
          syncId="marketCharSynch"
          data={data}
          onMouseMove={tooltipSync}
        >
          <Tooltip
            cursor={false}
            allowEscapeViewBox={{ y: true }}
            content={<TotalTooltip />}
            position={{ x: Number(dotX) - 35, y: -30 }}
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
  );
};

export default Chart;
