import { useEffect, useState } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer, YAxis } from "recharts";
import TokenInterestRateEmpty from "./tokenInterestRateEmpty";
import Text from "react-svg-text";
import * as math from "mathjs";

function TokenInterestRate({ data }: { data: any[] }) {
  const [isCurrentInd, setIsCurrentInd] = useState<number>(0);
  const [isOptimalInd, setIsOptimalInd] = useState<number>(0);
  const [actData, setActData] = useState<any[]>([]);

  useEffect(() => {
    setActData(
      data.map((item) => ({
        ...item,
        aa:
          Math.trunc(
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
            )
          ) * 1.2,
        aaValue: item.aa,
      }))
    );

    setIsCurrentInd(data.indexOf(data.find((item) => item.isCurrent)));
    setIsOptimalInd(data.indexOf(data.find((item) => item.isOptimal)));
  }, [data]);

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

    const fixedString = (str: string | number) =>
      math.format(Number(str), {
        notation: "fixed",
        precision: 2,
      });

    const checkBgTop = (value: string) => {
      switch (value.length) {
        case 8:
          return <path d="M0 0H81V20H1V0Z" fill="#0d0d0d" />;
        case 7:
          return <path d="M0 0H80V20H0V0Z" fill="#0d0d0d" />;
        case 6:
          return <path d="M0 0H75V20H7V0Z" fill="#0d0d0d" />;
        case 5:
          return <path d="M0 0H67V20H13V0Z" fill="#0d0d0d" />;
        case 4:
          return <path d="M0 0H67V20H13V0Z" fill="#0d0d0d" />;
        case 3:
          return <path d="M0 0H58V20H22V0Z" fill="#0d0d0d" />;
        default:
          return <path d="M0 0H58V20H22V0Z" fill="#0d0d0d" />;
      }
    };
    const checkBgDown = (value: string) => {
      switch (value.length) {
        case 8:
          return <path d="M0 24H80V44H0V24Z" fill="#0d0d0d" />;
        case 7:
          return <path d="M0 24H80V44H0V24Z" fill="#0d0d0d" />;
        case 6:
          return <path d="M0 24H72V44H7V24Z" fill="#0d0d0d" />;
        case 5:
          return <path d="M0 24H62V44H17V24Z" fill="#0d0d0d" />;
        case 4:
          return <path d="M0 24H62V44H17V24Z" fill="#0d0d0d" />;
        case 3:
          return <path d="M0 24H56V44H24V24Z" fill="#0d0d0d" />;
        default:
          return <path d="M0 24H56V44H24V24Z" fill="#0d0d0d" />;
      }
    };

    const checkPos = (value: string) => {
      switch (value.length) {
        case 8:
          return 12;
        case 7:
          return 18;
        case 6:
          return 14;
        case 5:
          return 22;
        case 4:
          return 22;
        case 3:
          return 28;
        default:
          return 28;
      }
    };

    return props.name === "ss" ? (
      <g id="line_id_three">
        <svg width="80" height="44" viewBox="0 0 80 44" x={cx - 38} y={cy - 9}>
          {checkBgDown(props.payload.ss + "%")}
          <circle cx="39" cy="10" r="10" fill="#0D0D0D" />
          <ellipse cx="39" cy="10" rx="6" ry="6" fill="white" />
          <Text
            width="80px"
            fill="white"
            verticalAnchor="start"
            style={{
              transform: `translate(${checkPos(
                props.payload.ss + "%"
              )}px, 28px)`,
              fontSize: "14px",
            }}
          >
            {fixedString(props.payload.ss) + "%"}
          </Text>
        </svg>
      </g>
    ) : (
      <g id={props.name === "aa" ? "line_id_one" : "line_id_two"}>
        <svg width="80" height="44" viewBox="0 0 80 44" x={cx - 40} y={cy - 34}>
          {checkBgTop(
            props.name === "aa"
              ? props.payload.aaValue == "0.0001"
                ? "0%"
                : fixedString(props.payload.aaValue) + "%"
              : props.payload[props.name] + "%"
          )}
          <circle cx="41" cy="34" r="10" fill={borderColor} />
          <ellipse cx="41" cy="34" rx="6" ry="6" fill="white" />
          <Text
            width="80px"
            fill="white"
            verticalAnchor="start"
            style={{
              transform: `translate(${checkPos(
                props.name === "aa"
                  ? props.payload.aaValue == "0.0001"
                    ? "0%"
                    : fixedString(props.payload.aaValue) + "%"
                  : props.payload[props.name] + "%"
              )}px, 5px)`,
              fontSize: "14px",
            }}
          >
            {props.name === "aa"
              ? props.payload.aaValue == "0.0001"
                ? "0%"
                : fixedString(props.payload.aaValue) + "%"
              : fixedString(props.payload[props.name]) + "%"}
          </Text>
        </svg>
      </g>
    );
  };

  const CustomizedDot = (props: any) => {
    return props.isOptimalInd && props?.index === props.isOptimalInd ? (
      <svg
        x={props.cx - 21}
        y={props.cy - 22}
        width="42"
        height="28"
        viewBox="0 0 42 28"
        fill="none"
      >
        <path d="M22 16H20V28H22V16Z" fill="white" />
        <path
          d="M5.09377 9.144C3.91777 9.144 2.96177 8.752 2.22577 7.968C1.48977 7.184 1.12177 6.196 1.12177 5.004C1.12177 3.812 1.48977 2.824 2.22577 2.04C2.96177 1.256 3.91777 0.864 5.09377 0.864C6.26177 0.864 7.21377 1.256 7.94977 2.04C8.69377 2.824 9.06577 3.812 9.06577 5.004C9.06577 6.196 8.69377 7.184 7.94977 7.968C7.21377 8.752 6.26177 9.144 5.09377 9.144ZM5.09377 8.256C5.97377 8.256 6.68177 7.952 7.21777 7.344C7.76177 6.728 8.03377 5.948 8.03377 5.004C8.03377 4.052 7.76177 3.272 7.21777 2.664C6.68177 2.056 5.97377 1.752 5.09377 1.752C4.20577 1.752 3.49377 2.056 2.95777 2.664C2.42177 3.272 2.15377 4.052 2.15377 5.004C2.15377 5.948 2.42177 6.728 2.95777 7.344C3.49377 7.952 4.20577 8.256 5.09377 8.256ZM13.4415 9.144C12.6255 9.144 11.9735 8.804 11.4855 8.124V11.208H10.5855V3.204H11.4855V4.068C11.7015 3.764 11.9815 3.52 12.3255 3.336C12.6695 3.152 13.0415 3.06 13.4415 3.06C14.2095 3.06 14.8295 3.336 15.3015 3.888C15.7815 4.432 16.0215 5.168 16.0215 6.096C16.0215 7.024 15.7815 7.764 15.3015 8.316C14.8295 8.868 14.2095 9.144 13.4415 9.144ZM13.2135 8.34C13.7815 8.34 14.2335 8.132 14.5695 7.716C14.9055 7.292 15.0735 6.752 15.0735 6.096C15.0735 5.44 14.9055 4.904 14.5695 4.488C14.2335 4.072 13.7815 3.864 13.2135 3.864C12.8695 3.864 12.5335 3.956 12.2055 4.14C11.8855 4.316 11.6455 4.532 11.4855 4.788V7.404C11.6455 7.668 11.8855 7.892 12.2055 8.076C12.5335 8.252 12.8695 8.34 13.2135 8.34ZM18.9167 9.144C18.4927 9.144 18.1727 9.028 17.9567 8.796C17.7407 8.564 17.6327 8.228 17.6327 7.788V3.996H16.6727V3.204H17.6327V1.62H18.5327V3.204H19.7087V3.996H18.5327V7.596C18.5327 7.82 18.5807 8 18.6767 8.136C18.7807 8.272 18.9287 8.34 19.1207 8.34C19.3847 8.34 19.5887 8.26 19.7327 8.1L19.9967 8.772C19.7327 9.02 19.3727 9.144 18.9167 9.144ZM21.4241 2.376C21.2641 2.376 21.1241 2.32 21.0041 2.208C20.8841 2.088 20.8241 1.944 20.8241 1.776C20.8241 1.608 20.8841 1.464 21.0041 1.344C21.1241 1.224 21.2641 1.164 21.4241 1.164C21.5921 1.164 21.7361 1.224 21.8561 1.344C21.9761 1.464 22.0361 1.608 22.0361 1.776C22.0361 1.944 21.9761 2.088 21.8561 2.208C21.7361 2.32 21.5921 2.376 21.4241 2.376ZM21.8801 9H20.9801V3.204H21.8801V9ZM31.5714 9H30.6714V5.064C30.6714 4.264 30.3154 3.864 29.6034 3.864C29.3154 3.864 29.0274 3.952 28.7394 4.128C28.4514 4.304 28.2274 4.512 28.0674 4.752V9H27.1674V5.064C27.1674 4.264 26.8114 3.864 26.0994 3.864C25.8194 3.864 25.5354 3.952 25.2474 4.128C24.9674 4.304 24.7434 4.516 24.5754 4.764V9H23.6754V3.204H24.5754V4.044C24.7194 3.82 24.9714 3.6 25.3314 3.384C25.6914 3.168 26.0634 3.06 26.4474 3.06C26.8714 3.06 27.2154 3.16 27.4794 3.36C27.7434 3.56 27.9194 3.82 28.0074 4.14C28.1834 3.852 28.4514 3.6 28.8114 3.384C29.1714 3.168 29.5514 3.06 29.9514 3.06C31.0314 3.06 31.5714 3.644 31.5714 4.812V9ZM37.8908 9H36.9908V8.34C36.5028 8.876 35.8628 9.144 35.0708 9.144C34.5348 9.144 34.0628 8.972 33.6548 8.628C33.2468 8.284 33.0428 7.816 33.0428 7.224C33.0428 6.616 33.2428 6.148 33.6428 5.82C34.0508 5.484 34.5268 5.316 35.0708 5.316C35.8948 5.316 36.5348 5.58 36.9908 6.108V5.064C36.9908 4.68 36.8548 4.38 36.5828 4.164C36.3108 3.948 35.9588 3.84 35.5268 3.84C34.8468 3.84 34.2548 4.108 33.7508 4.644L33.3308 4.02C33.9468 3.38 34.7188 3.06 35.6468 3.06C36.3108 3.06 36.8508 3.22 37.2668 3.54C37.6828 3.86 37.8908 4.352 37.8908 5.016V9ZM35.3948 8.496C36.1148 8.496 36.6468 8.256 36.9908 7.776V6.684C36.6468 6.204 36.1148 5.964 35.3948 5.964C34.9788 5.964 34.6348 6.084 34.3628 6.324C34.0988 6.556 33.9668 6.86 33.9668 7.236C33.9668 7.604 34.0988 7.908 34.3628 8.148C34.6348 8.38 34.9788 8.496 35.3948 8.496ZM40.5949 9H39.6949V0.995999H40.5949V9Z"
          fill="white"
        />
      </svg>
    ) : props.isCurrentInd && props?.index === props.isCurrentInd ? (
      <svg
        x={props.cx - 21}
        y={props.cy - 6}
        width="42"
        height="28"
        viewBox="0 0 42 28"
        fill="none"
      >
        <path d="M22 0H20V12H22V0Z" fill="white" />
        <path
          d="M5.95847 27.144C4.79047 27.144 3.81047 26.76 3.01847 25.992C2.23447 25.216 1.84247 24.22 1.84247 23.004C1.84247 21.788 2.23447 20.796 3.01847 20.028C3.81047 19.252 4.79047 18.864 5.95847 18.864C7.23847 18.864 8.25047 19.392 8.99447 20.448L8.15447 20.916C7.92247 20.572 7.61047 20.292 7.21847 20.076C6.82647 19.86 6.40647 19.752 5.95847 19.752C5.07847 19.752 4.34247 20.06 3.75047 20.676C3.16647 21.284 2.87447 22.06 2.87447 23.004C2.87447 23.948 3.16647 24.728 3.75047 25.344C4.34247 25.952 5.07847 26.256 5.95847 26.256C6.40647 26.256 6.82647 26.152 7.21847 25.944C7.61047 25.728 7.92247 25.444 8.15447 25.092L9.00647 25.56C8.23047 26.616 7.21447 27.144 5.95847 27.144ZM15.0518 27H14.1518V26.184C13.9118 26.456 13.6078 26.684 13.2398 26.868C12.8798 27.052 12.4958 27.144 12.0878 27.144C10.8558 27.144 10.2398 26.528 10.2398 25.296V21.204H11.1398V25.02C11.1398 25.5 11.2478 25.84 11.4638 26.04C11.6878 26.24 12.0118 26.34 12.4358 26.34C12.7718 26.34 13.0958 26.256 13.4078 26.088C13.7278 25.92 13.9758 25.712 14.1518 25.464V21.204H15.0518V27ZM17.7492 27H16.8492V21.204H17.7492V22.14C18.2852 21.436 18.9292 21.084 19.6812 21.084V22.008C19.5692 21.984 19.4492 21.972 19.3212 21.972C19.0492 21.972 18.7532 22.068 18.4332 22.26C18.1132 22.452 17.8852 22.664 17.7492 22.896V27ZM21.7102 27H20.8102V21.204H21.7102V22.14C22.2462 21.436 22.8902 21.084 23.6422 21.084V22.008C23.5302 21.984 23.4102 21.972 23.2822 21.972C23.0102 21.972 22.7142 22.068 22.3942 22.26C22.0742 22.452 21.8462 22.664 21.7102 22.896V27ZM27.3871 27.144C26.5231 27.144 25.8151 26.864 25.2631 26.304C24.7111 25.736 24.4351 25 24.4351 24.096C24.4351 23.248 24.7071 22.532 25.2511 21.948C25.7951 21.356 26.4751 21.06 27.2911 21.06C28.1471 21.06 28.8231 21.356 29.3191 21.948C29.8231 22.532 30.0751 23.272 30.0751 24.168V24.396H25.3831C25.4231 24.964 25.6311 25.44 26.0071 25.824C26.3831 26.208 26.8711 26.4 27.4711 26.4C28.1911 26.4 28.7871 26.156 29.2591 25.668L29.6911 26.256C29.0991 26.848 28.3311 27.144 27.3871 27.144ZM29.1871 23.736C29.1791 23.24 29.0111 22.796 28.6831 22.404C28.3551 22.004 27.8871 21.804 27.2791 21.804C26.7031 21.804 26.2471 22 25.9111 22.392C25.5831 22.784 25.4071 23.232 25.3831 23.736H29.1871ZM36.3448 27H35.4448V23.208C35.4448 22.72 35.3328 22.376 35.1088 22.176C34.8848 21.968 34.5648 21.864 34.1488 21.864C33.8128 21.864 33.4848 21.952 33.1648 22.128C32.8528 22.304 32.6088 22.516 32.4328 22.764V27H31.5328V21.204H32.4328V22.044C32.6568 21.78 32.9568 21.552 33.3328 21.36C33.7088 21.16 34.0968 21.06 34.4968 21.06C35.7288 21.06 36.3448 21.684 36.3448 22.932V27ZM39.6062 27.144C39.1822 27.144 38.8622 27.028 38.6462 26.796C38.4302 26.564 38.3222 26.228 38.3222 25.788V21.996H37.3622V21.204H38.3222V19.62H39.2222V21.204H40.3982V21.996H39.2222V25.596C39.2222 25.82 39.2702 26 39.3662 26.136C39.4702 26.272 39.6182 26.34 39.8102 26.34C40.0742 26.34 40.2782 26.26 40.4222 26.1L40.6862 26.772C40.4222 27.02 40.0622 27.144 39.6062 27.144Z"
          fill="white"
        />
      </svg>
    ) : (
      <svg width="2" height="2" viewBox="0 0 2 2" fill="none">
        <rect width="2" height="2" fill="none" />
      </svg>
    );
  };

  return isCurrentInd && isOptimalInd && actData.length ? (
    <div className="panel-custom border-custom font-nova w-full mb-[60px]">
      <div className="px-[15px] py-[17px] md:py-[20px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] leading-[22px] font-semibold text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <p className="font-normal text-sm leading-[19px] text-[#818987] pb-[15px] pt-[15px] p-[30px] md:pt-[30px] md:pb-[30px] md:text-base  md:leading-[22px]">
        Utilization vs. APY
      </p>
      <div className="h-[280px] md:h-[390px] pb-[0px] flex flex-col items-end justify-start">
        <div className="relative w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={actData}
              margin={{ top: 20, right: 30, left: 30, bottom: 43 }}
            >
              <Tooltip content={<></>} cursor={<CustomLine />} />
              <YAxis tickCount={1} hide={true} />
              <Line
                type="monotone"
                dataKey="ss"
                stroke="#14F195"
                strokeWidth={2}
                dot={false}
                activeDot={<CustomDot name="ss" borderColor="#0D0D0D" />}
              />
              <Line
                type="monotone"
                dataKey="dd"
                stroke="#00E0FF"
                strokeWidth={2}
                dot={false}
                activeDot={<CustomDot name="dd" borderColor="#0D0D0D" />}
              />
              <Line
                type="monotone"
                dataKey="aa"
                stroke="#FFFFFF"
                strokeWidth={2}
                className="current__line"
                dot={
                  <CustomizedDot
                    isOptimalInd={isOptimalInd}
                    isCurrentInd={isCurrentInd}
                  />
                }
                activeDot={<CustomDot name="aa" borderColor="#282C2B" />}
              />
              <use xlinkHref="#line_id_one"></use>
              <use xlinkHref="#line_id_two"></use>
              <use xlinkHref="#line_id_three"></use>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  ) : (
    <TokenInterestRateEmpty />
  );
}

export default TokenInterestRate;
