import EmptyEarnContent from "~/components/earn-page/emptyEarnContent";
import EarnContent from "~/components/earn-page/earnContent";
import { useEffect, useState } from "react";
import type { MetaFunction } from "remix";

export default function Earn() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return loading ? <EmptyEarnContent /> : <EarnContent />;
}

export const meta: MetaFunction = () => ({
  title: "Tender.fi - Earn",
  property: [{ "og:title": "Tender.fi - Earn" }],
});
