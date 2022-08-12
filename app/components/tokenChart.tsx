import { useState } from "react";
import ChartBorrow from "~/components/ChartBorrow";
import ChartSupply from "~/components/ChartSupply";

function TokenChart() {
  const [tabName, setTabName] = useState<string>("supply");

  console.log(tabName);

  return (
    <div className="bg-[#0D0D0D] pane-custom pt-4 mb-[60px] md:mb-[40px] md:pt-7 pb-[20px] md:pb-0">
      <div className="flex-col text-xs font-nova font-normal leading-4 ml-[15px] mb-[30px] md:text-sm md:leading-[20px] md:ml-[28px] md:mb-[26px]">
        <span>Markets </span>
        <span className="text-[#818987]">/ USDC</span>
      </div>
      <div className="flex flex-col ml-[15px] mr-[15px] md:flex-row md:justify-between md:mr-[30px] md:ml-[30px] mb-[30px] md:mb-[50px]">
        <div className="flex items-center md:w-[30%] mb-[30px] md:mb-0">
          <img
            className="w-10 h-10 mr-[15px] md:w-[55px] md:h-[55px] md:mr-[21px]"
            src="/images\coin-icons\usdc.svg"
            alt=""
          />
          <p className="font-nova font-medium text-lg leading-[25px] md:text-[22px] whitespace-nowrap md:leading-[31px]">
            USD Coin
          </p>
        </div>
        <div className="flex md:gap-[0px] gap-x-[20px] gap-y-[12px] flex-wrap font-nova md:flex-nowrap justify-between md:text-center w-full md:w-[511px]">
          <div>
            <div className="relative flex flex-col items-start md:items-center group">
              <p className="text-[10px] text-[#818987] leading-[14px] font-semibold underline decoration-dashed underline-offset-[2px] mb-[4px] md:text-sm md:leading-[19px]">
                Net rate
              </p>
              <div className="hidden md::flex absolute right__custom top-[50%] translate__0__50 items-center hidden group-hover:flex rounded-[15px]">
                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] pane-custom">
                  <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[20px]">
                    <span className="mb-[8px] block text-[#FFF] text-[16px] text-left">
                      Net rate
                    </span>
                    <p className="text-[#818987] text-[14px] text-left leading-[140%] font-nova">
                      This rate blends the Supply or Borrow APY with the TENDIES
                      Distribution APY based on the current price of TENDIES.
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 -ml-[8px] rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>
            <p className="text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
              0.75%
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                className="w-3.5 h-3.5 mr-[4px] md:w-[20px] md:h-[20px]"
                src="/images\coin-icons\usdc.svg"
                alt=""
              />
              <span className="text-[10px] text-[#818987] leading-[14px] font-semibold mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px]">
                Supply APY
              </span>
            </div>
            <p className="text-sm text-center font-medium leading-[19px] text-center md:text-[22px] md:leading-[31px]">
              0.25%
            </p>
          </div>
          <div>
            <div className="flex justify-center">
              <img
                className="w-3.5 h-3.5 mr-[4px] md:w-[20px] md:h-[20px]"
                src="/images\tenderLogoSmall.svg"
                alt=""
              />
              <span className="text-[10px] text-[#818987] leading-[14px] font-semibold pr-[1px] mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px]">
                Distribution APY
              </span>
            </div>
            <p className="text-sm text-center font-medium leading-[19px]text-center md:text-[22px] md:leading-[31px]">
              0.35%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold md:text-sm md:leading-[19px] ">
              Total Supply
            </p>
            <p className="mt-[4px] text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
              $841.515M
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[33px] flex font-[SpaceGrotesk] uppercase font-bold text-[12px] leading-[20px] border-b border-[#282C2B] md:text-[15px] md:leading-[25.5px]">
        <div
          onClick={() => setTabName("supply")}
          className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
            tabName === "supply"
              ? "border-[#14F195] text-[#14F195]"
              : "border-[transparent] text-[#FFF]"
          }`}
        >
          supply
        </div>
        <div
          onClick={() => setTabName("borrow")}
          className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
            tabName === "borrow"
              ? "border-[#00E0FF] text-[#00E0FF]"
              : "border-[transparent] text-[#FFF]"
          }`}
        >
          borrow
        </div>
      </div>

      {tabName === "supply" ? <ChartSupply /> : <ChartBorrow />}
    </div>
  );
}

export default TokenChart;
