import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import Display from "~/components/account-summary/display";
import type { Market } from "~/types/global";
import AccountSummaryEmpty from "./empty";
import { useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";
import {useAccountSummary} from "~/hooks/use-account-summary";

export default function AccountSummary() {
  const {
    supplyBalanceInUsd,
    borrowBalanceInUsd,
    borrowLimit,
    netApy,
    ltv,
  } = useAccountSummary();
  const tenderContextData = useContext(TenderContext);
  
  const totalSuppliedUsd = tenderContextData.markets
    .map(
      (token: Market) =>
        token.tokenPair.token.priceInUsd * (token.marketData.marketSize ?? 0)
    )
    .reduce((a: any, b: any) => a + b, 0);

  const totalBorrowedUsd = tenderContextData.markets
    .map(
      (token: Market) =>
        token.tokenPair.token.priceInUsd * (token.marketData.totalBorrowed ?? 0)
    )
    .reduce((a: any, b: any) => a + b, 0);

  let borrowLimitUsed = useBorrowLimitUsed(borrowBalanceInUsd, borrowLimit);

  let percentUsed = Math.min(parseFloat(borrowLimitUsed), 100);

  return netApy !== null ? (
    <Display
      totalSuppliedUsd={totalSuppliedUsd}
      totalBorrowedUsd={totalBorrowedUsd}
      supplyBalanceInUsd={supplyBalanceInUsd}
      borrowBalanceInUsd={borrowBalanceInUsd}
      netApy={netApy}
      ltv={ltv}
      borrowLimitUsed={borrowLimitUsed}
      percentUsed={percentUsed}
      borrowLimit={borrowLimit}
    />
  ) : (
    <AccountSummaryEmpty loading={true} />
  );
}
