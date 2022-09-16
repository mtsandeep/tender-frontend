import TokenChart from "~/components/token-page/tokenChart";
import TokenInterestRate from "~/components/token-page/tokenInterestRate";
import TokenMarketDetails from "~/components/token-page/tokenMarketDetails";
import { useMarketInfo } from "~/hooks/use-market-info";
import useInterestRateModel from "~/hooks/use-interest-rate-model";

const Token = ({ id }: { id: string | undefined }) => {
  const m = useMarketInfo(id);
  const interestRateModel = useInterestRateModel(id);
  return (
    <>
      <TokenChart tokenId={id} historicalData={m.historicalData} />
      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenInterestRate data={interestRateModel} />
        <TokenMarketDetails tokenId={id} marketInfo={m.market} />
      </div>
    </>
  );
};

export default Token;
