import { useCallback, useEffect, useState } from "react";
// import { hooks as Web3Hooks, metaMask } from "~/connectors/meta-mask";
import { useAccount, useSigner } from "wagmi";
import useAuth from "~/hooks/use-auth";
import WalletDropdown from "./walletDropdown";

export default function ConnectWallet({ inMenu }: { inMenu?: boolean }) {
  const { address: defaultAddress, isConnected: isActive } = useAccount();
  const { connect, disconnect, isDisconnected } = useAuth();
  const [onClient, setOnClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: signer } = useSigner();

  const handleChainChanged = useCallback((ethereum: any) => {
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      handleChainChanged(window.ethereum);
    }
  }, [handleChainChanged, signer]);

  useEffect(() => {
    setOnClient(true);
    if (!isDisconnected()) {
      void connect();
    }
  }, [isDisconnected]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        isActive && defaultAddress ? (
          <div className="show animate w-[34px] h-[34px] xl:w-[160px] xl:h-[44px]"></div>
        ) : (
          <div className="show animate w-[34px] h-[34px] xl:w-[160px] xl:h-[44px]"></div>
        )
      ) : (
        onClient && (
          <>
            {isActive && defaultAddress && (
              <WalletDropdown
                inMenu={inMenu}
                defaultAddress={defaultAddress}
                walletIco={"/images/wallet-icons/metamask.svg"}
                handlerDisconnect={() => disconnect()}
              />
            )}

            {!window.ethereum && (
              <a
                className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[110px] xl:text-sm h-[34px] xl:w-[160px] border-[#14f195] xl:h-[44px] text-[10px] hover:opacity-[0.6]"
                target="_blank"
                rel="noreferrer"
                href="https://metamask.io/"
              >
                Connect wallet
              </a>
            )}

            {window.ethereum && !isActive && (
              <button
                className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[110px] xl:text-sm h-[34px] border-[#14f195] xl:w-[160px] xl:h-[44px] text-[10px] hover:opacity-[0.6]"
                onClick={() => connect()}
              >
                Connect Wallet
              </button>
            )}
          </>
        )
      )}
    </div>
  );
}
