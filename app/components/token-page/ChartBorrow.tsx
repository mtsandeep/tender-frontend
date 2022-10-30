/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
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
  YAxis,
} from "recharts";
import { IDataBorrowDot } from "./tokenChart";

const ChartBorrow = ({ data }: { data: IDataBorrowDot[] }) => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [dotY, setDotY] = useState<number>(0);
  const [dotX, setDotX] = useState<number>(0);

  const [chartContainerWidth, setChartContainerWidth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  const maxNumber = Math.max(...data.map((a) => parseInt(a.totalBorrow)));

  useLayoutEffect(() => {
    if (chartRef.current) {
      setChartContainerWidth(chartRef.current.offsetWidth);
    }
  }, []);
  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center px-[10px] pb-[5px] rounded w-fit">
          <p className="label text-sm md:text-base">{`${payload[0].payload.borrowAPY}%`}</p>
          <p className="text-[#818987] font-nova font-normal text-xs md:text-sm leading-5  ">
            Borrow APY
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setIsLoadPage(true);
  }, [data]);

  const TotalTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center px-[10px] pb-[5px] rounded w-fit">
          <p className="label text-sm md:text-base">{`$${payload[0].payload.totalBorrow}`}</p>
          <p className="text-[#818987] font-nova font-normal text-xs md:text-sm leading-5">
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

  const tooltipOverflowBlock = useCallback(
    function () {
      if (dotX < 50) {
        return 15;
      }

      if (dotX > chartContainerWidth - 90) {
        return dotX - 110;
      }

      return dotX - 47;
    },
    [chartContainerWidth, dotX]
  );

  function debounce(func: any, state: any, delay: number) {
    let positionDebounce: any;

    clearTimeout(positionDebounce);

    positionDebounce = setTimeout(() => {
      func(state);
    }, delay);
  }

  const CustomLine = (props: any) => (
    <svg
      x={props.points[0].x || ""}
      y={dotY || ""}
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
    debounce(setDotX, props.cx || "", 60);
    debounce(setDotY, props.cy || "", 60);
    return (
      <circle
        cx={props.cx || 0}
        cy={props.cy || 0}
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
      <div className="custom__scroll h-auto !overflow-y-hidden w-full flex-col pt-[30px] md:pt-[63px] pb-[45px] lg:pb-[0px] relative custom__chart">
        <div
          ref={chartRef}
          className="min-w-[800px]"
          onMouseLeave={() => setActiveTooltip((val: any) => (val = undefined))}
        >
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 180 : 88}
            className="mb-[30px] lg:mb-[0]"
          >
            <LineChart
              syncId="marketCharSynch"
              onMouseMove={tooltipSync}
              data={data.map((item: IDataBorrowDot) => ({
                ...item,
                totalBorrow: parseInt(item.totalBorrow),
                borrowAPY: parseInt(item.borrowAPY),
              }))}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <YAxis tickCount={1} hide={true} />
              <Tooltip
                animationDuration={500}
                position={{
                  x: tooltipOverflowBlock(),
                  y:
                    window.innerWidth > 768
                      ? dotY < 70
                        ? -40
                        : dotY - 70
                      : dotY < 90
                      ? 20
                      : dotY - 70 / 2,
                }}
                content={<ApyTooltip />}
                cursor={<CustomLine />}
              />
              <Line
                type="monotone"
                dataKey="borrowAPY"
                stroke="#00E0FF"
                strokeWidth={3}
                dot={false}
                activeDot={<CustomDot />}
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 160 : 85}
            className="custom__chart__bar"
          >
            <BarChart
              syncId="marketCharSynch"
              data={data.map((item: IDataBorrowDot) => ({
                ...item,
                totalBorrow: parseInt(item.totalBorrow),
                borrowAPY: parseInt(item.borrowAPY),
              }))}
              onMouseMove={tooltipSync}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <YAxis hide={true} domain={[20, maxNumber + maxNumber * 0.3]} />
              <YAxis tickCount={1} hide={true} />
              <Tooltip
                animationDuration={500}
                position={{
                  x: tooltipOverflowBlock(),
                  y:
                    window.innerWidth > 768
                      ? dotY < 100
                        ? dotX < 100 || dotX < chartContainerWidth - 100
                          ? dotY + 50
                          : dotY
                        : dotY - 150
                      : dotY < 100
                      ? -10
                      : dotY - 150 / 2,
                }}
                cursor={false}
                content={<TotalTooltip />}
              />
              <Bar
                dataKey="totalBorrow"
                radius={[3, 3, 0, 0]}
                minPointSize={10}
              >
                {data.map((entry: IDataBorrowDot, index: number) => (
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
          className="absolute translate-x-[-70%] text-[#ADB5B3] text-xs font-medium bottom-[-30px] whitespace-nowrap hidden md:block"
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
