import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useEffect, useState } from "react";
import { useInterval } from "~/hooks/use-interval";

export function useBlockNumber() {
  const p = Web3Hooks.useProvider();
  const [blockNumber, setBlockNumber] = useState<number | boolean>(false);
  let pollingKey = useInterval(15_000);

  useEffect(() => {
    const getBlockNumber = async () => {
      const hexBlockNumber =
        p?.provider?.request &&
        (await p.provider.request({ method: "eth_blockNumber" }));
      const blockNumber = parseInt(hexBlockNumber, 16);
      setBlockNumber(blockNumber);
    };

    getBlockNumber();
  }, [pollingKey, p]);

  return blockNumber;
}
