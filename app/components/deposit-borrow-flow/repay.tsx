/* eslint-disable no-useless-escape */
import type { Market, TokenPair } from "~/types/global";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type {
  JsonRpcSigner,
  TransactionReceipt,
} from "@ethersproject/providers";
import { toMaxString } from "~/lib/ui";

import toast from "react-hot-toast";

import Max from "~/components/max";

import { enable, repay } from "~/lib/tender";
import { useValidInput } from "~/hooks/use-valid-input";
import BorrowBalance from "../fi-modal/borrow-balance";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";

import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { useNewTotalBorrowedAmountInUsd } from "~/hooks/use-new-total-borrowed-amount-in-usd";
import { shrinkInputClass } from "~/lib/ui";
import { formatApy } from "~/lib/apy-calculations";
import { displayErrorMessage } from "./displayErrorMessage";
import type { ActiveTab } from "./deposit-borrow-flow";
import { checkColorClass } from "../two-panels/two-panels";

export interface RepayProps {
  closeModal: Function;
  signer: JsonRpcSigner | null | undefined;
  borrowedAmount: number;
  borrowLimitUsed: string;
  walletBalance: number;
  borrowLimit: number;
  tokenPairs: TokenPair[];
  totalBorrowedAmountInUsd: number;
  market: Market;
  initialValue: string;
  changeInitialValue: (value: string) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tabs: { name: ActiveTab; color: string; show: boolean }[];
}

