import { useContext, useState } from "react";
import type { Market } from "~/types/global";
import TooltipMobile from "./tooltip-mobile";

import TooltipMobileMulti from "./tooltip-mobile-MULTI";
import TwoPanelsEmpty from "./two-panels-empty";
import { TenderContext } from "~/contexts/tender-context";
import * as math from "mathjs";
import DisplayPrice from "~/components/shared/DisplayPrice";
import { HoverableAPY, getAPY } from "../shared/APY";

import type { ActiveTab } from "../deposit-borrow-flow/deposit-borrow-flow";
import ReactModal from "react-modal";
import DepositBorrowFlow from "../deposit-borrow-flow/deposit-borrow-flow";

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

export function useMultiTooltip() {
  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });

  let getOnClick = ((market: Market, type: "supply" | "borrow") => {
    // gets the onClick handler for a market apy

    return () => {
      var info = getAPY(type, market);

      setMultiTooltipData({
        ...multiTooltipData,
        open: window.innerWidth < 1023,
        coins: [
          {
            coinTitle: market.tokenPair.token.symbol,
            iconSrc: market.tokenPair.token.icon,
            data: info.formattedAPY,
            color: checkColorClass(info.APY),
          },
          {
            coinTitle: "esTND",
            iconSrc: "/images/wallet-icons/balance-icon.svg",
            data: "%" + info.formattedESTND,
            color: "text-white  ",
          },
        ],
      })
    }
  })
  
  return {multiTooltipData, setMultiTooltipData, getOnClick}

}

