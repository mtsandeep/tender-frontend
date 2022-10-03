import { ICON_SIZE } from "~/lib/constants";
import type { Market } from "~/types/global";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import type { JsonRpcSigner } from "@ethersproject/providers";
import toast from "react-hot-toast";
import Max from "~/components/max";
import { toMaxString } from "~/lib/ui";

import { redeem } from "~/lib/tender";
import { useValidInput } from "~/hooks/use-valid-input";
import BorrowLimit from "../fi-modal/borrow-limit";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { shrinkyInputClass, toCryptoString } from "~/lib/ui";
import { useCollateralFactor } from "~/hooks/use-collateral-factor";

export interface WithdrawProps {
  market: Market;
  closeModal: Function;
  setIsSupplying: Function;
  borrowLimit: number;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  walletBalance: number;
  totalBorrowedAmountInUsd: number;
}
export default function Withdraw({
  market,
  closeModal,
  setIsSupplying,
  borrowLimit,
  signer,
  borrowLimitUsed,
  totalBorrowedAmountInUsd,
}: WithdrawProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  let [value, setValue] = useState<string>("");
  let [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  let [txnHash, setTxnHash] = useState<string>("");
  let inputEl = useRef<HTMLInputElement>(null);

  let { tokenPairs, updateTransaction, setIsWaitingToBeMined } =
    useContext(TenderContext);

  let newBorrowLimit = useProjectBorrowLimit(
    signer,
    market.comptrollerAddress,
    tokenPairs,
    market.tokenPair,
    value ? `-${value}` : "0"
  );

  let newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  var maxWithdrawAmount: number = Math.min(
    market.supplyBalance, // how much we're supplying
    market.maxBorrowLiquidity // how much cash the contract has
  );

  // // if there is a borrow balance
  // if (totalBorrowedAmountInUsd > 0) {
  //   // 0.8 * (totalSupply - totalBorrow balance / token price)
  //   // if there is a borrow or else 100%
  // }

  let [isValid, validationDetail] = useValidInput(
    value,
    0,
    maxWithdrawAmount,
    parseFloat(newBorrowLimitUsed),
    tokenDecimals
  );

  let inputTextClass = shrinkyInputClass(value.length);

  const collateralFactor = useCollateralFactor(
    signer,
    market.comptrollerAddress,
    market.tokenPair
  );

  // Highlights value input
  useEffect(() => {
    inputEl && inputEl.current && inputEl.current.select();
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
            <div className="flex flex-col justify-center items-center overflow-hidden font-space h-[100px] mt-[50px]">
              {parseFloat(borrowLimitUsed) < 80 && (
                <Max
                  maxValue={maxWithdrawAmount}
                  updateValue={() => setValue(toMaxString(maxWithdrawAmount, tokenDecimals))}
                  label="Max"
                  maxValueLabel={market.tokenPair.token.symbol}
                  color="#14F195"
                />
              )}
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
            </div>
            <div className="flex mt-6 uppercase">
              <button
                className="flex-grow py-3 font-space border-b-4 border-b-transparent font-bold text-xs sm:text-base uppercase"
                onClick={() => setIsSupplying(true)}
              >
                Supply
              </button>
              <button
                className="flex-grow py-2 text-[#14F195] border-b-4 border-b-[#14F195] uppercase font-space font-bold text-xs sm:text-base"
                onClick={() => setIsSupplying(false)}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="py-[30px] px-4 sm:px-12 bg-[#0D0D0D]">
            <div className="flex flex-col items-start mb-3 text-gray-400 pb-6">
              <a
                href={`/markets/${market.tokenPair.token.symbol}`}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer flex items-center font-bold font-nova text-sm sm:text-sm text-white hover:text-[#14F195]"
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
                <img
                  src={market.tokenPair.token.icon}
                  alt="icon"
                  className="mr-[10px] md:mr-[10px] w-[24px] h-[24px] md:w-[40px] md:h-[40px]"
                />
                <div className="flex-grow font-nova text-sm sm:text-base text-[#ADB5B3]">
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

            <div className="flex justify-center mb-8">
              {!signer && <div>Connect wallet to get started</div>}
              {signer && !isValid && (
                <button className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#00E0FF] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]">
                  {validationDetail}
                </button>
              )}
              {signer && isValid && (
                <button
                  onClick={async () => {
                    try {
                      if (!value) {
                        toast("Please set a value", {
                          icon: "⚠️",
                        });
                        return;
                      }
                      setIsWithdrawing(true);
                      // @ts-ignore existence of signer is gated above.
                      let txn = await redeem(
                        value,
                        signer,
                        market.tokenPair.cToken,
                        market.tokenPair.token
                      );
                      setTxnHash(txn.hash);
                      setIsWaitingToBeMined(true);
                      let tr = await txn.wait(); // TODO: error handle if transaction fails
                      setValue("");
                      updateTransaction(tr.blockHash);
                      toast.success("Withdraw successful");
                    } catch (e) {
                      toast.error("Withdraw unsuccessful");
                      closeModal();
                    } finally {
                      setIsWaitingToBeMined(false);
                      setIsWithdrawing(false);
                    }
                  }}
                  className="uppercase flex items-center justify-center h-[56px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded w-[auto] bg-[#00E0FF] min-w-[308px] max-w-[400px] pr-[40px] pl-[40px]"
                >
                  {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                </button>
              )}
            </div>

            <div className="flex mt-8 justify-between">
              <div className="text-[#ADB5B3] font-nova text-base">
                Your Supply
              </div>
              <div className="font-nova text-base">
                {toCryptoString(market.supplyBalance, tokenDecimals) +
                  " " +
                  market.tokenPair.token.symbol}
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
