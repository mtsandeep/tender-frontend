import { TenderContext } from "~/contexts/tender-context";
import { useTenderContext } from "~/hooks/use-tender-context";

import TokenInterestRate from "~/components/tokenInterestRate";
import TokenMarketDetails from "~/components/tokenMarketDetails";
import TokenChart from "~/components/tokenChart";

export default function App() {
  let tenderContextData = useTenderContext();

  return (
    <div className="c mt-[87px] md:mt-[116px] mb-[60px]">
      {tenderContextData && (
        <TenderContext.Provider value={tenderContextData}>
          <TokenInterestRate />
          <TokenChart />

          <div className="flex items-center flex-col w-full md:flex-row md:items-start md:gap-[20px] ">
            <TokenMarketDetails />
          </div>
        </TenderContext.Provider>
      )}
    </div>
  );
}
