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
import { shrinkInputClass, toCryptoString } from "~/lib/ui";
import { formatApy } from "~/lib/apy-calculations";
import { displayErrorMessage } from "./displayErrorMessage";
import type { ActiveTab } from "./deposit-borrow-flow";

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
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  tabs: { name: ActiveTab; color: string }[];
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
  activeTab,
  setActiveTab,
  tabs,
}: RepayProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  const [isEnabled, setIsEnabled] = useState<boolean>(
    market.hasSufficientAllowance
  );
  const [isEnabling, setIsEnabling] = useState<boolean>(false);

  const [isRepayingTxn, setIsRepayingTxn] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);
  const [txnHash, setTxnHash] = useState<string>("");

  const maxRepayableAmount = Math.min(borrowedAmount, walletBalance);

  const inputEl = useRef<HTMLInputElement>(null);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const inputTextClass = shrinkInputClass(value.length);

  const newTotalBorrowedAmountInUsd = useNewTotalBorrowedAmountInUsd(
    market.tokenPair,
    totalBorrowedAmountInUsd,
    // Value is negative because you're repaying which is reducing the $ amount that you have borrowed
    -value
  );

  const newBorrowLimitUsed = useBorrowLimitUsed(
    newTotalBorrowedAmountInUsd,
    borrowLimit
  );

  const [isValid, validationDetail] = useValidInput(
    value,
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
      scrollBlockRef.current.scrollLeft = 200;
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
            setValue(formattedValue);
          }
        }
      }
    },
    [tokenDecimals]
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
          <div className="pt-5 bg-[#151515] relative border-[#B5CFCC2B] border-b pb-[30px]">
            <img
              onClick={() => closeModal()}
              className="absolute right-[16px] sm:right-[22px] top-[24px] w-[21px] h-[21px] cursor-pointer"
              src="/images/ico/close.svg"
              alt="close"
            />
            <div className="flex align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
              <img
                src={market.tokenPair.token.icon}
                className="w-[32px] mr-3"
                alt="icon"
              />
              {market.tokenPair.token.symbol}
            </div>
            {!isEnabled ? (
              <div className="flex flex-col items-center mt-[38px] md:mt-[48px] rounded-2xl px-4">
                <img
                  src={market.tokenPair.token.icon}
                  className="w-[58px] h-[58px]"
                  alt="icon"
                />
                <div className="max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-0 md:px-4 mb-[10px] md:mb-0">
                  To borrow or repay {market.tokenPair.token.symbol} on the
                  Tender.fi protocol, you need to enable it first.
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center overflow-hidden font-space min-h-[70px] h-[70px] pt-[96px] box-content">
                <input
                  tabIndex={0}
                  ref={inputEl}
                  value={value}
                  onChange={(e) => handleCheckValue(e)}
                  style={{ height: 70, minHeight: 70 }}
                  className={`input__center__custom z-20 max-w-[240px] md:max-w-[300px] ${
                    value ? "w-full" : "w-[calc(100%-40px)] pl-[40px]"
                  }  bg-transparent text-white text-center outline-none ${inputTextClass}`}
                  placeholder="0"
                />
                <Max
                  maxValue={maxRepayableAmount}
                  updateValue={() =>
                    setValue(toMaxString(maxRepayableAmount, tokenDecimals))
                  }
                  maxValueLabel={market.tokenPair.token.symbol}
                  color="#00E0FF"
                />
              </div>
            )}
          </div>
          <div
            ref={scrollBlockRef}
            className="hidden__scroll px-[16px] pt-[20px] pb-[3px] w-full overflow-x-scroll flex md:hidden border-b-[1px] border-[#B5CFCC2B]"
          >
            {tabs.map((tab: { name: ActiveTab; color: string }) => (
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
            ))}
          </div>
          <div
            className="px-4 py-[30px] sm:px-12"
            style={{ background: "#0D0D0D" }}
          >
            <div className="flex flex-col items-start mb-[28px] text-gray-400">
              <a
                href={`/markets/${market.tokenPair.token.symbol}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer flex items-center font-bold font-nova text-sm sm:text-sm text-white hover:text-[#00E0FF]"
              >
                Borrow Market
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="ml-[10px]"
                  fill="none"
                >
                  <path
                    d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                    fill="#00E0FF"
                  />
                </svg>
              </a>
              <div className="flex w-full sm:w-full items-center py-[24px] font-nova">
                <img
                  src={market.tokenPair.token.icon}
                  className="mr-[10px] md:mr-[16px] w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                  alt="icon"
                />
                <div className="flex-grow text-sm sm:text-base text-[#ADB5B3]">
                  Borrow APY
                </div>
                <div className="text-sm sm:text-base">{borrowApyFormatted}</div>
              </div>
            </div>

            <BorrowBalance
              value={value}
              isValid={isValid}
              borrowBalance={market.totalBorrowedAmountInUsd}
              newBorrowBalance={newTotalBorrowedAmountInUsd}
              borrowLimitUsed={borrowLimitUsed}
              newBorrowLimitUsed={newBorrowLimitUsed}
              urlArrow="/images/ico/arrow-blue.svg"
            />
            <div className="flex justify-center h-[56px] md:h-[60px]">
              {!signer && <div>Connect wallet to get started</div>}
              {signer && !isEnabled && (
                <button
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
                  className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#00E0FF] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]"
                >
                  {isEnabling ? "Enabling..." : "Enable"}
                </button>
              )}

              {signer && isEnabled && !isValid && (
                <button className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#5B5F65] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]">
                  {validationDetail}
                </button>
              )}

              {signer && isEnabled && isValid && (
                <button
                  onClick={async () => {
                    try {
                      if (!value) {
                        toast("Please set a value", {
                          icon: "⚠️",
                        });
                        return;
                      }
                      setIsRepayingTxn(true);
                      const isMax =
                        value == toMaxString(maxRepayableAmount, tokenDecimals);
                      // @ts-ignore existence of signer is gated above.
                      const txn = await repay(
                        value,
                        signer,
                        market.tokenPair.cToken,
                        market.tokenPair.token,
                        isMax
                      );
                      setTxnHash(txn.hash);
                      setIsWaitingToBeMined(true);
                      const tr: TransactionReceipt = await txn.wait(2); // TODO: error handle if transaction fails
                      setValue("");
                      updateTransaction(tr.blockHash);
                      toast.success("Repayment successful");
                    } catch (e) {
                      displayErrorMessage(e, "Repayment unsuccessful");
                      closeModal();
                    } finally {
                      setIsWaitingToBeMined(false);
                      setIsRepayingTxn(false);
                    }
                  }}
                  className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#00E0FF] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]"
                >
                  {isRepayingTxn ? "Repaying..." : "Repay"}
                </button>
              )}
            </div>

            <div className="flex mt-8">
              <div className="flex-grow text-[#ADB5B3] font-nova text-base">
                Your Borrow
              </div>
              <div className="font-nova text-base">
                {toCryptoString(market.borrowBalance, tokenDecimals)}{" "}
                {market.tokenPair.token.symbol}
              </div>
            </div>
            <div className="flex mt-[10px]">
              <div className="flex-grow text-[#ADB5B3] font-nova text-base">
                Available Borrow
              </div>
              <div className="font-nova text-base">
                {toCryptoString(market.maxBorrowLiquidity, tokenDecimals)}{" "}
                {market.tokenPair.token.symbol}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
