import { useState } from "react";
import TooltipMobile from "../two-panels/tooltip-mobile";
import TokenVaultDetailsEmpty from "./tokenVaultDetailsEmpty";
import { Market } from "~/types/global";
import { getPercentageString } from "~/lib/ui";

function TokenVaultDetails({ market }: { market: Market }) {
  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop?: any;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });

  const customData = [
    {
      itemName: "Management Fee",
      tooltipText: (
        <div>
          This market is an auto-staking vault where staking rewards are
          automatically redeposited into the vault. This fee is taken from these
          staking rewards and paid to stakers of the protocol governance token
          $TND.
        </div>
      ),
      itemData: getPercentageString(market.performanceFee.toString()),
    },
    {
      itemName: "Deposit Fee",
      tooltipText: <div>A fee charged on supplying tokens to this market.</div>,
      itemData: "0%",
    },
    {
      itemName: "Withdrawal Fee",
      tooltipText: (
        <div>A fee charged on withdrawing tokens from this market.</div>
      ),
      itemData: getPercentageString(market.withdrawFee.toString()),
    },
  ];

  return market ? (
    <div className="panel-custom border-custom font-nova w-full mb-5">
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
      <div
        tabIndex={0}
        className="focus:outline-none px-[15px] md:px-[30px] py-[17px] md:py-[20px] border-b border-[#282C2B] md:pt-[18px] md:pb-[19px] leading-[22px] font-semibold text-base md:text-lg font-nova"
      >
        Vault Details
      </div>
      {customData.map((item, index) => {
        return (
          <div
            tabIndex={0}
            key={index}
            className="last:border-none h-[50px] md:h-[62px] px-[15px] md:px-[30px] border-[#282C2B] flex items-center justify-between border-b-[1px] font-normal text-sm md:text-sm leading-5"
          >
            <span className="absolute opacity-0">{item.itemName}</span>
            <div
              tabIndex={item?.tooltipText ? 0 : -1}
              onClick={() =>
                item?.tooltipText
                  ? setMobileTooltipData({
                      ...mobileTooltipData,
                      open: window.innerWidth < 1023,
                      textTop: item.tooltipText,
                    })
                  : false
              }
              className="relative group font-normal text-sm md:text-sm leading-[19px] text-[#818987] md:text-base  md:leading-[22px]"
            >
              <span
                aria-hidden={true}
                className={
                  item?.tooltipText &&
                  "underline group decoration-dashed underline-offset-4 cursor-pointer"
                }
              >
                {item.itemName}
              </span>
              {item?.tooltipText && (
                <div className="hidden flex-row md:flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
                  <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] md:w-[242px] mx-[20px] md:mx-[0] !rounded-[10px] panel-custom">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pr-[15px] pb-[21px] pl-[15px] pt-[15px] md:pb-[15px] md:pr-[15px] md:pl-[15px]">
                      <button className="absolute top-[12px] right-[12px] cursor-pointer md:hidden block">
                        <img
                          className="w-[12px] h-[12px]"
                          src="/images/ico/close.svg"
                          alt="..."
                        />
                      </button>
                      <p
                        role={"status"}
                        className="text-[#818987] text-sm leading-5 md:text-xs text-left md:leading-[17px] font-nova"
                      >
                        {item.tooltipText}
                      </p>
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              )}
            </div>
            <span className="font-normal text-sm md:text-sm leading-[19px] md:font-medium md:text-base  md:leading-[22px]">
              {item.itemData}
            </span>
          </div>
        );
      })}
    </div>
  ) : (
    <TokenVaultDetailsEmpty />
  );
}

export default TokenVaultDetails;
