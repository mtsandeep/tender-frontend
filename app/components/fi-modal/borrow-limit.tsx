import { toFiatString } from "~/lib/ui";

interface BorrowLimitProps {
  value: string;
  urlArrow: string;
  isValid: boolean;
  borrowLimit: number;
  newBorrowLimit: number;
  borrowLimitUsed: string;
  newBorrowLimitUsed: string;
}

export default function BorrowLimit(props: BorrowLimitProps) {
  const {
    value,
    urlArrow,
    isValid,
    borrowLimit,
    newBorrowLimit,
    borrowLimitUsed,
    newBorrowLimitUsed,
  } = props;

  return (
    <div>
      <div className="font-bold mr-3 font-nova text-sm sm:text-sm w-full pb-4 sm:pb-5">
        Borrow Limit
      </div>

      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base border-b border-[#282C2B]">
        <div className="flex-grow py-4 sm:py-5 ">Borrow Capacity</div>
        <div className="text-white text-base font-nova">
          {(value == "0" || !isValid || borrowLimit == newBorrowLimit) && (
            <>${toFiatString(borrowLimit)}</>
          )}
          {isValid && value != "0" && borrowLimit != newBorrowLimit && (
            <div className="flex items-center">
              ${toFiatString(borrowLimit)}
              <img className="mx-3" src={urlArrow} alt="" />$
              {toFiatString(newBorrowLimit)}
            </div>
          )}
          {}
        </div>
      </div>

      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base pb-4 sm:pb-5">
        <div className="flex-grow py-4 sm:py-5">Borrow Used</div>
        <div className="text-white text-sm sm:text-base font-nova">
          {(value == "0" ||
            !isValid ||
            borrowLimitUsed == newBorrowLimitUsed ||
            !newBorrowLimitUsed) && <>{borrowLimitUsed}%</>}
          {isValid &&
            value != "0" &&
            newBorrowLimitUsed &&
            borrowLimitUsed != newBorrowLimitUsed && (
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
