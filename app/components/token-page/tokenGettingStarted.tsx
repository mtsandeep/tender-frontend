import ReactModal from "react-modal";
import { useState } from "react";
import type { Market } from "~/types/global";
import DepositBorrowFlow from "../deposit-borrow-flow/deposit-borrow-flow";
import type { ActiveTab } from "../deposit-borrow-flow/deposit-borrow-flow";
import TokenGettingStartedEmpty from "./tokenGettingStartedEmpty";

type Props = {
  market: Market;
  id?: string;
};

const TokenGettingStarted = ({ market, id }: Props) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("supply");
  let [openMarket, setOpenMarket] = useState<Market | null>(null);

  const handlerClickChangeTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setOpenMarket(market);
  };

  return market ? (
    <>
      <ReactModal
        shouldCloseOnOverlayClick={true}
        isOpen={openMarket !== null}
        onRequestClose={() => setOpenMarket(null)}
        portalClassName="modal"
        style={{
          content: {
            inset: "unset",
            margin: "20px auto",
            zoom: window.innerWidth > 768 ? "75%" : "100%",
            position: "relative",
            maxWidth: 650,
          },
        }}
        closeTimeoutMS={200}
      >
        {openMarket?.id ? (
          <DepositBorrowFlow
            key={openMarket.id}
            closeModal={() => setOpenMarket(null)}
            market={openMarket}
            activeTab={activeTab}
            setActiveTab={handlerClickChangeTab}
          />
        ) : (
          <></>
        )}
      </ReactModal>
      <div className="panel-custom border-custom font-nova w-full mb-5">
        <div className="px-[15px] py-[17px] md:py-[20px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] leading-[22px] font-semibold text-base md:text-lg font-nova">
          Getting Started
        </div>
        <div className="flex p-[30px]">
          <button
            onClick={() => handlerClickChangeTab("supply")}
            className="leading-[22.1px] font-bold font-space text-[13px] mr-[10px] lg:mr-[20px] bg-[#14F195] text-black
      rounded-[6px] lg:w-[144px] lg:h-[44px] min-w-[100px] h-[40px] border-[#14F195] border-[1px] hover:bg-[#14f195ce]"
          >
            SUPPLY
          </button>
          {id !== "GLP" && id !== "GMX" && (
            <button
              onClick={() => handlerClickChangeTab("borrow")}
              className="leading-[22.1px] font-bold font-space text-[13px] mr-[12px] lg:mr-[20px] bg-[#00E0FF] text-black
            rounded-[6px] lg:w-[144px] lg:h-[44px] min-w-[100px] h-[40px] border-[#00E0FF] border-[1px] hover:bg-[#00e1ffd0]"
            >
              BORROW
            </button>
          )}

          <button
            aria-label="more"
            className="round-btn-grad flex gap-[3px] items-center justify-center bg-[#181D1B] hover:bg-[#262C2A] min-w-[39px] min-h-[39px] lg:w-11 lg:h-11 rounded-full"
            onClick={() =>
              handlerClickChangeTab(
                id !== "GLP" && id !== "GMX" ? "repay" : "withdraw"
              )
            }
          >
            <svg width="18" height="4" viewBox="0 0 18 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="#9DA7A3" />
              <circle cx="9" cy="2" r="2" fill="#9DA7A3" />
              <circle cx="16" cy="2" r="2" fill="#9DA7A3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  ) : (
    <TokenGettingStartedEmpty />
  );
};

export default TokenGettingStarted;
