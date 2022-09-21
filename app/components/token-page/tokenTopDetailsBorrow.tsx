import { toShortFiatString } from "~/lib/ui";
import { formatApy } from "~/lib/apy-calculations";
import { useState } from "react";
import TooltipMobileMulti from "../two-panels/tooltip-mobile-MULTI";
import { checkColorClass } from "../two-panels/two-panels";

function TokenTopDetailsBorrow({
  marketInfo,
}: {
  marketInfo: object | boolean;
}) {
  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });

  const borrowApy =
    marketInfo.tokenSymbol === "GLP" ? 0 : marketInfo.borrowApy * -1;

  return (
    <>
      <TooltipMobileMulti
        tooltipData={multiTooltipData}
        handleClose={() =>
          setMultiTooltipData({
            open: false,
            coins: [],
          })
        }
      />
      <div className="flex flex-col ml-[15px] mr-[15px] md:flex-row md:justify-between md:mr-[30px] md:ml-[30px] mb-[30px] md:mb-[50px]">
        <div className="flex items-center md:w-[30%] mb-[30px] md:mb-0">
          <img
            className="w-10 h-10 mr-[15px] md:w-[55px] md:h-[55px] md:mr-[21px]"
            src={marketInfo.icon}
            alt=""
          />
          <p className="font-nova font-medium text-lg leading-[25px] md:text-[22px] whitespace-nowrap md:leading-[31px]">
            {marketInfo.tokenSymbol}
          </p>
        </div>
        <div className="flex md:gap-[0px] gap-x-[0px] gap-y-[12px] flex-wrap font-nova md:flex-nowrap justify-start md:justify-between md:text-center w-full md:w-[380px]">
          <div className="mr-[50px] relative flex flex-col items-center">
            <div className="flex justify-start">
              <img
                className="w-3.5 h-3.5 mr-[4px] md:w-[20px] md:h-[20px]"
                src={marketInfo.icon}
                alt=""
              />
              <span className="text-[10px] text-[#818987] leading-[14px] font-semibold mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px]">
                Borrow APY
              </span>
            </div>
            <p className="mt-[4px] text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
              {formatApy(borrowApy)}
            </p>
            <div className="group">
              <div
                onClick={() =>
                  setMultiTooltipData({
                    ...multiTooltipData,
                    open: window.innerWidth < 1023,
                    coins: [
                      {
                        coinTitle: marketInfo.tokenSymbol,
                        iconSrc: marketInfo.icon,
                        data: formatApy(borrowApy),
                        color: checkColorClass(borrowApy),
                      },
                      {
                        coinTitle: "esTND",
                        iconSrc: "/images/wallet-icons/balance-icon.svg",
                        data: "0.00%",
                        color: "text-white",
                      },
                    ],
                  })
                }
                className="custom__hidden cursor-pointer !inline-flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
              >
                <img
                  className="w-[13px] h-[13px]"
                  src={marketInfo.icon}
                  alt={marketInfo.tokenSymbol}
                />
                <img
                  className="w-[13px] h-[13px] ml-[6px]"
                  src="/images/wallet-icons/balance-icon.svg"
                  alt="..."
                />
              </div>
              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
                      <div className="flex gap-[8px]">
                        <img
                          className="max-w-[18px]"
                          src={marketInfo.icon}
                          alt="..."
                        />
                        <span className="font-nova text-white text-sm font-normal">
                          {marketInfo.tokenSymbol}
                        </span>
                      </div>
                      <span
                        className={`font-nova text-sm font-normal ${checkColorClass(
                          borrowApy
                        )}`}
                      >
                        {formatApy(borrowApy)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-[30px]">
                      <div className="flex gap-[8px]">
                        <img
                          className="max-w-[18px]"
                          src="/images/wallet-icons/balance-icon.svg"
                          alt="..."
                        />
                        <span className="font-nova text-white text-sm font-normal">
                          esTND
                        </span>
                      </div>
                      <span className="font-nova text-white text-sm font-normal">
                        0.00%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>
          </div>
          <div className="">
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold md:text-sm md:leading-[19px] ">
              Total Borrow
            </p>
            <p className="mt-[4px] text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
              {`$${toShortFiatString(marketInfo.totalBorrowUSD)} USD`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TokenTopDetailsBorrow;
