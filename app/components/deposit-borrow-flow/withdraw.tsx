/* eslint-disable no-useless-escape */
import type { Market } from "~/types/global";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import type { JsonRpcSigner } from "@ethersproject/providers";
import toast from "react-hot-toast";
import Max from "~/components/max";
import { getAmount, toExactString } from "~/lib/ui";

import { redeem } from "~/lib/tender";
import { useValidInputV2 } from "~/hooks/use-valid-input";
import BorrowLimit from "../fi-modal/borrow-limit";
import { useProjectBorrowLimit } from "~/hooks/use-project-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import ConfirmingTransaction from "../fi-modal/confirming-transition";
import { TenderContext } from "~/contexts/tender-context";
import { shrinkInputClass } from "~/lib/ui";
import type { ActiveTab } from "./deposit-borrow-flow";
import { checkColorClass } from "../two-panels/two-panels";
import { formatApy } from "~/lib/apy-calculations";
import GlpCooldownTimer from "./GlpCooldownTimer";
import { MAX_WITHDRAW_LIMIT_PERCENTAGE } from "~/lib/constants";
import ESTNDAPR from "../shared/EstndApr";
import APY from "../shared/APY";

export interface WithdrawProps {
  market: Market;
  closeModal: Function;
  borrowLimit: number;
  signer: JsonRpcSigner | null | undefined;
  borrowLimitUsed: string;
  totalBorrowedAmountInUsd: number;
  initialValue: string;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  txnHash: string;
  changeTxnHash: (value: string) => void;
  changeInitialValue: (value: string) => void;
  tabs: { name: ActiveTab; color: string; show: boolean }[];
}

const getSafeMaxWithdrawAmountForToken = (
    tokenPriceInUsd: number,
    totalBorrowedAmountInUsd: number,
    currentBorrowLimitInUsd: number,
    collateralFactor: number,
    borrowLimitUsed: number,
) => {
  /**
   * //getBorrowLimitUsed
   * (borrowedAmount / borrowedLimit) * 100
   *
   * //projectBorrowLimit
   * borrowLimitChangeInUsd = tokenAmount * tp.token.priceInUsd * collateralFactor
   * borrowedLimit = currentBorrowLimitInUsd + borrowLimitChangeInUsd
   *
   * //result
   * borrowLimitUsed = (borrowedAmount / (currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor))) * 100
   * borrowLimitUsed / 100 = borrowedAmount / (currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor))
   * borrowedAmount / (borrowLimitUsed / 100) = currentBorrowLimitInUsd + (tokenAmount * tp.token.priceInUsd * collateralFactor)
   * (borrowedAmount / (borrowLimitUsed / 100)) - currentBorrowLimitInUsd = tokenAmount * tp.token.priceInUsd * collateralFactor
   * (((borrowedAmount / (borrowLimitUsed / 100)) - currentBorrowLimitInUsd)) / (tp.token.priceInUsd * collateralFactor) = tokenAmount
   * */
  const amount: number = Math.abs(
      (totalBorrowedAmountInUsd / (borrowLimitUsed / 100) -
          currentBorrowLimitInUsd) /
      (tokenPriceInUsd * collateralFactor)
  );

  console.log("safeMaxWithdrawAmount", amount);

  return amount;
};

