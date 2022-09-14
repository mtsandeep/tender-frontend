import { useTotalSupplyBalanceInUsd } from "~/hooks/use-total-supply-balance-in-usd";
import { useNetApy } from "~/hooks/use-net-apy";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useTotalBorrowedInUsd } from "~/hooks/use-total-borrowed-in-usd";
import { useBorrowLimit } from "~/hooks/use-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import Display from "~/components/account-summary/display";
import type { Market } from "~/types/global";
import AccountSummaryEmpty from "./empty";
import {useContext} from "react";
import {TenderContext} from "~/contexts/tender-context";

export default function AccountSummary() {
  const tenderContextData = useContext(TenderContext);
  let provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  let supplyBalanceInUsd = useTotalSupplyBalanceInUsd(
    signer,
    tenderContextData.tokenPairs
  );
  let borrowBalanceInUsd = useTotalBorrowedInUsd(
    signer,
    tenderContextData.tokenPairs
  );

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

  let netApy = useNetApy(signer, tenderContextData.tokenPairs);

  let borrowLimit = useBorrowLimit(
    signer,
    tenderContextData.networkData.Contracts.Comptroller,
    tenderContextData.tokenPairs
  );
  let borrowLimitUsed = useBorrowLimitUsed(totalBorrowedUsd, borrowLimit);

  let percentUsed = Math.min(parseFloat(borrowLimitUsed), 100);

  return tenderContextData?.markets?.length ? (
    <Display
      totalSuppliedUsd={totalSuppliedUsd}
      totalBorrowedUsd={totalBorrowedUsd}
      supplyBalanceInUsd={supplyBalanceInUsd}
      borrowBalanceInUsd={borrowBalanceInUsd}
      netApy={netApy}
      borrowLimitUsed={borrowLimitUsed}
      percentUsed={percentUsed}
      borrowLimit={borrowLimit}
    />
  ) : (
    <AccountSummaryEmpty loading={true} />
  );
}
