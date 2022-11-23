import Ring from "./ring";

const formatCurrency = (v: number): string => {
  return `$${v.toFixed(2)}`;
};

export default function AccountSummaryEmpty({ loading }: { loading: boolean }) {
  let borrowLimit = 0;
  let borrowLimitUsed = 0;

  return (
    <div
      className={`${
        loading ? "switch__to__network" : ""
      } mb-[90px] md:mb-[62px] border-custom px-4 relative rounded-t-[16px] bg-[#111111] top__custom`}
    >
      <div className="pt-[101px] md:pt-[46px] relative">
        <div
          className={`z-[3] absolute w-[130px] h-[130px] top-[-70px] md:top-[auto] bottom-[auto] md:bottom-[-12px] left-[50%] translate-x-[-50%] rounded-full md:w-[200px] md:h-[200px] bg-[#111111] green }`}
        >
          <div className="flex flex-col h-full justify-center items-center">
            <div className="uppercase text-[#818987] text-sm leading-[170%] tracking-widest font-nova font-medium text-sm mb-[5px] md:mb-[10px]">
              Net APY
            </div>
            <div className="absolute top-0 right-0"></div>
            <div className="absolute top-0 right-0"></div>
            <div className="animate w-[70px] md:w-[90px] h-[31px] md:h-[42px] text-2xl md:text-[35px] font-space font-normal"></div>
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
              <div className="animate w-[180px] h-[32px] text-2xl font-space md:text-[26px] font-normal"></div>
            </div>
            <div className="w-full mt-[0px] md:mt-[23px] text-right flex flex-col justify-center items-center mb-[36px] md:mb-[0px]">
              <div className="text-dark-green font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Your Supply
              </div>
              <div className="animate w-[180px] h-[32px] text-2xl font-space md:text-[26px] font-normal"></div>
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
              <div className="animate w-[180px] h-[32px] text-2xl font-space md:text-[26px] font-normal"></div>
            </div>
            <div className="w-full mt-[0px] md:mt-[23px] text-right flex flex-col justify-center items-center">
              <div className="text-[#00E0FF] font-nova font-semibold text-sm mb-[8px] md:mb-[9px]">
                Your Borrow
              </div>
              <div className="animate w-[180px] h-[32px] text-2xl font-space md:text-[26px] font-normal"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-[5px] md:gap-0 flex flex-col text-xs justify-center font-nova pb-[15px] md:pb-[12px]">
        <div className="flex justify-between items-center">
          <div className="justify-self-start text-xs text-[#818987] md:pb-[6px] font-nova font-normal">
            Borrow Used
          </div>
          <div className="justify-self-start text-xs text-[#818987] md:pb-[6px] font-nova font-normal">
            Borrow Max
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="mr-2 font-nova text-sm text-white">
            {borrowLimitUsed}%
          </div>
          <div className="font-nova text-sm text-white">
            {formatCurrency(borrowLimit)}
          </div>
        </div>
      </div>
      <div
        className="w-full h-full bg-green-300 mr-2 h-[5px] md:h-[4px] absolute bottom-0 left-0 zIndex-1 flex justify-end"
        style={{
          background: "linear-gradient(270deg, #1BD6CF 0%, #00E5AF 100%)",
          width: 16,
          transition: "width 1s ease-out",
        }}
      ></div>
      <div className="w-full flex absolute bottom-0 left-0">
        <div className="bg-[#262D2A] h-[4px] flex-grow"></div>
      </div>
    </div>
  );
}
