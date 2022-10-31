import TokenChart from "~/components/token-page/tokenChart";
import TokenInterestRate from "~/components/token-page/tokenInterestRate";
import TokenMarketDetails from "~/components/token-page/tokenMarketDetails";
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
          marketInfo={m.market}
          utilizationRate={utilizationRate}
        />
        <div className="w-full">
          {(m.market.tokenSymbol === "GLP" ||
            m.market.tokenSymbol === "GMX") && <VaultDetails />}
          <TokenInterestRate data={interestRateModel} />
        </div>
      </div>
    </>
  );
};

export default Token;
