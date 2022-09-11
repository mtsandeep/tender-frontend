import { useEffect, useState } from "react";
import MarketsContent from "~/components/markets-page/marketsContent";
import EmptyMarketsContent from "~/components/markets-page/emptyMarketsContent";

export default function Markets() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="c mt-[30px] mb-[100px] md:mb-[100px]">
      {loading ? <EmptyMarketsContent /> : <MarketsContent />}
    </div>
  );
}
