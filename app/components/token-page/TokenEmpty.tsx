import TokenInterestRateEmpty from "~/components/token-page/tokenInterestRateEmpty";
import TokenMarketDetailsEmpty from "~/components/token-page/tokenMarketDetailsEmpty";
import TokenChartEmpty from "./tokenChartEmpty";

const TokenEmpty = () => {
  return (
    <>
      <TokenChartEmpty />
      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenMarketDetailsEmpty />
        <TokenInterestRateEmpty />
      </div>
    </>
  );
};

export default TokenEmpty;
