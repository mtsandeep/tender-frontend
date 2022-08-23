import { useCallback, useEffect, useState } from "react";
import BalanceDropdown from "./BalanceDropdown";
import ConnectWallet from "./connect-wallet";
import { useOnSupportedNetwork } from "~/hooks/use-on-supported-network";
import { hooks } from "~/connectors/meta-mask";
import type { ProviderRpcError } from "@web3-react/types";

const { useIsActive } = hooks;

export default function Header() {
  const isActive = useIsActive();
  const chainId = hooks.useChainId();
  let provider = hooks.useProvider();
  let onSupportedChain = useOnSupportedNetwork(chainId);

  const [activePopupMenu, setActivePopupMenu] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!onSupportedChain) {
      console.log(!onSupportedChain);
      setTimeout(() => {
        setShow(true);
      }, 500);
    }
  }, [onSupportedChain]);

  let tryConnectingToMetis = async (p: typeof provider) => {
    if (!p) {
      return;
    }
    let targetNetworkId = 1088;
    let targetNetworkIdHex = `0x${targetNetworkId.toString(16)}`;

    p?.provider?.request &&
      p.provider
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetNetworkIdHex }],
        })
        .catch((error: ProviderRpcError) => {
          if (error.code === 4902) {
            return (
              p?.provider?.request &&
              p.provider!.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainName: "Metis Network",
                    nativeCurrency: {
                      name: "Metis",
                      symdol: "METIS", // 2-6 characters long
                      decimals: 18,
                    },
                    rpcUrls: ["https://andromeda.metis.io/?owner=1088"],
                    blockExplorerUrls: ["https://andromeda-explorer.metis.io/"],
                    chainId: targetNetworkIdHex,
                  },
                ],
              })
            );
          } else {
            throw error;
          }
        });
  };

  const handleClickBurger = useCallback((value: boolean) => {
    setActivePopupMenu(value);
    if (value) {
      document.querySelector("body")?.classList.add("body__fixed");
    } else {
      document.querySelector("body")?.classList.remove("body__fixed");
    }
  }, []);

  return (
    <>
      {!onSupportedChain && (
        <div
          className={`top__error__wrap w-full items-center justify-center h-[60px] md:h-[54px] ${
            show ? "flex" : "hidden"
          }`}
        >
          <div className="flex w-full items-center justify-center max-w-[1400px] relative py-[12px] px-[40px] md:py-[18px]">
            <div className="w-full text-center text-[#121111] text-[14px] md:text-[18px] font-bold font-nova leading-[130%] md:leading-[18px]">
              {isActive ? (
                <>
                  Warning! Unsupported network.{" "}
                  <button
                    className="underline"
                    onClick={() => tryConnectingToMetis(provider)}
                  >
                    Switch to Metis
                  </button>
                </>
              ) : (
                "Warning: Unsupported network. Connect Wallet and we can help you switch."
              )}
            </div>
            <svg
              className="absolute cursor-pointer close__custom top-[8px] md:top-[50%] translate-0 md:translate-y-[-50%] right-[8px] md:right-[20px]"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              onClick={() => setShow(false)}
            >
              <path
                d="M0.695072 0.69556C0.782379 0.608032 0.886097 0.538587 1.00028 0.491205C1.11447 0.443823 1.23688 0.419434 1.36051 0.419434C1.48414 0.419434 1.60655 0.443823 1.72074 0.491205C1.83493 0.538587 1.93865 0.608032 2.02595 0.69556L6.99984 5.67132L11.9737 0.69556C12.0611 0.608173 12.1649 0.538854 12.279 0.491561C12.3932 0.444267 12.5156 0.419926 12.6392 0.419926C12.7627 0.419926 12.8851 0.444267 12.9993 0.491561C13.1135 0.538854 13.2172 0.608173 13.3046 0.69556C13.392 0.782947 13.4613 0.88669 13.5086 1.00087C13.5559 1.11504 13.5802 1.23742 13.5802 1.361C13.5802 1.48458 13.5559 1.60696 13.5086 1.72113C13.4613 1.83531 13.392 1.93905 13.3046 2.02644L8.32884 7.00033L13.3046 11.9742C13.392 12.0616 13.4613 12.1653 13.5086 12.2795C13.5559 12.3937 13.5802 12.5161 13.5802 12.6396C13.5802 12.7632 13.5559 12.8856 13.5086 12.9998C13.4613 13.114 13.392 13.2177 13.3046 13.3051C13.2172 13.3925 13.1135 13.4618 12.9993 13.5091C12.8851 13.5564 12.7627 13.5807 12.6392 13.5807C12.5156 13.5807 12.3932 13.5564 12.279 13.5091C12.1649 13.4618 12.0611 13.3925 11.9737 13.3051L6.99984 8.32933L2.02595 13.3051C1.93857 13.3925 1.83482 13.4618 1.72065 13.5091C1.60647 13.5564 1.4841 13.5807 1.36051 13.5807C1.23693 13.5807 1.11455 13.5564 1.00038 13.5091C0.886202 13.4618 0.782459 13.3925 0.695072 13.3051C0.607685 13.2177 0.538366 13.114 0.491073 12.9998C0.443779 12.8856 0.419437 12.7632 0.419437 12.6396C0.419437 12.5161 0.443779 12.3937 0.491073 12.2795C0.538366 12.1653 0.607685 12.0616 0.695072 11.9742L5.67084 7.00033L0.695072 2.02644C0.607544 1.93913 0.538099 1.83542 0.490717 1.72123C0.443334 1.60704 0.418945 1.48463 0.418945 1.361C0.418945 1.23737 0.443334 1.11496 0.490717 1.00077C0.538099 0.886585 0.607544 0.782868 0.695072 0.69556Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      )}

      <div className="header__block bg-black z-10 relative h-[71px] lg:h-[110px] flex items-center justify-between">
        <div className="flex w-full c items-center justify-between max-w-[1400px]">
          <div
            className="w-[104px] block lg:w-[196px]"
            onClick={() => handleClickBurger(false)}
          >
            <a href="https://home.tender.fi">
              <img src="/images/logo1.svg" alt="Tender Finance" />
            </a>
          </div>
          <div className="text-[#ADB5B3] hidden lg:flex justify-center font-normal text-base font-nova absolute top-[50%] left-[50%] translate__50">
            <a className="px-[15px] cursor-pointer hover:text-white" href="/">
              Dashboard
            </a>
            <a
              className="px-[15px] cursor-pointer hover:text-white"
              href="/markets/m.USDC"
            >
              Dashboard
            </a>
            <a
              className="px-[15px] cursor-pointer hover:text-white"
              href="/earn"
            >
              Earn
            </a>
            <a
              className="px-[15px] cursor-pointer hover:text-white"
              href="https://docs.tender.fi"
            >
              Docs
            </a>
            <a
              className="pl-[15px] cursor-pointer hover:text-white"
              href="https://discord.com/invite/Tender-Fi"
            >
              Community
            </a>
          </div>
          <div className="flex items-center">
            <BalanceDropdown />
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
                      ? "h-[calc(100vh-131px)] md:h-[calc(100vh-125px)]"
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
              <div className="relative flex justify-center items-center flex-col text-[#ADB5B3] font-nova-400 text-xl translate-y-[-45px]">
                <a
                  className="mb-[20px] font-nova text-white text-[18px] cursor-pointer"
                  href="/"
                >
                  Dashboard
                </a>
                <a
                  className="mb-[20px] font-nova text-white text-[18px] cursor-pointer"
                  href="/earn"
                >
                  Earn
                </a>
                <a
                  className="mb-[20px] font-nova text-white text-[18px] cursor-pointer"
                  href="https://docs.tender.fi"
                >
                  Docs
                </a>
                <a
                  className="font-nova text-[18px] text-white cursor-pointer"
                  href="https://discord.com/invite/Tender-Fi"
                >
                  Community
                </a>
              </div>
              <div className="absolute left-[50%] bottom-[20px] translate-x-[-50%]">
                <ConnectWallet inMenu={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