export default function Repay({
  market,
  closeModal,
  signer,
  borrowedAmount,
  borrowLimit,
  borrowLimitUsed,
  walletBalance,
  totalBorrowedAmountInUsd,
  initialValue,
  changeInitialValue,
  activeTab,
  setActiveTab,
  tabs,
}: RepayProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  const [isEnabled, setIsEnabled] = useState<boolean>(
    market.hasSufficientAllowance
  );
  const [isEnabling, setIsEnabling] = useState<boolean>(false);

  const [isRepaying, setIsRepaying] = useState<boolean>(false);
  const [txnHash, setTxnHash] = useState<string>("");

  const maxRepayableAmount = Math.min(borrowedAmount, walletBalance);

  const inputEl = useRef<HTMLInputElement>(null);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const inputTextClass = shrinkInputClass(initialValue.length);

  const newTotalBorrowedAmountInUsd = useNewTotalBorrowedAmountInUsd(
    market.tokenPair,
    totalBorrowedAmountInUsd,
    // Value is negative because you're repaying which is reducing the $ amount that you have borrowed
    -initialValue
  );

  const newBorrowLimitUsed = useBorrowLimitUsed(
    newTotalBorrowedAmountInUsd,
    borrowLimit
  );

  const [isValid, validationDetail] = useValidInput(
    initialValue,
    0,
    maxRepayableAmount,
    parseFloat(newBorrowLimitUsed),
    tokenDecimals
  );

  const { updateTransaction, setIsWaitingToBeMined } =
    useContext(TenderContext);

  useEffect(() => {
    setIsEnabled(market.hasSufficientAllowance);
  }, [market.hasSufficientAllowance]);

  useEffect(() => {
    inputEl?.current && inputEl.current.focus();

    if (
      (activeTab === "repay" || activeTab === "borrow") &&
      scrollBlockRef?.current
    ) {
      scrollBlockRef.current.scrollLeft = 400;
    }
  }, [activeTab]);

  // @todo refactor: move to separate hook file
  const handleCheckValue = useCallback(
    (e: any) => {
      const { value } = e.target;
      const formattedValue = value
        .replace(/[^.\d]+/g, "")
        .replace(/^([^\.]*\.)|\./g, "$1");
      const decimals = (formattedValue.split(".")[1] || []).length;

      if (
        formattedValue.split("")[0] === "0" &&
        formattedValue.length === 2 &&
        formattedValue.split("")[1] !== "."
      ) {
        return false;
      } else {
        if (
          formattedValue.split("")[0] === "0" &&
          formattedValue.length > 1 &&
          formattedValue
            .split("")
            .every((item: string) => item === formattedValue.split("")[0])
        ) {
          return false;
        } else {
          if (
            formattedValue === "" ||
            (formattedValue.match(/^(([1-9]\d*)|0|.)(.|.\d+)?$/) &&
              formattedValue.length <= 20 &&
              decimals <= tokenDecimals)
          ) {
            changeInitialValue(formattedValue);
          }
        }
      }
    },
    [tokenDecimals, changeInitialValue]
  );

  const borrowApy = parseFloat(market.marketData.borrowApy) * -1;
  const borrowApyFormatted = formatApy(borrowApy);

  return (
    <div>
      {txnHash !== "" ? (
        <ConfirmingTransaction
          txnHash={txnHash}
          stopWaitingOnConfirmation={() => closeModal()}
        />
      ) : (
        <div>
          <div className="bg-[#151515] relative border-[#B5CFCC2B] border-b pb-[30px]">
            <svg
              onClick={() => closeModal()}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="absolute right-[16px] sm:right-[22px] top-[24px] cursor-pointer group"
            >
              <path
                className="group-hover:fill-[#00E0FF]"
                d="M22.0567 3.05669C22.4961 3.49614 22.4961 4.20864 22.0567 4.64809L14.148 12.5567L22.0567 20.4654C22.4961 20.9048 22.4961 21.6173 22.0567 22.0568C21.6172 22.4962 20.9047 22.4962 20.4653 22.0568L12.5566 14.1481L4.64799 22.0568C4.20854 22.4962 3.49605 22.4962 3.05659 22.0568C2.61714 21.6173 2.61714 20.9048 3.05659 20.4654L10.9652 12.5567L3.05659 4.64809C2.61714 4.20864 2.61714 3.49614 3.05659 3.05669C3.49605 2.61723 4.20854 2.61723 4.64799 3.05669L12.5566 10.9653L20.4653 3.05669C20.9047 2.61724 21.6172 2.61724 22.0567 3.05669Z"
                fill="white"
              />
            </svg>
            <div className="flex align-middle justify-center items-center py-[20px] border-b-[1px] border-[#282C2B]">
              <img
                src={market.tokenPair.token.icon}
                className="w-[32px] mr-3"
                alt="icon"
              />
              {market.tokenPair.token.symbol}
            </div>
            {!isEnabled ? (
              <div className="flex flex-col items-center mt-[29px] md:mt-[34px] rounded-2xl px-4">
                <img
                  src={market.tokenPair.token.icon}
                  className="w-[58px] h-[58px]"
                  alt="icon"
                />
                <div className="max-w-sm text-center mt-[29px] md:mt-[34px] font-normal font-nova text-white text-sm px-0 md:px-4 mb-[10px] md:mb-0">
                  To borrow or repay {market.tokenPair.token.symbol} on the
                  Tender.fi protocol, you need to enable it first.
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center overflow-hidden font-space min-h-[70px] h-[70px] pt-[96px] box-content">
                <input
                  tabIndex={0}
                  ref={inputEl}
                  value={initialValue}
                  onChange={(e) => handleCheckValue(e)}
                  style={{ height: 70, minHeight: 70 }}
                  className={`input__center__custom z-20 max-w-[240px] md:max-w-[300px] ${
                    initialValue ? "w-full" : "w-[calc(100%-40px)] pl-[40px]"
                  }  bg-transparent text-white text-center outline-none ${inputTextClass}`}
                  placeholder="0"
                />
                <Max
                  maxValue={maxRepayableAmount}
                  updateValue={() =>
                    changeInitialValue(
                      toMaxString(maxRepayableAmount, tokenDecimals)
                    )
                  }
                  maxValueLabel={market.tokenPair.token.symbol}
                  color="#00E0FF"
                />
              </div>
            )}
          </div>
          <div
            ref={scrollBlockRef}
            className="hidden__scroll px-[16px] pt-[20px] pb-[3px] w-full overflow-x-scroll flex md:hidden border-b-[1px] border-[#B5CFCC2B] flex items-center h-[76px] md:h-[auto]"
          >
            {tabs.map(
              (tab: { name: ActiveTab; color: string; show: boolean }) =>
                tab.show && (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`${
                      activeTab === tab.name
                        ? `text-[${tab.color}] border-[${tab.color}]`
                        : "text-[#ADB5B3] border-[#181D1B]"
                    } ${`hover:text-[${tab.color}] `} border-[1px] text-[12px] mr-[8px] min-w-[94px] w-[94px] h-[36px] font-space uppercase bg-[#181D1B] rounded-[6px] font-bold font-space`}
                  >
                    {tab.name}
                  </button>
                )
            )}
          </div>
          <div className="py-[20px] px-[15px] md:p-[30px] bg-[#0D0D0D] md:bg-[#151515]">
            <div className="flex flex-col items-center mb-[40px] text-gray-400">
              <div className="relative flex w-full sm:w-full items-center font-nova text-sm sm:text-base text-[#ADB5B3] justify-between">
                <div
                  tabIndex={0}
                  className="relative flex flex-col items-start group"
                >
                  <p className="flex w-full sm:w-full items-center font-nova text-sm sm:text-base text-[#ADB5B3] underline decoration-dashed underline-offset-[2px] cursor-pointer">
                    Borrow APY
                  </p>
                  <div className="hidden flex-col absolute items-start bottom-5 group-hover:hidden lg:group-hover:flex group-focus:flex rounded-[10px]">
                    <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                      <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-4 pb-[14px] pl-4">
                        <div className="flex justify-between gap-[30px] mb-3 last:mb-[0]">
                          <div className="flex gap-[8px]">
                            <img
                              className="max-w-[18px]"
                              src={market.tokenPair.token.icon}
                              alt="..."
                            />
                            <span className="font-nova text-white text-sm font-normal">
                              {market.tokenPair.token.symbol}
                            </span>
                          </div>
                          <span
                            className={`font-nova text-sm font-normal ${checkColorClass(
                              borrowApy
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
                    <div className="custom__arrow__tooltip relative top-[-6px] left-5 w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                  </div>
                </div>
                <div>{borrowApyFormatted}</div>
              </div>
            </div>

            <BorrowBalance
              value={initialValue}
              isValid={isValid}
              borrowBalance={market.totalBorrowedAmountInUsd}
              newBorrowBalance={newTotalBorrowedAmountInUsd}
              borrowLimitUsed={borrowLimitUsed}
              newBorrowLimitUsed={newBorrowLimitUsed}
              urlArrow="/images/ico/arrow-blue.svg"
            />
            <div className="flex justify-center h-[50px] md:h-[60px]">
              {!signer && <div>Connect wallet to get started</div>}
              {signer && !isEnabled && (
                <button
                  disabled={isEnabling}
                  onClick={async () => {
                    try {
                      setIsEnabling(true);
                      // @ts-ignore existence of signer is gated above.
                      await enable(
                        signer,
                        market.tokenPair.token,
                        market.tokenPair.cToken
                      );
                      setIsEnabled(true);
                    } catch (e) {
                    } finally {
                      setIsEnabling(false);
                    }
                  }}
                  className="flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#00E0FF] hover:bg-[#00e1ffd0]"
                >
                  {isEnabling ? "ENABLING..." : "ENABLE"}
                </button>
              )}

              {signer && isEnabled && !isValid && (
                <button className="uppercase flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold cursor-default	text-base sm:text-lg rounded w-full bg-[#5B5F65]">
                  {validationDetail}
                </button>
              )}

              {signer && isEnabled && isValid && (
                <button
                  disabled={isRepaying}
                  onClick={async () => {
                    try {
                      if (!initialValue) {
                        toast("Please set a value", {
                          icon: "⚠️",
                        });
                        return;
                      }
                      setIsRepaying(true);
                      const isMax =
                        initialValue ==
                        toMaxString(maxRepayableAmount, tokenDecimals);
                      // @ts-ignore existence of signer is gated above.
                      const txn = await repay(
                        initialValue,
                        signer,
                        market.tokenPair.cToken,
                        market.tokenPair.token,
                        isMax
                      );
                      setTxnHash(txn.hash);
                      setIsWaitingToBeMined(true);
                      const tr: TransactionReceipt = await txn.wait(2); // TODO: error handle if transaction fails
                      changeInitialValue("");
                      updateTransaction(tr.blockHash);
                      toast.success("Repayment successful");
                    } catch (e) {
                      displayErrorMessage(e, "Repayment unsuccessful");
                      closeModal();
                    } finally {
                      setIsWaitingToBeMined(false);
                      setIsRepaying(false);
                    }
                  }}
                  className="flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#00E0FF] hover:bg-[#00e1ffd0]"
                >
                  {isRepaying ? "REPAYING ..." : "REPAY"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
