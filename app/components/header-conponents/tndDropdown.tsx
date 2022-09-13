import { useState, useRef, useEffect } from "react";

const TndDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="show animate w-[34px] h-[34px] md:w-[90px] md:h-[44px] mr-[6px] md:mr-[12px]"></div>
      ) : (
        <div
          className="relative z-10 w-[34px] md:w-[auto] mr-[6px] md:mr-[12px] h-[34px] md:h-[44px]"
          ref={dropdownRef}
        >
          <div
            className={`relative flex p-[9px] md:mr-[0px] bg-[#181D1B] hover:bg-[#262C2A] cursor-pointer rounded-[6px] flex items-center h-[34px] md:h-[44px]`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="w-[16px] h-[16px] mr-[0px] md:mr-[9px]"
              src="/images/wallet-icons/balance-icon.svg"
              alt="..."
            />
            <div className="whitespace-nowrap text-ellipsis overflow-hidden block text-sm font-semibold text-right leading-[14px] font-nova hidden md:flex">
              $23.56
            </div>
          </div>

          <div
            className={`overflow-hidden w-[220px] md:w-[219px] rounded-[6px] right-[-50px] md:right-[0px] top-[calc(100%+5px)] md:top-[calc(100%+8px)] absolute dropdown__body ${
              isOpen ? "dropdown__body-active" : ""
            }`}
          >
            <div className="flex items-center justify-between p-[14px] border-b border-[#b5cfcc2b]">
              <div className="flex items-center mr-[10px]">
                <img
                  className="w-[25px] h-[25px] mr-[9px]"
                  src="/images/wallet-icons/balance-icon.svg"
                  alt="..."
                />
                <p className="font-nova text-base font-semibold text-white leading-4">
                  TND
                </p>
              </div>
              <span className="font-nova text-base font-semibold leading-4 text-[#14F195]">
                $23.56
              </span>
            </div>
            <a
              href="/earn"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-[14px] hover:bg-[#2B302F] cursor-pointer"
            >
              <div className="flex items-center mr-[10px]">
                <img
                  className="w-[16px] h-[16px] mr-[15px]"
                  src="/images/wallet-icons/balance-wallet.svg"
                  alt="..."
                />
                <p className="font-nova text-sm font-medium text-white leading-[14px]">
                  Balance
                </p>
              </div>
              <span className="font-nova text-sm font-semibold leading-[14px] text-[#14F195]">
                0.00
              </span>
            </a>
            <div className="flex items-center justify-between p-[14px] hover:bg-[#2B302F] cursor-pointer">
              <div className="flex items-center">
                <img
                  className="w-[16px] h-[16px] mr-[15px]"
                  src="/images/wallet-icons/balance-link.svg"
                  alt="..."
                />
                <p className="font-nova text-sm font-normal text-white leading-[14px]">
                  Get TND
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-[14px] hover:bg-[#2B302F] cursor-pointer border-b border-[#b5cfcc2b]">
              <div className="flex items-center">
                <img
                  className="w-[16px] h-[16px] mr-[15px]"
                  src="/images/wallet-icons/balance-metamask.svg"
                  alt="..."
                />
                <p className="font-nova text-sm font-normal text-white leading-[14px]">
                  Add to Metamask
                </p>
              </div>
            </div>
            <a
              href="/earn"
              className="flex items-center justify-between p-[14px] hover:bg-[#2B302F] cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center">
                <img
                  className="w-[16px] h-[16px] mr-[15px]"
                  src="/images/wallet-icons/balance-staking.svg"
                  alt="..."
                />
                <p className="font-nova text-sm font-normal text-white leading-[14px]">
                  Staking
                </p>
              </div>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="/earn#vest"
              className="flex items-center justify-between p-[14px] hover:bg-[#2B302F] cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  className="w-[16px] h-[16px] mr-[15px]"
                  src="/images/wallet-icons/balance-vesting.svg"
                  alt="..."
                />
                <p className="font-nova text-sm font-normal text-white leading-[14px]">
                  Vesting
                </p>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default TndDropdown;
