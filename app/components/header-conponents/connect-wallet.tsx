import { useEffect, useState } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
import { useNetworkData } from "../../hooks/use-network-data";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import useAuth from "~/hooks/use-auth";
import WalletDropdown from "./walletDropdown";

export default function ConnectWallet({ inMenu }: { inMenu?: boolean }) {
  const { useAccounts, useIsActive } = hooks;
  const accounts = useAccounts();
  const isActive = useIsActive();
  const chainId = Web3Hooks.useChainId();
  const networkData = useNetworkData(chainId);
  const { connect, disconnect, isDisconnected } = useAuth();
  const [onClient, setOnClient] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setOnClient(true);
    if (!isDisconnected()) {
      void metaMask.connectEagerly();
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
        <button
          data-testid="connect-wallet"
          className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[120px] md:text-[15px] h-[34px] border-[#14f195] md:w-[163px] md:h-[44px] text-[10px] hover:opacity-[0.6]"
          onClick={() => connect()}
        >
          Connect Wallet
        </button>
      ) : (
        onClient && (
          <>
            {isActive && accounts && (
              <WalletDropdown
                inMenu={inMenu}
                addresses={accounts}
                networkName={networkData?.name ?? ""}
                walletIco={"/images/wallet-icons/metamask.svg"}
                isNetworkOnline={true}
                handlerDisconnect={() => disconnect()}
              />
            )}

            {!window.ethereum && (
              <a
                className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[120px] md:text-[15px] h-[34px] md:w-[163px] border-[#14f195] md:h-[44px] text-[10px] hover:opacity-[0.6]"
                target="_blank"
                rel="noreferrer"
                href="https://metamask.io/"
              >
                Connect wallet
              </a>
            )}

            {window.ethereum && !isActive && (
              <button
                data-testid="connect-wallet"
                className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[120px] md:text-[15px] h-[34px] border-[#14f195] md:w-[163px] md:h-[44px] text-[10px] hover:opacity-[0.6]"
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
