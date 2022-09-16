import { useContext, useState } from "react";
import TooltipMobile from "../two-panels/tooltip-mobile";
import { TenderContext } from "~/contexts/tender-context";
import { toShortCryptoString, toShortFiatString } from "~/lib/ui";
import TokenMarketDetailsEmpty from "~/components/token-page/tokenMarketDetailsEmpty";

function TokenMarketDetails({
  tokenId,
  marketInfo,
}: {
  tokenId: string | undefined;
  marketInfo: any;
}) {
  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop?: string;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });
  const { markets } = useContext(TenderContext);
  const m = markets.find((market) => market.id === tokenId);
  const exchangeRate =
    marketInfo &&
    toShortCryptoString(
      Number((1 / Number(marketInfo.exchangeRate)).toFixed(2))
    );

  const customData = [
    {
      itemName: "Price",
      itemData:
        marketInfo &&
        `$${toShortFiatString(parseFloat(marketInfo.underlyingPriceUSD))} USD`,
    },
    {
      itemName: "Available Borrow",
      itemData:
        marketInfo &&
        toShortCryptoString(Number(Number(marketInfo.cash).toFixed(2))) +
          " " +
          m?.tokenPair.token.symbol,
    },
    {
      itemName: "# of Suppliers",
      itemData: marketInfo && marketInfo.totalSuppliersCount,
    },
    {
      itemName: "# of Borrowers",
      itemData: marketInfo && marketInfo.totalBorrowersCount,
    },
    { itemName: "Borrow Cap", itemData: "No limit" },
    { itemName: "Interest Paid/Day", itemData: "0" },
    {
      itemName: "Reserves",
      itemData: marketInfo && marketInfo.reserves + " " + m?.id,
    },
    {
      itemName: "Reserve Factor",
      itemData: marketInfo && marketInfo.reserveFactor + "%",
    },
    {
      itemName: "Max LTV",
      itemData: marketInfo && marketInfo.collateralFactor + "%",
      tooltipText: `The Maximum LTV ratio represents the maximum borrowing
            power of a specific collateral. For example, if a
            collateral has an LTV of 75%, the user can borrow up to
            0.75 worth of ETH in the principal currency for every 1
            ETH worth of collateral.`,
    },
    {
      itemName: m?.tokenPair.cToken.symbol + " Minted",
      itemData:
        marketInfo &&
        toShortCryptoString(Number(Number(marketInfo.totalSupply).toFixed(2))),
    },
    {
      itemName: "Exchange Rate",
      itemData:
        "1 " +
        m?.tokenPair.token.symbol +
        " = " +
        exchangeRate +
        " " +
        m?.tokenPair.cToken.symbol,
    },
  ];

  return m?.tokenPair.token.symbol ? (
    <div className="font-nova w-full">
      <TooltipMobile
        mobileTooltipData={mobileTooltipData}
        handleClose={() =>
          setMobileTooltipData({
            open: false,
            textTop: "",
            token: "",
            icon: "",
            textBottom: "",
          })
        }
      />
      <div className="leading-[22px] font-semibold mb-[20px] md:mb-[16px] text-base md:text-lg font-nova">
        Market Details
      </div>
      <div className="flex-col panel-custom ">
        {customData.map((item, index) => {
          return (
            <div
              key={index}
              className="last:border-none h-[50px] md:h-[62px] px-[15px] border-[#282C2B] flex items-center justify-between border-b-[1px] font-normal text-sm md:text-sm leading-5"
            >
              <div
                onClick={() =>
                  setMobileTooltipData({
                    ...mobileTooltipData,
                    open: window.innerWidth < 1023,
                    textTop: item.tooltipText,
                  })
                }
                className="relative group font-normal text-sm md:text-sm leading-[19px] text-[#818987] md:text-base  md:leading-[22px]"
              >
                <p
                  className={
                    item?.tooltipText &&
                    "underline decoration-dashed underline-offset-4 cursor-pointer"
                  }
                >
                  {item.itemName}
                </p>
                {item?.tooltipText && (
                  <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex rounded-[10px]">
                    <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] md:w-[242px] mx-[20px] md:mx-[0] !rounded-[10px] panel-custom">
                      <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pr-[15px] pb-[21px] pl-[15px] pt-[15px] md:pb-[15px] md:pr-[15px] md:pl-[15px]">
                        <button className="absolute top-[12px] right-[12px] cursor-pointer md:hidden block">
                          <img
                            className="w-[12px] h-[12px]"
                            src="/images/ico/close.svg"
                            alt="..."
                          />
                        </button>
                        <p className="text-[#818987] text-sm leading-5 md:text-xs text-left md:leading-[17px] font-nova">
                          {item?.tooltipText}
                        </p>
                      </div>
                    </div>
                    <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                  </div>
                )}
              </div>
              <p className="font-normal text-sm md:text-sm leading-[19px] md:font-medium md:text-base  md:leading-[22px]">
                {item.itemData}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <TokenMarketDetailsEmpty />
  );
}

export default TokenMarketDetails;
