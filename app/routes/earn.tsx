import EmptyEarnContent from "~/components/earn-page/emptyEarnContent";
import EarnContent from "~/components/earn-page/earnContent";
import { useEffect, useState } from "react";

export default function Earn() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="c mt-[30px] mb-[100px] md:mb-[100px]">
      {loading ? <EmptyEarnContent /> : <EarnContent />}
    </div>
  );
}
