import { useEffect } from "react";
import { metaMask } from "~/connectors/meta-mask";

const DISCONNECTED_LOCAL_STORAGE_KEY = "tenderWalletDisconnected";

const connect = () => {
  metaMask.activate().then(() => {
    window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, "0");
  });
};

const disconnect = () => {
  metaMask.deactivate();
  window.localStorage.setItem(DISCONNECTED_LOCAL_STORAGE_KEY, "1");
};

const isDisconnected = () => {
  return window.localStorage.getItem(DISCONNECTED_LOCAL_STORAGE_KEY) === "1";
};

const useAuth = () => {
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
  }, []);

  return { connect, disconnect, isDisconnected };
};

export default useAuth;
