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
} from "recharts";
import { IDataSupplyDot } from "./tokenChart";

const ChartSupply = ({ data }: { data: IDataSupplyDot[] }) => {
  const [activeTooltip, setActiveTooltip] =
    useState<number | undefined>(undefined);
  const [isLoadPage, setIsLoadPage] = useState<boolean>(false);

  const [dotY, setDotY] = useState<number>(0);
  const [dotX, setDotX] = useState<number>(0);
  //STF chart gap variable
  const chartGap: number = window.innerWidth > 768 ? 50 : 0;

  const [chartConteinerWidth, setChartConteinerWidth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (chartRef.current) {
      setChartConteinerWidth(chartRef.current.offsetWidth);
    }
  }, []);
  const ApyTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit bg-[#0D0D0D]">
          <p className="label text-sm md:text-base">{`${payload[0].payload.supplyAPY}%`}</p>
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
  }, [data]);

  const TotalTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="text-center w-fit bg-[#0D0D0D]">
          <p className="label text-sm md:text-base">{`$${payload[0].payload.totalSupply}`}</p>
          <p className="text-[#818987] font-nova font-normal text-xs md:text-sm leading-5">
            Total Supply
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
        return 10;
      }

      if (dotX > chartConteinerWidth - 70) {
        return dotX - 90;
      }

      return dotX - 30;
    },
    [chartConteinerWidth, dotX]
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
      y={dotY - chartGap || ""}
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
    setDotY(props.cy || "");
    console.log(dotY);
    return (
      <circle
        cx={props.cx || 0}
        //Stf чтобы компенсировать смешение графика
        cy={props.cy - chartGap || 0}
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
      <div className="custom__scroll !overflow-y-hidden w-full flex-col pt-[30px] md:pt-[63px] pb-[45px] lg:pb-[0px] relative custom__chart">
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
              data={data.map((item: IDataSupplyDot) => ({
                ...item,
                totalSupply: parseInt(item.totalSupply),
                supplyAPY: parseInt(item.supplyAPY),
              }))}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <Tooltip
                animationDuration={500}
                position={{
                  x: tooltipOverflowBlock(),
                  y:
                    window.innerWidth > 768
                      ? dotY < 70
                        ? -40
                        : dotY - (chartGap + 70)
                      : dotY < 90
                      ? 20
                      : dotY - (chartGap + 70) / 2,
                }}
                content={<ApyTooltip />}
                cursor={<CustomLine />}
              />
              <Line
                type="monotone"
                dataKey="supplyAPY"
                stroke="#14F195"
                strokeWidth={3}
                dot={false}
                activeDot={<CustomDot />}
                //SFT смешаем график как ты говорил чтобы было пространство и оставаолсь активным
                className={`[&>*]:translate-y-[-50px]`}
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
              data={data.map((item: IDataSupplyDot) => ({
                ...item,
                totalSupply: parseInt(item.totalSupply),
                supplyAPY: parseInt(item.supplyAPY),
              }))}
              onMouseMove={tooltipSync}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Tooltip
                animationDuration={500}
                position={{
                  x: tooltipOverflowBlock(),
                  y:
                    window.innerWidth > 768
                      ? dotY < 100
                        ? dotY - 100
                        : dotY - 175
                      : dotY < 100
                      ? -10
                      : dotY - (chartGap + 150) / 2,
                }}
                cursor={false}
                content={<TotalTooltip />}
              />
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

export default ChartSupply;
