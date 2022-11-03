import TokenInterestRateEmpty from "~/components/token-page/tokenInterestRateEmpty";
import TokenMarketDetailsEmpty from "~/components/token-page/tokenMarketDetailsEmpty";
import TokenChartEmpty from "./tokenChartEmpty";
import TokenGettingStartedEmpty from "./tokenGettingStartedEmpty";
import TokenVaultDetailsEmpty from "./tokenVaultDetailsEmpty";

const TokenEmpty = ({ id }: { id: string | undefined }) => {
  return (
    <>
      <TokenChartEmpty />
      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenMarketDetailsEmpty />
        <div className="order-1 lg:order-2 w-full">
          {(id === "GLP" || id === "GMX") && <TokenVaultDetailsEmpty />}
          <TokenGettingStartedEmpty />
          <TokenInterestRateEmpty />
        </div>
      </div>
    </>
  );
};

export default TokenEmpty;
