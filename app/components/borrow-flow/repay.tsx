import { ICON_SIZE } from "~/lib/constants";
import type { Market, TokenPair } from "~/types/global";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type {
  JsonRpcSigner,
  TransactionReceipt,
} from "@ethersproject/providers";
import { toMaxString } from "~/lib/ui";

import toast from "react-hot-toast";

import Max from "~/components/max";

import { enable, repay, hasSufficientAllowance } from "~/lib/tender";
import { useValidInput } from "~/hooks/use-valid-input";
import BorrowBalance from "../fi-modal/borrow-balance";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";

import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { useNewTotalBorrowedAmountInUsd } from "~/hooks/use-new-total-borrowed-amount-in-usd";
import { shrinkyInputClass, toCryptoString } from "~/lib/ui";
import { displayTransactionResult } from "../displayTransactionResult";
import { formatApy } from "~/lib/apy-calculations";

export interface RepayProps {
  closeModal: Function;
  setIsRepaying: Function;
  signer: JsonRpcSigner | null | undefined;
  borrowedAmount: number;
  borrowLimitUsed: string;
  walletBalance: number;
  borrowLimit: number;
  tokenPairs: TokenPair[];
  totalBorrowedAmountInUsd: number;
  market: Market;
}

export default function Repay({
  market,
  closeModal,
  setIsRepaying,
  signer,
  borrowedAmount,
  borrowLimit,
  borrowLimitUsed,
  walletBalance,
  totalBorrowedAmountInUsd,
}: RepayProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  let [isEnabled, setIsEnabled] = useState<boolean>(true);
  let [isEnabling, setIsEnabling] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(true);

  let [isRepayingTxn, setIsRepayingTxn] = useState<boolean>(false);
  let [value, setValue] = useState<string>("");
  let [txnHash, setTxnHash] = useState<string>("");

  let maxRepayableAmount = Math.min(borrowedAmount, walletBalance);

  let inputEl = useRef<HTMLInputElement>(null);
  let inputTextClass = shrinkyInputClass(value.length);

  let newTotalBorrowedAmountInUsd = useNewTotalBorrowedAmountInUsd(
    market.tokenPair,
    totalBorrowedAmountInUsd,
    // Value is negative because you're repaying which is reducing the $ amount that you have borrowed
    -value
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    newTotalBorrowedAmountInUsd,
    borrowLimit
  );

  let [isValid, validationDetail] = useValidInput(
    value,
    0,
    maxRepayableAmount,
    parseFloat(newBorrowLimitUsed),
    tokenDecimals
  );

  let { updateTransaction, setIsWaitingToBeMined } = useContext(TenderContext);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    if (!signer) {
      return;
    }
    hasSufficientAllowance(
      signer,
      market.tokenPair.token,
      market.tokenPair.cToken
    ).then((has: boolean) => {
      if (!has) {
        setIsEnabled(false);
      }
    });
  }, [signer, market.tokenPair.cToken, market.tokenPair.token]);

  // Highlights value input
  useEffect(() => {
    inputEl && inputEl.current && inputEl.current.select();
  }, [loading]);

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
          <div className="pt-5 bg-[#151515] relative border-[#B5CFCC2B] border-b">
            <div className="absolute right-[16px] sm:right-[22px] top-[24px]">
              <button onClick={() => closeModal()}>
                <img src="/images/ico/close.svg" alt="close" />
              </button>
            </div>
            <div className="flex align-middle justify-center items-center pb-[20px] border-b-[1px] border-[#282C2B]">
              <img
                src={market.tokenPair.token.icon}
                className="w-[32px] mr-3"
                alt="icon"
              />
              {market.tokenPair.token.symbol}
            </div>
            <div className="h-[100px] mt-[50px]">
              {loading ? (
                <div className="switch__to__network px-4 mt-5 flex flex-col items-center">
                  <div className="animate w-[80%] h-[80px] mt-[20px]"></div>
                </div>
              ) : !isEnabled ? (
                <div className="flex flex-col items-center mt-5 rounded-2xl  px-4">
                  <img
                    src={market.tokenPair.token.icon}
                    className="w-12"
                    alt="icon"
                  />
                  <div className="max-w-sm text-center mt-5 font-normal font-nova text-white text-sm px-4">
                    To borrow or repay {market.tokenPair.token.symbol} on the
                    Tender.fi protocol, you need to enable it first.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center overflow-hidden font-space">
                  <input
                    ref={inputEl}
                    value={value}
                    onChange={(e) => handleCheckValue(e)}
                    style={{ minHeight: 100 }}
                    className={`input__center__custom max-w-[180px] md:max-w-[270px] ${
                      value ? "w-full" : "w-[calc(100%-40px)] pl-[40px]"
                    } bg-transparent text-white text-center outline-none ${inputTextClass}`}
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
            <div className="flex mt-6 uppercase">
              <button
                className="flex-grow py-3 font-space font-bold border-b-4 border-b-transparent text-xs sm:text-base uppercase"
                onClick={() => setIsRepaying(false)}
              >
                Borrow
              </button>
              <button
                className="flex-grow py-2 text-[#00E0FF] border-b-4 uppercase border-b-[#00E0FF] font-space font-bold text-xs sm:text-base"
                onClick={() => setIsRepaying(true)}
              >
                Repay
              </button>
            </div>
          </div>
          <div
            className="px-4 py-[30px] sm:px-12"
            style={{ background: "#0D0D0D" }}
          >
            <div className="flex flex-col items-start mb-3 text-gray-400  pb-6">
              <a
                href={`/markets/${market.tokenPair.token.symbol}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer flex items-center font-bold font-nova text-sm sm:text-sm text-white hover:text-[#00E0FF]"
              >
                Borrow Rates
                <svg
                  className="ml-[10px]"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.3335 1.3335H4.00016C2.5275 1.3335 1.3335 2.5275 1.3335 4.00016V12.0002C1.3335 13.4728 2.5275 14.6668 4.00016 14.6668H12.0002C13.4728 14.6668 14.6668 13.4728 14.6668 12.0002C14.6668 10.4862 14.6668 8.66683 14.6668 8.66683C14.6668 8.29883 14.3682 8.00016 14.0002 8.00016C13.6322 8.00016 13.3335 8.29883 13.3335 8.66683V12.0002C13.3335 12.7362 12.7362 13.3335 12.0002 13.3335C9.78016 13.3335 6.2195 13.3335 4.00016 13.3335C3.2635 13.3335 2.66683 12.7362 2.66683 12.0002C2.66683 9.78016 2.66683 6.2195 2.66683 4.00016C2.66683 3.2635 3.2635 2.66683 4.00016 2.66683H7.3335C7.7015 2.66683 8.00016 2.36816 8.00016 2.00016C8.00016 1.63216 7.7015 1.3335 7.3335 1.3335ZM12.3908 2.66683H10.0002C9.63216 2.66683 9.3335 2.36816 9.3335 2.00016C9.3335 1.63216 9.63216 1.3335 10.0002 1.3335H14.0002C14.3682 1.3335 14.6668 1.63216 14.6668 2.00016V6.00016C14.6668 6.36816 14.3682 6.66683 14.0002 6.66683C13.6322 6.66683 13.3335 6.36816 13.3335 6.00016V3.6095L8.4715 8.4715C8.2115 8.7315 7.78883 8.7315 7.52883 8.4715C7.26816 8.2115 7.26816 7.78883 7.52883 7.52883L12.3908 2.66683Z"
                    fill="#00E0FF"
                  />
                </svg>
              </a>
              <div className="flex w-full sm:w-full items-center py-[24px]">
                <img
                  src={market.tokenPair.token.icon}
                  className="mr-[10px] md:mr-[10px] w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                  alt="icon"
                />
                <div className="flex-grow font-nova text-sm sm:text-base text-[#ADB5B3]">
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
            {loading ? (
              <div className="switch__to__network flex justify-center">
                <div className="animate w-[308px] bg-[#00E0FF] h-[56px] md:h-[60px]"></div>
              </div>
            ) : (
              <div className="flex justify-center">
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
                  <button className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#00E0FF] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]">
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
                        // @ts-ignore existence of signer is gated above.
                        let txn = await repay(
                          value,
                          signer,
                          market.tokenPair.cToken,
                          market.tokenPair.token
                        );
                        setTxnHash(txn.hash);
                        setIsWaitingToBeMined(true);
                        let tr: TransactionReceipt = await txn.wait(2); // TODO: error handle if transaction fails
                        setValue("");
                        updateTransaction(tr.blockHash);
                        toast.success("Repayment successful");
                      } catch (e) {
                        toast.error("Repayment unsuccessful");
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
            )}

            <div className="flex mt-8">
              <div className="flex-grow text-[#ADB5B3] font-nova text-base">
                Your Borrow
              </div>
              <div className="font-nova text-base">
                {toCryptoString(market.borrowBalance)}{" "}
                {market.tokenPair.token.symbol}
              </div>
            </div>
            <div className="flex mt-[10px]">
              <div className="flex-grow text-[#ADB5B3] font-nova text-base">
                Available Borrow
              </div>
              <div className="font-nova text-base">
                {toCryptoString(market.maxBorrowLiquidity)}{" "}
                {market.tokenPair.token.symbol}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
