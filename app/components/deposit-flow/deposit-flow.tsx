import type { Market } from "~/types/global";
import { useState } from "react";

import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";

import Deposit from "~/components/deposit-flow/deposit";
import Withdraw from "~/components/deposit-flow/withdraw";

interface Props {
  closeModal: Function;
  market: Market;
}

type ActiveTab = "supply" | "withdraw";

export default function DepositFlow({ closeModal, market }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("supply");
  const [initialSupplyValue, setInitialSupplyValue] = useState<string>("");
  const [initialWithdrawValue, setInitialWithdrawValue] = useState<string>("");

  let provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  const handleTabSwitch = (tab: ActiveTab, lastValue?: string) => {
    setActiveTab(tab);

    //skip setting initial value if user is clicking on same tab or lastvalue is undefined
    if (activeTab === tab || lastValue === undefined) return;

    if (tab === "supply") {
      setInitialWithdrawValue(lastValue);
    } else if (tab === "withdraw") {
      setInitialSupplyValue(lastValue);
    }
  };

  return activeTab === "supply" ? (
    <Deposit
      closeModal={closeModal}
      market={market}
      onTabSwitch={handleTabSwitch}
      borrowLimit={market.borrowLimit}
      borrowLimitUsed={market.borrowLimitUsed}
      signer={signer}
      walletBalance={market.walletBalance}
      totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
      comptrollerAddress={market.comptrollerAddress}
      initialValue={initialSupplyValue}
    />
  ) : (
    <Withdraw
      market={market}
      closeModal={closeModal}
      onTabSwitch={handleTabSwitch}
      borrowLimit={market.borrowLimit}
      borrowLimitUsed={market.borrowLimitUsed}
      signer={signer}
      walletBalance={market.walletBalance}
      totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
      initialValue={initialWithdrawValue}
    />
  );
}
