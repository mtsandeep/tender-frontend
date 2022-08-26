import TokenChart from "~/components/token-page/tokenChart";
import TokenInterestRate from "~/components/token-page/tokenInterestRate";
import TokenMarketDetails from "~/components/token-page/tokenMarketDetails";

export default function App() {
  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px]">
      <TokenChart />

      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenInterestRate />
        <TokenMarketDetails />
      </div>
    </div>
  );
}
