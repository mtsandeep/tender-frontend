const dummyData = [
  { itemName: "Price", itemData: "$1.00" },
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
  return (
    <div className="font-[ProximaNova] w-full max-w-[600px]">
      <div className="leading-[22px] font-semibold mb-[20px] md:text-lg md:leading-[25px]">
        Market Details
      </div>
      <div className="flex-col pane-custom ">
        {dummyData.map((item, index) => {
          return (
            <div
              key={index}
              className="last:border-none h-[50px] pt-[15px] px-[15px] border-[#282C2B] flex justify-between border-b-[1px] font-normal text-sm leading-5"
            >
              <p className="font-normal text-sm leading-[19px] text-[#818987] md:text-base  md:leading-[22px]">
                {item.itemName}
              </p>
              <p className="font-normal text-sm leading-[19px] md:font-medium md:text-base  md:leading-[22px]">
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
