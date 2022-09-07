import { useCallback, useEffect, useRef, useState } from "react";
import NetworksDropdown from "./networksDropdown";
import ConnectWallet from "./connect-wallet";
import TndDropdown from "./tndDropdown";
import { useLocation } from "react-router-dom";

const menuLinks = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Markets",
    link: "/markets",
  },
  {
    name: "Earn",
    link: "/earn",
  },
  {
    name: "Docs",
    link: "https://docs.tender.fi",
  },
  {
    name: "Community",
    link: "https://discord.com/invite/Tender-Fi",
  },
];

export default function Header() {
  let location = useLocation();
  const burgerRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const [activePopupMenu, setActivePopupMenu] = useState<boolean>(false);

  const handleClickBurger = useCallback((value: boolean) => {
    setActivePopupMenu(value);
    if (value) {
      document.querySelector("body")?.classList.add("body__fixed");
    } else {
      document.querySelector("body")?.classList.remove("body__fixed");
    }
  }, []);

  useEffect(() => {
    const closeDropdown = (e: any) => {
      if (
        burgerRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !burgerRef.current.contains(e.target as Node)
      ) {
        setActivePopupMenu(false);
      }
    };
    window.addEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="relative">
      <div className="header__block bg-black z-20 relative h-[71px] lg:h-[110px] flex items-center justify-between">
        <div className="flex w-full c items-center justify-between max-w-[1400px]">
          <div className="w-[104px] block lg:w-[196px] z-20 relative">
            <a href="https://tender.fi">
              <img src="/images/logo1.svg" alt="Tender Finance" />
            </a>
          </div>
          <div className="text-[#ADB5B3] hidden lg:flex justify-center font-normal text-base font-nova gap-x-[30px]  z-20 relative">
            {menuLinks.map((item: { name: string; link: string }) => (
              <a
                key={item.name}
                className={`cursor-pointer hover:text-white ${
                  location.pathname === item.link ? "text-white" : ""
                }`}
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center  z-20 relative">
            <TndDropdown />
            <NetworksDropdown />
            <ConnectWallet />
            <div
              className={`flex lg:hidden header__burg ${
                activePopupMenu ? "active" : ""
              }`}
              onClick={() => handleClickBurger(!activePopupMenu)}
              ref={burgerRef}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div
            className={`aside__menu__wrap top-[71px] flex lg:hidden ${
              activePopupMenu ? `act` : ""
            }`}
            ref={menuRef}
          >
            <div className="aside__menu__container w-full h-full bg-black py-[60px] px-[30px]">
              <div className="relative flex justify-center items-center flex-col text-[#ADB5B3] font-nova-400 text-xl gap-y-[30px]">
                {menuLinks.map(
                  (item: { name: string; link: string }, index: number) => (
                    <a
                      key={item.name}
                      className="font-nova text-white text-lg gap-y-[20px]"
                      href={item.link}
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
              <div className="mt-[40px] flex justify-center">
                <ConnectWallet inMenu={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`aside__menu__wrap top-[71px] flex lg:hidden ${
          activePopupMenu ? `act` : ""
        }`}
        ref={menuRef}
      >
        <div className="aside__menu__container w-full h-full bg-black py-[60px] px-[30px]">
          <div className="relative flex justify-center items-center flex-col text-[#ADB5B3] font-nova-400 text-xl gap-y-[30px]">
            {menuLinks.map(
              (item: { name: string; link: string }, index: number) => (
                <a
                  key={item.name}
                  className="font-nova text-white text-lg gap-y-[20px]"
                  href={item.link}
                >
                  {item.name}
                </a>
              )
            )}
          </div>
          <div className="mt-[40px] flex justify-center">
            <ConnectWallet inMenu={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
