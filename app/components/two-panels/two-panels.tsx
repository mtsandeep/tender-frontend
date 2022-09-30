import { useContext, useState } from "react";
import ReactModal from "react-modal";
import type { Market } from "~/types/global";
import { toShortFiatString, toShortCryptoString } from "~/lib/ui";
import MarketRow from "~/components/two-panels/market-row";
import DepositFlow from "../deposit-flow/deposit-flow";
import BorrowFlow from "../borrow-flow/borrow-flow";
import TooltipMobile from "./tooltip-mobile";

import TooltipMobileMulti from "./tooltip-mobile-MULTI";
import TwoPanelsEmpty from "./two-panels-empty";
import { TenderContext } from "~/contexts/tender-context";
import { formatApy } from "~/lib/apy-calculations";
import * as math from "mathjs";

export const checkColorClass = (value: number | string) => {
  const valueNumber = parseFloat(
    math.format(value, { notation: "fixed", precision: 2 })
  );
  switch (true) {
    case valueNumber > 0:
      return "text-dark-green";
    case valueNumber < 0:
      return "text-[#00E0FF]";
    default:
      return "text-white";
  }
};

export default function TwoPanels() {
  const tenderContextData = useContext(TenderContext);
  let [openMarket, setOpenMarket] = useState<Market | null>(null);

  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });

  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop: string;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });
  let [action, setAction] = useState<"depositing" | "borrowing">("depositing");

  const depositInto = (market: Market) => {
    setAction("depositing");
    setOpenMarket(market);
  };

  const borrowFrom = (market: Market) => {
    setAction("borrowing");
    setOpenMarket(market);
  };

  const marketsWithSupply = tenderContextData.markets.filter(
    (token: Market) => token.supplyBalance && token.supplyBalanceInUsd > 0.01
  );

  const marketsWithoutSupply = tenderContextData.markets.filter(
    (token: Market) => !token.supplyBalance || token.supplyBalanceInUsd <= 0.001
  );

  const marketsWithBorrow = tenderContextData.markets.filter(
    (token: Market) => token.borrowBalance && token.borrowBalanceInUsd > 0.001
  );

  const marketsWithoutBorrow = tenderContextData.markets
    .filter((token: Market) => token.tokenPair.token.symbol !== "GLP")
    .filter(
      (token: Market) =>
        !token.borrowBalance || token.borrowBalanceInUsd <= 0.001
    );

  // const privateBlock = () => (
  //   <div className="group" onClick={(e) => e.stopPropagation()}>
  //     <div className="absolute top-[40px] md:top-[61px] left-[48px] md:left-[85px]">
  //       <div className="text-xs leading-[17px] text-[#a3aeac] !flex flex-wrap items-center pt-[3px] px-[5px] pb-[2px] rounded-[4px] bg-[#262c2a]">
  //         <div
  //           onClick={() =>
  //             setMobileTooltipData({
  //               ...mobileTooltipData,
  //               open: window.innerWidth < 1023,
  //               textBottom: "",
  //               token: "",
  //               icon: "",
  //               textTop:
  //                 "Deposit GLP as collateral. GLP collateral is currently limited to private beta users.",
  //             })
  //           }
  //           className="custom__hidden text-xs leading-[17px] text-[#a3aeac] !flex flex-wrap items-center"
  //         >
  //           <img
  //             className="w-[10px] h-[11px] mr-[4px]"
  //             src="/images/wallet-icons/private-lock.svg"
  //             alt="..."
  //           />
  //           Private
  //         </div>
  //         <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
  //           <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[242px] mx-[20px] !rounded-[10px] panel-custom">
  //             <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[16px]">
  //               <p className="text-[#818987] text-xs leading-[17px] text-left font-nova">
  //                 Deposit GLP as collateral. GLP collateral is currently limited
  //                 to private beta users.
  //               </p>
  //             </div>
  //           </div>
  //           <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const simpleTndBlock = ({
  //   textBottom,
  //   token,
  //   icon,
  //   value,
  //   textTop,
  // }: {
  //   textBottom: string;
  //   token: string;
  //   icon: string;
  //   value: string;
  //   textTop: string;
  // }) => (
  //   <div className="group" onClick={(e) => e.stopPropagation()}>
  //     <div className="absolute top-[40px] md:top-[61px] left-[14px] md:left-[36px]">
  //       <div
  //         onClick={() =>
  //           setMobileTooltipData({
  //             ...mobileTooltipData,
  //             open: window.innerWidth < 1023,
  //             textBottom: textBottom,
  //             token: token,
  //             icon: icon,
  //             textTop: textTop,
  //           })
  //         }
  //         className="custom__hidden !flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px]"
  //       >
  //         <img className="w-[13px] h-[13px] mr-[4px]" src={icon} alt="..." />
  //         {value}
  //       </div>
  //       <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
  //         <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[242px] mx-[20px] !rounded-[10px] panel-custom">
  //           <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[16px]">
  //             <p className="text-[#818987] text-xs text-left leading-[17px] font-nova">
  //               {textTop}
  //             </p>
  //             {icon && (
  //               <div className="flex items-center justify-between mt-[14px]">
  //                 <div className="flex items-center">
  //                   <img
  //                     className="w-[18px] h-[18px] mr-[8px]"
  //                     src={icon}
  //                     alt="..."
  //                   />
  //                   <span className="font-nova font-semibold text-sm leading-[14px] text-white">
  //                     {token}
  //                   </span>
  //                 </div>
  //                 <span className="font-nova font-normal text-sm leading-[14px] text-[#14F195]">
  //                   {textBottom}
  //                 </span>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return tenderContextData.markets.length ? (
    <div className="flex flex-col lg:grid grid-cols-2 gap-[60px] md:gap-[20px] mb-14">
      <ReactModal
        shouldCloseOnOverlayClick={true}
        isOpen={openMarket !== null}
        onRequestClose={() => setOpenMarket(null)}
        portalClassName="modal"
        style={{
          content: {
            inset: "unset",
            margin: "50px auto",
            zoom: "75%",
            position: "relative",
            maxWidth: 600,
          },
        }}
        closeTimeoutMS={200}
      >
        {openMarket &&
          (action === "depositing" ? (
            <DepositFlow
              key={openMarket.id}
              closeModal={() => setOpenMarket(null)}
              market={openMarket}
            />
          ) : (
            <BorrowFlow
              key={openMarket.id}
              closeModal={() => setOpenMarket(null)}
              market={openMarket}
            />
          ))}
      </ReactModal>
      <TooltipMobile
        mobileTooltipData={mobileTooltipData}
        handleClose={() =>
          setMobileTooltipData({
            open: false,
            textTop: "",
            token: "",
            icon: "",
            textBottom: "",
          })
        }
      />

      <TooltipMobileMulti
        tooltipData={multiTooltipData}
        handleClose={() =>
          setMultiTooltipData({
            open: false,
            coins: [],
          })
        }
      />

      <div>
        {marketsWithSupply.length > 0 && (
          <div className="pb-[5px] panel-custom border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Supply
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithSupply.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="pr-[80px] pt-[13px] font-nova font-[600] p-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-xs md:text-sm">
                    Asset
                  </th>
                  <th className="pr-[51px] pt-[13px] font-nova font-[600] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[38px] md:pr-[0px] text-start text-xs md:text-sm">
                    Total Supply
                  </th>
                  <th className="pr-[50px] pt-[13px] font-nova font-[600] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[36px] md:pr-[0px] text-start text-xs md:text-sm">
                    Supply APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[600] pl-[0] px-[15px] md:py-[20px] text-start text-xs md:text-sm md:pl-[3px] md:pr-[10px]">
                    Your Supply
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithSupply.map((token: Market) => {
                  return (
                    <MarketRow
                      openMarket={() => depositInto(token)}
                      market={token}
                      key={token.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <span className="flex text-sm md:text-base">
                            {token.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[38px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {token.marketData.marketSize &&
                            toShortCryptoString(
                              token.marketData.marketSize
                            )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[14px] md:left-[38px]">
                          {`$${
                            token.marketData.marketSize &&
                            toShortFiatString(
                              token.marketData.marketSize *
                                token.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative pl-[15px] pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] md:pl-[36px] md:pr-[0px]">
                        <div
                          className={`custom__hidden ${checkColorClass(
                            parseFloat(token.marketData.depositApy)
                          )} `}
                        >
                          {token.marketData.depositApy}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[14px] md:left-[36px] h-[22px]">
                            <div
                              onClick={() =>
                                setMultiTooltipData({
                                  ...multiTooltipData,
                                  open: window.innerWidth < 1023,
                                  coins: [
                                    {
                                      coinTitle: token.tokenPair.token.symbol,
                                      iconSrc: token.tokenPair.token.icon,
                                      data: token.marketData.depositApy,
                                      color: checkColorClass(
                                        parseFloat(token.marketData.depositApy)
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
                                src={token.tokenPair.token.icon}
                                alt={token.tokenPair.token.symbol}
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
                                        src={token.tokenPair.token.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {token.tokenPair.token.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal ${checkColorClass(
                                        parseFloat(token.marketData.depositApy)
                                      )}`}
                                    >
                                      {token.marketData.depositApy}
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
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[3px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(token.supplyBalance)}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] md:left-[3px]">
                          {`$${token.supplyBalanceInUsd.toFixed(2)} USD`}
                        </div>
                      </td>
                    </MarketRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {marketsWithoutSupply.length > 0 && (
          <div className="pb-[5px] panel-custom border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Supply Markets
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                  <th className="pr-[80px] pt-[15px] p-[15px] font-nova font-[600] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-xs md:text-sm">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[51px] pt-[15px] p-[15px] md:pl-[38px] md:pr-[0px] text-start text-xs md:text-sm">
                    Total Supply
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal pr-[50px] pt-[15px] p-[15px] md:pl-[36px] md:pr-[0px] text-start text-xs md:text-sm">
                    Supply APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[600] pl-[0] px-[15px] md:py-[20px] text-start text-xs md:text-sm md:pl-[3px] md:pr-[10px]">
                    Wallet Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithoutSupply.map((token: Market) => {
                  return (
                    <MarketRow
                      openMarket={() => depositInto(token)}
                      market={token}
                      key={token.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <span className="flex text-sm md:text-base">
                            {token.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[38px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {token.marketData.marketSize &&
                            toShortCryptoString(
                              token.marketData.marketSize
                            )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[14px] md:left-[38px]">
                          {`$${
                            token.marketData.marketSize &&
                            toShortFiatString(
                              token.marketData.marketSize *
                                token.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative pl-[15px] pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] md:pl-[36px] md:pr-[0px]">
                        <div
                          className={`custom__hidden ${checkColorClass(
                            parseFloat(token.marketData.depositApy)
                          )} `}
                        >
                          {token.marketData.depositApy}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[14px] md:left-[36px] h-[22px]">
                            <div
                              onClick={() =>
                                setMultiTooltipData({
                                  ...multiTooltipData,
                                  open: window.innerWidth < 1023,
                                  coins: [
                                    {
                                      coinTitle: token.tokenPair.token.symbol,
                                      iconSrc: token.tokenPair.token.icon,
                                      data: token.marketData.depositApy,
                                      color: checkColorClass(
                                        parseFloat(token.marketData.depositApy)
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
                                src={token.tokenPair.token.icon}
                                alt={token.tokenPair.token.symbol}
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
                                        src={token.tokenPair.token.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {token.tokenPair.token.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal ${checkColorClass(
                                        parseFloat(token.marketData.depositApy)
                                      )}`}
                                    >
                                      {token.marketData.depositApy}
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
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[3px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(token.walletBalance)}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] md:left-[3px]">
                          {`$${toShortFiatString(
                            token.walletBalance *
                              token.tokenPair.token.priceInUsd
                          )} USD`}
                        </div>
                      </td>
                    </MarketRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        {marketsWithBorrow.length > 0 && (
          <div className="pb-[5px] md:pb-[0px] panel-custom border-custom mb-[20px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Borrow
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithBorrow.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="pr-[80px] pt-[13px] font-nova font-[600]  p-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-xs md:text-sm">
                    Asset
                  </th>
                  <th className="pr-[51px] pt-[13px] font-nova font-[600] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[38px] md:pr-[0px] text-start text-xs md:text-sm">
                    Total Borrow
                  </th>
                  <th className="pr-[50px] pt-[13px] font-nova font-[600] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[36px] md:pr-[0px] text-start text-xs md:text-sm">
                    Borrow APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[600] pl-[0] px-[15px] md:py-[20px] text-start text-xs md:text-sm md:pl-[3px] md:pr-[10px]">
                    Your Borrow
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithBorrow.map((token: Market) => {
                  const borrowApy = parseFloat(token.marketData.borrowApy) * -1;
                  const borrowApyFormatted = formatApy(borrowApy);

                  return (
                    <MarketRow
                      openMarket={() => borrowFrom(token)}
                      market={token}
                      key={token.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <span className="flex text-sm md:text-base">
                            {token.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[38px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {token.marketData?.totalBorrowed &&
                            toShortCryptoString(
                              token.marketData.totalBorrowed
                            )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[14px] md:left-[38px]">
                          {`$${
                            token.marketData?.totalBorrowed &&
                            toShortFiatString(
                              token.marketData.totalBorrowed *
                                token.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative pl-[15px] pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] md:pl-[36px] md:pr-[0px]">
                        <div
                          className={`custom__hidden ${checkColorClass(
                            parseFloat(borrowApyFormatted)
                          )} `}
                        >
                          {borrowApyFormatted}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[14px] md:left-[36px] h-[22px]">
                            <div
                              onClick={() =>
                                setMultiTooltipData({
                                  ...multiTooltipData,
                                  open: window.innerWidth < 1023,
                                  coins: [
                                    {
                                      coinTitle: token.tokenPair.token.symbol,
                                      iconSrc: token.tokenPair.token.icon,
                                      data: borrowApyFormatted,
                                      color: checkColorClass(
                                        parseFloat(borrowApyFormatted)
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
                                src={token.tokenPair.token.icon}
                                alt={token.tokenPair.token.symbol}
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
                                        src={token.tokenPair.token.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {token.tokenPair.token.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal ${checkColorClass(
                                        parseFloat(borrowApyFormatted)
                                      )}`}
                                    >
                                      {borrowApyFormatted}
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
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[3px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(token.borrowBalance)}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] md:left-[3px]">
                          {`$${token.borrowBalanceInUsd.toFixed(2)} USD`}
                        </div>
                      </td>
                    </MarketRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {marketsWithoutBorrow.length > 0 && (
          <div className="pb-[5px] panel-custom border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Borrow Markets
            </div>
            <table className="custom__scroll w-full h-full table-fixed !pb-[23px] md:pb-[0px] md:pt-[0px]">
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                  <th className="pl-[15px] pt-[15px] font-nova font-[600] pr-[80px] pb-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-xs md:text-sm">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal p-[15px] pr-[51px] md:pl-[38px] md:pr-[0px] text-start text-xs md:text-sm">
                    Total Borrow
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] md:whitespace-normal p-[15px] pr-[51px] md:pl-[36px] md:pr-[0px] text-start text-xs md:text-sm">
                    Borrow APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[600] pl-[0] px-[15px] md:py-[20px] text-start text-xs md:text-sm md:pl-[3px] md:pr-[10px]">
                    Available Borrow
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithoutBorrow.map((token: Market) => {
                  const borrowApy = parseFloat(token.marketData.borrowApy) * -1;
                  const borrowApyFormatted = formatApy(borrowApy);

                  return (
                    <MarketRow
                      openMarket={() => borrowFrom(token)}
                      market={token}
                      key={token.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <span className="flex text-sm md:text-base">
                            {token.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[38px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {token.marketData?.totalBorrowed &&
                            toShortCryptoString(
                              token.marketData.totalBorrowed
                            )}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] left-[14px] md:left-[38px]">
                          {`$${
                            token.marketData?.totalBorrowed &&
                            toShortFiatString(
                              token.marketData.totalBorrowed *
                                token.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative pl-[15px] pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] md:pl-[36px] md:pr-[0px]">
                        <div
                          className={`custom__hidden ${checkColorClass(
                            borrowApy
                          )} `}
                        >
                          {borrowApyFormatted}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute top-[40px] md:top-[61px] left-[14px] md:left-[36px] h-[22px]">
                            <div
                              onClick={() =>
                                setMultiTooltipData({
                                  ...multiTooltipData,
                                  open: window.innerWidth < 1023,
                                  coins: [
                                    {
                                      coinTitle: token.tokenPair.token.symbol,
                                      iconSrc: token.tokenPair.token.icon,
                                      data: borrowApyFormatted,
                                      color: checkColorClass(
                                        parseFloat(borrowApyFormatted)
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
                                src={token.tokenPair.token.icon}
                                alt={token.tokenPair.token.symbol}
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
                                        src={token.tokenPair.token.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {token.tokenPair.token.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal ${checkColorClass(
                                        parseFloat(borrowApyFormatted)
                                      )}`}
                                    >
                                      {borrowApyFormatted}
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
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[3px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(token.maxBorrowLiquidity)}{" "}
                          {token.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden !flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[61px] md:left-[3px]">
                          {`$${toShortFiatString(
                            token.maxBorrowLiquidity *
                              token.tokenPair.token.priceInUsd
                          )} USD`}
                        </div>
                      </td>
                    </MarketRow>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  ) : (
    <TwoPanelsEmpty loading={true} />
  );
}
