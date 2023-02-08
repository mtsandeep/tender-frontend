import { Row, displayTND, allData, Modals } from "./earnContent";
export type VaultProps = {data: allData,  setCurrentModal: (modal: Modals)=>void}

export function Vault({ data, setCurrentModal }: VaultProps) {

  return <div className="font-[ProximaNova] w-full" id="vest">
    <div tabIndex={0} className="panel-custom">
      <div className="text-[#818987]     font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
        Coming Soon: TENDIES Vault
    </div>
      <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
        <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
          <Row left="Staked Tokens" right={!data ? "?" :
            <div
              className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]"
              tabIndex={0}
            >
              <span className="text-sm md:text-base">{displayTND(data.stakedAmounts)}</span>
              <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                  <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-[#818987]">
                    <div className="flex justify-between items-center mb-[8px]">
                      <span className="text-xs leading-[17px]">
                        {displayTND(data.stakedTND)} TND
                  </span>
                    </div>
                    <div className="flex justify-between items-center mb-[8px]">
                      <span className="text-xs leading-[17px]">
                        {displayTND(data.stakedESTND)} esTND
                  </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs leading-[17px]">
                        {displayTND(data.stakedBonusPoints)} Multiplier Points
                  </span>
                    </div>
                  </div>
                </div>
                <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>} />

          <div
            className="flex items-center gap-x-[10px] justify-between"
            tabIndex={0}
          >
            <span className="text-[#818987] w-fit text-base">
              Reserved for Vesting
          </span>
            <div className="flex flex-wrap text-right w-fit text-sm md:text-base leading-[17px]">
              {displayTND(data.reservedForVesting)}
            </div>
          </div>
          <div
            className="flex items-center gap-x-[10px] justify-between"
            tabIndex={0}
          >
            <span className="text-[#818987] w-fit text-base">
              Vesting Status
          </span>
            <div
              className="flex flex-wrap group cursor-pointer line-dashed text-right w-fit text-sm md:text-base leading-[17px]"
              tabIndex={0}
            >
              {<span>{displayTND(data.claimedTND)} / {displayTND(data.vestedTND)}</span>}
              <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                  <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                    <p className="text-[#818987] text-xs text-left leading-[17px]">
                      {displayTND(data.claimedTND)} tokens have been converted to TND from the
                      &nbsp;{displayTND(data.vestedTND)} esTND deposited for vesting.
                  </p>
                  </div>
                </div>
                <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>
          </div>
          <div
            className="flex items-center gap-x-[10px] justify-between"
            tabIndex={0}
          >
            <span className="text-[#818987] w-fit text-base">
              Claimable
          </span>
            <div
              className="flex flex-wrap group cursor-pointer group  line-dashed text-right w-fit text-xs leading-[17px]"
              tabIndex={0}
            >
              <span className="text-sm md:text-base">
                {displayTND(data.claimableTND)}
              </span>
              <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                  <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                    <p className="text-[#818987] text-xs text-left leading-[17px]">
                      {displayTND(data.claimableTND)} TND tokens can be claimed, use the options
                    under the Total Rewards section to claim them.
                  </p>
                  </div>
                </div>
                <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="font-space opacity-60 flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
          <div className="btn-custom-border rounded-[6px]">
            <button
              disabled
              onClick={() => setCurrentModal("depositESTND")}
              className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
              Deposit
          </button>
          </div>
          <div className="btn-custom-border rounded-[6px]">
            <button
              disabled
              onClick={() => setCurrentModal("withdrawESTND")}
              className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
              Withdraw
          </button>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
