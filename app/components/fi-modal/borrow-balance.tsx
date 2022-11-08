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
      <div className="font-bold font-nova text-sm sm:text-sm w-full mb-[16px] md:mb-[20px]">
        Borrow Limit
      </div>
      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base mb-[8px]">
        <div className="flex-grow">Borrow Capacity</div>
        <div className="text-white text-base font-nova ">
          {(value == "0" || !isValid) && <>${toFiatString(borrowBalance)}</>}
          {isValid && value != "0" && (
            <div className="flex items-center">
              ${toFiatString(borrowBalance)}
              <img className="mx-3" src={urlArrow} alt="" />$
              {toFiatString(newBorrowBalance)}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base mb-[24px] md:mb-[30px]">
        <div className="flex-grow">Borrow Used</div>
        <div className="text-white text-sm sm:text-base font-nova">
          {(value == "0" || !isValid) && <>{borrowLimitUsed}%</>}
          {isValid && value != "0" && (
            <div className="flex items-center">
              {borrowLimitUsed}%
              <img className="mx-3" src={urlArrow} alt="" />
              {newBorrowLimitUsed}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
