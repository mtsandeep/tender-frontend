import { formatApy } from "~/lib/apy-calculations";
import { useState } from "react";
import TooltipMobileMulti from "../two-panels/tooltip-mobile-MULTI";
import { checkColorClass } from "../two-panels/two-panels";
import { checkZeroValue } from "../markets-page/marketsContent";
import DisplayPrice from "../shared/DisplayPrice";
import ESTNDAPY from "../shared/APY";
import { useTenderContext } from "~/hooks/use-tender-context";
import APY from "../shared/APY";

function TokenTopDetails({ marketInfo }: { marketInfo: object | boolean }) {
  let context  = useTenderContext() 
  let [multiTooltipData, setMultiTooltipData] = useState({
    open: false,
    coins: [{}],
  });
  const isBorrowable = marketInfo.tokenSymbol !== "GLP";
  const borrowApy = isBorrowable ? marketInfo.borrowApy * -1 : 0;
  const supplyApy = marketInfo.supplyApy;


  let market = context?.markets.find(m => m.id === marketInfo.tokenSymbol) 

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
      <div className="flex flex-col ml-[15px] mr-[15px] sm:flex-row md:justify-between md:mr-[30px] md:ml-[30px] mb-[30px]">
        <div className="flex items-center sm:w-[30%] mb-[30px] sm:mb-0 mr-0 md:mr-[30px]">
          <img
            className="w-10 h-10 mr-[15px] md:w-[55px] md:h-[55px] md:mr-[21px]"
            src={marketInfo.icon}
            alt=""
          />
          <p className="font-nova font-medium text-lg leading-[25px] md:text-[22px] whitespace-nowrap md:leading-[31px]">
            {marketInfo.tokenSymbol}
          </p>
        </div>

        <div
          className={`flex font-nova justify-between md:text-center md:w-[${
            isBorrowable ? "511px" : "242px"
          }]`}
        >
          <div className="w-[auto]">
            <div
              tabIndex={0}
              className="relative flex flex-col items-start md:items-center group"
              onClick={() =>
                setMultiTooltipData({
                  ...multiTooltipData,
                  open: window.innerWidth < 1023,
                  coins: [
                    {
                      coinTitle: marketInfo.tokenSymbol,
                      iconSrc: marketInfo.icon,
                      data: formatApy(supplyApy),
                      color: checkColorClass(supplyApy),
                    },
                    {
                      coinTitle: "esTND",
                      iconSrc: "/images/wallet-icons/balance-icon.svg",
                      data: "?.??%",
                      color: "text-white",
                    },
                  ],
                })
              }
            >
              <p className="text-[10px] text-[#818987] leading-[14px] font-semibold underline decoration-dashed underline-offset-[2px] mb-[4px] md:text-sm md:leading-[19px] cursor-pointer">
                Supply APY
              </p>
              <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex group-focus:flex rounded-[10px]">
                <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                  <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                    <APY market={market} type="supply"  />
                  </div>
                </div>
                <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>
            <p
              className={`text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px] ${
                checkZeroValue(supplyApy)
                  ? "text-white"
                  : checkColorClass(supplyApy)
              }`}
            >
              {formatApy(supplyApy)}
            </p>
          </div>
          <div className="w-[auto]">
            <p className="text-[10px] text-[#818987] leading-[14px] font-semibold mb-[4px] whitespace-nowrap md:text-sm md:leading-[19px] mb-[4px]">
              Total Supply
            </p>
            <p className="text-sm text-start md:text-center font-medium leading-[19px] text-center md:text-[22px] md:leading-[31px]">
              <DisplayPrice
                amount={marketInfo.totalSupplyUSD.toString()}
                baseFactor="1"
                isCompact
              />
            </p>
          </div>
          {isBorrowable && (
            <div className="w-[auto]">
              <div
                tabIndex={0}
                className="relative flex flex-col items-start md:items-center group"
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
                        data: "?.??%",
                        color: "text-white",
                      },
                    ],
                  })
                }
              >
                <p className="text-[10px] text-[#818987] leading-[14px] font-semibold underline decoration-dashed underline-offset-[2px] mb-[4px] md:text-sm md:leading-[19px] cursor-pointer">
                  Borrow APY
                </p>
                <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex group-focus:flex rounded-[10px]">
                  <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
                    <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
                    <APY market={market} type="borrow" />
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
              <p
                className={`text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px] ${
                  checkZeroValue(borrowApy)
                    ? "text-white"
                    : checkColorClass(borrowApy)
                }`}
              >
                {formatApy(borrowApy)}
              </p>
            </div>
          )}
          {isBorrowable && (
            <div className="w-[auto]">
              <p className="text-[10px] text-[#818987] leading-[14px] font-semibold md:text-sm md:leading-[19px] mb-[4px]">
                Total Borrow
              </p>
              <p className="mt-[4px] text-sm font-medium leading-[19px] md:text-[22px] md:leading-[31px]">
                <DisplayPrice
                  amount={marketInfo.totalBorrowUSD.toString()}
                  baseFactor="1"
                  isCompact
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TokenTopDetails;
