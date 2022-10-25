import { useContext, useEffect, useState } from "react";
import { useMarketsInfo } from "~/hooks/use-markets-info";
import { formatApy } from "~/lib/apy-calculations";
import EmptyMarketsContent from "./emptyMarketsContent";
import TooltipMobileMulti from "../two-panels/tooltip-mobile-MULTI";
import { toFiatString, toShortCryptoString, toShortFiatString } from "~/lib/ui";
import { checkColorClass } from "../two-panels/two-panels";
import type { Market } from "~/types/global";
import { TenderContext } from "~/contexts/tender-context";

export default function MarketsContent() {
  const { markets, total } = useMarketsInfo();
  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });
  const { markets: m } = useContext(TenderContext);

  const totalSuppliedUsd = m
    .map(
      (token: Market) =>
        token.tokenPair.token.priceInUsd * (token.marketData.marketSize ?? 0)
    )
    .reduce((a: any, b: any) => a + b, 0);

  const totalBorrowedUsd = m
    .map(
      (token: Market) =>
        token.tokenPair.token.priceInUsd * (token.marketData.totalBorrowed ?? 0)
    )
    .reduce((a: any, b: any) => a + b, 0);

  if (!markets || !total || !m.length) {
    return <EmptyMarketsContent />;
  }

  const totalSupplyDiff = parseFloat(total.supply.usdDiff.toFixed(2));
  const totalBorrowDiff = parseFloat(total.borrow.usdDiff.toFixed(2));

  const checkZeroValue = (value: number) => {
    return (value <= 0.01 && value > 0) || (value < 0 && value >= -0.01);
  };

  const replaceMinusSymbol = (value: number) => {
    return value >= 0
      ? "$" + toShortFiatString(value)
      : "-$" + toShortFiatString(Math.abs(value));
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
          <div className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-lg leading-[23px] md:leading-[28px] md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl">
            Total Supply
          </div>
          <div className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]">
            <div className="flex items-center gap-x-[10px] mb-[25px] md:mb-[30px] font-normal">
              <div className="text-lg md:text-2xl leading-[18px] md:leading-[24px]">
                ${toFiatString(totalSuppliedUsd)}
              </div>
              {totalSupplyDiff !== 0 && (
                <div
                  className={`text-[14] md:text-lg leading-[14px] md:leading-[18px] ${checkColorClass(
                    totalSupplyDiff
                  )}`}
                >
                  {totalSupplyDiff > 0 ? "+" : ""}
                  {`${totalSupplyDiff}%`}
                </div>
              )}
            </div>
            <div className="font-nova text-xs md:text-sm leading-[17px] md:leading-[20px] text-[#818987] mb-[15px] md:mb-[15px]">
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
                    <label className="flex justify-between text-sm md:text-base leading-[20px] md:leading-[22px]">
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
            <div className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-xs leading-[17px] md:text-sm md:leading-[20px] font-semibold text-[#818987]">
              <p>24H Supply Volume</p>
              <p># of Suppliers</p>
            </div>
            <div className="flex justify-between items-center font-space font-normal text-base leading-[16px] md:text-xl md:leading-[20px]">
              <div
                className={checkColorClass(
                  checkZeroValue(total?.supply?.volume)
                    ? 0
                    : total?.supply?.volume
                )}
              >
                {replaceMinusSymbol(
                  checkZeroValue(total?.supply?.volume)
                    ? 0
                    : total?.supply?.volume
                )}
              </div>
              <div>
                <span>{total?.supply?.count}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="panel-custom border-custom">
          <div className="px-[15px] textSize22 py-[19px] md:py-[17px] border-b border-[#282C2B] md:py-[20px] font-space font-bold text-lg leading-[23px] md:leading-[28px] md:px-[30px] md:pt-[19px] md:pb-[19px] md:text-xl">
            Total Borrow
          </div>
          <div className="font-space py-[20px] px-[15px] border-b border-[#282C2B] md:py-[24px] md:px-[30px]">
            <div className="flex items-center gap-x-[10px] mb-[25px] md:mb-[30px] font-normal">
              <div className="text-lg md:text-2xl leading-[18px] md:leading-[24px]">
                ${toFiatString(totalBorrowedUsd)}
              </div>
              {totalBorrowDiff !== 0 && (
                <div
                  className={`text-[14] md:text-lg leading-[14px] md:leading-[18px] ${checkColorClass(
                    totalBorrowDiff
                  )}`}
                >
                  {totalBorrowDiff > 0 ? "+" : ""}
                  {`${totalBorrowDiff}%`}
                </div>
              )}
            </div>
            <div className="font-nova text-xs md:text-sm leading-[17px] md:leading-[20px] text-[#818987] mb-[15px] md:mb-[15px]">
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
                    <label className="flex justify-between text-sm md:text-base leading-[20px] md:leading-[22px]">
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
            <div className="flex justify-between items-center mb-[11px] md:mb-[15px] font-nova text-xs leading-[17px] md:text-sm md:leading-[20px] font-semibold text-[#818987]">
              <p>24H Borrow Volume</p>
              <p># of Borrowers</p>
            </div>
            <div className="flex justify-between items-center font-space font-normal text-base leading-[16px] md:text-xl md:leading-[20px]">
              <div
                className={checkColorClass(
                  checkZeroValue(total?.borrow?.volume)
                    ? 0
                    : total?.borrow?.volume
                )}
              >
                {replaceMinusSymbol(
                  checkZeroValue(total?.borrow?.volume)
                    ? 0
                    : total?.borrow?.volume
                )}
              </div>
              <div>
                <span>{total?.borrow?.count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1068px] mx-[auto] mb-[60px] md:mb-[100px]">
        <div className="pb-[5px] panel-custom markets border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
          <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            All Markets
          </div>
          <table className="custom__scroll w-full h-full table-fixed !pb-[20px] md:pb-[0px] md:pt-[0px]">
            <thead>
              <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B]">
                <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] md:pl-[30px] pr-[15px]">
                  Market
                </th>
                <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                  Total Supply
                </th>
                <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100px] min-w-[100px] md:w-[100%] md:min-w-[60px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                  Supply APY
                </th>
                <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[90px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                  Total Borrow
                </th>
                <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[130px] min-w-[130px] md:w-[100%] md:min-w-[60px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[30px]">
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
                    className="h-[80px] md:h-auto text-gray-400 border-t border-[#282C2B] border__top__custom border_tr_custom cursor-pointer hover:bg-[#151515] border-child-hover"
                  >
                    <td>
                      <a
                        className="relative text-white font-nova font-normal flex items-center w-full h-full pb-[30px] pt-[15px] md:pt-[24px] md:pb-[39px] pl-[15px] md:pl-[30px] pr-[15px] flex items-center justify-left text-sm md:text-base"
                        href={`/markets/${m.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className="w-[24px] h-[24px] mr-[10px] sm:mr-[16px] sm:w-[40px] sm:h-[40px]"
                          src={m.icon}
                          alt={m.symbol}
                        />
                        {m.symbol}
                      </a>
                    </td>
                    <td>
                      <a
                        className="relative flex whitespace-nowrap md:whitespace-normal text-white font-nova font-normal items-center w-full h-full pb-[30px] pt-[15px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px]"
                        href={`/markets/${m.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="custom__hidden text-sm md:text-base">
                          {toShortCryptoString(m?.totalSupply)} {m.symbol}
                        </div>
                        <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[15px]">
                          {`$${toShortFiatString(m.totalSupplyUsd)} USD`}
                        </div>
                      </a>
                    </td>
                    <td>
                      <a
                        className="relative text-white font-nova font-normal flex items-center w-full h-full pl-[15px] pb-[30px] pb-[30px] pt-[15px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px]"
                        href={`/markets/${m.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={`custom__hidden text-sm md:text-base ${checkColorClass(
                            parseFloat(m.supplyApy)
                          )} `}
                        >
                          {formatApy(m.supplyApy)}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[15px] h-[22px]">
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
                              className="!flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
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
                                      className={`font-nova text-sm font-normal ${checkColorClass(
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
                      </a>
                    </td>
                    <td>
                      <a
                        className="relative text-white font-nova font-normal flex items-center w-full h-full pl-[15px] pb-[30px] pb-[30px] pt-[15px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px]"
                        href={`/markets/${m.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="custom__hidden text-sm md:text-base">
                          {toShortCryptoString(m.totalBorrow)} {m.symbol}
                        </div>
                        <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[15px]">
                          {`$${toShortFiatString(m.totalBorrowUsd)} USD`}
                        </div>
                      </a>
                    </td>
                    <td>
                      <a
                        className="relative text-white font-nova font-normal flex items-center w-full h-full pb-[30px] md:pt-[24px] pb-[30px] pt-[15px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[45px] md:pr-[30px]"
                        href={`/markets/${m.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={`custom__hidden text-sm md:text-base ${
                            m.symbol === "GLP"
                              ? "text-white"
                              : checkColorClass(borrowApy)
                          } `}
                        >
                          {m.symbol === "GLP" ? "0.00%" : formatApy(borrowApy)}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[15px] h-[22px]">
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
                              className="!flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
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
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
