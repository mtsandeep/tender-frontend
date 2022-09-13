import AccountSummary from "~/components/account-summary/account-summary";
import AccountSummaryEmpty from "~/components/account-summary/empty";
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
    <div className="c mt-[80px] md:mt-[30px] mb-[100px] md:mb-[100px]">
      {tenderContextData && onSupportedChain ? (
        <>
          <AccountSummary tenderContextData={tenderContextData} />
          <TwoPanels tenderContextData={tenderContextData} />
        </>
      ) : (
        <>
          <AccountSummaryEmpty loading={false} />
          <TwoPanelsEmpty loading={false} />
        </>
      )}
    </div>
  );
}
