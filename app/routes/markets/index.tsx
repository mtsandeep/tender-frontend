import {useTenderContext} from "~/hooks/use-tender-context";
import {hooks as metaMaskHooks} from "~/connectors/meta-mask";
import {useOnSupportedNetwork} from "~/hooks/use-on-supported-network";
import {TenderContext} from "~/contexts/tender-context";
import Markets from "~/components/token-page/Markets";

export default function App() {
  const tenderContextData = useTenderContext();
  const chainId = metaMaskHooks.useChainId();
  const onSupportedChain = useOnSupportedNetwork(chainId);

  return (
      <div className="c mt-[30px] mb-[60px] md:mb-[100px]">
        {tenderContextData && onSupportedChain ? (
            <TenderContext.Provider value={tenderContextData}>
              <Markets/>
            </TenderContext.Provider>
        ) : ('Loading...')}
      </div>
  );
}
