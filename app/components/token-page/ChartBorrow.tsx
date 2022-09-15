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

const ChartBorrow = ({ data }: { data: object[] }) => {
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
              {data[activeTooltip]?.date}
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
          {data[activeTooltip]?.date}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChartBorrow;
