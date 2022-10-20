import {useState, useEffect, useContext} from "react";
import {TenderContext} from "~/contexts/tender-context";

export function useAccountSummary() {
    let [accountSummary, setAccountSummary] = useState<any>({
        supplyBalanceInUsd: 0,
        borrowBalanceInUsd: 0,
        borrowLimit: 0,
        netApy: null,
    });
    let {markets} = useContext(TenderContext);

    useEffect(() => {
        if (markets.length === 0) {
            return;
        }

        let supplyBalanceInUsd = 0;
        let borrowBalanceInUsd = 0;
        let borrowLimit = 0;
        let netGainOrLoss = 0;

        markets.forEach((m) => {
            supplyBalanceInUsd += m.supplyBalanceInUsd;
            borrowBalanceInUsd += m.borrowBalanceInUsd;
            borrowLimit = m.borrowLimit;
            netGainOrLoss += m.supplyBalanceInUsd * parseFloat(m.marketData.depositApy) * 0.01 -
                m.borrowBalanceInUsd * parseFloat(m.marketData.borrowApy) * 0.01;
        });

        let netApy = supplyBalanceInUsd === 0 ? 0 : (netGainOrLoss / supplyBalanceInUsd) * 100;

        setAccountSummary({
            supplyBalanceInUsd,
            borrowBalanceInUsd,
            borrowLimit,
            netApy,
        });
    }, [markets]); // we don't use interval because markets already use it

    return accountSummary;
}
