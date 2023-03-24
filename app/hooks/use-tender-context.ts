import { useState, useEffect } from "react";
import { useNetwork, useSigner } from "wagmi";
import type { Market, TenderContext } from "~/types/global";
import { useTokenPairs } from "./use-token-pairs";
import { useOnSupportedNetwork } from "./use-on-supported-network";
import { useNetworkData } from "./use-network-data";
import { useMarkets } from "./use-markets";
import { useInterval } from "./use-interval";
import { useBlockNumber } from "~/hooks/use-block-number";
import { useTndPrice } from "./useTndPrice";

export function useTenderContext() {
  let [currentTransaction, updateTransaction] = useState<string | null>(null);
  let [transactionCompleted, setTransactionCompleted] = useState(false);
  let [prevMarkets, setPrevMarkets] = useState<Market[] | null>(null);
  let [tenderContext, setTenderContext] = useState<TenderContext | null>();
  let [isWaitingToBeMined, setIsWaitingToBeMined] = useState<boolean>(false);
  let tndPrice = useTndPrice();

  const { chain } = useNetwork();
  const chainId = chain?.id;

  const { data: signer } = useSigner();

  let networkData = useNetworkData(chainId);
  let onSupportedNetwork = useOnSupportedNetwork(chainId);

  let tokenPairs = useTokenPairs(signer, networkData, onSupportedNetwork);
  let pollingKey = useInterval(5_000);

  let markets: Market[] = useMarkets(
    signer,
    tokenPairs,
    networkData?.Contracts?.Comptroller,
    networkData?.Contracts?.PriceOracle,
    networkData?.secondsPerBlock
  );

  let ethPrice =
    markets.find((m) => m.tokenPair.token.symbol === "ETH")?.tokenPair.token
      .priceInUsd ?? 0;

  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (!signer || !chainId || !networkData) {
      return;
    }

    setTenderContext({
      tokenPairs,
      networkData,
      markets,
      currentTransaction,
      updateTransaction,
      isWaitingToBeMined,
      setIsWaitingToBeMined,
      blockNumber,
      tndPrice,
      ethPrice,
    });
  }, [
    signer,
    pollingKey,
    chainId,
    tokenPairs,
    networkData,
    markets,
    currentTransaction,
    isWaitingToBeMined,
    blockNumber,
    tndPrice,
  ]);

  useEffect(() => {
    setTransactionCompleted(!isWaitingToBeMined);
  }, [isWaitingToBeMined]);

  useEffect(() => {
    if (markets !== prevMarkets) {
      setPrevMarkets(markets);
    }
  }, [markets, prevMarkets]);

  useEffect(() => {
    if (currentTransaction && transactionCompleted && markets !== prevMarkets) {
      updateTransaction(null);
    }
  }, [transactionCompleted, markets, currentTransaction, prevMarkets]);

  return tenderContext;
}
