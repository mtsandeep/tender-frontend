import AccountSummary from "~/components/account-summary";
import AccountSummaryEmpty from "~/components/account-summary/empty";
import { TenderContext } from "~/contexts/tender-context";
import { useTenderContext } from "~/hooks/use-tender-context";
import TwoPanels from "~/components/two-panels/two-panels";
import TwoPanelsEmpty from "~/components/two-panels/two-panels-empty";
import { hooks as metaMaskHooks } from "~/connectors/meta-mask";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";

export default function App() {
  let tenderContextData = useTenderContext();
  const chainId = metaMaskHooks.useChainId();
  let onSupportedChain = useOnSupportedNetwork(chainId);

  return (
    <div
      className="c mt-[80px] md:mt-[30px] mb-[100px] md:mb-[100px]"
      data-testid="app-frame"
    >
      {tenderContextData && onSupportedChain ? (
        <TenderContext.Provider value={tenderContextData}>
          <AccountSummary />
          <TwoPanels />
        </TenderContext.Provider>
      ) : (
        <>
          <AccountSummaryEmpty />
          <TwoPanelsEmpty />
        </>
      )}
    </div>
  );
}
