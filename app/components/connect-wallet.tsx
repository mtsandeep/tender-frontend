import { useEffect, useState } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
import WalletDropdown from "./walletDropdown";
import { useNetworkData } from "../hooks/use-network-data"
import { hooks as Web3Hooks } from "~/connectors/meta-mask";

const { useAccounts, useIsActive } = hooks;

export default function ConnectWallet({ inMenu }: { inMenu?: boolean }) {
  const accounts = useAccounts();
  const isActive = useIsActive();
  const chainId = Web3Hooks.useChainId();
  const networkData = useNetworkData(chainId);
  const [onClient, setOnClient] = useState<boolean>(false);

  useEffect(() => {
    setOnClient(true);
    void metaMask.connectEagerly();
  }, []);

  return (
    <div>
      {onClient && (
        <>
          {isActive && accounts && (
            <WalletDropdown
              inMenu={inMenu}
              addresses={accounts}
              networkName={networkData?.name ?? ""}
              walletIco={"/images/wallet-icons/metamask.svg"}
              isNetworkOnline={true}
              handlerDisconnect={() => console.log("Disconnected")}
            />
          )}

          {/* Prompt to Install Metamask if window.ethereum is not available */}
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

          {/* Prompt to Connect Wallet if not active */}
          {window.ethereum && !isActive && (
            <button
              data-testid="connect-wallet"
              className="border font-space flex items-center justify-center font-bold uppercase rounded-md text-dark-green w-[120px] md:text-[15px] h-[34px] border-[#14f195] md:w-[163px] md:h-[44px] text-[10px] hover:opacity-[0.6]"
              onClick={() => metaMask.activate()}
            >
              Connect Wallet
            </button>
          )}
        </>
      )}
    </div>
  );
}
