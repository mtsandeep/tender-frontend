import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";

export function Allowance({ tokenAllowance, decimals }: { tokenAllowance: BigNumber; decimals: number; }) {
  let amountString = formatUnits(tokenAllowance, decimals)
  let amount = parseFloat(amountString)

  return <div className="relative flex w-full sm:w-full items-center font-nova text-sm sm:text-base text-white justify-between mb-[10px]">
    <div
      tabIndex={0}
      className="relative flex flex-col items-start group"
    >
      <p className="underline decoration-dashed underline-offset-[2px] cursor-pointer text-[#ADB5B3]">
        Allowance
    </p>
      <div className="hidden flex-col absolute items-start bottom-5 group-hover:hidden lg:group-hover:flex group-focus:flex rounded-[10px]">
        <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg mx-[0px] !rounded-[10px] panel-custom">
          <div className="flex-col h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-4 pb-[14px] pl-4 w-80">
            <p>This is how much your wallet has approved to transfer.</p>
          </div>
        </div>
        <div className="custom__arrow__tooltip relative top-[-6px] left-5 w-3 h-3 rotate-45 bg-[#181D1B]"></div>
      </div>
    </div>
    <div>{amount > 10e+12 ? "Unlimited": amount.toPrecision(8)}</div>
  </div>;
}

