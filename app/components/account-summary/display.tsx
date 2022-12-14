import DisplayPrice from "~/components/shared/DisplayPrice";
import Ring from "./ring";
interface props {
  totalSuppliedUsd: number;
  totalBorrowedUsd: number;
  borrowBalanceInUsd: number;
  supplyBalanceInUsd: number;
  netApy: number | null;
  ltv: number;
  borrowLimitUsed: string;
  percentUsed: number;
  borrowLimit: number;
}

export default function Display({
  totalSuppliedUsd,
  totalBorrowedUsd,
  borrowBalanceInUsd,
  supplyBalanceInUsd,
  netApy,
  ltv,
  borrowLimitUsed,
  percentUsed,
  borrowLimit,
}: props) {
  return (
    <div
      aria-label="Account summary"
      tabIndex={0}
      role="presentation"
      className="focus:outline-none mb-[90px] md:mb-[62px] border-custom px-4 relative top__custom"
    >
      <div className="pt-[101px] md:pt-[46px] relative">
        <div
          className={`z-[3] absolute w-[130px] h-[130px] top-[-70px] md:top-[auto] bottom-[auto] md:bottom-[-12px] left-[50%] translate-x-[-50%] rounded-full md:w-[200px] md:h-[200px] top__custom__value green }`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <div className="uppercase text-[#818987] text-[13px] leading-[170%] tracking-widest font-nova font-medium text-sm">
              Net APY
            </div>

            <div className="font-space font-normal text-[24px] md:text-[35px]">
              {netApy?.toFixed(2) + "%"}
            </div>
            <div className="absolute top-0 right-0"></div>
            <div className="absolute top-0 right-0"></div>
            <div className="absolute top-[50%] left-[50%] translate__50 items-center flex justify-center z-[-1]">
              <Ring />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row mb-[48px] md:mb-[11px] relative">
          <div className="flex flex-col items-center justify-center w-[260px] ml-[0] md:ml-[50px] lg:ml-[116px]">
            <div className="w-full md:max-w-[491px] flex flex-col justify-center items-center mb-[32px] md:mb-[40px]">
              <div className="text-dark-green font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Total Supply
              </div>
              <div className="text-2xl font-space md:text-[26px] font-normal">
                <DisplayPrice
                  amount={totalSuppliedUsd.toString()}
                  baseFactor="1"
                  isCompact
                  hideBaseCurrencyCode
                />
              </div>
            </div>
            <div className="w-full mt-[0px] md:mt-[23px] text-right flex flex-col justify-center items-center mb-[36px] md:mb-[0px]">
              <div className="text-dark-green font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Your Supply
              </div>
              <div className="text-2xl font-space md:text-[26px] font-normal">
                <DisplayPrice
                  amount={supplyBalanceInUsd.toString()}
                  baseFactor="1"
                  isCompact
                  hideBaseCurrencyCode
                />
              </div>
            </div>
          </div>
          <img
            src="/images/top-line.png"
            alt=""
            className="hidden z-[2] md:block width-[auto] m-width-[100%] absolute top-[50%] left-[50%] translate__3"
          />
          <div className="flex flex-col items-center justify-center w-[260px] mr-[0] md:mr-[50px] lg:mr-[116px] ">
            <div className="w-full md:max-w-[491px] flex flex-col justify-center items-center mb-[32px] md:mb-[40px]">
              <div className="text-[#00E0FF] font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Total Borrow
              </div>
              <div className="text-2xl font-space md:text-[26px] font-normal">
                <DisplayPrice
                  amount={totalBorrowedUsd.toString()}
                  baseFactor="1"
                  isCompact
                  hideBaseCurrencyCode
                />
              </div>
            </div>
            <div className="w-full mt-[0px] md:mt-[23px] text-right flex flex-col justify-center items-center">
              <div className="text-[#00E0FF] font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Your Borrow
              </div>
              <div className="text-2xl font-space md:text-[26px] font-normal">
                <DisplayPrice
                  amount={borrowBalanceInUsd.toString()}
                  baseFactor="1"
                  isCompact
                  hideBaseCurrencyCode
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-[5px] md:gap-0 flex flex-col text-xs justify-center font-nova pb-[15px] md:pb-[12px]">
        <div className="flex justify-between items-center">
          <div
            tabIndex={0}
            className="group relative md:w-fit p-[0px] md:pb-[6px]"
          >
            <span className="justify-self-start text-xs text-[#818987] font-nova font-normal underline decoration-dashed underline-offset-[2px] cursor-pointer">
              Borrow Used
            </span>
            <div className="hidden z-10 flex-col absolute left-0 bottom-[18px] items-start group-hover:flex group-focus:flex rounded-[10px]">
              <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[220px] panel-custom !rounded-[10px]">
                <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#818987]">Loan to Value (LTV)</span>
                    <span>{ltv.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              <div className="custom__arrow__tooltip relative left-[10px] top-[-6px] z-[11] !mt-[0] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
            </div>
          </div>

          <div
            tabIndex={0}
            className="group relative md:w-fit p-[0px] md:pb-[6px]"
          >
            <span className="justify-self-start text-xs text-[#818987] font-nova font-normal underline decoration-dashed underline-offset-[2px] cursor-pointer">
              Borrow Max
            </span>
            <div className="hidden z-10 flex-col absolute right-0 bottom-[18px] items-end group-hover:flex group-focus:flex rounded-[10px]">
              <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[220px] panel-custom !rounded-[10px]">
                <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#818987]">
                      Liquidation Threshold
                    </span>
                    <span>
                      <DisplayPrice
                        amount={borrowLimit.toString()}
                        baseFactor="1"
                        isCompact
                        hideBaseCurrencyCode
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="custom__arrow__tooltip relative right-[10px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="mr-2 font-nova text-sm text-white">0%</div>
          <div className="font-nova text-sm text-white">
            <DisplayPrice
              amount={borrowLimit.toString()}
              baseFactor="1"
              isCompact
              hideBaseCurrencyCode
            />
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="h-[5px] bg-[#1BD6CF] w-[16px] md:h-[4px] absolute bottom-0 left-0 zIndex-1"></div>
        <div
          className="w-0 h-full bg-green-300 h-[5px] md:h-[4px] absolute bottom-0 left-[16px] zIndex-1 flex justify-end"
          style={{
            background: "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
            width: `calc(${percentUsed}% - 16px)`,
            transition: "width 1s ease-out",
          }}
        >
          {parseFloat(borrowLimitUsed) > 0 && (
            <span className="span-value">{borrowLimitUsed}%</span>
          )}
        </div>
      </div>
      <div className="w-full flex absolute bottom-0 left-0">
        <div className="bg-[#262D2A] h-[4px] flex-grow"></div>
      </div>
    </div>
  );
}
