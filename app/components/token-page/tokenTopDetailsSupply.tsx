import { toShortFiatString } from "~/lib/ui";
import {formatApy} from "~/lib/apy-calculations";

function TokenTopDetailsSupply({ marketInfo }: { marketInfo: object | boolean }) {
  return (
    <div className="flex flex-col ml-[15px] mr-[15px] md:flex-row md:justify-between md:mr-[30px] md:ml-[30px] mb-[30px] md:mb-[50px]">
      <div className="flex items-center md:w-[30%] mb-[30px] md:mb-0">
        <img
          className="w-10 h-10 mr-[15px] md:w-[55px] md:h-[55px] md:mr-[21px]"
          src={marketInfo.icon}
          alt=""
        />
        <p className="font-nova font-medium text-lg leading-[25px] md:text-[22px] whitespace-nowrap md:leading-[31px]">
          {marketInfo.underlyingSymbol}
        </p>
      </div>
      <div className="flex md:gap-[0px] gap-x-[0px] gap-y-[12px] flex-wrap font-nova md:flex-nowrap justify-start md:justify-between md:text-center w-full md:w-[511px]">
        <div className="w-[120px] md:w-[auto]">
          <div className="relative flex flex-col items-start md:items-center group">
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold underline decoration-dashed underline-offset-[2px] mb-[4px] md:text-sm md:leading-[19px] cursor-pointer">
              Net Rate
            </p>
            <div className="hidden  absolute right__custom top-[50%] translate__0__50 items-center hidden group-hover:flex rounded-[15px]">
              <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[240px] panel-custom">
                <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[15px] p-[20px]">
                  <span className="mb-[8px] block text-white text-base text-left">
                    Net Rate
                  </span>
                  <p className="text-[#818987] text-sm text-left leading-[140%] font-nova">
                    This rate blends the Supply or Borrow APY with the TND
                    Distribution APY based on the current price of TND.
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
        <div className="w-[120px] md:w-[auto]">
          <div className="flex justify-start md:justify-center">
            <img
              className="w-3.5 h-3.5 mr-[4px] md:w-[20px] md:h-[20px]"
              src={marketInfo.icon}
              alt=""
            />
            <span className="text-[10px] text-[#818987] leading-[14px] font-semibold mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px]">
              Supply APY
            </span>
          </div>
          <p className="text-sm text-start md:text-center font-medium leading-[19px] text-center md:text-[22px] md:leading-[31px]">
            {formatApy(marketInfo.supplyApy)}
          </p>
        </div>
        <div className="w-[120px] md:w-[auto]">
          <div className="flex justify-start md:justify-center">
            <img
              className="w-3.5 h-3.5 mr-[4px] md:w-[20px] md:h-[20px]"
              src="/images/tenderLogoSmall.svg"
              alt=""
            />
            <span className="text-[10px] text-[#818987] leading-[14px] font-semibold pr-[1px] mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px]">
              Distribution APY
            </span>
          </div>
          <p className="text-sm text-start md:text-center font-medium leading-[19px]text-center md:text-[22px] md:leading-[31px]">
            0.35%
          </p>
        </div>
        <div className="w-[120px] md:w-[auto]">
          <p className="text-[10px] text-[#818987] leading-[14px] font-semibold md:text-sm md:leading-[19px] ">
            Total Supply
          </p>
          <p className="mt-[4px] text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
            {`$${toShortFiatString(marketInfo.totalSupplyUSD)} USD`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenTopDetailsSupply;
