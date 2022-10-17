/* eslint-disable react/jsx-no-target-blank */
import type { Market } from "~/types/global";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type {
  JsonRpcSigner,
  TransactionReceipt,
} from "@ethersproject/providers";
import { useValidInput } from "~/hooks/use-valid-input";
import toast from "react-hot-toast";
import Max from "~/components/max";
import { toExactString } from "~/lib/ui";

import { enable, deposit } from "~/lib/tender";
import BorrowLimit from "../fi-modal/borrow-limit";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { shrinkyInputClass, toCryptoString } from "~/lib/ui";
import { displayTransactionResult } from "../displayTransactionResult";
import { useCollateralFactor } from "~/hooks/use-collateral-factor";
import { displayErrorMessage } from "../borrow-flow/displayErrorMessage";
export interface DepositProps {
  closeModal: Function;
  market: Market;
  onTabSwitch: Function;
  borrowLimit: number;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  walletBalance: number;
  totalBorrowedAmountInUsd: number;
  comptrollerAddress: string;
  initialValue: string;
}
export default function Deposit({
  closeModal,
  comptrollerAddress,
  onTabSwitch,
  borrowLimit,
  signer,
  borrowLimitUsed,
  walletBalance,
  totalBorrowedAmountInUsd,
  market,
  initialValue,
}: DepositProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  let [isEnabled, setIsEnabled] = useState<boolean>(
    market.hasSufficientAllowance
  );
  let [isEnabling, setIsEnabling] = useState<boolean>(false);
  let [isDepositing, setIsDepositing] = useState<boolean>(false);
  let [value, setValue] = useState<string>(initialValue);
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
    value ? value : "0"
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  let [isValid, validationDetail] = useValidInput(
    value,
    0,
    walletBalance,
    parseFloat(newBorrowLimitUsed),
    tokenDecimals
  );

  const collateralFactor = useCollateralFactor(
    signer,
    comptrollerAddress,
    market.tokenPair
  );

  useEffect(() => {
    setIsEnabled(market.hasSufficientAllowance);
  }, [market.hasSufficientAllowance]);

  useEffect(() => {
    inputEl && inputEl.current && inputEl.current.focus();
  }, []);

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
            {!isEnabled ? (
              <div className="flex flex-col items-center rounded-2xl px-4 mt-[30px]">
                <img
                  src={market.tokenPair.token.icon}
                  className="w-[58px] h-[58px] md:w-[70px] md:h-[70px]"
                  alt="icon"
                />
                <div className="max-w-sm text-center mt-5 md:mt-6 font-normal font-nova text-white text-sm">
                  To supply or withdraw {market.tokenPair.token.symbol} on the
                  Tender.fi protocol, you need to enable it first.
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-end items-center overflow-hidden font-space pb-[15px] h-[118px] md:h-[134px] mt-[30px]">
                <Max
                  maxValue={walletBalance}
                  updateValue={() => setValue(toExactString(walletBalance))}
                  maxValueLabel={market.tokenPair.token.symbol}
                  color="#14F195"
                />
                <input
                  ref={inputEl}
                  value={value}
                  onChange={(e) => handleCheckValue(e)}
                  style={{ height: 60 }}
                  className={`input__center__custom z-20 max-w-[180px] max-w-[300px] ${
                    value ? "w-full" : "w-[calc(100%-40px)] pl-[40px]"
                  }  bg-transparent text-white text-center outline-none ${inputTextClass}`}
                  placeholder="0"
                />
              </div>
            )}
            <div className="flex mt-4 md:mt-6 uppercase">
              <button
                className="flex-grow py-2 text-[#14F195] border-b-4 border-b-[#14F195] uppercase font-space font-bold text-xs sm:text-base"
                onClick={() => onTabSwitch("supply")}
              >
                Supply
              </button>
              <button
                className="flex-grow py-3 font-space border-b-4 border-b-transparent font-bold text-xs sm:text-base uppercase"
                onClick={() => onTabSwitch("withdraw", value)}
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
            <div className="flex flex-col items-start mb-[28px] text-gray-400">
              <a
                href={`/markets/${market.tokenPair.token.symbol}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer flex items-center font-bold font-nova text-sm sm:text-sm text-white hover:text-[#14F195]"
              >
                Supply Rates
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="ml-[10px]"
                  fill="none"
                >
                  <path
                    d="M7.20002 0H3.2C1.4328 0 0 1.4328 0 3.2V12.8001C0 14.5672 1.4328 16 3.2 16H12.8001C14.5672 16 16 14.5672 16 12.8001C16 10.9833 16 8.80002 16 8.80002C16 8.35842 15.6417 8.00001 15.2001 8.00001C14.7585 8.00001 14.4 8.35842 14.4 8.80002V12.8001C14.4 13.6833 13.6833 14.4 12.8001 14.4C10.136 14.4 5.86322 14.4 3.2 14.4C2.31601 14.4 1.6 13.6833 1.6 12.8001C1.6 10.136 1.6 5.86322 1.6 3.2C1.6 2.31601 2.31601 1.6 3.2 1.6H7.20002C7.64162 1.6 8.00001 1.2416 8.00001 0.799994C8.00001 0.358393 7.64162 0 7.20002 0ZM13.2688 1.6H10.4001C9.95842 1.6 9.60002 1.2416 9.60002 0.799994C9.60002 0.358393 9.95842 0 10.4001 0H15.2001C15.6417 0 16 0.358393 16 0.799994V5.60001C16 6.04161 15.6417 6.40001 15.2001 6.40001C14.7585 6.40001 14.4 6.04161 14.4 5.60001V2.73121L8.56562 8.56562C8.25362 8.87762 7.74642 8.87762 7.43441 8.56562C7.12161 8.25362 7.12161 7.74642 7.43441 7.43441L13.2688 1.6Z"
                    fill="#14F195"
                  />
                </svg>
              </a>
              <div className="flex w-full sm:w-full items-center py-[24px] font-nova">
                <img
                  src={market.tokenPair.token.icon}
                  alt="icon"
                  className="mr-[10px] md:mr-[16px] w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                />
                <div className="flex-grow text-sm sm:text-base text-[#ADB5B3]">
                  Supply APY
                </div>
                <div className="text-sm sm:text-base">
                  {market.marketData.depositApy}
                </div>
              </div>
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
            <div className="flex justify-center mb-8 h-[56px] md:h-[60px]">
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
                      displayErrorMessage(e, "Could not enable.");
                    } finally {
                      setIsEnabling(false);
                    }
                  }}
                  className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#14F195] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]"
                >
                  {isEnabling ? "Enabling..." : "Enable"}
                </button>
              )}

              {signer &&
                isEnabled &&
                !isValid &&
                (validationDetail === "Insufficient liquidity" ? (
                  <button className="flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#5B5F65] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]">
                    <div className="group relative cursor-pointer">
                      <span className="uppercase line-dashed color-black black">
                        {validationDetail}
                      </span>
                      <div className="hidden z-10 flex-col absolute left-[50%] translate-x-[-50%] bottom-[25px] items-center group-hover:flex rounded-[10px]">
                        <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                          <div className="w-full h-full bg-[#181D1B] text-[#ADB5B3] shadow-lg rounded-[10px] p-[15px] text-sm leading-[17px]">
                            Insufficient liquidity to withdraw supply fully.
                            Borrow utilization is currently high and borrow
                            costs are increasing, please check back in a few
                            hours as borrowers will be repaying their loans, or
                            withdraw up to the current available amount
                            "formula" {market.tokenPair.token.symbol}.
                          </div>
                        </div>
                        <div className="custom__arrow__tooltip relative top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B] !border-r-[b5cfcc3c] !border-b-[b5cfcc3c]"></div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#5B5F65] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]">
                    {validationDetail}
                  </button>
                ))}

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
                      displayTransactionResult(
                        tr.transactionHash,
                        "Deposit successful"
                      );
                      setValue("");
                      updateTransaction(tr.blockHash);
                    } catch (e: any) {
                      toast.dismiss();
                      if (e.transaction?.hash) {
                        toast.error(() => (
                          <p>
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://andromeda-explorer.metis.io/tx/${e.transactionHash}/internal-transactions/`}
                            >
                              Deposit unsuccessful
                            </a>
                          </p>
                        ));
                      } else {
                        displayErrorMessage(e, "Deposit unsuccessful");
                        closeModal();
                      }
                    } finally {
                      setIsWaitingToBeMined(false);
                      setIsDepositing(false);
                    }
                  }}
                  className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#14f195] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]"
                >
                  {isDepositing ? "Supplying..." : "Supply"}
                </button>
              )}
            </div>
            <div className="flex mt-8 justify-between">
              <div className="text-[#ADB5B3] font-nova text-base font-normal">
                Your Supply
              </div>
              <div className="font-nova text-base">
                {market.supplyBalance + " " + market.tokenPair.token.symbol}
              </div>
            </div>
            <div className="flex mt-[10px] justify-between">
              <div className="text-[#ADB5B3] font-nova text-base font-normal line-dashed group relative cursor-pointer">
                Max LTV
                <div className="hidden z-10 flex-col absolute left-0 bottom-[25px] items-center group-hover:flex rounded-[10px]">
                  <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[15px] text-sm leading-[17px]">
                      The Maximum LTV ratio represents the maximum borrowing
                      power of a specific collateral. For example, if a
                      collateral has an LTV of 75%, the user can borrow up to
                      0.75 worth of ETH in the principal currency for every 1
                      ETH worth of collateral.
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative left-[-100px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B] !border-r-[b5cfcc3c] !border-b-[b5cfcc3c]"></div>
                </div>
              </div>
              <div className="font-nova text-base">
                {collateralFactor * 100}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
