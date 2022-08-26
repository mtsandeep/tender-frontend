import { toFiatString } from "~/lib/ui";

interface BorrowBalanceProps {
  value: string;
  urlArrow: string;
  isValid: boolean;
  borrowBalance: number;
  newBorrowBalance: number;
  borrowLimitUsed: string;
  newBorrowLimitUsed: string;
}

export default function BorrowBalance(props: BorrowBalanceProps) {
  const {
    value,
    urlArrow,
    isValid,
    borrowBalance,
    newBorrowBalance,
    borrowLimitUsed,
    newBorrowLimitUsed,
  } = props;
  return (
    <div>
      <div className="font-bold mr-3 border-b border-[#282C2B] font-nova text-sm sm:text-[14px] w-full pb-4 sm:pb-5">
        Borrow Limit
      </div>

      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base border-b border-[#282C2B]">
        <div className="flex-grow py-4 sm:py-5 ">Borrow Balance</div>
        <div className="text-white text-base font-nova ">
          {(value == "0" || !isValid) && <>{toFiatString(borrowBalance)}</>}
          {isValid && value != "0" && (
            <div className="flex">
              ${toFiatString(borrowBalance)}
              <span className="flex items-center justify-center text-[#14f195] text-sm sm:text-base">
                <img className="mx-3" src={urlArrow} alt="" />
              </span>
              ${toFiatString(newBorrowBalance)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base pb-4 sm:pb-5">
        <div className="flex-grow py-4 sm:py-5">Borrow Used</div>
        <div className="text-white text-sm sm:text-base font-nova">
          {(value == "0" || !isValid) && <>{borrowLimitUsed}%</>}
          {isValid && value != "0" && (
            <div className="flex">
              {borrowLimitUsed}%
              <span className="flex items-center justify-center text-[#14f195] text-sm sm:text-base">
                <img className="mx-3" src={urlArrow} alt="" />
              </span>
              {newBorrowLimitUsed}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
