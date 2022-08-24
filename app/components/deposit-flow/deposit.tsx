/* eslint-disable react/jsx-no-target-blank */
import { ICON_SIZE } from "~/lib/constants";
import type { Market } from "~/types/global";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type {
  JsonRpcSigner,
  TransactionReceipt,
} from "@ethersproject/providers";
import { useValidInput } from "~/hooks/use-valid-input";
import toast from "react-hot-toast";
import Max from "~/components/max";
import clsx from "clsx";
import * as math from "mathjs";

import { enable, deposit, hasSufficientAllowance } from "~/lib/tender";
import BorrowLimit from "../fi-modal/borrow-limit";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { shrinkyInputClass, toCryptoString } from "~/lib/ui";
import { displayTransactionResult } from "../displayTransactionResult";

export interface DepositProps {
  closeModal: Function;
  market: Market;
  setIsSupplying: Function;
  borrowLimit: number;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  walletBalance: number;
  totalBorrowedAmountInUsd: number;
  comptrollerAddress: string;
}
export default function Deposit({
  closeModal,
  comptrollerAddress,
  setIsSupplying,
  borrowLimit,
  signer,
  borrowLimitUsed,
  walletBalance,
  totalBorrowedAmountInUsd,
  market,
}: DepositProps) {
  let [isEnabled, setIsEnabled] = useState<boolean>(true);
  let [isEnabling, setIsEnabling] = useState<boolean>(false);
  let [isDepositing, setIsDepositing] = useState<boolean>(false);
  let [value, setValue] = useState<string>("");
  let [txnHash, setTxnHash] = useState<string>("");
  let inputTextClass = shrinkyInputClass(value.length);

  let inputEl = useRef<HTMLInputElement>(null);

  let { tokenPairs, updateTransaction, setIsWaitingToBeMined } =
    useContext(TenderContext);

  let newBorrowLimit = useProjectBorrowLimit(
    signer,
    comptrollerAddress,
    tokenPairs,
    market.tokenPair,
    value
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  let [isValid, validationDetail] = useValidInput(
    value,
    0,
    walletBalance,
    parseFloat(newBorrowLimitUsed)
  );

  useEffect(() => {
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
  }, []);

  const handleCheckValue = useCallback((e: any) => {
    const { value } = e.target;
    setValue(value.replace(/[^.\d]+/g, "").replace(/^([^\.]*\.)|\./g, "$1"));
  }, []);

  return (
    <div>
      {txnHash !== "" && (
        <ConfirmingTransaction
          txnHash={txnHash}
          stopWaitingOnConfirmation={() => closeModal()}
        />
      )}
      {txnHash === "" && (
        <div>
          <div className="pt-8 bg-[#151515] relative border-[#B5CFCC2B] border-b">
            <div className="absolute right-[10px] top-[15px] sm:right-[22px] sm:top-[24px]">
              <button onClick={() => closeModal()} className="">
                <img src="/images/ico/close.svg" alt="close" />
              </button>
            </div>

            {!isEnabled ? (
              <div>
                <div className="flex align-middle justify-center items-center">
                  <img
                    src={market.tokenPair.token.icon}
                    className="w-6 mr-3"
                    alt="icon"
                  />
                  {market.tokenPair.token.symbol}
                </div>
                <div className="flex flex-col items-center mt-5 rounded-2xl  px-4">
                  <img
                    src={market.tokenPair.token.icon}
                    className="w-12"
                    alt="icon"
                  />
                  <div className="max-w-sm text-center my-10 mt-5 mb-5 font-normal font-nova text-white text-sm">
                    To supply or withdraw {market.tokenPair.token.symbol} on the
                    Tender.fi protocol, you need to enable it first.
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex align-middle justify-center items-center">
                  <img
                    src={market.tokenPair.token.icon}
                    className="w-12"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col justify-center items-end mt-6 overflow-hidden font-space">
                  <Max
                    maxValue={walletBalance.toString()}
                    updateValue={() => {
                      let value = math.format(walletBalance, {
                        notation: "fixed",
                      });
                      if (!inputEl || !inputEl.current) return;
                      inputEl.current.focus();
                      inputEl.current.value = value;
                      setValue(value);
                    }}
                    maxValueLabel={market.tokenPair.token.symbol}
                  />
                  <input
                    ref={inputEl}
                    value={value}
                    onChange={(e) => handleCheckValue(e)}
                    style={{ minHeight: 90 }}
                    className={`input__center__custom ${
                      value ? "w-full" : "w-[calc(100%-40px)]"
                    } text-2xl bg-transparent text-white text-center outline-none ${inputTextClass}`}
                    placeholder="0"
                  />
                </div>
              </div>
            )}
            <div className="flex mt-6 uppercase">
              <button
                className="flex-grow py-2 text-[#14F195] border-b-4 uppercase border-b-[#14F195] font-space font-bold text-xs sm:text-base"
                onClick={() => setIsSupplying(true)}
              >
                Supply
              </button>
              <button
                className="flex-grow py-3 font-space font-bold text-xs sm:text-base uppercase"
                onClick={() => setIsSupplying(false)}
              >
                Withdraw
              </button>
            </div>
          </div>
          {/* Sub Navigation */}
          <div
            className="px-4 py-[30px] sm:px-12"
            style={{ background: "#0D0D0D" }}
          >
            <div className="flex flex-col items-start mb-3 text-gray-400 pb-6">
              <a
                href={`/markets/${market.tokenPair.token.symbol}`}
                className="cursor-pointer w-[120px] md:w-[120px] flex items-center font-bold font-nova text-sm sm:text-[14px] text-[#fff] hover:text-[#14F195]"
              >
                Supply Rates
                <svg
                  className="ml-[10px]"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#14F195"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.3335 1.3335H4.00016C2.5275 1.3335 1.3335 2.5275 1.3335 4.00016V12.0002C1.3335 13.4728 2.5275 14.6668 4.00016 14.6668H12.0002C13.4728 14.6668 14.6668 13.4728 14.6668 12.0002C14.6668 10.4862 14.6668 8.66683 14.6668 8.66683C14.6668 8.29883 14.3682 8.00016 14.0002 8.00016C13.6322 8.00016 13.3335 8.29883 13.3335 8.66683V12.0002C13.3335 12.7362 12.7362 13.3335 12.0002 13.3335C9.78016 13.3335 6.2195 13.3335 4.00016 13.3335C3.2635 13.3335 2.66683 12.7362 2.66683 12.0002C2.66683 9.78016 2.66683 6.2195 2.66683 4.00016C2.66683 3.2635 3.2635 2.66683 4.00016 2.66683H7.3335C7.7015 2.66683 8.00016 2.36816 8.00016 2.00016C8.00016 1.63216 7.7015 1.3335 7.3335 1.3335ZM12.3908 2.66683H10.0002C9.63216 2.66683 9.3335 2.36816 9.3335 2.00016C9.3335 1.63216 9.63216 1.3335 10.0002 1.3335H14.0002C14.3682 1.3335 14.6668 1.63216 14.6668 2.00016V6.00016C14.6668 6.36816 14.3682 6.66683 14.0002 6.66683C13.6322 6.66683 13.3335 6.36816 13.3335 6.00016V3.6095L8.4715 8.4715C8.2115 8.7315 7.78883 8.7315 7.52883 8.4715C7.26816 8.2115 7.26816 7.78883 7.52883 7.52883L12.3908 2.66683Z"
                    fill="#14F195"
                  />
                </svg>
              </a>
              <div className="flex w-full sm:w-full items-center py-[24px]">
                <div className="w-6 mr-3 sm:w-12">
                  <img
                    src={market.tokenPair.token.icon}
                    style={{ width: ICON_SIZE }}
                    className=""
                    alt="icon"
                  />
                </div>
                <div className="flex-grow font-nova text-sm sm:text-base text-[#ADB5B3]">
                  Supply APY
                </div>
                <div>{market.marketData.depositApy}</div>
              </div>
              {/* <div className="flex w-full sm:w-full items-center py-[24px]">
                <div className="w-6 mr-3 sm:w-12">
                  <img
                    src={market.tokenPair.token.icon}
                    style={{ width: ICON_SIZE }}
                    className=""
                    alt="icon"
                  />
                </div>

                <div className="flex-grow font-nova text-sm sm:text-base  text-[#ADB5B3]">
                  Distribution APY
                </div>
                <div>{market.marketData.depositApy}</div>
              </div> */}
            </div>
            <BorrowLimit
              value={value}
              isValid={isValid}
              borrowLimit={borrowLimit}
              newBorrowLimit={newBorrowLimit}
              borrowLimitUsed={borrowLimitUsed}
              newBorrowLimitUsed={newBorrowLimitUsed}
              urlArrow="/images/ico/arrow-green.svg"
            />
            <div className="flex justify-center mb-8">
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
                      console.error(e);
                    } finally {
                      setIsEnabling(false);
                    }
                  }}
                  className="uppercase py-4 text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14F195] max-w-[300px]"
                >
                  {isEnabling ? "Enabling..." : "Enable"}
                </button>
              )}

              {signer && isEnabled && !isValid && (
                <button className="uppercase py-4 text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14F195] max-w-[300px]">
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
                      setIsDepositing(true);
                      let txn = await deposit(
                        value,
                        signer,
                        market.tokenPair.cToken,
                        market.tokenPair.token
                      );
                      setTxnHash(txn.hash);
                      setIsWaitingToBeMined(true);
                      let tr: TransactionReceipt = await txn.wait(2);
                      updateTransaction(tr.blockHash);
                      displayTransactionResult(
                        tr.transactionHash,
                        "Deposit successful"
                      );
                      setValue("");
                    } catch (e: any) {
                      toast.dismiss();
                      if (e.transaction?.hash) {
                        toast.error(() => (
                          <p>
                            <a
                              target="_blank"
                              href={`https://andromeda-explorer.metis.io/tx/${e.transactionHash}/internal-transactions/`}
                            >
                              Deposit unsuccessful
                            </a>
                          </p>
                        ));
                      } else {
                        toast.error("Deposit unsuccessful.");
                      }
                    } finally {
                      setIsWaitingToBeMined(false);
                      setIsDepositing(false);
                    }
                  }}
                  className="uppercase py-4 text-center text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14F195] max-w-[300px]"
                >
                  {isDepositing ? "Depositing..." : "Deposit"}
                </button>
              )}
            </div>
            <div className="flex mt-8">
              <div className="flex-grow text-[#ADB5B3] font-nova text-base font-normal">
                Currently Supplying
              </div>
              <div className="font-nova text-base">
                {toCryptoString(walletBalance) +
                  " " +
                  market.tokenPair.token.symbol}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
