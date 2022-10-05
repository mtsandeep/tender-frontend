import { useEffect, useState } from "react";
import { LineChart, Line, Tooltip, ResponsiveContainer } from "recharts";
import TokenInterestRateEmpty from "./tokenInterestRateEmpty";

function TokenInterestRate({ data }: { data: any[] }) {
  const [isCurrentInd, setIsCurrentInd] = useState<number>(0);
  const [isOptimalInd, setIsOptimalInd] = useState<number>(0);

  useEffect(() => {
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
          <p
            className={`flex items-center text-sm md:text-base justify-between label text-[${props.payload[0].stroke}]`}
          >
            <span className="mr-[20px]">Utilization</span>
            {Number(
              data.find(
                (item: any) =>
                  Number(item.ss) === Number(props.payload[1].payload.ss) &&
                  Number(item.dd) === Number(props.payload[2].payload.dd)
              )?.aa
            )}
            %
          </p>
          <p
            className={`flex items-center text-sm md:text-base justify-between label text-[${props.payload[2].stroke}]`}
          >
            <span className="mr-[20px]">Borrow APY</span>{" "}
            {props.payload[2].value}%
          </p>
          <p
            className={`flex items-center text-sm md:text-base justify-between label text-[${props.payload[1].stroke}]`}
          >
            <span className="mr-[20px]">Supply APY</span>{" "}
            {props.payload[1].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomizedDot = (props: any) => {
    return props.isOptimalInd && props?.index === props.isOptimalInd ? (
      <svg
        x={props.cx - 21}
        y={props.cy - 6}
        width="41"
        height="29"
        viewBox="0 0 41 29"
        fill="none"
        className="z-10"
      >
        <path
          d="M4.59377 26.144C3.41777 26.144 2.46177 25.752 1.72577 24.968C0.989766 24.184 0.621766 23.196 0.621766 22.004C0.621766 20.812 0.989766 19.824 1.72577 19.04C2.46177 18.256 3.41777 17.864 4.59377 17.864C5.76177 17.864 6.71377 18.256 7.44977 19.04C8.19377 19.824 8.56577 20.812 8.56577 22.004C8.56577 23.196 8.19377 24.184 7.44977 24.968C6.71377 25.752 5.76177 26.144 4.59377 26.144ZM4.59377 25.256C5.47377 25.256 6.18177 24.952 6.71777 24.344C7.26177 23.728 7.53377 22.948 7.53377 22.004C7.53377 21.052 7.26177 20.272 6.71777 19.664C6.18177 19.056 5.47377 18.752 4.59377 18.752C3.70577 18.752 2.99377 19.056 2.45777 19.664C1.92177 20.272 1.65377 21.052 1.65377 22.004C1.65377 22.948 1.92177 23.728 2.45777 24.344C2.99377 24.952 3.70577 25.256 4.59377 25.256ZM12.9415 26.144C12.1255 26.144 11.4735 25.804 10.9855 25.124V28.208H10.0855V20.204H10.9855V21.068C11.2015 20.764 11.4815 20.52 11.8255 20.336C12.1695 20.152 12.5415 20.06 12.9415 20.06C13.7095 20.06 14.3295 20.336 14.8015 20.888C15.2815 21.432 15.5215 22.168 15.5215 23.096C15.5215 24.024 15.2815 24.764 14.8015 25.316C14.3295 25.868 13.7095 26.144 12.9415 26.144ZM12.7135 25.34C13.2815 25.34 13.7335 25.132 14.0695 24.716C14.4055 24.292 14.5735 23.752 14.5735 23.096C14.5735 22.44 14.4055 21.904 14.0695 21.488C13.7335 21.072 13.2815 20.864 12.7135 20.864C12.3695 20.864 12.0335 20.956 11.7055 21.14C11.3855 21.316 11.1455 21.532 10.9855 21.788V24.404C11.1455 24.668 11.3855 24.892 11.7055 25.076C12.0335 25.252 12.3695 25.34 12.7135 25.34ZM18.4167 26.144C17.9927 26.144 17.6727 26.028 17.4567 25.796C17.2407 25.564 17.1327 25.228 17.1327 24.788V20.996H16.1727V20.204H17.1327V18.62H18.0327V20.204H19.2087V20.996H18.0327V24.596C18.0327 24.82 18.0807 25 18.1767 25.136C18.2807 25.272 18.4287 25.34 18.6207 25.34C18.8847 25.34 19.0887 25.26 19.2327 25.1L19.4967 25.772C19.2327 26.02 18.8727 26.144 18.4167 26.144ZM20.9241 19.376C20.7641 19.376 20.6241 19.32 20.5041 19.208C20.3841 19.088 20.3241 18.944 20.3241 18.776C20.3241 18.608 20.3841 18.464 20.5041 18.344C20.6241 18.224 20.7641 18.164 20.9241 18.164C21.0921 18.164 21.2361 18.224 21.3561 18.344C21.4761 18.464 21.5361 18.608 21.5361 18.776C21.5361 18.944 21.4761 19.088 21.3561 19.208C21.2361 19.32 21.0921 19.376 20.9241 19.376ZM21.3801 26H20.4801V20.204H21.3801V26ZM31.0714 26H30.1714V22.064C30.1714 21.264 29.8154 20.864 29.1034 20.864C28.8154 20.864 28.5274 20.952 28.2394 21.128C27.9514 21.304 27.7274 21.512 27.5674 21.752V26H26.6674V22.064C26.6674 21.264 26.3114 20.864 25.5994 20.864C25.3194 20.864 25.0354 20.952 24.7474 21.128C24.4674 21.304 24.2434 21.516 24.0754 21.764V26H23.1754V20.204H24.0754V21.044C24.2194 20.82 24.4714 20.6 24.8314 20.384C25.1914 20.168 25.5634 20.06 25.9474 20.06C26.3714 20.06 26.7154 20.16 26.9794 20.36C27.2434 20.56 27.4194 20.82 27.5074 21.14C27.6834 20.852 27.9514 20.6 28.3114 20.384C28.6714 20.168 29.0514 20.06 29.4514 20.06C30.5314 20.06 31.0714 20.644 31.0714 21.812V26ZM37.3908 26H36.4908V25.34C36.0028 25.876 35.3628 26.144 34.5708 26.144C34.0348 26.144 33.5628 25.972 33.1548 25.628C32.7468 25.284 32.5428 24.816 32.5428 24.224C32.5428 23.616 32.7428 23.148 33.1428 22.82C33.5508 22.484 34.0268 22.316 34.5708 22.316C35.3948 22.316 36.0348 22.58 36.4908 23.108V22.064C36.4908 21.68 36.3548 21.38 36.0828 21.164C35.8108 20.948 35.4588 20.84 35.0268 20.84C34.3468 20.84 33.7548 21.108 33.2508 21.644L32.8308 21.02C33.4468 20.38 34.2188 20.06 35.1468 20.06C35.8108 20.06 36.3508 20.22 36.7668 20.54C37.1828 20.86 37.3908 21.352 37.3908 22.016V26ZM34.8948 25.496C35.6148 25.496 36.1468 25.256 36.4908 24.776V23.684C36.1468 23.204 35.6148 22.964 34.8948 22.964C34.4788 22.964 34.1348 23.084 33.8628 23.324C33.5988 23.556 33.4668 23.86 33.4668 24.236C33.4668 24.604 33.5988 24.908 33.8628 25.148C34.1348 25.38 34.4788 25.496 34.8948 25.496ZM40.0949 26H39.1949V17.996H40.0949V26Z"
          fill="white"
        />
        <rect x="20" width="2" height="12" fill="white" />
      </svg>
    ) : props.isCurrentInd && props?.index === props.isCurrentInd ? (
      <svg
        x={props.cx - 23}
        y={props.cy + 1}
        width="47"
        height="60"
        viewBox="0 0 47 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23 0L23 35" stroke="#282C2B" />
        <path
          d="M5.432 54.168C7.266 54.168 8.4 53.286 9.142 52.194L7.952 51.564C7.462 52.348 6.538 52.922 5.432 52.922C3.542 52.922 2.086 51.424 2.086 49.338C2.086 47.238 3.542 45.754 5.432 45.754C6.538 45.754 7.462 46.328 7.952 47.112L9.142 46.482C8.414 45.39 7.266 44.508 5.432 44.508C2.772 44.508 0.644 46.468 0.644 49.338C0.644 52.208 2.772 54.168 5.432 54.168ZM15.074 54H16.334V47.238H15.074V52.096C14.696 52.6 13.982 53.048 13.198 53.048C12.33 53.048 11.77 52.712 11.77 51.592V47.238H10.51V52.012C10.51 53.44 11.224 54.168 12.666 54.168C13.702 54.168 14.556 53.636 15.074 53.076V54ZM18.3303 54H19.5903V49.296C19.8843 48.792 20.7383 48.316 21.3683 48.316C21.5363 48.316 21.6763 48.33 21.8023 48.358V47.084C20.9063 47.084 20.1083 47.602 19.5903 48.274V47.238H18.3303V54ZM23.0607 54H24.3207V49.296C24.6147 48.792 25.4687 48.316 26.0987 48.316C26.2667 48.316 26.4067 48.33 26.5327 48.358V47.084C25.6367 47.084 24.8387 47.602 24.3207 48.274V47.238H23.0607V54ZM27.3712 50.612C27.3712 52.74 28.8552 54.168 30.8712 54.168C31.9632 54.168 32.9152 53.818 33.5872 53.16L32.9992 52.334C32.4952 52.852 31.7112 53.132 30.9972 53.132C29.6392 53.132 28.7992 52.18 28.7012 51.032H34.0492V50.724C34.0492 48.652 32.7892 47.07 30.7592 47.07C28.7852 47.07 27.3712 48.652 27.3712 50.612ZM30.7592 48.106C32.1872 48.106 32.7892 49.226 32.8172 50.122H28.6872C28.7572 49.198 29.4012 48.106 30.7592 48.106ZM40.1892 54H41.4492V49.254C41.4492 47.826 40.7072 47.07 39.2792 47.07C38.2292 47.07 37.3332 47.644 36.8852 48.19V47.238H35.6252V54H36.8852V49.17C37.2492 48.666 37.9632 48.19 38.7472 48.19C39.6152 48.19 40.1892 48.554 40.1892 49.674V54ZM45.3075 54.168C45.9655 54.168 46.3575 53.986 46.6235 53.734L46.3015 52.782C46.1755 52.922 45.9095 53.048 45.6155 53.048C45.1815 53.048 44.9575 52.698 44.9575 52.222V48.344H46.3295V47.238H44.9575V45.39H43.6975V47.238H42.5775V48.344H43.6975V52.502C43.6975 53.566 44.2435 54.168 45.3075 54.168Z"
          fill="white"
        />
      </svg>
    ) : (
      <svg width="2" height="2" viewBox="0 0 2 2" fill="none">
        <rect width="2" height="2" fill="none" />
      </svg>
    );
  };

  return data.length ? (
    <div className="font-nova w-full mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[20px] text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] pb-[15px] pt-[15px] p-[30px] md:pt-[30px] md:pb-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="h-[280px] md:h-[390px] pb-[0px] flex flex-col items-end justify-start">
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.map((item) => ({
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
                    ) * 1.1,
                }))}
                margin={{ top: 10, right: 30, left: 30, bottom: 43 }}
              >
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
          </div>
        </div>
      </div>
    </div>
  ) : (
    <TokenInterestRateEmpty />
  );
}

export default TokenInterestRate;
