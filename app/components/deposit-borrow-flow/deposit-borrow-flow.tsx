import type { Market } from "~/types/global";
import { useContext, useState } from "react";

import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";

import Deposit from "~/components/deposit-borrow-flow/deposit";
import Withdraw from "~/components/deposit-borrow-flow/withdraw";
import Borrow from "./borrow";
import Repay from "./repay";
import { TenderContext } from "~/contexts/tender-context";
import { getAmountFloat } from "~/lib/ui";

export type ActiveTab = "supply" | "withdraw" | "borrow" | "repay";

interface Props {
  closeModal: Function;
  market: Market;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function DepositBorrowFlow({
  closeModal,
  market,
  activeTab,
  setActiveTab,
}: Props) {
  const [initialValueDeposit, setInitialValueDeposit] = useState<string>("");
  const [initialValueWithdraw, setInitialValueWithdraw] = useState<string>("");
  const [initialValueRepay, setInitialValueRepay] = useState<string>("");
  const [initialValueBorrow, setInitialValueBorrow] = useState<string>("");
  const [txnHashDeposit, setTxnHashDeposit] = useState<string>("");
  const [txnHashWithdraw, setTxnHashWithdraw] = useState<string>("");
  const [txnHashRepay, setTxnHashRepay] = useState<string>("");
  const [txnHashBorrow, setTxnHashBorrow] = useState<string>("");

  const { tokenPairs } = useContext(TenderContext);
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

  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

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
            closeModal={closeModal}
            market={market}
            borrowLimit={market.borrowLimit}
            borrowLimitUsed={market.borrowLimitUsed}
            signer={signer}
            walletBalance={market.walletBalance}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            comptrollerAddress={market.comptrollerAddress}
            initialValue={initialValueDeposit}
            changeInitialValue={setInitialValueDeposit}
            txnHash={txnHashDeposit}
            changeTxnHash={setTxnHashDeposit}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
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
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValueWithdraw}
            changeInitialValue={setInitialValueWithdraw}
            txnHash={txnHashWithdraw}
            changeTxnHash={setTxnHashWithdraw}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
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
            walletBalance={getAmountFloat(
              market.walletBalance,
              market.tokenPair.token.decimals
            )}
            tokenPairs={tokenPairs}
            borrowLimit={market.borrowLimit}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValueRepay}
            changeInitialValue={setInitialValueRepay}
            txnHash={txnHashRepay}
            changeTxnHash={setTxnHashRepay}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
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
            tokenPairs={tokenPairs}
            totalBorrowedAmountInUsd={market.totalBorrowedAmountInUsd}
            initialValue={initialValueBorrow}
            changeInitialValue={setInitialValueBorrow}
            txnHash={txnHashBorrow}
            changeTxnHash={setTxnHashBorrow}
            activeTab={activeTab}
            setActiveTab={(tab: ActiveTab) => setActiveTab(tab)}
            tabs={tabs}
          />
        )}
      </div>
    </div>
  );
}
