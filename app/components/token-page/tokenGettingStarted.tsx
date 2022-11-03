import ReactModal from "react-modal";
import { useState } from "react";
import type { Market } from "~/types/global";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useCollateralFactor } from "~/hooks/use-collateral-factor";
import { displayErrorMessage } from "../borrow-flow/displayErrorMessage";
type Props = {
  market: Market;
};
type ActiveTab = "supply" | "withdraw" | "repay" | "borrow" | null;

const TabSelector = ({ handlerTabSwitch, activeTab }) => {
  return (
    <div className="px-[16px] py-[20px] md:w-full overflow-x-auto md:overflow-visible flex flex-1 md:flex-col border-b-[1px] border-[#B5CFCC2B] md:border-r-[1px] md:border-b-none md:p-[30px]">
      <div className="flex flex-1 items-center md:items-start min-w-max md:flex-col">
        <button
          onClick={() => handlerTabSwitch("supply")}
          className={`${
            activeTab === "supply"
              ? "text-[#14F195] border-[1px] border-[#14F195]"
              : "text-[#ADB5B3]"
          } text-[12px] mr-[8px] md:mr-[0] w-[94px] h-[36px] font-space text-[13pxmd:] uppercase md:w-[120px] md:h-[44px] bg-[#181D1B] md:text-[13px] rounded-[6px] font-bold font-space md:mb-[16px]`}
        >
          supply
        </button>
        <button
          onClick={() => handlerTabSwitch("withdraw")}
          className={`${
            activeTab === "withdraw"
              ? "text-[#14F195] border-[1px] border-[#14F195]"
              : "text-[#ADB5B3]"
          } text-[12px] mr-[8px] md:mr-[0] w-[94px] h-[36px] font-space uppercase md:w-[120px] md:h-[44px] bg-[#181D1B] rounded-[6px] font-bold md:text-[13px] font-space md:mb-[16px]`}
        >
          Withdraw
        </button>
        <button
          onClick={() => handlerTabSwitch("borrow")}
          className={`${
            activeTab === "borrow"
              ? "text-[#00E0FF] border-[1px] border-[#00E0FF]"
              : "text-[#ADB5B3]"
          } text-[12px] mr-[8px] md:mr-[0] w-[94px] h-[36px] font-space uppercase md:w-[120px] md:h-[44px] bg-[#181D1B] rounded-[6px] font-bold md:text-[13px] font-space md:mb-[16px]`}
        >
          Borrow
        </button>
        <button
          onClick={() => handlerTabSwitch("repay")}
          className={`${
            activeTab === "repay"
              ? "text-[#00E0FF] border-[1px] border-[#00E0FF]"
              : "text-[#ADB5B3]"
          } text-[12px] mr-[8px] md:mr-[0] w-[94px] h-[36px] font-space uppercase md:w-[120px] md:h-[44px] bg-[#181D1B] rounded-[6px] font-bold md:text-[13px] font-space md:mb-[16px]`}
        >
          Repay
        </button>
      </div>
    </div>
  );
};

