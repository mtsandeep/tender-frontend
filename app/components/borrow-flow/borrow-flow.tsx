import type { Market } from "~/types/global";
import { useContext, useState } from "react";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";

import Repay from "~/components/borrow-flow/repay";
import Borrow from "~/components/borrow-flow/borrow";

import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { TenderContext } from "~/contexts/tender-context";

interface Props {
  closeModal: Function;
  market: Market;
}

type ActiveTab = "repay" | "borrow";

export default function BorrowFlow({ closeModal, market }: Props) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("borrow");
  const [initialRepayValue, setInitialRepayValue] = useState<string>("");
  const [initialBorrowValue, setInitialBorrowValue] = useState<string>("");

  let { tokenPairs } = useContext(TenderContext);

  let provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  
  const handleTabSwitch = (tab: ActiveTab, lastValue?: string) => {
    setActiveTab(tab);

    //skip setting initial value if user is clicking on same tab or lastvalue is undefined
    if (activeTab === tab || lastValue === undefined) return;

    if (tab === "borrow") {
      setInitialRepayValue(lastValue);
    } else if (tab === "repay") {
      setInitialBorrowValue(lastValue);
    }
  };

  return activeTab ==='repay' ? (
    <Repay
      market={market}
      closeModal={closeModal}
      onTabSwitch={handleTabSwitch}
      borrowedAmount={market.borrowBalance}
      signer={signer}
      borrowLimitUsed={market.borrowLimitUsed}
      walletBalance={market.walletBalance}
      tokenPairs={tokenPairs}
      borrowLimit={market.borrowLimit}
      totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
      initialValue={initialRepayValue}
    />
  ) : (
    <Borrow
      market={market}
      closeModal={closeModal}
      onTabSwitch={handleTabSwitch}
      signer={signer}
      borrowLimitUsed={market.borrowLimitUsed}
      borrowLimit={market.borrowLimit}
      walletBalance={market.walletBalance}
      tokenPairs={tokenPairs}
      totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
      initialValue={initialBorrowValue}
    />
  );
}
