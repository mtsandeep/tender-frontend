import TooltipMobileMulti from "../two-panels/tooltip-mobile-MULTI";
import { checkColorClass, useMultiTooltip } from "../two-panels/two-panels";
import { checkZeroValue } from "../markets-page/marketsContent";
import DisplayPrice from "../shared/DisplayPrice";
import { getAPY } from "../shared/APY";
import { useTenderContext } from "~/hooks/use-tender-context";
import APY from "../shared/APY";

function TokenTopDetails({ marketInfo }: { marketInfo: object | undefined }) {
  let context  = useTenderContext() 
  let {multiTooltipData, setMultiTooltipData, getOnClick} = useMultiTooltip()
  let market = context?.markets.find(m => m.id === marketInfo?.tokenSymbol) 

  if (!market) return null

  let supplyAPYInfo = getAPY("supply", market, context)
  let borrowAPYInfo = getAPY("borrow", market, context)

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
            src={market.tokenPair.token.icon}
            alt=""
          />
          <p className="font-nova font-medium text-lg leading-[25px] md:text-[22px] whitespace-nowrap md:leading-[31px]">
            {market.tokenPair.token.symbol}
          </p>
        </div>

        <div
          className={`flex font-nova justify-between md:text-center md:w-[${
            market.isBorrowable ? "511px" : "242px"
          }]`}
        >
          <div className="w-[auto]">
            <div
              tabIndex={0}
              className="relative flex flex-col items-start md:items-center group"
              onClick={getOnClick(market, "supply")}
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
                checkZeroValue(supplyAPYInfo.APY)
                  ? "text-white"
                  : checkColorClass(supplyAPYInfo.APY)
              }`}
            >
              {supplyAPYInfo.formattedTotalAPY}
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
          {market.isBorrowable && (
            <div className="w-[auto]">
              <div
                tabIndex={0}
                className="relative flex flex-col items-start md:items-center group"
                onClick={getOnClick(market, "borrow")}
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
                  checkZeroValue(borrowAPYInfo.APY)
                    ? "text-white"
                    : checkColorClass(borrowAPYInfo.APY)
                }`}
              >
                {borrowAPYInfo.formattedTotalAPY}
              </p>
            </div>
          )}
          {market.isBorrowable && (
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
