import { MetaFunction, useParams } from "remix";
import { useTenderContext } from "~/hooks/use-tender-context";
import { hooks as metaMaskHooks } from "~/connectors/meta-mask";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { TenderContext } from "~/contexts/tender-context";
import Token from "~/components/token-page/Token";
import TokenEmpty from "~/components/token-page/TokenEmpty";
import { useEffect } from "react";

export default function TokenPage() {
  const tenderContextData = useTenderContext();
  const chainId = metaMaskHooks.useChainId();
  const onSupportedChain = useOnSupportedNetwork(chainId);
  const { tokenId } = useParams();

  useEffect(() => {
    if (
      tenderContextData?.markets?.length &&
      !tenderContextData?.markets?.find(
        (t) => t.id.toLowerCase() === tokenId?.toLowerCase()
      )
    ) {
      window.location.replace(`/markets`);
    }
  }, [tenderContextData, tokenId]);

  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px] max-w-[1068px] switch__to__network">
      {tenderContextData && onSupportedChain ? (
        <TenderContext.Provider value={tenderContextData}>
          <Token id={tokenId} />
        </TenderContext.Provider>
      ) : (
        <TokenEmpty id={tokenId} />
      )}
    </div>
  );
}

export const meta: MetaFunction = (data) => ({
  title: `Tender.fi - Token ${data.params.tokenId}`,
  property: [{ "og:title": `Tender.fi - Token ${data.params.tokenId}` }],
});
