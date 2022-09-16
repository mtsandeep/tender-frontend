import { useState } from "react";
import TokenTopDetailsEmpty from "./tokenTopDetailsEmpty";

function TokenChartEmpty() {
  const [tabName, setTabName] = useState<string>("supply");

  return (
    <div className="switch__to__network bg-[#0D0D0D] panel-custom pt-4 mb-[60px] md:mb-[60px] md:pt-7 pb-[20px] lg:pb-0">
      <div className="animate ml-[15px] mb-[26px] md:ml-[28px] w-[130px] h-[16px] md:h-[20px]"></div>
      <TokenTopDetailsEmpty />

      <div className="mt-[33px] flex font-[SpaceGrotesk] uppercase font-bold text-xs leading-5 border-b border-[#282C2B] md:text-[15px] md:leading-[25.5px]">
        <div
          onClick={() => setTabName("supply")}
          className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
            tabName === "supply"
              ? "border-[#14F195] text-[#14F195]"
              : "border-[transparent] text-white"
          }`}
        >
          supply
        </div>
        <div
          onClick={() => setTabName("borrow")}
          className={`cursor-pointer text-center w-full pb-[6px] md:pb-[12px] border-b-[3px] md:w-[170px] ${
            tabName === "borrow"
              ? "border-[#00E0FF] text-[#00E0FF]"
              : "border-[transparent] text-white"
          }`}
        >
          borrow
        </div>
      </div>
      <div className="pt-[40px] pb-[20px] md:pb-[40px] pl-[20px] pr-[20px]">
        <div className="animate w-full h-[255px] md:h-[293px]"></div>
      </div>
    </div>
  );
}

export default TokenChartEmpty;
