import { useTenderContext } from "~/hooks/use-tender-context";
import { hooks as metaMaskHooks } from "~/connectors/meta-mask";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { TenderContext } from "~/contexts/tender-context";
import MarketsContent from "~/components/markets-page/marketsContent";
import EmptyMarketsContent from "~/components/markets-page/emptyMarketsContent";
import { MetaFunction } from "remix";

export default function App() {
  const tenderContextData = useTenderContext();
  const chainId = metaMaskHooks.useChainId();
  const onSupportedChain = useOnSupportedNetwork(chainId);

  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px]">
      {tenderContextData && onSupportedChain ? (
        <TenderContext.Provider value={tenderContextData}>
          <MarketsContent />
        </TenderContext.Provider>
      ) : (
        <EmptyMarketsContent />
      )}
    </div>
  );
}

export const meta: MetaFunction = () => ({
  title: "Tender.fi - Market",
  property: [{ "og:title": "Tender.fi - Market" }],
});
