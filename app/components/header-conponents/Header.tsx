// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { useCallback, useEffect, useState } from "react";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { hooks } from "~/connectors/meta-mask";
import NetworksDropdown from "./networksDropdown";
import ConnectWallet from "./connect-wallet";
import TndDropdown from "./tndDropdown";

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
  const chainId = hooks.useChainId();
  let onSupportedChain = useOnSupportedNetwork(chainId);

  const [activePopupMenu, setActivePopupMenu] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!onSupportedChain) {
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [onSupportedChain]);

  const handleClickBurger = useCallback((value: boolean) => {
    setActivePopupMenu(value);
    if (value) {
      document.querySelector("body")?.classList.add("body__fixed");
    } else {
      document.querySelector("body")?.classList.remove("body__fixed");
    }
  }, []);

  return (
    <div className="header__block bg-black z-10 relative h-[71px] lg:h-[110px] flex items-center justify-between">
      <div className="flex w-full c items-center justify-between max-w-[1400px]">
        <div
          className="w-[104px] block lg:w-[196px]"
          onClick={() => handleClickBurger(false)}
        >
          <a href="https://tender.fi">
            <img src="/images/logo1.svg" alt="Tender Finance" />
          </a>
        </div>
        <div className="text-[#ADB5B3] hidden lg:flex justify-center font-normal text-base font-nova gap-x-[30px]">
          {menuLinks.map((item: { name: string; link: string }) => (
            <a
              key={item.name}
              className="cursor-pointer hover:text-white"
              href={item.link}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center">
          <TndDropdown />
          <NetworksDropdown />
          <ConnectWallet />
          <div
            className={`flex lg:hidden header__burg ${
              activePopupMenu ? "active" : ""
            }`}
            onClick={() => handleClickBurger(!activePopupMenu)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`aside__menu__wrap flex lg:hidden top-[71px] lg:top-[110px] ${
            activePopupMenu
              ? `act ${
                  !onSupportedChain && show
                    ? "h-[calc(100vh-150px)] md:h-[calc(100vh-125px)]"
                    : "h-[calc(100vh-71px)]"
                }`
              : ""
          }`}
        >
          <div
            className="aside__menu__bac"
            onClick={() => handleClickBurger(false)}
          ></div>
          <div className="aside__menu__container flex items-center justify-center absolute w-full h-full max-w-[350px] top-[0px] z-10 right-[0px] left-[auto] bg-black py-[20px] px-[40px]">
            <div className="relative flex justify-center items-center flex-col text-[#ADB5B3] font-nova-400 text-xl translate-y-[-45px] gsap-[20px]">
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
            <div className="absolute left-[50%] bottom-[20px] translate-x-[-50%]">
              <ConnectWallet inMenu={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
