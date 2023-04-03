import { AuthsType } from "~/hooks/use-auth";
import ConnectWallet from "./connect-wallet";
import NetworksDropdown from "./networksDropdown";

export const WalletConnectArea = ({ connect, disconnect, isDisconnected } : AuthsType ) => {
  return (
    <>
      <NetworksDropdown connect={connect} disconnect={disconnect} isDisconnected={isDisconnected} />
      <ConnectWallet connect={connect} disconnect={disconnect} isDisconnected={isDisconnected} />
    </>
  );
};
