import { useTotalSupplyBalanceInUsd } from "~/hooks/use-total-supply-balance-in-usd";
import { useNetApy } from "~/hooks/use-net-apy";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { TenderContext } from "~/contexts/tender-context";
import { useContext } from "react";
import { useTotalBorrowedInUsd } from "~/hooks/use-total-borrowed-in-usd";
import { useBorrowLimit } from "~/hooks/use-borrow-limit";
import { useBorrowLimitUsed } from "~/hooks/use-borrow-limit-used";
import Display from "~/components/account-summary/display";

export default function AccountSummary() {
  let provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  let { tokenPairs, networkData, markets } = useContext(TenderContext);

  let supplyBalanceInUsd = useTotalSupplyBalanceInUsd(signer, tokenPairs);
  let borrowBalanceInUsd = useTotalBorrowedInUsd(signer, tokenPairs);

  const totalSuppliedUsd = markets.map(
    (m) =>  m.tokenPair.token.priceInUsd * (m.marketData.marketSize ?? 0)
  ).reduce((a, b) => a + b, 0)

  const totalBorrowedUsd = markets.map(
    (m) =>  m.tokenPair.token.priceInUsd * (m.marketData.totalBorrowed ?? 0)
  ).reduce((a, b) => a + b, 0)


  let netApy = useNetApy(signer, tokenPairs);

  let borrowLimit = useBorrowLimit(
    signer,
    networkData.Contracts.Comptroller,
    tokenPairs
  );
  let borrowLimitUsed = useBorrowLimitUsed(totalBorrowedUsd, borrowLimit);

  let percentUsed = Math.min(parseFloat(borrowLimitUsed), 100);

  return (
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
  );
}
