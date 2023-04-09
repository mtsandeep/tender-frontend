import type { Market } from "~/types/global";
import { useCallback, useContext, useState } from "react";

import { TenderContext } from "~/contexts/tender-context";
import Deposit from "~/components/deposit-borrow-flow/deposit";
import Withdraw from "~/components/deposit-borrow-flow/withdraw";
import { getAmountFloat } from "~/lib/ui";

import Borrow from "./borrow";
import Repay from "./repay";

export type ActiveTab = "supply" | "withdraw" | "borrow" | "repay";

interface Props {
  closeModal: Function;
  marketId: string;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function DepositBorrowFlow({
  closeModal,
  marketId,
  activeTab,
  setActiveTab,
}: Props) {
  // hold the state here, so that it stays when switching tabs
  const [initialValueDeposit, setInitialValueDeposit] = useState<string>("");
  const [initialValueWithdraw, setInitialValueWithdraw] = useState<string>("");
  const [initialValueRepay, setInitialValueRepay] = useState<string>("");
  const [initialValueBorrow, setInitialValueBorrow] = useState<string>("");

  const { tokenPairs, markets } = useContext(TenderContext);
  const market = markets.filter((m)=> m.id === marketId)[0]

  const tabs: { name: ActiveTab; color: string; show: boolean }[] = [
    {
      name: "supply",
      color: "#14F195",
      show: true,
    },
    {
      name: "withdraw",
      color: "#14F195",
      show: true,
    },
    {
      name: "borrow",
      color: "#00E0FF",
      show: market.isBorrowable,
    },
    {
      name: "repay",
      color: "#00E0FF",
      show: market.isBorrowable,
    },
  ];


  return (
    <div className="flex w-full h-full">
      <div className="hidden md:flex flex-col border-[#B5CFCC2B] border-r-[1px] p-[30px]">
        {tabs.map(
          (tab: { name: ActiveTab; color: string; show: boolean }) =>
            tab.show && (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`${
                  activeTab === tab.name
                    ? `text-[${tab.color}] border-[${tab.color}]`
                    : "text-[#ADB5B3] border-[#181D1B]"
                } ${`hover:text-[${tab.color}] `} border-[1px] uppercase w-[120px] h-[44px] bg-[#181D1B] text-[13px] rounded-[6px] font-bold font-space mb-[16px]`}
              >
                {tab.name}
              </button>
            )
        )}
      </div>
      <div className="w-full md:w-[500px]">
        {activeTab === "supply" && (
          <Deposit
            tokenAllowance={market.tokenAllowance}
            closeModal={closeModal}
            market={market}
            borrowLimitUsed={market.borrowLimitUsed}
            walletBalance={market.walletBalance}
            initialValue={initialValueDeposit}
            changeInitialValue={setInitialValueDeposit}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
            tabs={tabs}
          />
        )}
        {activeTab === "withdraw" && (
          <Withdraw
            market={market}
            closeModal={closeModal}
            borrowLimitUsed={market.borrowLimitUsed}
            initialValue={initialValueWithdraw}
            changeInitialValue={setInitialValueWithdraw}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
            tabs={tabs}
          />
        )}
        {activeTab === "repay" && (
          <Repay
            market={market}
            closeModal={closeModal}
            tokenAllowance={market.tokenAllowance}
            borrowedAmount={market.borrowBalance}
            walletBalance={getAmountFloat(
              market.walletBalance,
              market.tokenPair.token.decimals
            )}
            tokenPairs={tokenPairs}
            initialValue={initialValueRepay}
            changeInitialValue={setInitialValueRepay}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
            tabs={tabs}
          />
        )}
        {activeTab === "borrow" && (
          <Borrow
            market={market}
            closeModal={closeModal}
            tokenPairs={tokenPairs}
            initialValue={initialValueBorrow}
            changeInitialValue={setInitialValueBorrow}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
            tabs={tabs}
          />
        )}
      </div>
    </div>
  );
}
