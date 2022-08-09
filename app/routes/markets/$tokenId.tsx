import TokenInterestRate from "~/components/tokenInterestRate";
import TokenMarketDetails from "~/components/tokenMarketDetails";
import TokenChart from "~/components/tokenChart";

export default function App() {
  return (
    <div className="c mt-[87px] md:mt-[66px] mb-[60px]">
      <TokenChart />

      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenInterestRate />
        <TokenMarketDetails />
      </div>
    </div>
  );
}
