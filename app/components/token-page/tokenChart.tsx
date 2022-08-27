import { useState } from "react";
import ChartBorrow from "./ChartBorrow";
import ChartSupply from "./ChartSupply";
import TokenTopDetailsBorrow from "./tokenTopDetailsBorrow";
import TokenTopDetailsSupply from "./tokenTopDetailsSupply";

function TokenChart() {
  const [tabName, setTabName] = useState<string>("supply");

  return (
    <div className="bg-[#0D0D0D] panel-custom pt-4 mb-[60px] md:mb-[60px] md:pt-7 pb-[20px] md:pb-0">
      <div className="flex-col text-xs font-nova font-normal leading-4 ml-[15px] mb-[30px] md:text-sm md:leading-[20px] md:ml-[28px] md:mb-[26px]">
        <a className="cursor-pointer hover:text-[#14f195]" href="/">
          Markets
        </a>
        <span className="text-[#818987]"> / USDC</span>
      </div>
      {tabName === "supply" ? (
        <TokenTopDetailsSupply />
      ) : (
        <TokenTopDetailsBorrow />
      )}

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
