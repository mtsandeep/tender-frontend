import AccountSummary from "~/components/account-summary/account-summary";
import AccountSummaryEmpty from "~/components/account-summary/empty";
import { useTenderContext } from "~/hooks/use-tender-context";
import TwoPanels from "~/components/two-panels/two-panels";
import TwoPanelsEmpty from "~/components/two-panels/two-panels-empty";
import { hooks as metaMaskHooks } from "~/connectors/meta-mask";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { TenderContext } from "~/contexts/tender-context";
import type { MetaFunction } from "remix";

export default function Home() {
  let tenderContextData = useTenderContext();
  const chainId = metaMaskHooks.useChainId();
  let onSupportedChain = useOnSupportedNetwork(chainId);

  return (
    <div className="c mt-[80px] md:mt-[30px] mb-[100px] md:mb-[100px]">
      {tenderContextData && onSupportedChain ? (
        <TenderContext.Provider value={tenderContextData}>
          <AccountSummary />
          <TwoPanels />
        </TenderContext.Provider>
      ) : (
        <>
          <AccountSummaryEmpty loading={false} />
          <TwoPanelsEmpty loading={false} />
        </>
      )}
    </div>
  );
}

export const meta: MetaFunction = () => ({
  title: "Tender.fi - Dashboard",
  property: [{ "og:title": "Tender.fi - Dashboard" }],
});
