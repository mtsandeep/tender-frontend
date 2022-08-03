import Chart from "~/components/Chart";

function TokenChart() {
  return (
    <div className="bg-[#0D0D0D] pane-custom pt-4 mb-[60px] sm:pt-7">
      <div className="flex-col text-xs font-[ProximaNova] font-normal leading-4  ml-[15px] mb-[30px] sm:text-sm sm:leading-[20px] sm:ml-[28px] sm:mb-[26px]">
        <span>Markets </span>
        <span className="text-[#818987]">/ USDC</span>
      </div>
      <div className="flex flex-col ml-[15px] sm:flex-row sm:justify-between sm:mr-[30px] sm:ml-[30px]">
        <div className="flex items-center mb-[30px] sm:w-[30%]">
          <img
            className="w-10 h-10 mr-[15px] sm:w-[55px] sm:h-[55px] sm:mr-[21px]"
            src="/images\coin-icons\usdc.svg"
            alt=""
          />
          <p className="font-[ProximaNova] font-medium text-lg leading-[25px] sm:text-[22px] whitespace-nowrap sm:leading-[31px]">
            USD Coin
          </p>
        </div>
        <div className="flex flex-wrap font-[ProximaNova] sm:flex-nowrap sm:max-w-[511px] sm:justify-end sm:text-center sm:gap-[40px]">
          <div className="pl-[4px] ">
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold underline decoration-dashed underline-offset-[2px] mb-[4px] sm:text-sm sm:leading-[19px]">
              Net rate
            </p>
            <p className="text-sm font-medium leading-[19px] sm:text-[22px] sm:leading-[31px]">
              0.75%
            </p>
          </div>
          <div className="pl-[21px] sm:pl-0 sm:pr-[46px] ">
            <div className="flex">
              <img
                className="w-3.5 h-3.5 mr-[4px] sm:w-[20px] sm:h-[20px]"
                src="/images\coin-icons\usdc.svg"
                alt=""
              />
              <span className="text-[10px] text-[#818987] leading-[14px] font-semibold mb-[4px] whitespace-nowrap sm:text-sm sm:leading-[19px]">
                Supply APY
              </span>
            </div>
            <p className="text-sm text-center font-medium leading-[19px] text-center sm:text-[22px] sm:leading-[31px]">
              0.25%
            </p>
          </div>
          <div className="pl-[22px] sm:pl-0 sm:pr-[48px] ">
            <div className="flex">
              <img
                className="w-3.5 h-3.5 mr-[4px] sm:w-[20px] sm:h-[20px]"
                src="/images\tenderLogoSmall.svg"
                alt=""
              />
              <span className="text-[10px] text-[#818987] leading-[14px] font-semibold pr-[1px] mb-[4px] whitespace-nowrap sm:text-sm sm:leading-[19px]">
                Distribution APY
              </span>
            </div>
            <p className="text-sm text-center font-medium leading-[19px]text-center sm:text-[22px] sm:leading-[31px]">
              0.35%
            </p>
          </div>
          <div className="text-center pt-[12px] mb-[4px] pl-[4px] sm:pl-[0px] sm:pt-[0px] ">
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold sm:text-sm sm:leading-[19px] ">
              Total Supply
            </p>
            <p className="mt-[4px] text-sm font-medium leading-[19px] sm:text-[22px] sm:leading-[31px]">
              $841.515M
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[23px] flex font-[SpaceGrotesk] uppercase font-bold text-xs leading-[20px] border-b border-[#282C2B] sm:text-[15px] sm:leading-[25.5px]">
        <div className="text-center w-full pt-[13px] pb-[7px] text-[#14F195] border-b-[2px] border-[#14F195]  sm:w-[170px]">
          <p>supply</p>
        </div>
        <div className="text-center w-full pt-[13px] pb-[7px] text-[#00E0FF] border-b-[2px] border-[#00E0FF] sm:w-[170px]">
          {/* text-[#ADB5B3] */}
          <p>borrow</p>
        </div>
      </div>

      <Chart />
    </div>
  );
}

export default TokenChart;
