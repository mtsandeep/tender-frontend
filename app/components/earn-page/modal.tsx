/* eslint-disable no-useless-escape */
import { useRef, useState } from "react";
import type {
  JsonRpcSigner,
} from "@ethersproject/providers";
import Max from "~/components/max";

import { enable, TND_DECIMALS } from "~/lib/tnd";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";
import toast from "react-hot-toast";

export interface EarnModalProps {
  closeModal: Function;
  balance: BigNumber;
  signer?: JsonRpcSigner;
  sTNDAllowance?: BigNumber;
  complete: (amount: BigNumber) => void;
  action: string;
  symbol?: "TND" | "esTND";
  totalStaked?: BigNumber;
  totalBonusPoints?: BigNumber;
}

export default function Modal({
  closeModal,
  balance,
  signer,
  sTNDAllowance,
  complete,
  action="Stake",
  symbol="TND",
  totalStaked,
  totalBonusPoints,
}: EarnModalProps) {
  const tokenDecimals = TND_DECIMALS;
  
  const [isEnabled, setIsEnabled] = useState<boolean>(sTNDAllowance?.gt(1) ?? false );
  const [validationDetail, setValidationDetail] = useState<string | null>(null);
  const [willLose, setWillLose] = useState<string | null>(null);
  const inputEl = useRef<HTMLInputElement>(null);
  const isValid = validationDetail === null

  const maxAmount = parseFloat(formatUnits(balance, tokenDecimals))

  const onChange = () => {
      if (null === inputEl.current) { return }
      try {
        var value = parseUnits(inputEl.current.value.replace(/,/g, "") , tokenDecimals)
      } catch (e) {
        setValidationDetail("Invalid input")           
        return
      }

      if (value.gt(balance)) {
        setValidationDetail("Insufficient Balance")
      } else {
        setValidationDetail(null)      
      }

      if (action === "Unstake" && totalStaked && totalBonusPoints && value.gt(0)) {
        let withdrawAmount = parseFloat(inputEl.current.value)
        let staked = parseFloat(formatUnits(totalStaked, TND_DECIMALS))
        let downAmount =  parseFloat(formatUnits(totalBonusPoints, TND_DECIMALS)) * withdrawAmount / staked
        setWillLose(
          `You will lose ${downAmount.toPrecision(4)} (${(100 * withdrawAmount / staked).toPrecision(4)}%)
          Multiplier Points when you unstake`)
      } else {
        setWillLose(null)
      }
  }

  const onEnable = async ()=> {
    if (!signer) return
    let id =  toast.loading("Waiting for transaction")
    let tx = await enable(symbol, signer)
    await tx.wait(1)
    toast.dismiss(id)
    toast.success("Enabled")
    setIsEnabled(true)
  }


    return <div className="">
          <div className="bg-[#151515] relative border-[#B5CFCC2B] border-b">
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
              {action.toLocaleUpperCase()} ${symbol}
            </div>

            <div className="flex flex-col justify-center items-center overflow-hidden font-space min-h-[70px] h-[70px] pt-[96px] box-content">
              <input
                tabIndex={0}
                ref={inputEl}
                pattern="[0-9]*([\.,][0-9]+)?"
                defaultValue={0}
                style={{ height: 70, minHeight: 70 }}
                onChange={onChange}
                className={`input__center__custom z-20 w-full text-3xl px-[40px] bg-transparent text-white text-center outline-none`}
              />
              <Max
                maxValue={maxAmount}
                updateValue={() => {
                  inputEl?.current && inputEl.current.focus();
                  if (inputEl.current) inputEl.current.value = formatUnits(balance, tokenDecimals)
                }}
                maxValueLabel={symbol}
                color="#14f195"
              />
            </div>
          
          {willLose && isValid && <p className="pb-4 text-center">{willLose}</p>}

            <div className="flex justify-center h-[50px] md:h-[60px]">
              {!signer && <div>Connect wallet to get started</div>}

              {signer && isEnabled && !isValid && (
                <button className="uppercase flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold cursor-default	text-base sm:text-lg rounded w-full bg-[#5B5F65]">
                  {validationDetail}
                </button>
              )}

              {!isEnabled && <button disabled={!isValid} onClick={onEnable}
                className="flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14f195] hover:bg-[#00e1ffd0]"
                >
                  Enable
                </button>
                }
              {signer && isEnabled && isValid && (
                <button disabled={!isValid} onClick={() => {
                    if (isValid && inputEl.current) { 
                        closeModal()
                        complete(parseUnits(inputEl.current.value, tokenDecimals))
                    }
                }}
                className="flex items-center justify-center h-[50px] md:h-[60px] text-black font-space font-bold text-base sm:text-lg rounded w-full bg-[#14f195] hover:bg-[#00e1ffd0]"
                >
                    {validationDetail ?? action}
                </button>
            )}
            </div>
          </div>
        </div>
}
