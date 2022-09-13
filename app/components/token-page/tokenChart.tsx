import {useContext, useEffect, useState} from "react";
import ChartBorrow from "./ChartBorrow";
import ChartSupply from "./ChartSupply";
import TokenTopDetailsBorrow from "./tokenTopDetailsBorrow";
import TokenTopDetailsSupply from "./tokenTopDetailsSupply";
import {TenderContext} from "~/contexts/tender-context";

function TokenChart({ tokenId, historicalData }: { tokenId: string | undefined, historicalData: object | boolean }) {
  const [tabName, setTabName] = useState<string>("supply");
  const { markets, networkData } = useContext(TenderContext);
  const m = markets.find((market) => market.id === tokenId);
  const [supplyChartData, setSupplyChartData] = useState<object[]>([]);
  const [borrowChartData, setBorrowChartData] = useState<object[]>([]);

  useEffect(() => {
    console.log('charts data called');

    if (!historicalData || !networkData) {
      return;
    }

    const date = new Date();

    const secondsPerBlock = networkData.secondsPerBlock;
    const daysPerYear = 365;
    const ethBlocksPerDay = Math.round(60 * 60 * 24 / secondsPerBlock);
    const ethBlocksPerYear = ethBlocksPerDay * daysPerYear; // fix supply/borrow rate

    const supplyChart: object[] = [];
    const borrowChart: object[] = [];

    Object.keys(historicalData).reverse().forEach(function(i, index) {
      // @ts-ignore
      const data = historicalData[i][0];
      const supplyRate = data.supplyRate / ethBlocksPerYear;
      const supplyApy = (((Math.pow((supplyRate * ethBlocksPerDay) + 1, daysPerYear))) - 1) * 100;
      const totalSupply = parseFloat(data.cash) + parseFloat(data.totalBorrows) - parseFloat(data.reserves);

      supplyChart.push({
        totalSupply: (totalSupply * data.underlyingPriceUSD).toFixed(2),
        supplyAPY: supplyApy.toFixed(2),
        date: `${date.getDate()}/${date.getMonth()+1}`,
      });

      const borrowRate = data.borrowRate / ethBlocksPerYear;
      const borrowApy = (((Math.pow((borrowRate * ethBlocksPerDay) + 1, daysPerYear))) - 1) * 100;

      borrowChart.push({
        totalBorrow: (data.totalBorrows * data.underlyingPriceUSD).toFixed(2),
        borrowAPY: borrowApy.toFixed(2),
        date: `${date.getDate()}/${date.getMonth()+1}`,
      });

      date.setDate(date.getDate() - 1);
    });

    setSupplyChartData(supplyChart);
    setBorrowChartData(borrowChart);
  }, [historicalData, networkData]);

  return (
    <div className="bg-[#0D0D0D] panel-custom pt-4 mb-[60px] md:mb-[60px] md:pt-7 pb-[20px] lg:pb-0">
      <div className="flex-col text-xs font-nova font-normal leading-4 ml-[15px] mb-[30px] md:text-sm md:leading-5 md:ml-[28px] md:mb-[26px]">
        <a className="cursor-pointer hover:text-[#14f195]" href="/markets/">
          Markets
        </a>
        <span className="text-[#818987]"> / {m?.id}</span>
      </div>
      {tabName === "supply" ? (
        <TokenTopDetailsSupply market={m} />
      ) : (
        <TokenTopDetailsBorrow market={m} />
      )}
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
      {tabName === "supply" ? <ChartSupply data={supplyChartData} /> : <ChartBorrow data={borrowChartData} />}
    </div>
  );
}

export default TokenChart;
