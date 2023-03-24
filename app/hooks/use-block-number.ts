import { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useInterval } from "~/hooks/use-interval";

export function useBlockNumber() {
  const provider = useProvider();
  const [blockNumber, setBlockNumber] = useState<number | boolean>(false);
  let pollingKey = useInterval(15_000);

  useEffect(() => {
    const getBlockNumber = async () => {
      const hexBlockNumber =
        provider?.request &&
        (await provider.request({ method: "eth_blockNumber" }));
      const blockNumber = parseInt(hexBlockNumber, 16);
      setBlockNumber(blockNumber);
    };

    getBlockNumber();
  }, [pollingKey, provider]);

  return blockNumber;
}
