import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import TokenInterestRateEmpty from "./tokenInterestRateEmpty";

function TokenInterestRate({ data }: { data: any[] }) {
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
        <div className="bg-[#282C2B] p-[10px] z-10 relative block">
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

  return data.length ? (
    <div className="font-nova w-full mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[20px] text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] p-[15px] md:p-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="h-[200px] md:h-[390px] pb-[0px] pr-[10px] pl-[10px] md:pl-[30px] md:pr-[30px] flex flex-col items-end justify-start">
          <div className="relative w-full h-full">
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
            <div
              style={{
                left: `calc(3px + ${
                  data.find((item: any) => item.isCurrent)?.aa
                }%)`,
              }}
              className="absolute flex flex-col items-center top-[12px] md:top-[31px] md:left-[50px] translate-x-[-50%] pointer-events-none z-2"
            >
              <span className="w-[2px] h-[50px] bg-[#282C2B]"></span>
              <span className="font-nova text-base text-white">Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TokenInterestRateEmpty />
  );
}

export default TokenInterestRate;
