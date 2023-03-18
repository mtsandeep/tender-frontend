import { useNetwork } from "wagmi";
import type { MetaFunction } from "remix";

import { useTenderContext } from "~/hooks/use-tender-context";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { TenderContext } from "~/contexts/tender-context";
import MarketsContent from "~/components/markets-page/marketsContent";
import MarketsContentEmpty from "~/components/markets-page/MarketsContentEmpty";

export default function Markets() {
  const tenderContextData = useTenderContext();

  const { chain } = useNetwork();
  const chainId = chain?.id;

  const onSupportedChain = useOnSupportedNetwork(chainId);

  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px]">
      {tenderContextData && onSupportedChain ? (
        <TenderContext.Provider value={tenderContextData}>
          <MarketsContent />
        </TenderContext.Provider>
      ) : (
        <MarketsContentEmpty />
      )}
    </div>
  );
}

export const meta: MetaFunction = () => ({
  title: "Tender.fi - Markets",
  property: [{ "og:title": "Tender.fi - Markets" }],
});
