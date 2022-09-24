import { useState } from "react";
import { useMarketsInfo } from "~/hooks/use-markets-info";
import { formatApy } from "~/lib/apy-calculations";
import EmptyMarketsContent from "./emptyMarketsContent";
import TooltipMobileMulti from "../two-panels/tooltip-mobile-MULTI";
import { toShortCryptoString, toShortFiatString } from "~/lib/ui";
import { checkColorClass } from "../two-panels/two-panels";

export default function MarketsContent() {
  const { markets, total } = useMarketsInfo();
  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });

  if (!markets || !total) {
    return <EmptyMarketsContent />;
  }

  const totalSupplyDiff = parseFloat(total.supply.usdDiff.toFixed(2));
  const totalBorrowDiff = parseFloat(total.borrow.usdDiff.toFixed(2));

  const getTotalDiffClass = function (value: number) {
    return value > 0
      ? "text-[14] relative bottom-[1px] md:text-[18px] leading-[14px] md:leading-[18px] text-[#14f195]"
      : value < 0
      ? "text-[14] relative bottom-[0] sm:bottom-[1px] md:text-[18px] leading-[14px] md:leading-[18px] text-[#00E0FF]"
      : "text-[14] relative bottom-[1px] md:text-[18px] leading-[14px] md:leading-[18px]";
  };

  return (
    <div>
      <TooltipMobileMulti
        tooltipData={multiTooltipData}
        handleClose={() =>
          setMultiTooltipData({
            open: false,
            coins: [],
          })
        }
      />
      <div className="switch__to__network max-w-[1068px] mx-[auto] flex flex-col gap-[22px] mb-[71px] md:mb-[40px] md:gap-[20px] mt-[32px] md:mt-[31px] md:grid grid-cols-2">
        <div className="panel-custom border-custom">
          <div className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-[18px] leading-[23px] md:leading-[28px] md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl">
            Total Supply
          </div>
          <div className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]">
            <div className="flex items-end gap-x-[10px] mb-[25px] md:mb-[30px] font-normal">
              <div className="text-[18px] md:text-[24px] leading-[18px] md:leading-[24px]">
                <span>$</span>
                <span>{total?.supply?.usd?.toFixed(2)}</span>
              </div>
              {" | "}
              <div className={getTotalDiffClass(totalSupplyDiff)}>
                <span>
                  {totalSupplyDiff > 0 ? "+" : ""}
                  {`${totalSupplyDiff}%`}
                </span>
              </div>
            </div>
            <div className="font-nova text-[12px] md:text-[14px] leading-[17px] md:leading-[20px] text-[#818987] mb-[15px] md:mb-[15px]">
              Top 3 Markets
            </div>
            <div className="font-nova flex flex-col font-space gap-y-[15px] md:gap-y-[24px]">
              {total?.supply?.topMarkets.map((id: string, index: number) => {
                const m = markets[id];
                const marketPercentage = (
                  (m.totalSupplyUsd * 100) /
                  total?.supply?.usd
                )?.toFixed(2);

                return (
                  <div key={index} className="flex flex-col gap-y-[10px]">
                    <label className="flex justify-between text-[14px] md:text-[16px] leading-[20px] md:leading-[22px]">
                      <p className="uppercase">{m.symbol}</p>
                      <div key={index} className="text-[#14F195]">
                        <span>{marketPercentage}</span>
                        <span>%</span>
                      </div>
                    </label>
                    <div className="border-custom px-3 relative top__custom">
                      <div
                        className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                        style={{
                          background: "#14F195",
                          width: `${marketPercentage}%`,
                          transition: "width 1s ease-out",
                        }}
                      ></div>
                      <div className="w-full flex absolute bottom-0 left-0">
                        <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col pt-[19px] pb-[25px] px-[15px] md:py-[23px] md:px-[30px]">
            <div className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-[12px] leading-[17px] md:text-[14px] md:leading-[20px] font-semibold text-[#818987]">
              <p>24H Supply Volume</p>
              <p># of Suppliers</p>
            </div>
            <div className="flex justify-between items-center font-space font-normal text-[16px] leading-[16px] md:text-[20px] md:leading-[20px]">
              <div>
                <span>$</span>
                <span>0</span>
              </div>
              <div>
                <span>{total?.supply?.count}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-custom border-custom">
          <div className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-[18px] leading-[23px] md:leading-[28px] md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl">
            Total Borrow
          </div>
          <div className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]">
            <div className="flex items-end gap-x-[10px] mb-[25px] md:mb-[30px] font-normal">
              <div className="text-[18px] md:text-[24px] leading-[18px] md:leading-[24px]">
                <span>$</span>
                <span>{total?.borrow?.usd?.toFixed(2)}</span>
              </div>
              {" | "}
              <div className={getTotalDiffClass(totalBorrowDiff)}>
                <span>
                  {totalBorrowDiff > 0 ? "+" : ""}
                  {`${totalBorrowDiff}%`}
                </span>
              </div>
            </div>
            <div className="font-nova text-[12px] md:text-[14px] leading-[17px] md:leading-[20px] text-[#818987] mb-[15px] md:mb-[15px]">
              Top 3 Markets
            </div>
            <div className="font-nova flex flex-col font-space gap-y-[15px] md:gap-y-[24px]">
              {total?.borrow?.topMarkets.map((id: string, index: number) => {
                const m = markets[id];
                const marketPercentage = (
                  (m.totalBorrowUsd * 100) /
                  total.borrow.usd
                )?.toFixed(2);

                return (
                  <div key={index} className="flex flex-col gap-y-[10px]">
                    <label className="flex justify-between text-[14px] md:text-[16px] leading-[20px] md:leading-[22px]">
                      <p className="uppercase">{m.symbol}</p>
                      <div className="text-[#00E0FF]">
                        <span>{marketPercentage}</span>
                        <span>%</span>
                      </div>
                    </label>
                    <div className="border-custom px-3 relative top__custom">
                      <div
                        className="w-full h-full bg-green-300 mr-2 h-[3px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
                        style={{
                          background: "#00E0FF",
                          width: `${marketPercentage}%`,
                          transition: "width 1s ease-out",
                        }}
                      ></div>
                      <div className="w-full flex absolute bottom-0 left-0">
                        <div className="bg-[#262D2A] h-[3px] flex-grow"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col pt-[19px] pb-[25px] px-[15px] md:py-[23px] md:px-[30px]">
            <div className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-[12px] leading-[17px] md:text-[14px] md:leading-[20px] font-semibold text-[#818987]">
              <p>24H Borrow Volume</p>
              <p># of Borrowers</p>
            </div>
            <div className="flex justify-between items-center font-space font-normal text-[16px] leading-[16px] md:text-[20px] md:leading-[20px]">
              <div>
                <span>$</span>
                <span>0</span>
              </div>
              <div>
                <span>{total?.borrow?.count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1068px] mx-[auto] mb-[60px] md:mb-[100px]">
        <div>
          <div className="mb-[20px] font-nova text-white text-[16px] leading-[22px] md:leading-[25px] font-semibold mb-[21px] md:mb-[18px] md:text-[18px]">
            All Markets
          </div>
          <div className="pb-[5px] md:pb-[0px] panel-custom markets border-custom">
            <table className="custom__scroll w-full h-full table-fixed !pb-[20px] md:pb-[0px] md:pt-[0px]">
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                  <th className="pl-[15px] pb-[14px] md:pb-[19px] pt-[15px] md:pt-[19px] md:pl-[30px] font-nova font-[500] pr-[48px] text-start text-[12px] md:text-[14px]">
                    Market
                  </th>
                  <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[36px] sm:pr-[2px] text-right text-[12px] md:text-[14px]">
                    Total Supply
                  </th>
                  <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[36px] sm:pr-[14px] text-right text-[12px] md:text-[14px]">
                    Supply APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[36px] sm:pr-[20px] text-right text-[12px] md:text-[14px]">
                    Total Borrow
                  </th>
                  <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[20px] sm:pr-[30px] md:pl-[0px] text-right text-[12px] md:text-[14px]">
                    Borrow APY
                  </th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(markets).map((id: string, index: number) => {
                  const m = markets[id];
                  const borrowApy = m.borrowApy * -1;

                  return (
                    <tr
                      key={index}
                      className="border-t border-[#282C2B] border__top__custom border_tr_custom cursor-pointer hover:bg-[#151515] border-child-hover"
                      onClick={() =>
                        window.open(`/markets/${m.symbol}`, "_blank")
                      }
                    >
                      <td className="text-white font-nova font-normal py-[15px] md:py-[24px] pl-[15px] sm:pl-[30px] sm:pr-[0px] align-top">
                        <div className="flex items-start text-[14px] sm:text-[16px] sm:leading-[22px]">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] sm:mr-[16px] sm:w-[40px] sm:h-[40px]"
                            src={m.icon}
                            alt={m.symbol}
                          />
                          {m.symbol}
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap text-right md:whitespace-normal relative text-white font-nova font-normal py-[15px] md:py-[24px] pl-[44px] pr-[41.5px] sm:pr-[2px]">
                        <div className="flex flex-col items-end">
                          <div className="custom__hidden text-[14px] leading-[20px] sm:top-[0] mb-[4px] md:mb-[8px] sm:text-[16px] sm:leading-[22px]">
                            {toShortCryptoString(m?.totalSupply)} {m.symbol}
                          </div>
                          <div
                            className={`custom__hidden !flex items-center break-words text-[11px] sm:text-[12px] h-[20px] sm:h-[22px] px-[5px] w-fit bg-dark-green text-dark-green rounded-[4px] sm:rounded-md`}
                          >
                            {`$${toShortFiatString(m.totalSupplyUsd)} USD`}
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white text-right font-nova font-normal py-[15px] md:py-[24px] pl-[44px] pr-[41.5px] sm:pr-[13px]">
                        <div className="flex flex-col items-end">
                          <div
                            className={`custom__hidden text-[14px] leading-[20px] sm:text-[16px] mb-[4px] md:mb-[8px] sm:leading-[22px] ${checkColorClass(
                              parseFloat(m.supplyApy)
                            )} `}
                          >
                            {formatApy(m.supplyApy)}
                          </div>
                          <div className="relative h-[22px]">
                            <div
                              className="group"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                onClick={() =>
                                  setMultiTooltipData({
                                    ...multiTooltipData,
                                    open: window.innerWidth < 1023,
                                    coins: [
                                      {
                                        coinTitle: m.symbol,
                                        iconSrc: m.icon,
                                        data: formatApy(m.supplyApy),
                                        color: checkColorClass(
                                          parseFloat(m.supplyApy)
                                        ),
                                      },
                                      {
                                        coinTitle: "esTND",
                                        iconSrc:
                                          "/images/wallet-icons/balance-icon.svg",
                                        data: "0.00%",
                                        color: "text-white",
                                      },
                                    ],
                                  })
                                }
                                className="custom__hidden !flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
                              >
                                <img
                                  className="w-[13px] h-[13px]"
                                  src={m.icon}
                                  alt={m.symbol}
                                />
                                <img
                                  className="w-[13px] h-[13px] ml-[6px]"
                                  src="/images/wallet-icons/balance-icon.svg"
                                  alt="..."
                                />
                              </div>
                              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
                                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          className="max-w-[18px]"
                                          src={m.icon}
                                          alt={m.symbol}
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          {m.symbol}
                                        </span>
                                      </div>
                                      <span
                                        className={`font-nova text-white text-sm font-normal ${checkColorClass(
                                          parseFloat(m.supplyApy)
                                        )}`}
                                      >
                                        {formatApy(m.supplyApy)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between gap-[30px]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          className="max-w-[18px]"
                                          src="/images/wallet-icons/balance-icon.svg"
                                          alt="..."
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          esTND
                                        </span>
                                      </div>
                                      <span className="font-nova text-white text-sm font-normal">
                                        0.00%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white text-right font-nova font-normal py-[15px] md:py-[24px] pl-[44px] pr-[41.5px] sm:pr-[21px] sm:pl-[10px]">
                        <div className="flex flex-col items-end">
                          <div className="custom__hidden text-[14px] leading-[20px] sm:text-[16px] sm:leading-[22px] mb-[4px] md:mb-[8px]">
                            {toShortCryptoString(m.totalBorrow)} {m.symbol}
                          </div>
                          <div
                            className={`custom__hidden !flex items-center break-words text-[11px] sm:text-[12px] text-right h-[20px] sm:h-[22px] px-[5px] w-fit bg-dark-green text-dark-green rounded-[4px] sm:rounded-md`}
                          >
                            {`$${toShortFiatString(m.totalBorrowUsd)} USD`}
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal text-right py-[15px] md:py-[24px] pl-[44px] pr-[15px] sm:pr-[30px] sm:pl-[10px]">
                        <div className="flex flex-col items-end">
                          <div
                            className={`custom__hidden text-[14px] mb-[4px] md:mb-[8px] leading-[20px] sm:text-[16px] sm:leading-[22px] ${
                              m.symbol === "GLP"
                                ? "text-white"
                                : checkColorClass(borrowApy)
                            } `}
                          >
                            {m.symbol === "GLP"
                              ? "0.00%"
                              : formatApy(borrowApy)}
                          </div>
                          <div className="inline-flex relative h-[22px]">
                            <div
                              className="group"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div
                                onClick={() =>
                                  setMultiTooltipData({
                                    ...multiTooltipData,
                                    open: window.innerWidth < 1023,
                                    coins: [
                                      {
                                        coinTitle: m.symbol,
                                        iconSrc: m.icon,
                                        data:
                                          m.symbol === "GLP"
                                            ? "0.00%"
                                            : `${formatApy(borrowApy)}`,
                                        color:
                                          m.symbol === "GLP"
                                            ? "text-white"
                                            : checkColorClass(borrowApy),
                                      },
                                      {
                                        coinTitle: "esTND",
                                        iconSrc:
                                          "/images/wallet-icons/balance-icon.svg",
                                        data: "0.00%",
                                        color: "text-white",
                                      },
                                    ],
                                  })
                                }
                                className="custom__hidden !flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
                              >
                                <img
                                  className="w-[13px] h-[13px]"
                                  src={m.icon}
                                  alt={m.symbol}
                                />
                                <img
                                  className="w-[13px] h-[13px] ml-[6px]"
                                  src="/images/wallet-icons/balance-icon.svg"
                                  alt="..."
                                />
                              </div>
                              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
                                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          className="max-w-[18px]"
                                          src={m.icon}
                                          alt={m.symbol}
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          {m.symbol}
                                        </span>
                                      </div>
                                      <span
                                        className={`font-nova text-white text-sm font-normal ${
                                          m.symbol === "GLP"
                                            ? "white"
                                            : checkColorClass(borrowApy)
                                        }`}
                                      >
                                        {m.symbol === "GLP"
                                          ? "0.00%"
                                          : `${formatApy(borrowApy)}`}
                                      </span>
                                    </div>
                                    <div className="flex justify-between gap-[30px]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          className="max-w-[18px]"
                                          src="/images/wallet-icons/balance-icon.svg"
                                          alt="..."
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          esTND
                                        </span>
                                      </div>
                                      <span className="font-nova text-white text-sm font-normal">
                                        0.00%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
