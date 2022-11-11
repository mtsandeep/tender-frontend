import { useContext, useState } from "react";
import TooltipMobile from "../two-panels/tooltip-mobile";
import {
  toCryptoString,
  toShortCryptoString,
  toShortFiatString,
} from "~/lib/ui";
import TokenMarketDetailsEmpty from "~/components/token-page/tokenMarketDetailsEmpty";
import { TenderContext } from "~/contexts/tender-context";

function TokenMarketDetails({
  id,
  marketInfo,
  utilizationRate,
}: {
  id: string | undefined;
  marketInfo: any | boolean;
  utilizationRate: any;
}) {
  let [mobileTooltipData, setMobileTooltipData] = useState<{
    open: boolean;
    textTop?: any;
    icon?: string;
    token?: string;
    textBottom?: string;
  }>({ open: false, textTop: "", token: "", icon: "", textBottom: "" });

  const { networkData, markets } = useContext(TenderContext);

  const tokenKey = Object.keys(markets).find(
    (key) => markets[Number(key)].id === String(id)
  );
  const token = tokenKey && markets[Number(tokenKey)];

  if (!marketInfo || !token) {
    return <TokenMarketDetailsEmpty />;
  }

  const exchangeRate = toShortCryptoString(
    Number((1 / Number(marketInfo.exchangeRate)).toFixed(2))
  );
  const contractUrl = `${networkData.blockExplorerUrl}/address/${marketInfo.id}`;
  const customData = [
    {
      show: true,
      itemName: "Price",
      itemData: `$${toShortFiatString(
        parseFloat(marketInfo.underlyingPriceUSD)
      )}`,
    },
    {
      show: id !== "GLP" && id !== "GMX",
      itemName: "Utilization",
      itemData: utilizationRate?.aa ? `${utilizationRate.aa}%` : "0%",
    },
    {
      show: true,
      itemName: "Available Borrow",
      itemData:
        marketInfo.tokenSymbol === "GLP"
          ? "-"
          : toCryptoString(
              Number(marketInfo.cash),
              marketInfo.underlyingDecimals
            ) +
            " " +
            marketInfo.tokenSymbol,
    },
    {
      show: true,
      itemName: "Your Supply",
      itemData:
        toCryptoString(token.supplyBalance, marketInfo.underlyingDecimals) +
        " " +
        marketInfo.tokenSymbol,
    },
    {
      show: true,
      itemName: "Your Borrow",
      itemData:
        toCryptoString(token.borrowBalance, marketInfo.underlyingDecimals) +
        " " +
        marketInfo.tokenSymbol,
    },
    {
      show: true,
      itemName: "# of Suppliers",
      itemData: marketInfo.totalSuppliersCount,
    },
    {
      show: true,
      itemName: "# of Borrowers",
      itemData: marketInfo.totalBorrowersCount,
    },
    { show: true, itemName: "Supply Cap", itemData: "No limit" },
    { show: true, itemName: "Borrow Cap", itemData: "No limit" },
    { show: true, itemName: "Interest Paid/Day", itemData: "0" },
    {
      show: true,
      itemName: "Reserves",
      itemData: marketInfo.reserves + " " + marketInfo.tokenSymbol,
    },
    {
      show: true,
      itemName: "Max LTV",
      itemData: marketInfo.collateralFactor * 100 + "%",
      tooltipText: `The Maximum LTV ratio represents the maximum borrowing
            power of a specific collateral. For example, if a
            collateral has an LTV of 75%, the user can borrow up to
            0.75 worth of ETH in the principal currency for every 1
            ETH worth of collateral.`,
    },
    {
      show: true,
      itemName: "Liquidation Threshold",
      itemData: token.liquidationThreshold + "%",
      tooltipText: `This represents the threshold at which a borrow position will be considered undercollateralized and subject to liquidation for each collateral. For example, if a collateral has a liquidation threshold of 80%, it means that the position will be liquidated when the debt value is worth 80% of the collateral value.`,
    },
    {
      show: true,
      itemName: "Liquidation Penalty",
      itemData: token.liquidationPenalty + "%",
      tooltipText: `When a liquidation occurs, liquidators repay up to 50% of the outstanding borrowed amount on behalf of the borrower. In return, they can buy the collateral at a discount and keep the difference (liquidation penalty) as a bonus.`,
    },
    {
      show: true,
      itemName: "Reserve Factor",
      tooltipText: (
        <div>
          Reserve factor is a percentage of interest which goes to a collector
          contract that is controlled by{" "}
          <a
            target="_blank"
            tabIndex={-1}
            className="line-solid cursor-pointer text-white"
            rel="noreferrer"
            href="https://www.tender.fi/"
          >
            Tender.fi
          </a>{" "}
          governance to promote ecosystem growth.
        </div>
      ),
      itemData: marketInfo.reserveFactor + "%",
    },
    {
      show: true,
      itemName: "Contract",
      itemData: (
        <a
          className="flex group items-center justify-between text-white hover:text-[#14F195]"
          href={contractUrl}
          target="_blank"
          rel="noreferrer"
        >
          View Contract
          <svg
            className="ml-[5px]"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              className="fill-white group-hover:fill-[#14F195]"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.41602 0.166992H2.49935C1.21077 0.166992 0.166016 1.21174 0.166016 2.50033V9.50033C0.166016 10.7889 1.21077 11.8337 2.49935 11.8337H9.49935C10.7879 11.8337 11.8327 10.7889 11.8327 9.50033C11.8327 8.17558 11.8327 6.58366 11.8327 6.58366C11.8327 6.26166 11.5713 6.00033 11.2493 6.00033C10.9273 6.00033 10.666 6.26166 10.666 6.58366V9.50033C10.666 10.1443 10.1433 10.667 9.49935 10.667C7.55685 10.667 4.44127 10.667 2.49935 10.667C1.85477 10.667 1.33268 10.1443 1.33268 9.50033C1.33268 7.55783 1.33268 4.44224 1.33268 2.50033C1.33268 1.85574 1.85477 1.33366 2.49935 1.33366H5.41602C5.73802 1.33366 5.99935 1.07233 5.99935 0.750326C5.99935 0.428326 5.73802 0.166992 5.41602 0.166992ZM9.84118 1.33366H7.74935C7.42735 1.33366 7.16602 1.07233 7.16602 0.750326C7.16602 0.428326 7.42735 0.166992 7.74935 0.166992H11.2493C11.5713 0.166992 11.8327 0.428326 11.8327 0.750326V4.25033C11.8327 4.57233 11.5713 4.83366 11.2493 4.83366C10.9273 4.83366 10.666 4.57233 10.666 4.25033V2.15849L6.41177 6.41274C6.18427 6.64024 5.81443 6.64024 5.58693 6.41274C5.35885 6.18524 5.35885 5.81541 5.58693 5.58791L9.84118 1.33366Z"
            />
          </svg>
        </a>
      ),
    },
    {
      show: true,
      itemName: marketInfo.cTokenSymbol + " Minted",
      itemData: toShortCryptoString(
        Number(Number(marketInfo.totalSupply).toFixed(2))
      ),
    },
    {
      show: true,
      itemName: "Exchange Rate",
      itemData:
        "1 " +
        marketInfo.tokenSymbol +
        " = " +
        exchangeRate +
        " " +
        marketInfo.cTokenSymbol,
    },
  ];

  return (
    <div className="panel-custom border-custom font-nova w-full mb-5 md:mb-0">
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
        Market Details
      </div>
      {customData.map(
        (item, index) =>
          item.show && (
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
                  <div className="hidden flex-row md:flex-col absolute items-start bottom-5 group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
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
                    <div className="custom__arrow__tooltip relative top-[-6px] left-[20px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                  </div>
                )}
              </div>
              <span className="font-normal text-sm md:text-sm leading-[19px] md:font-medium md:text-base  md:leading-[22px]">
                {item.itemData}
              </span>
            </div>
          )
      )}
    </div>
  );
}

export default TokenMarketDetails;
