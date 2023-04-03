import { arbitrum } from "@wagmi/chains";
import { useCallback, useEffect, useState } from "react";
import { useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
// import { MetaMaskConnector } from "@wagmi/connectors/metaMask";

const DISCONNECTED_LOCAL_STORAGE_KEY = "tenderWalletDisconnected";

const isDisconnected = () => {
  return window.localStorage.getItem(DISCONNECTED_LOCAL_STORAGE_KEY) === "1";
};

export type AuthsType = ReturnType<typeof useAuth>;

const useAuth = () => {
  let [isConnecting, setIsConnecting] = useState(false)

  const connector = useConnect({
    // connector: new MetaMaskConnector(),
    connector: new InjectedConnector({chains: [arbitrum]}),
  });

  const { disconnect: _disconnect } = useDisconnect();

  const connect = useCallback(async () => {
    if (isConnecting) return
    try {
      setIsConnecting(true)
      await connector.connectAsync();
    } catch (err) {
      console.error(err)
    } finally {
      setIsConnecting(false)
    }

    window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, "0");
  }, [connector]);

  const disconnect = useCallback(async () => {
    await _disconnect();
    window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, "1");
  }, [_disconnect]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === DISCONNECTED_LOCAL_STORAGE_KEY) {
        if (event.newValue === "0") {
          connect();
        } else {
          disconnect();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [connect, disconnect]);

  return { connect, disconnect, isDisconnected };
};

export default useAuth;
