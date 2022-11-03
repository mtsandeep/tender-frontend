import type { Market } from "~/types/global";
import { useContext, useState } from "react";

import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";

import Deposit from "~/components/deposit-borrow-flow/deposit";
import Withdraw from "~/components/deposit-borrow-flow/withdraw";
import Borrow from "./borrow";
import Repay from "./repay";
import { TenderContext } from "~/contexts/tender-context";

export type ActiveTab = "supply" | "withdraw" | "borrow" | "repay";

interface Props {
  closeModal: Function;
  market: Market;
  activeTab: ActiveTab;
  setActiveTab?: (tab: ActiveTab) => void;
}

export default function DepositBorrowFlow({
  closeModal,
  market,
  activeTab,
  setActiveTab,
}: Props) {
  const [initialValue, setInitialValue] = useState<string>("");
  const { tokenPairs } = useContext(TenderContext);
  const tabs: { name: ActiveTab; color: string }[] = [
    {
      name: "supply",
      color: "#14F195",
    },
    {
      name: "withdraw",
      color: "#14F195",
    },
    {
      name: "borrow",
      color: "#00E0FF",
    },
    {
      name: "repay",
      color: "#00E0FF",
    },
  ];

  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  const handleTabSwitch = (tab: ActiveTab) => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    setInitialValue("");
  };

  return (
    <div className="flex w-full h-full">
      <div className="hidden md:flex flex-col border-[#B5CFCC2B] border-r-[1px] p-[30px]">
        {tabs.map((tab: { name: ActiveTab; color: string }) => (
          <button
            key={tab.name}
            onClick={() => handleTabSwitch(tab.name)}
            className={`${
              activeTab === tab.name
                ? `text-[${tab.color}] border-[${tab.color}]`
                : "text-[#ADB5B3] border-[#ADB5B3]"
            } border-[1px] text-[12px] mr-[8px] md:mr-[0] w-[94px] h-[36px] font-space text-[13px] uppercase md:w-[120px] md:h-[44px] bg-[#181D1B] md:text-[13px] rounded-[6px] font-bold font-space md:mb-[16px]`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="w-full md:w-[460px]">
        {activeTab === "supply" && (
          <Deposit
            closeModal={closeModal}
            market={market}
            borrowLimit={market.borrowLimit}
            borrowLimitUsed={market.borrowLimitUsed}
            signer={signer}
            walletBalance={market.walletBalance}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            comptrollerAddress={market.comptrollerAddress}
            initialValue={initialValue}
            activeTab={activeTab}
            setActiveTab={handleTabSwitch}
            tabs={tabs}
          />
        )}
        {activeTab === "withdraw" && (
          <Withdraw
            market={market}
            closeModal={closeModal}
            borrowLimit={market.borrowLimit}
            borrowLimitUsed={market.borrowLimitUsed}
            signer={signer}
            walletBalance={market.walletBalance}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValue}
            activeTab={activeTab}
            setActiveTab={handleTabSwitch}
            tabs={tabs}
          />
        )}
        {activeTab === "repay" && (
          <Repay
            market={market}
            closeModal={closeModal}
            borrowedAmount={market.borrowBalance}
            signer={signer}
            borrowLimitUsed={market.borrowLimitUsed}
            walletBalance={market.walletBalance}
            tokenPairs={tokenPairs}
            borrowLimit={market.borrowLimit}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValue}
            activeTab={activeTab}
            setActiveTab={handleTabSwitch}
            tabs={tabs}
          />
        )}
        {activeTab === "borrow" && (
          <Borrow
            market={market}
            closeModal={closeModal}
            signer={signer}
            borrowLimitUsed={market.borrowLimitUsed}
            borrowLimit={market.borrowLimit}
            walletBalance={market.walletBalance}
            tokenPairs={tokenPairs}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValue}
            activeTab={activeTab}
            setActiveTab={handleTabSwitch}
            tabs={tabs}
          />
        )}
      </div>
    </div>
  );
}
