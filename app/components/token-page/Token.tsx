import TokenInterestRate from "~/components/token-page/tokenInterestRate";
import TokenMarketDetails from "~/components/token-page/tokenMarketDetails";
import TokenGettingStarted from "./tokenGettingStarted";
import { useMarketInfo } from "~/hooks/use-market-info";
import useInterestRateModel from "~/hooks/use-interest-rate-model";
import TokenVaultDetails from "./tokenVaultDetails";
import { useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import type { Market } from "~/types/global";
import TokenChart from "./tokenChart";

const Token = ({ id }: { id: string | undefined }) => {
  const tenderContextData = useContext(TenderContext);
  const tokens = tenderContextData.markets.filter(
    (token: Market) => token.id.toUpperCase() === id?.toUpperCase()
  );

  const token = tokens.length ? tokens[0] : null;
  const marketInfo = useMarketInfo(id);
  const interestRateModel = useInterestRateModel(id);

  const utilizationRate =
    interestRateModel.length > 0
      ? interestRateModel.find((rate) => rate.isCurrent)
      : {};

  return (
    <>
      <TokenChart
        marketInfo={marketInfo.market}
        historicalData={marketInfo.historicalData}
      />
      <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
        <TokenMarketDetails
          id={id}
          marketInfo={marketInfo.market}
          utilizationRate={utilizationRate}
        />
        <div className="order-1 lg:order-2 w-full">
          <TokenGettingStarted market={token} />
          {token && token.tokenPair.cToken.isVault && (
            <TokenVaultDetails market={token} />
          )}
          {marketInfo.market.isBorrowable && (
            <TokenInterestRate data={interestRateModel} />
          )}
        </div>
      </div>
    </>
  );
};

export default Token;
