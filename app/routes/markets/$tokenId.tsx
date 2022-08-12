import TokenInterestRate from "~/components/tokenInterestRate";
import TokenMarketDetails from "~/components/tokenMarketDetails";
import TokenChart from "~/components/tokenChart";

export default function App() {
  return (
    <div className="c mt-[30px] md:mt-[60px] mb-[60px] md:mb-[100px]">
      <TokenChart />

      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenInterestRate />
        <TokenMarketDetails />
      </div>
    </div>
  );
}