export default function Withdraw({
  market,
  closeModal,
  borrowLimit,
  signer,
  borrowLimitUsed,
  totalBorrowedAmountInUsd,
  initialValue,
  changeInitialValue,
  activeTab,
  setActiveTab,
  txnHash,
  changeTxnHash,
  tabs,
}: WithdrawProps) {
  const tokenDecimals = market.tokenPair.token.decimals;

  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [isGlpCoolingdown, setIsGlpCoolingdown] = useState(false);
  const inputEl = useRef<HTMLInputElement>(null);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const {
    currentTransaction,
    tokenPairs,
    updateTransaction,
    setIsWaitingToBeMined,
  } = useContext(TenderContext);

  const newBorrowLimit = useProjectBorrowLimit(
    signer,
    market.comptrollerAddress,
    tokenPairs,
    market.tokenPair,
    initialValue ? `-${initialValue}` : "0"
  );

  const newBorrowLimitUsed = useBorrowLimitUsed(
    totalBorrowedAmountInUsd,
    newBorrowLimit
  );

  const rawMaxWithdrawAmount = getSafeMaxWithdrawAmountForToken(
      market.tokenPair.token.priceInUsd,
      totalBorrowedAmountInUsd,
      borrowLimit,
      market.collateralFactor,
      100
  );

  const maxWithdrawAmount: number = Math.min(
    rawMaxWithdrawAmount,
    market.supplyBalance, // how much we're supplying
    market.maxBorrowLiquidity // how much cash the contract has
  );

  const rawSafeMaxWithdrawAmount = getSafeMaxWithdrawAmountForToken(
      market.tokenPair.token.priceInUsd,
      totalBorrowedAmountInUsd,
      borrowLimit,
      market.collateralFactor,
      MAX_WITHDRAW_LIMIT_PERCENTAGE
  );

  const safeMaxWithdrawAmount: number = Math.min(
    rawSafeMaxWithdrawAmount,
    market.supplyBalance, // how much we're supplying
    market.maxBorrowLiquidity // how much cash the contract has
  );

  const [isValid, validationDetail] = useValidInputV2(
    getAmount(initialValue, market.tokenPair.token.decimals),
    market.tokenPair.token.floor || "0",
    getAmount(maxWithdrawAmount, market.tokenPair.token.decimals),
    newBorrowLimitUsed,
    false
  );

  const inputTextClass = shrinkInputClass(initialValue.length);

  useEffect(() => {
    inputEl?.current && inputEl.current.focus();

    if (
      (activeTab === "repay" || activeTab === "borrow") &&
      scrollBlockRef?.current
    ) {
      scrollBlockRef.current.scrollLeft = 400;
    }
  }, [activeTab]);

  const handleCheckValue = useCallback(
    (e: any) => {
      const { value } = e.target;
      const formattedValue = value
        .replace(/[^.\d]+/g, "")
        .replace(/^([^\.]*\.)|\./g, "$1");

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
              formattedValue.length <= 20)
          ) {
            changeInitialValue(formattedValue);
          }
        }
      }
    },
    [changeInitialValue]
  );

  const borrowApy = parseFloat(market.marketData.depositApy);
  const supplyApyFormatted = formatApy(borrowApy);

  return (
    <div>
      {txnHash !== "" || currentTransaction ? (
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
                className="group-hover:fill-[#14f195]"
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
            <div className="flex flex-col justify-center items-center overflow-hidden font-space min-h-[70px] h-[70px] pt-[96px] box-content">
              <input
                ref={inputEl}
                value={initialValue}
                onChange={(e) => handleCheckValue(e)}
                style={{ height: 70, minHeight: 70 }}
                className={`input__center__custom z-20 w-full px-[40px] bg-transparent text-white text-center outline-none ${
                  !initialValue && "pl-[80px]"
                } ${inputTextClass}`}
                placeholder="0"
              />
              {parseFloat(borrowLimitUsed) < 100 && (
                <Max
                  maxValue={maxWithdrawAmount}
                  updateValue={() => {
                    inputEl?.current && inputEl.current.focus();
                    changeInitialValue(toExactString(safeMaxWithdrawAmount));
                  }}
                  maxValueLabel={market.tokenPair.token.symbol}
                  label={`${MAX_WITHDRAW_LIMIT_PERCENTAGE}% Max`}
                  borrowLimitUsed={parseFloat(borrowLimitUsed)}
                  maxPercentage={MAX_WITHDRAW_LIMIT_PERCENTAGE}
                  color="#14F195"
                />
              )}
            </div>
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
            <div className="relative flex w-full sm:w-full items-center font-nova text-sm sm:text-base text-white justify-between mb-[10px]">
              <div
                tabIndex={0}
                className="relative flex flex-col items-start group"
              >
                <p className="underline decoration-dashed underline-offset-[2px] cursor-pointer text-[#ADB5B3]">
                  Supply APY
                </p>
                <div className="hidden flex-col absolute items-start bottom-5 group-hover:hidden lg:group-hover:flex group-focus:flex rounded-[10px]">
                  <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                    <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-4 pb-[14px] pl-4">
                      <APY market={market} type="supply" />
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative top-[-6px] left-5 w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
              <div>{supplyApyFormatted}</div>
            </div>

            <BorrowLimit
              value={initialValue}
              isValid={isValid}
              borrowLimit={borrowLimit}
              newBorrowLimit={newBorrowLimit}
              borrowLimitUsed={borrowLimitUsed}
              newBorrowLimitUsed={newBorrowLimitUsed}
              urlArrow="/images/ico/arrow-green.svg"
            />

            {signer && market.id === "GLP" && (
              <GlpCooldownTimer
                signer={signer}
                tokenPair={market.tokenPair}
                onRunning={(isRunning) => setIsGlpCoolingdown(isRunning)}
                onExpire={() => setIsGlpCoolingdown(false)}
              />
            )}

            <div className="flex justify-center h-[50px] md:h-[60px]">
              {!signer && <div>Connect wallet to get started</div>}

              {signer &&
                !isValid &&
                (validationDetail === "Insufficient liquidity" ? (
                  <button className="flex items-center justify-center h-[50px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded bg-[#5B5F65] w-full">
                    <div className="group relative cursor-pointer">
                      <span className="uppercase line-dashed color-black black">
                        {validationDetail}
                      </span>
                      <div className="hidden z-10 flex-col absolute left-[50%] translate-x-[-50%] bottom-[25px] items-center group-hover:flex rounded-[10px]">
                        <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                          <div className="w-full h-full bg-[#181D1B] text-[#ADB5B3] shadow-lg rounded-[10px] p-[15px] text-sm leading-[17px] font-normal font-nova">
                            Insufficient liquidity to withdraw supply fully.
                            Borrow utilization is currently high and borrow
                            costs are increasing, please check back in a few
                            hours as borrowers will be repaying their loans, or
                            withdraw up to the current available amount{" "}
                            {maxWithdrawAmount > 0
                              ? toExactString(maxWithdrawAmount)
                              : 0}{" "}
                            {market.tokenPair.token.symbol}.
                          </div>
                        </div>
                        <div className="custom__arrow__tooltip relative top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B] !border-r-[b5cfcc3c] !border-b-[b5cfcc3c]"></div>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button className="uppercase flex items-center justify-center h-[50px] md:h-[60px] text-center text-black font-space font-bold cursor-default	text-base sm:text-lg rounded bg-[#5B5F65] w-full">
                    {validationDetail}
                  </button>
                ))}

              {signer && isValid && (
                <>
                  {isGlpCoolingdown ? (
                    <button className="flex items-center justify-center h-[50px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded bg-[#5B5F65] w-full">
                      <div className="group relative cursor-pointer">
                        <span className="uppercase line-dashed color-black black">
                          GLP cooldown started
                        </span>
                        <div className="hidden z-10 flex-col absolute left-[50%] translate-x-[-50%] bottom-[25px] items-center group-hover:flex rounded-[10px]">
                          <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                            <div className="w-full h-full bg-[#181D1B] text-[#ADB5B3] shadow-lg rounded-[10px] p-[15px] text-sm leading-[17px] font-normal font-nova">
                              There is a 15-minute cooldown between minting and
                              transferring of GLP. During compounding, new GLP
                              tokens are minted and withdrawal during the
                              cooldown period is restricted.
                            </div>
                          </div>
                          <div className="custom__arrow__tooltip relative top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B] !border-r-[b5cfcc3c] !border-b-[b5cfcc3c]"></div>
                        </div>
                      </div>
                    </button>
                  ) : (
                    <button
                      disabled={isWithdrawing}
                      onClick={async () => {
                        try {
                          if (!initialValue) {
                            toast("Please set a value", {
                              icon: "⚠️",
                            });
                            return;
                          }
                          setIsWithdrawing(true);
                          // entering the max amount displayed should withdraw all
                          const isMax =
                            initialValue == toExactString(market.supplyBalance);
                          // @ts-ignore existence of signer is gated above.
                          const txn = await redeem(
                            initialValue,
                            signer,
                            market.tokenPair.cToken,
                            market.tokenPair.token,
                            isMax
                          );
                          changeTxnHash(txn.hash);
                          setIsWaitingToBeMined(true);
                          const tr = await txn.wait(2); // TODO: error handle if transaction fails
                          updateTransaction(tr.blockHash);
                          changeInitialValue("");
                          changeTxnHash("");
                          toast.success("Withdraw successful");
                        } catch (e) {
                          toast.error("Withdraw unsuccessful");
                          closeModal();
                        } finally {
                          setIsWaitingToBeMined(false);
                          setIsWithdrawing(false);
                        }
                      }}
                      className="uppercase flex items-center justify-center h-[50px] md:h-[60px] text-center text-black font-space font-bold text-base sm:text-lg rounded bg-[#14f195] hover:bg-[#14f195ce] w-full"
                    >
                      {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
