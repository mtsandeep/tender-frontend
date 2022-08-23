/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useContext, useState } from "react";
import ReactModal from "react-modal";
import { TenderContext } from "~/contexts/tender-context";
import { Market } from "~/types/global";
import { toShortFiatString, toShortCryptoString } from "~/lib/ui";
import MarketRow from "~/components/two-panels/market-row";
import DepositFlow from "../deposit-flow";
import BorrowFlow from "../borrow-flow";

export default function TwoPanels() {
  let { markets } = useContext(TenderContext);
  let [openMarket, setOpenMarket] = useState<Market | null>(null);
  let [action, setAction] = useState<"depositing" | "borrowing">("depositing");

  const depositInto = (market: Market) => {
    setAction("depositing");
    setOpenMarket(market);
  };

  const borrowFrom = (market: Market) => {
    setAction("borrowing");
    setOpenMarket(market);
  };

  // markets with less than this amount are shown as not actively supplying or borrowing
  const DUST_LIMIT = 0.01;

  const marketsWithSupply = markets.filter(
    (m) => m.supplyBalance && m.supplyBalanceInUsd > DUST_LIMIT
  );

  const marketsWithBorrow = markets.filter(
    (m) => m.borrowBalance && m.borrowBalanceInUsd > 0.001
  );

  const marketsWithoutBorrow = markets.filter(
    (m) => !m.borrowBalance || m.borrowBalanceInUsd <= 0.001
  );

  const marketsWithoutSupply = markets.filter(
    (m) => !m.supplyBalance || m.supplyBalanceInUsd <= 0.001
  );

  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-[60px] md:gap-[20px] mb-14">
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

      <div>
        {marketsWithSupply.length > 0 && (
          <div className="pb-[5px] panel-custom border-custom mb-[20px] md:pb-[0px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-[18px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Supply
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithSupply.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="pr-[80px] pt-[13px] font-nova font-[500] p-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Asset
                  </th>
                  <th className="pr-[51px]  pt-[13px] font-nova font-[500] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Total Supply
                  </th>
                  <th className="pr-[50px]  pt-[13px] font-nova font-[500] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Supply APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[500] px-[15px] md:py-[20px] text-start text-[12px] md:text-[14px] md:pl-[10px] md:pr-[10px]">
                    Your Supply
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithSupply.map((m) => {
                  return (
                    <MarketRow
                      openMarket={() => depositInto(m)}
                      market={m}
                      key={m.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={m.tokenPair.token.icon}
                            alt={m.tokenPair.token.symbol}
                          />
                          <span className="flex text-[14px] md:text-[16px]">
                            {m.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {m.marketData.marketSize &&
                            toShortCryptoString(
                              Number(m.marketData.marketSize.toFixed(6))
                            )}{" "}
                          {m.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                          {`$${
                            m.marketData.marketSize &&
                            toShortFiatString(
                              m.marketData.marketSize *
                                m.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {m.marketData.depositApy}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="custom__hidden break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                            <img
                              className="w-[13px] h-[13px] mr-[4px]"
                              src="/images/wallet-icons/balance-icon.svg"
                              alt="..."
                            />
                            2.34%
                          </div>
                          <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:flex rounded-[15px]">
                            <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] panel-custom">
                              <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[16px] pb-[20px]">
                                <p className="text-[#818987] text-[12px] md:text-[14px] text-left leading-[140%] font-nova mb-[14px]">
                                  Participating in this DAI.e reserve gives
                                  annualized rewards.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <img
                                      className="w-[18px] h-[18px] mr-[8px]"
                                      src="/images/wallet-icons/balance-icon.svg"
                                      alt="..."
                                    />
                                    <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                      TND
                                    </span>
                                  </div>
                                  <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                    0.10 % APR
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="custom__arrow__tooltip w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[10px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(
                            Number(m.supplyBalance.toFixed(2))
                          )}{" "}
                          {m.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] md:left-[10px]">
                          {`$${m.supplyBalanceInUsd.toFixed(2)} USD`}
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
          <div>
            <div className="mb-[20px] font-nova text-white text-[16px] font-semibold md:mb-[15px] md:text-[18px]">
              All Markets
            </div>
            <div className="pb-[5px] md:pb-[0px] panel-custom border-custom">
              <table className="custom__scroll w-full h-full table-fixed">
                <thead>
                  <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                    <th className="pr-[80px] pt-[15px] p-[15px] font-nova font-[500] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Asset
                    </th>
                    <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[51px] pt-[15px] p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Total Supply
                    </th>
                    <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal pr-[50px] pt-[15px] p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Supply APY
                    </th>
                    <th className="py-[20px] pt-[13px] font-nova font-[500] px-[15px] md:py-[20px] text-start text-[12px] md:text-[14px] md:pl-[10px] md:pr-[10px]">
                      Wallet Balance
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketsWithoutSupply.map((m) => {
                    return (
                      <MarketRow
                        openMarket={() => depositInto(m)}
                        market={m}
                        key={m.id}
                      >
                        <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="flex items-center justify-left">
                            <img
                              className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                              src={m.tokenPair.token.icon}
                              alt={m.tokenPair.token.symbol}
                            />
                            <span className="flex text-[14px] md:text-[16px]">
                              {m.tokenPair.token.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="custom__hidden">
                            {m.marketData.marketSize &&
                              toShortCryptoString(
                                Number(m.marketData.marketSize.toFixed(6))
                              )}{" "}
                            {m.tokenPair.token.symbol}
                          </div>
                          <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                            {`$${
                              m.marketData.marketSize &&
                              toShortFiatString(
                                m.marketData.marketSize *
                                  m.tokenPair.token.priceInUsd
                              )
                            } USD`}
                          </div>
                        </td>
                        <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="custom__hidden">
                            {m.marketData.depositApy}
                          </div>
                          <div
                            className="group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="custom__hidden break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                              <img
                                className="w-[13px] h-[13px] mr-[4px]"
                                src="/images/wallet-icons/balance-icon.svg"
                                alt="..."
                              />
                              2.34%
                            </div>
                            <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:flex rounded-[15px]">
                              <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] panel-custom">
                                <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[16px] pb-[20px]">
                                  <p className="text-[#818987] text-[12px] md:text-[14px] text-left leading-[140%] font-nova mb-[14px]">
                                    Participating in this DAI.e reserve gives
                                    annualized rewards.
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <img
                                        className="w-[18px] h-[18px] mr-[8px]"
                                        src="/images/wallet-icons/balance-icon.svg"
                                        alt="..."
                                      />
                                      <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                        TND
                                      </span>
                                    </div>
                                    <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                      0.10 % APR
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="custom__arrow__tooltip w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                            </div>
                          </div>
                        </td>
                        <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[10px]">
                          <div className="custom__hidden">
                            {toShortCryptoString(
                              Number(m.walletBalance.toFixed(2))
                            )}{" "}
                            {m.tokenPair.token.symbol}
                          </div>
                          <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] md:left-[10px]">
                            {`$${toShortFiatString(
                              m.walletBalance * m.tokenPair.token.priceInUsd
                            )} USD`}
                          </div>
                        </td>
                      </MarketRow>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div>
        {marketsWithBorrow.length > 0 && (
          <div className="pb-[5px] md:pb-[0px] panel-custom border-custom mb-[20px] md:mb-[40px]">
            <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-[18px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
              Borrow
            </div>
            <table className="custom__scroll w-full h-full table-fixed">
              <thead>
                <tr
                  className={`w-full text-xs text-[#818987] ${
                    marketsWithBorrow.length && "border-b border-[#282C2B]"
                  }`}
                >
                  <th className="pr-[80px] pt-[13px] font-nova font-[500]  p-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Asset
                  </th>
                  <th className="pr-[51px]  pt-[13px] font-nova font-[500] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Total Borrow
                  </th>
                  <th className="pr-[50px]  pt-[13px] font-nova font-[500] whitespace-nowrap md:whitespace-normal p-[15px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                    Borrow APY
                  </th>
                  <th className="py-[20px] pt-[13px] font-nova font-[500] px-[15px] md:py-[20px] text-start text-[12px] md:text-[14px] md:pl-[10px] md:pr-[10px]">
                    Your Borrow
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketsWithBorrow.map((m) => {
                  return (
                    <MarketRow
                      openMarket={() => borrowFrom(m)}
                      market={m}
                      key={m.id}
                    >
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="flex items-center justify-left">
                          <img
                            className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                            src={m.tokenPair.token.icon}
                            alt={m.tokenPair.token.symbol}
                          />
                          <span className="flex text-[14px] md:text-[16px]">
                            {m.tokenPair.token.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {m.marketData?.totalBorrowed &&
                            toShortCryptoString(
                              Number(m.marketData.totalBorrowed.toFixed(6))
                            )}{" "}
                          {m.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                          {`$${
                            m.marketData?.totalBorrowed &&
                            toShortFiatString(
                              m.marketData.totalBorrowed *
                                m.tokenPair.token.priceInUsd
                            )
                          } USD`}
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                        <div className="custom__hidden">
                          {m.marketData.borrowApy}
                        </div>
                        <div
                          className="group"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="custom__hidden break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                            <img
                              className="w-[13px] h-[13px] mr-[4px]"
                              src="/images/wallet-icons/balance-icon.svg"
                              alt="..."
                            />
                            2.34%
                          </div>
                          <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:flex rounded-[15px]">
                            <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] panel-custom">
                              <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[16px] pb-[20px]">
                                <p className="text-[#818987] text-[12px] md:text-[14px] text-left leading-[140%] font-nova mb-[14px]">
                                  Participating in this DAI.e reserve gives
                                  annualized rewards.
                                </p>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <img
                                      className="w-[18px] h-[18px] mr-[8px]"
                                      src="/images/wallet-icons/balance-icon.svg"
                                      alt="..."
                                    />
                                    <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                      TND
                                    </span>
                                  </div>
                                  <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                    0.10 % APR
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="custom__arrow__tooltip w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                          </div>
                        </div>
                      </td>
                      <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[10px]">
                        <div className="custom__hidden">
                          {toShortCryptoString(
                            Number(m.borrowBalance.toFixed(2))
                          )}{" "}
                          {m.tokenPair.token.symbol}
                        </div>
                        <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] md:left-[10px]">
                          {`$${m.borrowBalanceInUsd.toFixed(2)} USD`}
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
          <div>
            <div className="mb-[20px] font-nova text-white text-[16px] font-semibold md:mb-[15px] md:text-[18px]">
              All Markets
            </div>
            <div className="pb-[5px] md:pb-[0px] panel-custom border-custom">
              <table className="custom__scroll w-full h-full table-fixed !pb-[23px] md:pb-[0px]  md:pt-[0px]">
                <thead>
                  <tr className="w-full text-xs text-[#818987] border-b border-[#282C2B] ">
                    <th className="pl-[15px] pt-[15px] font-nova font-[500] pr-[80px] pb-[15px] md:pr-[0px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Asset
                    </th>
                    <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal p-[15px] pr-[51px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Total Borrow
                    </th>
                    <th className="whitespace-nowrap font-nova font-[500] md:whitespace-normal p-[15px] pr-[51px] md:pl-[30px] md:pr-[0px] text-start text-[12px] md:text-[14px]">
                      Borrow APY
                    </th>
                    <th className="py-[20px] pt-[13px] font-nova font-[500] px-[15px] md:py-[20px] text-start text-[12px] md:text-[14px] md:pl-[10px] md:pr-[10px]">
                      Available Borrow
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {marketsWithoutBorrow.map((m) => {
                    return (
                      <MarketRow
                        openMarket={() => borrowFrom(m)}
                        market={m}
                        key={m.id}
                      >
                        <td className="relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="flex items-center justify-left">
                            <img
                              className="w-[24px] h-[24px] mr-[10px] md:mr-[16px] md:w-[40px] md:h-[40px]"
                              src={m.tokenPair.token.icon}
                              alt={m.tokenPair.token.symbol}
                            />
                            <span className="flex text-[14px] md:text-[16px]">
                              {m.tokenPair.token.symbol}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap md:whitespace-normal relative text-white font-nova font-normal pl-[14px] pb-[30px] md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="custom__hidden">
                            {m.marketData?.totalBorrowed &&
                              toShortCryptoString(
                                Number(m.marketData.totalBorrowed.toFixed(6))
                              )}{" "}
                            {m.tokenPair.token.symbol}
                          </div>
                          <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                            {`$${
                              m.marketData?.totalBorrowed &&
                              toShortFiatString(
                                m.marketData.totalBorrowed *
                                  m.tokenPair.token.priceInUsd
                              )
                            } USD`}
                          </div>
                        </td>
                        <td className="relative pl-[15px] pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] md:pl-[30px] md:pr-[0px]">
                          <div className="custom__hidden">
                            {m.marketData.borrowApy}
                          </div>
                          <div
                            className="group"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="custom__hidden break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] left-[14px] md:left-[30px]">
                              <img
                                className="w-[13px] h-[13px] mr-[4px]"
                                src="/images/wallet-icons/balance-icon.svg"
                                alt="..."
                              />
                              2.34%
                            </div>
                            <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:flex rounded-[15px]">
                              <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] panel-custom">
                                <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[16px] pb-[20px]">
                                  <p className="text-[#818987] text-[12px] md:text-[14px] text-left leading-[140%] font-nova mb-[14px]">
                                    Participating in this DAI.e reserve gives
                                    annualized rewards.
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <img
                                        className="w-[18px] h-[18px] mr-[8px]"
                                        src="/images/wallet-icons/balance-icon.svg"
                                        alt="..."
                                      />
                                      <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                        TND
                                      </span>
                                    </div>
                                    <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                      0.10 % APR
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="custom__arrow__tooltip w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                            </div>
                          </div>
                        </td>
                        <td className="relative text-white font-nova font-normal pb-[30px] md:pt-[24px] md:pb-[39px] md:pr-[30px] pr-[15px] md:pl-[10px]">
                          <div className="custom__hidden">
                            {toShortCryptoString(
                              Number(m.maxBorrowLiquidity.toFixed(2))
                            )}{" "}
                            {m.tokenPair.token.symbol}
                          </div>
                          <div className="custom__hidden break-words bg-dark-green text-dark-green rounded-md text-[11px] md:text-[12px] text-center h-[20px] md:h-[22px] px-[5px] absolute top-[40px] md:top-[57px] md:left-[10px]">
                            {`$${toShortFiatString(
                              m.maxBorrowLiquidity *
                                m.tokenPair.token.priceInUsd
                            )} USD`}
                          </div>
                        </td>
                      </MarketRow>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
