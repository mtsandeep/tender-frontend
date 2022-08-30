import { useState } from "react";
import TooltipMobile from "../two-panels/tooltip-mobile";

const dummyData = [
  {
    itemName: "Price",
    itemData: "$1.00",
    tooltipText: `The Maximum LTV ratio represents the maximum borrowing
  power of a specific collateral. For example, if a
  collateral has an LTV of 75%, the user can borrow up to
  0.75 worth of ETH in the principal currency for every 1
  ETH worth of collateral.`,
  },
  { itemName: "Market Liquidity", itemData: "639,513,808 USDC" },
  { itemName: "# of Suppliers", itemData: "217412" },
  { itemName: "# of Borrowers", itemData: "217412" },
  { itemName: "USDC Borrow Cap", itemData: "No limit" },
  { itemName: "Interest Paid/Day", itemData: "$6.820.25" },
  { itemName: "Reserves", itemData: "639,513,808 USDC" },
  { itemName: "Reserve Factor", itemData: "7%" },
  { itemName: "Collateral Factor", itemData: "84%" },
  { itemName: "cUSDC Minted", itemData: "639,513,808" },
  { itemName: "Exchange Rate", itemData: "1 USDC = 44.12 сUSDC" },
];

function TokenMarketDetails() {
  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop?: string;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });

  return (
    <div className="font-[ProximaNova] w-full">
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
      <div className="leading-[22px] font-semibold mb-[20px] md:mb-[16px] text-[16px] md:text-[18px] font-nova">
        Market Details
      </div>
      <div className="flex-col panel-custom ">
        {dummyData.map((item, index) => {
          return (
            <div
              key={index}
              className="last:border-none h-[50px] md:h-[62px] px-[15px] border-[#282C2B] flex items-center justify-between border-b-[1px] font-normal text-[14px] md:text-sm leading-5"
            >
              <div
                onClick={() =>
                  setMobileTooltipData({
                    ...mobileTooltipData,
                    open: window.innerWidth < 1023,
                    textTop: item.tooltipText,
                  })
                }
                className="relative cursor-pointer group font-normal text-[14px] md:text-sm leading-[19px] text-[#818987] md:text-base  md:leading-[22px]"
              >
                <p
                  className={
                    item?.tooltipText &&
                    "underline decoration-dashed underline-offset-4"
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
                        <p className="text-[#818987] text-[14px] leading-[20px] md:text-[12px] text-left md:leading-[17px] font-nova">
                          {item?.tooltipText}
                        </p>
                      </div>
                    </div>
                    <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                  </div>
                )}
              </div>
              <p className="font-normal text-[14px] md:text-sm leading-[19px] md:font-medium md:text-base  md:leading-[22px]">
                {item.itemData}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TokenMarketDetails;
