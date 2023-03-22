import DisplayPrice from "~/components/shared/DisplayPrice";
import { getPercentageString } from "~/lib/ui";

interface BorrowBalanceProps {
  value: string;
  urlArrow: string;
  isValid: boolean;
  borrowCapacity: number;
  newBorrowCapacity: number;
  borrowLimitUsed: string;
  newBorrowLimitUsed: string;
}

export default function BorrowBalance(props: BorrowBalanceProps) {
  const {
    value,
    urlArrow,
    isValid,
    borrowCapacity,
    newBorrowCapacity,
    borrowLimitUsed,
    newBorrowLimitUsed,
  } = props;
  return (
    <div>
      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base mb-[8px]">
        <div className="flex-grow">Borrow Capacity</div>
        <div className="text-white text-base font-nova ">
          {(value == "0" || !isValid) && (
            <DisplayPrice
              amount={borrowCapacity.toString()}
              baseFactor="1"
              hideBaseCurrencyCode
            />
          )}
          {isValid && value != "0" && (
            <div className="flex items-center">
              <DisplayPrice
                amount={borrowCapacity.toString()}
                baseFactor="1"
                hideBaseCurrencyCode
              />
              <img className="mx-3" src={urlArrow} alt="" />
              <DisplayPrice
                amount={newBorrowCapacity.toString()}
                baseFactor="1"
                hideBaseCurrencyCode
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center text-[#ADB5B3] font-nova text-sm sm:text-base mb-[24px] md:mb-[30px]">
        <div className="flex-grow">Borrow Used</div>
        <div className="text-white text-sm sm:text-base font-nova">
          {(value == "0" || !isValid) && (
            <>{getPercentageString(borrowLimitUsed, "100")}</>
          )}
          {isValid && value != "0" && (
            <div className="flex items-center">
              {getPercentageString(borrowLimitUsed, "100")}
              <img className="mx-3" src={urlArrow} alt="" />
              {getPercentageString(newBorrowLimitUsed, "100")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
