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
import { IDataSupplyDot } from "./tokenChart";

const ChartSupply = ({ data }: { data: IDataSupplyDot[] }) => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [minMaxTotal, setMinMaxTotal] = useState<any>({ min: 0, max: 0 });
  const [dotY, setDotY] = useState<number>(0);
  const [dotX, setDotX] = useState<number>(0);
  const [barTooltip, setBarTooltip] = useState<any>({ value: "", x: 0, y: 0 });
  const [barTooltipEn, setBarTooltipEn] = useState<boolean>(false);

  const [chartContainerWidth, setChartContainerWidth] = useState<number>(0);
  const chartRef = useRef<HTMLDivElement>(null);

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
        <div className="text-center w-fit">
          <p className="label text-sm md:text-base mb-0">{`${payload[0].payload.supplyAPY}%`}</p>
          <p className="text-[#818987] font-nova font-normal text-xs md:text-sm leading-5  ">
            Supply APY
          </p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    setIsLoadPage(true);
    setMinMaxTotal({
      min: Number(
        data.sort((a: any, b: any) => a.totalSupply - b.totalSupply)[0]
          .totalSupply
      ),
      max: Number(
        data.sort((a: any, b: any) => a.totalSupply - b.totalSupply)[
          data.length - 1
        ].totalSupply
      ),
    });
  }, [data]);

  function tooltipSync(state: CategoricalChartState): void {
    setBarTooltipEn(true);
    if (state?.activePayload && state?.activePayload[0]) {
      setBarTooltip({
        value: state.activePayload[0].payload.totalSupply,
        x: state.chartX,
        y:
          state.activePayload[0].payload.totalSupply == 0
            ? 15
            : (
                (((Number(state.activePayload[0].payload.totalSupply) * 100) /
                  minMaxTotal.max -
                  minMaxTotal.min) *
                  (window.innerWidth > 768 ? 130 : 85)) /
                100
              ).toFixed(0),
      });
    }
    if (state.isTooltipActive !== undefined) {
      setActiveTooltip(state.activeTooltipIndex);
    } else {
      setActiveTooltip(0);
    }
  }

  const tooltipOverflowBlock = useCallback(
    function () {
      if (dotX < 50) {
        return 10;
      }

      if (dotX > chartContainerWidth - 60) {
        return dotX - 80;
      }

      return dotX - 30;
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
      x={props.points[0].x}
      y={dotY}
      width="1"
      height="325"
      viewBox="0 0 1 325"
      fill="none"
    >
      <rect width="1" height="5" fill="#282C2B" />
      <rect y="10" width="1" height="5" fill="#282C2B" />
      <rect y="21" width="1" height="5" fill="#282C2B" />
      <rect y="31" width="1" height="5" fill="#282C2B" />
      <rect y="41" width="1" height="5" fill="#282C2B" />
      <rect y="51" width="1" height="5" fill="#282C2B" />
      <rect y="62" width="1" height="5" fill="#282C2B" />
      <rect y="72" width="1" height="5" fill="#282C2B" />
      <rect y="83" width="1" height="5" fill="#282C2B" />
      <rect y="93" width="1" height="5" fill="#282C2B" />
      <rect y="104" width="1" height="5" fill="#282C2B" />
      <rect y="114" width="1" height="5" fill="#282C2B" />
      <rect y="124" width="1" height="5" fill="#282C2B" />
      <rect y="134" width="1" height="5" fill="#282C2B" />
      <rect y="145" width="1" height="5" fill="#282C2B" />
      <rect y="155" width="1" height="5" fill="#282C2B" />
      <rect y="165" width="1" height="5" fill="#282C2B" />
      <rect y="175" width="1" height="5" fill="#282C2B" />
      <rect y="186" width="1" height="5" fill="#282C2B" />
      <rect y="196" width="1" height="5" fill="#282C2B" />
      <rect y="206" width="1" height="5" fill="#282C2B" />
      <rect y="216" width="1" height="5" fill="#282C2B" />
      <rect y="227" width="1" height="5" fill="#282C2B" />
      <rect y="237" width="1" height="5" fill="#282C2B" />
      <rect y="248" width="1" height="5" fill="#282C2B" />
      <rect y="258" width="1" height="5" fill="#282C2B" />
      <rect y="269" width="1" height="5" fill="#282C2B" />
      <rect y="279" width="1" height="5" fill="#282C2B" />
      <rect y="289" width="1" height="5" fill="#282C2B" />
      <rect y="299" width="1" height="5" fill="#282C2B" />
      <rect y="310" width="1" height="5" fill="#282C2B" />
      <rect y="320" width="1" height="5" fill="#282C2B" />
    </svg>
  );

  const CustomDot = (props: any) => {
    debounce(setDotX, props.cx, 60);
    setDotY(props.cy);
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
      <div className="custom__scroll !overflow-y-hidden w-full flex-col pt-[40px] md:pt-[63px] pb-[45px] lg:pb-[0px] relative custom__chart">
        <div
          ref={chartRef}
          className="min-w-[800px] relative"
          onMouseLeave={() => setActiveTooltip((val: any) => (val = undefined))}
        >
          {barTooltipEn && (
            <div
              className={`pointer-events-none text-center w-fit absolute z-10 bottom-0 left-0`}
              style={{
                transform: `translate(calc(${tooltipOverflowBlock()}px), -${
                  barTooltip.y
                }px)`,
              }}
            >
              <p className="label text-sm md:text-base mb-0">
                ${barTooltip.value}
              </p>
              <p className="text-[#818987] font-nova font-normal text-xs md:text-sm leading-5  ">
                Total Supply
              </p>
            </div>
          )}
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 180 : 88}
          >
            <LineChart
              syncId="marketCharSynch"
              onMouseMove={tooltipSync}
              onMouseLeave={() => setBarTooltipEn(false)}
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <Tooltip
                position={{
                  x: tooltipOverflowBlock(),
                  y: dotY - (window.innerWidth > 768 ? 60 : 50),
                }}
                content={<ApyTooltip />}
                cursor={window.innerWidth > 768 ? <CustomLine /> : false}
              />
              <Line
                type="monotone"
                dataKey="supplyAPY"
                stroke="#14F195"
                strokeWidth={3}
                dot={false}
                activeDot={<CustomDot />}
              />
              <YAxis tickCount={1} hide={true} />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={50}>
            <LineChart
              syncId="marketCharSynch"
              onMouseMove={tooltipSync}
              onMouseLeave={() => setBarTooltipEn(false)}
              data={data}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Tooltip content={<></>} cursor={false} />
              <Line
                activeDot={false}
                dataKey="supplyAPY"
                stroke="transparent"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer
            width="100%"
            height={isLoadPage && window.innerWidth > 768 ? 130 : 85}
            className="custom__chart__bar"
          >
            <BarChart
              syncId="marketCharSynch"
              data={data}
              onMouseMove={tooltipSync}
              onMouseLeave={() => setBarTooltipEn(false)}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Tooltip content={<></>} cursor={false} />

              <Bar
                dataKey="totalSupply"
                radius={[3, 3, 0, 0]}
                minPointSize={10}
              >
                {data.map((entry: IDataSupplyDot, index: number) => (
                  <Cell
                    key={index}
                    fill={activeTooltip === index ? "#14F195" : "#282C2B"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {activeTooltip !== undefined ? (
            <div
              style={{ left: Math.round(dotX) < 50 ? 25 : Math.round(dotX) }}
              className="absolute translate-x-[-50%] text-[#ADB5B3] text-xs font-medium whitespace-nowrap bottom-[-20px] block md:hidden pr-[10px]"
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

export default ChartSupply;
