import {useParams} from "remix";
import {useTenderContext} from "~/hooks/use-tender-context";
import {hooks as metaMaskHooks} from "~/connectors/meta-mask";
import {useOnSupportedNetwork} from "~/hooks/use-on-supported-network";
import {TenderContext} from "~/contexts/tender-context";
import Token from "~/components/token-page/Token";

export default function App() {
    const tenderContextData = useTenderContext();
    const chainId = metaMaskHooks.useChainId();
    const onSupportedChain = useOnSupportedNetwork(chainId);
    const {tokenId} = useParams();

    return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px]">
        {tenderContextData && onSupportedChain ? (
            <TenderContext.Provider value={tenderContextData}>
                <Token id={tokenId}/>
            </TenderContext.Provider>
        ) : ('Loading...')}
    </div>
  );
}