const TokenGettingStarted = ({ market }: Props) => {
  const [flowType, setFlowType] =
    useState<"depositing" | "borrowing" | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const isEnabled = true;
  function closeModal() {
    setFlowType(null);
    setActiveTab(null);
  }
  const borrowFlowHandler = () => {
    setActiveTab("borrow");
    setFlowType("borrowing");
  };
  const supplyFlowHandler = () => {
    setActiveTab("supply");
    setFlowType("depositing");
  };
  const handlerTabSwitch = (tab: string) => {
    if (tab === "supply" || tab === "withdraw") {
      setActiveTab(tab);
      setFlowType("depositing");
    }
    if (tab === "borrow" || tab === "repay") {
      setActiveTab(tab);
      setFlowType("borrowing");
    }
  };
  return (
    <>
      <ReactModal
        shouldCloseOnOverlayClick={true}
        isOpen={flowType !== null}
        onRequestClose={() => setFlowType(null)}
        portalClassName="modal"
        style={{
          content: {
            inset: "unset",
            margin: "20px auto",
            zoom: window.innerWidth > 768 ? "75%" : "100%",
            position: "relative",
            maxWidth: 601,
          },
        }}
        closeTimeoutMS={200}
      >
        {flowType && (
          <div className="flex w-full h-full">
            {window.innerWidth >= 768 && (
              <TabSelector
                handlerTabSwitch={handlerTabSwitch}
                activeTab={activeTab}
              />
            )}

            {flowType &&
              (flowType === "depositing" ? (
                activeTab === "supply" ? (
                  //supply modal
                  <div className="flex flex-col w-full">
                    <div className="pt-5 pb-[20px] md:pb-[40px] bg-[#151515] relative border-[#B5CFCC2B] border-b">
                      <img
                        onClick={() => closeModal()}
                        className="absolute right-[20px] top-[28px] w-[16px] h-[16px] cursor-pointer"
                        src="/images/ico/close.svg"
                        alt="close"
                      />
                      <div className="flex font-nova text-sm font-normal md:text-base align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
                        <img
                          src={market.icon}
                          className="w-[32px] mr-3"
                          alt="icon"
                        />
                        {market.symbol}
                      </div>
                      {!isEnabled ? (
                        <div className="flex flex-col items-center mt-[29px] rounded-2xl px-4 pb-[18px]">
                          <img
                            src={market.icon}
                            className="w-[58px] h-[58px] md:w-[70px] md:h-[70px]"
                            alt="icon"
                          />
                          <div className=" max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-4 mb-[10px]">
                            To supply or withdraw {market.symbol} on the
                            Tender.fi protocol, you need to enable it first.
                          </div>
                        </div>
                      ) : (
                        <div className="relative flex flex-col justify-center items-center overflow-hidden pt-[50px] font-space min-h-[70px] h-[70px] md:pt-[83px] box-content">
                          <input
                            tabIndex={0}
                            style={{ height: 70, minHeight: 70 }}
                            className={`input__center__custom z-20 max-w-[300px] w-full bg-transparent text-white text-center outline-none `}
                            placeholder="0"
                          />
                          <div className="absolute custom_max bottom-[22px] right-0 mr-3.5 text-right z-10">
                            <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
                              Max Available
                            </div>

                            <div
                              className={`text-[#14F195] custom_max_text font-nova font-bold text-xs sm:text-base mb-4`}
                            >
                              Max Available
                            </div>

                            <button
                              tabIndex={0}
                              className={`text-xs custom_max_btn border-2 border-[#14F195] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[#14F195]`}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {window.innerWidth < 768 && activeTab === "supply" && (
                      <TabSelector
                        handlerTabSwitch={handlerTabSwitch}
                        activeTab={activeTab}
                      />
                    )}
                    {/* Sub Navigation */}
                    <div className="px-[15px] pb-[0] pt-[30px] lg:px-[30px] md:py-[30px] bg-transparent md:bg-[#151515]">
                      <div className="flex flex-col items-start mb-[10px] text-gray-400">
                        <a
                          href={`/markets/${market.symbol}`}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-pointer flex items-center font-bold font-nova text-xs sm:text-sm text-white hover:text-[#14F195]"
                        >
                          Supply Rates
                          <svg
                            viewBox="0 0 16 16"
                            className="ml-[10px] w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
                            fill="none"
                          >
                            <path
                              d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                              fill="#14F195"
                            />
                          </svg>
                        </a>
                        <div className="flex w-full sm:w-full items-center pb-[40px] md:pb-[24px] pt-[10px]  font-nova">
                          <div className="flex mt-0 md:mt-[10px] w-full items-end justify-between">
                            <div
                              tabIndex={0}
                              className="text-[#ADB5B3] text-sm font-nova md:text-base font-normal line-dashed-grey decoration-[#ADB5B3] group relative justify-between cursor-pointer"
                            >
                              Supply APY
                              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
                                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          aria-hidden={true}
                                          className="max-w-[18px]"
                                          src={market.icon}
                                          alt="..."
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          {market.symbol}
                                        </span>
                                      </div>
                                      <span
                                        className={`font-nova text-sm font-normal `}
                                      >
                                        depApy
                                      </span>
                                    </div>
                                    <div className="flex justify-between gap-[30px]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          aria-hidden={true}
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
                            <span className="text-sm text-white sm:text-base truncate max-w-[30px]">
                              {market.supplyApy}
                            </span>
                          </div>
                        </div>
                        <div className="flex self-center justify-center h-[60px] w-full">
                          <button className="uppercase text-[15px] justify-center max-w-[250px] h-[50px] flex items-center md:h-[60px]  text-center text-black font-space font-bold md:text-base sm:text-lg rounded w-full bg-[#14f195] md:min-w-[308px] md:max-w-[400px]">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full">
                    <div className="pt-5  pb-[20px] md:pb-[40px] bg-[#151515] relative border-[#B5CFCC2B] border-b">
                      <img
                        onClick={() => closeModal()}
                        className="absolute right-[20px] sm:right-[22px] top-[28px] w-[16px] h-[16px] cursor-pointer"
                        src="/images/ico/close.svg"
                        alt="close"
                      />
                      <div className="flex align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
                        <img
                          src={market.icon}
                          className="w-[32px] mr-3"
                          alt="icon"
                        />
                        {market.symbol}
                      </div>
                      {!isEnabled ? (
                        <div className="flex flex-col items-center mt-[29px] rounded-2xl px-4 pb-[18px]">
                          <img
                            src={market.icon}
                            className="w-[70px] h-[70px]"
                            alt="icon"
                          />
                          <div className="max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-4 mb-[10px]">
                            To supply or withdraw {market.symbol} on the
                            Tender.fi protocol, you need to enable it first.
                          </div>
                        </div>
                      ) : (
                        // withdraw modal
                        <div className=" relative flex flex-col w-full justify-center items-center overflow-hidden font-space min-h-[70px] h-[70px] pt-[50px] md:pt-[83px] box-content">
                          <input
                            tabIndex={0}
                            style={{ height: 70, minHeight: 70 }}
                            className={`input__center__custom z-20 max-w-[300px] w-full bg-transparent text-white text-center outline-none `}
                            placeholder="0"
                          />
                          <div className="absolute custom_max bottom-[22px] right-0 mr-3.5 text-right sm:mr-[20px] z-10">
                            <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
                              Max Available
                            </div>

                            <div
                              className={`text-[#14F195] custom_max_text font-nova font-bold text-xs sm:text-base mb-4`}
                            >
                              Max Available
                            </div>

                            <button
                              tabIndex={0}
                              className={`text-xs custom_max_btn border-2 border-[#14F195] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[#14F195]`}
                            >
                              MAX
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {window.innerWidth < 768 && activeTab === "withdraw" && (
                      <TabSelector
                        handlerTabSwitch={handlerTabSwitch}
                        activeTab={activeTab}
                      />
                    )}
                    {/* Sub Navigation */}
                    <div className="px-[15px] pb-[0] pt-[30px] lg:px-[30px] md:py-[30px] bg-transparent md:bg-[#151515]">
                      <div className="flex flex-col items-start mb-[10px] text-gray-400">
                        <a
                          href={`/markets/${market.symbol}`}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-pointer flex items-center font-bold font-nova text-xs sm:text-sm text-white hover:text-[#14F195]"
                        >
                          Supply Market
                          <svg
                            viewBox="0 0 16 16"
                            className="ml-[10px] w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
                            fill="none"
                          >
                            <path
                              d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                              fill="#14F195"
                            />
                          </svg>
                        </a>
                        <div className="flex w-full sm:w-full items-center pb-[40px] md:pb-[24px] pt-[10px]  font-nova">
                          <div className="flex mt-0 md:mt-[10px] w-full  justify-between">
                            <div
                              tabIndex={0}
                              className="text-[#ADB5B3] text-sm font-nova md:text-base font-normal line-dashed-grey decoration-[#ADB5B3] group relative justify-between cursor-pointer"
                            >
                              Supply APY
                              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
                                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          aria-hidden={true}
                                          className="max-w-[18px]"
                                          src={market.icon}
                                          alt="..."
                                        />
                                        <span className="font-nova text-white text-sm font-normal">
                                          {market.symbol}
                                        </span>
                                      </div>
                                      <span
                                        className={`font-nova text-sm font-normal `}
                                      >
                                        depApy
                                      </span>
                                    </div>
                                    <div className="flex justify-between gap-[30px]">
                                      <div className="flex gap-[8px]">
                                        <img
                                          aria-hidden={true}
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
                            <span className="text-sm text-white sm:text-base truncate max-w-[30px]">
                              {market.supplyApy}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="font-bold mr-3 text-xs text-white font-nova sm:text-sm w-full pb-[15px]">
                            Borrow Limit
                          </div>

                          <div className="flex justify-between pb-[15px] items-center text-[#ADB5B3] font-nova text-sm sm:text-base ">
                            <div className="flex-grow ">Borrow Capacity</div>
                            <div className="flex text-white items-center text-base font-nova">
                              <div className="text-sm sm:text-base">20</div>
                              <span className="mx-[12px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <mask
                                    id="mask0_1221_9444"
                                    style={{ maskType: "alpha" }}
                                    maskUnits="userSpaceOnUse"
                                    x="0"
                                    y="0"
                                    width="24"
                                    height="24"
                                  >
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="url(#pattern0)"
                                    />
                                  </mask>
                                  <g mask="url(#mask0_1221_9444)">
                                    <rect
                                      width="24"
                                      height="24"
                                      fill="
                                      #14F195"
                                    />
                                  </g>
                                  <defs>
                                    <pattern
                                      id="pattern0"
                                      patternContentUnits="objectBoundingBox"
                                      width="1"
                                      height="1"
                                    >
                                      <use
                                        href="#image0_1221_9444"
                                        transform="scale(0.00195312)"
                                      />
                                    </pattern>
                                    <image
                                      id="image0_1221_9444"
                                      width="512"
                                      height="512"
                                      href="data:image/png;base64,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"
                                    />
                                  </defs>
                                </svg>
                              </span>
                              <div className="flex text-sm sm:text-base items-center">
                                $00 $
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base pb-[35px]">
                            <div className="flex-grow ">Borrow Used</div>
                            <div className="text-white text-sm sm:text-base font-nova">
                              <div className="flex items-center">$00 $</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex self-center justify-center h-[60px] w-full">
                          <button className="uppercase justify-center max-w-[250px] h-[50px] flex items-center md:h-[60px]  text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14f195] md:min-w-[308px] md:max-w-[400px]">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : activeTab === "borrow" ? (
                //borrow modal
                <div className="flex flex-col w-full">
                  <div className="pt-5 pb-[20px] md:pb-[40px] bg-[#151515] relative border-[#B5CFCC2B] border-b">
                    <img
                      onClick={() => closeModal()}
                      className="absolute right-[20px] sm:right-[22px] top-[28px] w-[16px] h-[16px] cursor-pointer"
                      src="/images/ico/close.svg"
                      alt="close"
                    />
                    <div className="flex align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
                      <img
                        src={market.icon}
                        className="w-[32px] mr-3"
                        alt="icon"
                      />
                      {market.symbol}
                    </div>
                    {!isEnabled ? (
                      <div className="flex flex-col items-center mt-[29px] rounded-2xl px-4 pb-[18px]">
                        <img
                          src={market.icon}
                          className="w-[70px] h-[70px]"
                          alt="icon"
                        />
                        <div className="max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-4 mb-[10px]">
                          To supply or withdraw {market.symbol} on the Tender.fi
                          protocol, you need to enable it first.
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex flex-col justify-center items-center overflow-hidden pt-[50px] font-space min-h-[70px] h-[70px] md:pt-[83px] box-content">
                        <input
                          tabIndex={0}
                          style={{ height: 70, minHeight: 70 }}
                          className={`input__center__custom z-20 max-w-[300px] w-full bg-transparent text-white text-center outline-none `}
                          placeholder="0"
                        />
                        <div className="absolute custom_max bottom-[22px] right-0 mr-3.5 text-right sm:mr-[20px] z-10">
                          <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
                            Max Available
                          </div>

                          <div
                            className={`text-[#00E0FF] custom_max_text font-nova font-bold text-xs sm:text-base mb-4`}
                          >
                            Max Available
                          </div>

                          <button
                            tabIndex={0}
                            className={`text-xs custom_max_btn border-2 border-[#00E0FF] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[#00E0FF]`}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {window.innerWidth < 768 && activeTab === "borrow" && (
                    <TabSelector
                      handlerTabSwitch={handlerTabSwitch}
                      activeTab={activeTab}
                    />
                  )}
                  {/* Sub Navigation */}
                  <div className="px-[15px] pb-[0] pt-[30px] lg:px-[30px] md:py-[30px] bg-transparent md:bg-[#151515]">
                    <div className="flex flex-col items-start mb-[10px] text-gray-400">
                      <a
                        href={`/markets/${market.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer flex items-center font-bold font-nova text-xs sm:text-sm text-white hover:text-[#00E0FF]"
                      >
                        Borrow Market
                        <svg
                          viewBox="0 0 16 16"
                          className="ml-[10px] w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
                          fill="none"
                        >
                          <path
                            d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                            fill="#00E0FF"
                          />
                        </svg>
                      </a>
                      <div className="flex w-full sm:w-full items-center pb-[40px] md:pb-[24px] pt-[10px]  font-nova">
                        <div className="flex mt-0 md:mt-[10px] w-full  justify-between">
                          <div
                            tabIndex={0}
                            className="text-[#ADB5B3] text-sm font-nova md:text-base font-normal line-dashed-grey decoration-[#ADB5B3] group relative justify-between cursor-pointer"
                          >
                            Borrow APY
                            <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
                              <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                  <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                    <div className="flex gap-[8px]">
                                      <img
                                        aria-hidden={true}
                                        className="max-w-[18px]"
                                        src={market.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {market.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal `}
                                    >
                                      depApy
                                    </span>
                                  </div>
                                  <div className="flex justify-between gap-[30px]">
                                    <div className="flex gap-[8px]">
                                      <img
                                        aria-hidden={true}
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
                          <span className="text-sm text-white sm:text-base truncate max-w-[30px]">
                            {market.supplyApy}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="font-bold mr-3 font-nova text-white text-xs sm:text-sm w-full pb-[15px]">
                          Borrow Limit
                        </div>

                        <div className="flex justify-between pb-[15px] items-center text-[#ADB5B3] font-nova text-sm sm:text-base ">
                          <div className="flex-grow ">Borrow Capacity</div>
                          <div className="flex text-white items-center text-base font-nova">
                            <div className="text-sm sm:text-base">22</div>
                            <span className="mx-[12px]">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <mask
                                  id="mask0_1221_9444"
                                  style={{ maskType: "alpha" }}
                                  maskUnits="userSpaceOnUse"
                                  x="0"
                                  y="0"
                                  width="24"
                                  height="24"
                                >
                                  <rect
                                    width="24"
                                    height="24"
                                    fill="url(#pattern0)"
                                  />
                                </mask>
                                <g mask="url(#mask0_1221_9444)">
                                  <rect width="24" height="24" fill="#00E0FF" />
                                </g>
                                <defs>
                                  <pattern
                                    id="pattern0"
                                    patternContentUnits="objectBoundingBox"
                                    width="1"
                                    height="1"
                                  >
                                    <use
                                      href="#image0_1221_9444"
                                      transform="scale(0.00195312)"
                                    />
                                  </pattern>
                                  <image
                                    id="image0_1221_9444"
                                    width="512"
                                    height="512"
                                    href="data:image/png;base64,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"
                                  />
                                </defs>
                              </svg>
                            </span>
                            <div className="text-sm sm:text-base flex items-center">
                              $00 $
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base pb-[35px]">
                          <div className="flex-grow ">Borrow Used</div>
                          <div className="text-white text-sm sm:text-base font-nova">
                            <div className="flex items-center">$00 $</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex self-center justify-center h-[60px] w-full">
                        <button className="uppercase justify-center max-w-[250px] h-[50px] flex items-center md:h-[60px]  text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#00E0FF] md:min-w-[308px] md:max-w-[400px]">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                //repay modal
                <div className="flex flex-col w-full">
                  <div className="pt-5 pb-[20px] md:pb-[40px] bg-[#151515] relative border-[#B5CFCC2B] border-b">
                    <img
                      onClick={() => closeModal()}
                      className="absolute right-[20px] sm:right-[22px] top-[28px] w-[16px] h-[16px] cursor-pointer"
                      src="/images/ico/close.svg"
                      alt="close"
                    />
                    <div className="flex align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
                      <img
                        src={market.icon}
                        className="w-[32px] mr-3"
                        alt="icon"
                      />
                      {market.symbol}
                    </div>
                    {!isEnabled ? (
                      <div className="flex flex-col items-center mt-[29px] rounded-2xl px-4 pb-[18px]">
                        <img
                          src={market.icon}
                          className="w-[70px] h-[70px]"
                          alt="icon"
                        />
                        <div className="max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-4 mb-[10px]">
                          To supply or withdraw {market.symbol} on the Tender.fi
                          protocol, you need to enable it first.
                        </div>
                      </div>
                    ) : (
                      <div className="relative flex flex-col justify-center items-center overflow-hidden pt-[50px] font-space min-h-[70px] h-[70px] md:pt-[83px] box-content">
                        <input
                          tabIndex={0}
                          style={{ height: 70, minHeight: 70 }}
                          className={`input__center__custom z-20 max-w-[300px] w-full bg-transparent text-white text-center outline-none `}
                          placeholder="0"
                        />
                        <div className="absolute custom_max bottom-[22px] right-0 mr-3.5 text-right sm:mr-[20px] z-10">
                          <div className="text-[#818987] text-xs m-auto font-nova font-normal ">
                            Max Available
                          </div>

                          <div
                            className={`text-[#00E0FF] custom_max_text font-nova font-bold text-xs sm:text-base mb-4`}
                          >
                            Max Available
                          </div>

                          <button
                            tabIndex={0}
                            className={`text-xs custom_max_btn border-2 border-[#00E0FF] py-1 px-3 rounded-lg bg-[#162421] uppercase text-[#00E0FF]`}
                          >
                            MAX
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {window.innerWidth < 768 && activeTab === "repay" && (
                    <TabSelector
                      handlerTabSwitch={handlerTabSwitch}
                      activeTab={activeTab}
                    />
                  )}
                  {/* Sub Navigation */}
                  <div className="px-[15px] pb-[0] pt-[30px] lg:px-[30px] md:py-[30px] bg-transparent md:bg-[#151515]">
                    <div className="flex flex-col items-start mb-[10px] text-gray-400">
                      <a
                        href={`/markets/${market.symbol}`}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer flex items-center font-bold font-nova text-xs sm:text-sm text-white hover:text-[#00E0FF]"
                      >
                        Borrow Market
                        <svg
                          viewBox="0 0 16 16"
                          className="ml-[10px] w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
                          fill="none"
                        >
                          <path
                            d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                            fill="#00E0FF"
                          />
                        </svg>
                      </a>
                      <div className="flex w-full sm:w-full items-center pb-[40px] md:pb-[24px] pt-[10px]  font-nova">
                        <div className="flex mt-0 md:mt-[10px] w-full items-end justify-between">
                          <div
                            tabIndex={0}
                            className="text-[#ADB5B3] text-sm font-nova md:text-base font-normal line-dashed-grey decoration-[#ADB5B3] group relative justify-between cursor-pointer"
                          >
                            Borrow APY
                            <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
                              <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                                <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                                  <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                                    <div className="flex gap-[8px]">
                                      <img
                                        aria-hidden={true}
                                        className="max-w-[18px]"
                                        src={market.icon}
                                        alt="..."
                                      />
                                      <span className="font-nova text-white text-sm font-normal">
                                        {market.symbol}
                                      </span>
                                    </div>
                                    <span
                                      className={`font-nova text-sm font-normal `}
                                    >
                                      depApy
                                    </span>
                                  </div>
                                  <div className="flex justify-between gap-[30px]">
                                    <div className="flex gap-[8px]">
                                      <img
                                        aria-hidden={true}
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
                          <span className="text-sm text-white sm:text-base truncate max-w-[30px]">
                            {market.supplyApy}
                          </span>
                        </div>
                      </div>
                      <div className="flex self-center justify-center h-[60px] w-full">
                        <button className="uppercase justify-center max-w-[250px] h-[50px] flex items-center md:h-[60px]  text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#00E0FF] md:min-w-[308px] md:max-w-[400px]">
                          Enable
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </ReactModal>
      <div
        tabIndex={0}
        className="bg-white mb-[60px] leading-7 font-bold font-space  md:pl-[30px] pl-[15px] pb-[30px] pt-[23px] mb-[20px] panel-custom border-custom font-nova w-full"
      >
        <p className="mb-[24px]  md:leading-[22.4px] leading-7 font-bold text-[16px] lg:text-[22px] ">
          Getting Started
        </p>
        <div className="flex">
          <button
            onClick={borrowFlowHandler}
            className="leading-[22.1px] font-bold font-space text-[13px] mr-[12px] lg:mr-[20px] bg-[#00E0FF] text-black
      rounded-[6px] lg:w-[144px] lg:h-[44px] min-w-[100px] h-[40px] uppercase "
          >
            Borrow
          </button>

          <button
            onClick={supplyFlowHandler}
            className="leading-[22.1px] font-bold font-space text-[13px] mr-[10px] lg:mr-[20px] bg-[#14F195] text-black
      rounded-[6px] lg:w-[144px] lg:h-[44px] min-w-[100px] h-[40px] uppercase "
          >
            Supply
          </button>
          <div className="round-btn-grad ">
            <button
              aria-label="more"
              className="flex gap-[3px] items-center justify-center bg-[#181D1B] min-w-[39px] min-h-[39px] lg:w-11 lg:h-11 rounded-full"
            >
              <span className="inline-block bg-[#9DA7A3] min-w-[3.64px] min-h-[3.64px] lg:w-1 lg:h-1 rounded-full"></span>
              <span className="inline-block bg-[#9DA7A3] min-w-[3.64px] min-h-[3.64px] lg:w-1 lg:h-1 rounded-full"></span>
              <span className="inline-block bg-[#9DA7A3] min-w-[3.64px] min-h-[3.64px] lg:w-1 lg:h-1 rounded-full"></span>
            </button>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenGettingStarted;