export default function TwoPanels() {
  const tenderContextData = useContext(TenderContext);

  let {multiTooltipData, setMultiTooltipData, getOnClick} = useMultiTooltip()

  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop: string;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });

  const [activeTab, setActiveTab] = useState<ActiveTab>("supply");
  let [openMarket, setOpenMarket] = useState<Market | false>(false);

  const handlerClickChangeTab = (tab: ActiveTab, token: Market) => {
    setActiveTab(tab);
    setOpenMarket(token);
  };

  const marketsWithSupply = tenderContextData.markets.filter(
    (token: Market) => token.supplyBalance && token.supplyBalanceInUsd > 0
  );

  const marketsWithoutSupply = tenderContextData.markets.filter(
    (token: Market) => !token.supplyBalance || token.supplyBalanceInUsd <= 0
  );

  const marketsWithBorrow = tenderContextData.markets.filter(
    (token: Market) => token.borrowBalance && token.borrowBalanceInUsd > 0
  );

  const marketsWithoutBorrow = tenderContextData.markets
    .filter((token: Market) => token.tokenPair.token.symbol !== "GLP")
    .filter(
      (token: Market) => !token.borrowBalance || token.borrowBalanceInUsd <= 0
    );

  return tenderContextData.markets.length ? (
    <div className="flex flex-col xl:grid grid-cols-2 gap-[60px] xl:gap-[20px] mb-14">
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
      {openMarket && (
        <ReactModal
          ariaHideApp={false}
          shouldCloseOnOverlayClick={true}
          isOpen={true}
          onRequestClose={() => setOpenMarket(false)}
          portalClassName="modal"
          style={{
            content: {
              inset: "unset",
              margin: "20px auto",
              zoom: window.innerWidth > 768 ? "75%" : "100%",
              position: "relative",
              maxWidth: 650,
            },
          }}
          closeTimeoutMS={200}
        >
          <DepositBorrowFlow
            closeModal={() => setOpenMarket(false)}
            marketId={openMarket.id}
            activeTab={activeTab}
            setActiveTab={(tab) => openMarket && handlerClickChangeTab(tab, openMarket)}
          />
        </ReactModal>
      )}
      <div>
        {marketsWithSupply.length > 0 && (
          <div className="pb-[5px] panel-custom main border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
            <div
              tabIndex={0}
              className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl"
            >
              Supply
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithSupply.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[115px] min-w-[115px] sm:w-[165px] sm:min-w-[165px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] md:pl-[30px] pr-[15px]">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[160px] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Total Supply
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[110px] min-w-[110px] sm:w-[120px] sm:min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Supply APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[20px]">
                    Your Supply
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithSupply.map((token: Market) => {
                  return (
                    <tr
                      key={token.id}
                      tabIndex={0}
                      role="row"
                      className="p-0 h-[80px] md:h-auto text-gray-400 border-t border__top__custom cursor-pointer"
                      onKeyUp={(e) =>
                        e.key === "Enter" &&
                        window.open(
                          `/markets/${token.tokenPair.token.symbol}/`,
                          "_blank"
                        )
                      }
                    >
                      <td className="p-0">
                        <a
                          className="flex h-full  relative items-center justify-left text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] md:pl-[30px] pr-[15px]"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <img
                            aria-hidden={true}
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={token.tokenPair.token.icon}
                            alt={token.tokenPair.token.symbol}
                          />
                          <span className="flex text-sm md:text-base">
                            {token.tokenPair.token.symbol}
                          </span>
                        </a>
                      </td>
                      <td className="p-0">
                        <a
                          className="relative flex items-center h-full  whitespace-nowrap md:whitespace-normal text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px] text-sm md:text-base"
                          onClick={() => handlerClickChangeTab("supply", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.marketData.marketSize?.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.marketData.marketSize?.toString()}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <HoverableAPY
                          type="supply"
                          market={token}
                          onClick={() => handlerClickChangeTab("supply", token)}
                        />
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[20px text-sm md:text-base]"
                          onClick={() => handlerClickChangeTab("supply", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.supplyBalance.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.supplyBalanceInUsd.toString()}
                              baseFactor="1" // amount is already in usd
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {marketsWithoutSupply.length > 0 && (
          <div className="focus:outline-none pb-[5px] panel-custom main border-custom md:pb-[0px]">
            <div
              tabIndex={0}
              className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl"
            >
              Supply Markets
            </div>
            <table
              role="grid"
              className="custom__scroll w-full h-full table-fixed"
            >
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B]">
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[115px] min-w-[115px] sm:w-[165px] sm:min-w-[165px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] md:pl-[30px] pr-[15px]">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[160px] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Total Supply
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[110px] min-w-[110px] sm:w-[120px] sm:min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Supply APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[20px]">
                    Wallet Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithoutSupply.map((token: Market) => {
                  return (
                    <tr
                      key={token.id}
                      tabIndex={0}
                      role="row"
                      className="p-0 h-[80px] md:h-auto text-gray-400 border-t border__top__custom cursor-pointer"
                      onClick={() => handlerClickChangeTab("supply", token)}
                      onKeyUp={(e) =>
                        e.key === "Enter" &&
                        window.open(
                          `/markets/${token.tokenPair.token.symbol}/`,
                          "_blank"
                        )
                      }
                    >
                      <td className="p-0">
                        <a
                          className="relative flex items-center h-full  text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] md:pl-[30px] pr-[15px]"
                          onClick={() => handlerClickChangeTab("supply", token)}
                          rel="noreferrer"
                        >
                          <div className="flex items-center justify-left">
                            <img
                              aria-hidden={true}
                              className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                              src={token.tokenPair.token.icon}
                              alt={token.tokenPair.token.symbol}
                            />
                            <span className="flex text-sm md:text-base">
                              {token.tokenPair.token.symbol}
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative whitespace-nowrap md:whitespace-normal text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px] text-sm md:text-base"
                          onClick={() => handlerClickChangeTab("supply", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.marketData.marketSize?.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.marketData.marketSize?.toString()}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <HoverableAPY
                          type="supply"
                          market={token}
                          onClick={() => handlerClickChangeTab("supply", token)}
                        />
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[20px text-sm md:text-base]"
                          onClick={() => handlerClickChangeTab("supply", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.walletBalance}
                              tokenSymbol={token.tokenPair.token.symbol}
                              decimals={token.tokenPair.token.decimals}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.walletBalance}
                              decimals={token.tokenPair.token.decimals}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        {marketsWithBorrow.length > 0 && (
          <div className="pb-[5px] md:pb-[0px] panel-custom main border-custom mb-[20px] md:mb-[40px]">
            <div
              tabIndex={0}
              className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl"
            >
              Borrow
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithBorrow.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[115px] min-w-[115px] sm:w-[165px] sm:min-w-[165px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] md:pl-[30px] pr-[15px]">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[160px] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Total Borrow
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[110px] min-w-[110px] sm:w-[120px] sm:min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Borrow APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[20px]">
                    Your Borrow
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithBorrow.map((token: Market) => {
                  return (
                    <tr
                      key={token.id}
                      tabIndex={0}
                      role="row"
                      className="p-0 h-[80px] md:h-auto text-gray-400 border-t border__top__custom cursor-pointer"
                      onKeyUp={(e) =>
                        e.key === "Enter" &&
                        window.open(
                          `/markets/${token.tokenPair.token.symbol}/`,
                          "_blank"
                        )
                      }
                    >
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] md:pl-[30px] pr-[15px]"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="flex items-center justify-left">
                            <img
                              aria-hidden={true}
                              className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                              src={token.tokenPair.token.icon}
                              alt={token.tokenPair.token.symbol}
                            />
                            <span className="flex text-sm md:text-base">
                              {token.tokenPair.token.symbol}
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px] text-sm md:text-base"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.marketData?.totalBorrowed?.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.marketData?.totalBorrowed?.toString()}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <HoverableAPY
                          type="borrow"
                          market={token}
                          onClick={() => handlerClickChangeTab("borrow", token)}
                        />
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[20px text-sm md:text-base]"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.borrowBalance.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.borrowBalanceInUsd.toString()}
                              baseFactor="1"
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {marketsWithoutBorrow.length > 0 && (
          <div className="focus:outline-none pb-[5px] panel-custom main border-custom md:pb-[0px]">
            <div
              tabIndex={0}
              className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl"
            >
              Borrow Markets
            </div>
            <table className="custom__scroll w-full h-full table-fixed !pb-[23px] md:pb-[0px] md:pt-[0px]">
              <thead>
                <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B]">
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[115px] min-w-[115px] sm:w-[165px] sm:min-w-[165px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] md:pl-[30px] pr-[15px]">
                    Asset
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[160px] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Total Borrow
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[110px] min-w-[110px] sm:w-[120px] sm:min-w-[120px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[15px]">
                    Borrow APY
                  </th>
                  <th className="whitespace-nowrap font-nova font-[600] text-start text-xs w-[100%] min-w-[160px] sm:w-[160px] sm:min-w-[160px] md:text-sm pt-[15px] pb-[15px] md:pt-[18px] md:pb-[18px] pl-[15px] pr-[20px]">
                    Available Borrow
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithoutBorrow.map((token: Market) => {
                  return (
                    <tr
                      key={token.id}
                      tabIndex={0}
                      role="row"
                      className="p-0 h-[80px] md:h-auto text-gray-400 border-t border__top__custom cursor-pointer"
                      onKeyUp={(e) =>
                        e.key === "Enter" &&
                        window.open(
                          `/markets/${token.tokenPair.token.symbol}/`,
                          "_blank"
                        )
                      }
                    >
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] md:pl-[30px] pr-[15px]"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="flex items-center justify-left">
                            <img
                              aria-hidden={true}
                              className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                              src={token.tokenPair.token.icon}
                              alt={token.tokenPair.token.symbol}
                            />
                            <span className="flex text-sm md:text-base">
                              {token.tokenPair.token.symbol}
                            </span>
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px] text-sm md:text-base"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.marketData?.totalBorrowed?.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.marketData?.totalBorrowed?.toString()}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                      <td className="p-0">
                        <HoverableAPY
                          market={token}
                          type={"borrow"}
                          onClick={() => handlerClickChangeTab("borrow", token)}
                        />
                      </td>
                      <td className="p-0">
                        <a
                          className="flex items-center h-full relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] pl-[15px] pr-[20px text-sm md:text-base]"
                          onClick={() => handlerClickChangeTab("borrow", token)}
                          rel="noreferrer"
                        >
                          <div className="custom__hidden">
                            <DisplayPrice
                              amount={token.maxBorrowLiquidity.toString()}
                              tokenSymbol={token.tokenPair.token.symbol}
                            />
                          </div>
                          <div className="!flex items-center break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-xs text-center h-[20px] md:h-[22px] px-[5px] absolute top-[25px] md:top-[61px] left-[15px]">
                            <DisplayPrice
                              amount={token.maxBorrowLiquidity.toString()}
                              baseFactor={token.tokenPair.token.priceInUsd.toString()}
                              isCompact
                            />
                          </div>
                        </a>
                      </td>
                    </tr>
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
