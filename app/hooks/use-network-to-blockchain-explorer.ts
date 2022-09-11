import { useState, useEffect, useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";

export function useBlockchainExplorer(): {
  blockExplorerUrl: string | null;
  blockExplorerName: string | null;
} {
  let [blockExplorerUrl, setBlockExplorerUrl] = useState<string | null>(null);
  let [blockExplorerName, setBlockExplorerName] = useState<string | null>(null);

  let { networkData } = useContext(TenderContext);
  useEffect(() => {
    setBlockExplorerName(networkData?.blockExplorerName);
    setBlockExplorerUrl(networkData?.blockExplorerUrl);
  }, [networkData]);

  return {
    blockExplorerUrl,
    blockExplorerName,
  };
}
