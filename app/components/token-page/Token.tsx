import TokenChart from "~/components/token-page/tokenChart";
import TokenInterestRate from "~/components/token-page/tokenInterestRate";
import TokenMarketDetails from "~/components/token-page/tokenMarketDetails";
import TokenGettingStarted from "./tokenGettingStarted";
import { useMarketInfo } from "~/hooks/use-market-info";
import useInterestRateModel from "~/hooks/use-interest-rate-model";
import VaultDetails from "./VaultDetails";

const Token = ({ id }: { id: string | undefined }) => {
  const m = useMarketInfo(id);
  const interestRateModel = useInterestRateModel(id);
  const utilizationRate =
    interestRateModel.length > 0
      ? interestRateModel.find((rate) => rate.isCurrent)
      : {};

  return (
    <>
      <TokenChart marketInfo={m.market} historicalData={m.historicalData} />
      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenMarketDetails
          id={id}
          marketInfo={m.market}
          utilizationRate={utilizationRate}
        />
        <div className="order-1 lg:order-2 w-full mb-[60px] lg:mb-0">
          {(m.market.tokenSymbol === "GLP" ||
            m.market.tokenSymbol === "GMX") && <VaultDetails />}
          <TokenGettingStarted market={m.market} />
          <TokenInterestRate data={interestRateModel} />
        </div>
      </div>
    </>
  );
};

export default Token;
