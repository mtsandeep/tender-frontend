import { useState, useEffect } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
import useAuth from "~/hooks/use-auth";
import ClaimRewardsModal from "../claimRewardsModal/claimRewardsModal";
import type { IReward } from "../claimRewardsModal/claimRewardsModal";

export default function EarnContent() {
  const { useIsActive } = hooks;
  const [dataClaimModal, setDataClaimModal] = useState<{
    open: boolean;
    rewards: IReward[];
  }>({ open: false, rewards: [] });

  const [onClient, setOnClient] = useState<boolean>(false);
  const { connect, isDisconnected } = useAuth();
  const isActive = useIsActive();

  useEffect(() => {
    setOnClient(true);
    if (!isDisconnected()) {
      void metaMask.connectEagerly();
    }
  }, [isDisconnected]);

  return (
    <div className="c mt-[30px] mb-[60px] md:mb-[100px] font-nova">
      <ClaimRewardsModal
        data={{
          open: dataClaimModal.open,
          rewards: [
            {
              title: "Protocol Rewards (esTND)",
              exchange: "1 esTND = $0.0035",
              unclaimed: "0 esTND",
              unclaimedUsd: "$0",
              onClickClaim: () => console.log(""),
            },
            {
              title: "Protocol Rewards (esTND)",
              exchange: "1 esTND = $0.0035",
              unclaimed: "0 esTND",
              unclaimedUsd: "$0",
              onClickClaim: () => console.log(""),
            },
          ],
        }}
        handlerClose={() =>
          setDataClaimModal({ ...dataClaimModal, open: false })
        }
      />
      <div className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-[30px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Earn
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Stake TND to earn rewards. <br />
          Please read the{" "}
          <a
            className="line-solid cursor-pointer text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives"
            target="_blank"
            rel="noreferrer"
          >
            staking details
          </a>{" "}
          to learn more.
          <br />
          You are earning TND rewards with 20.13 tokens.
          <br />
          Tokens: 0.21 TND, 56.43 esTND, 15.93 MP.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div className="panel-custom">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TENDIES
            </div>
            <div className="px-[15px] pt-[20px] pb-[16.9px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Price
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-sm md:text-base leading-[17px]">
                    $20.16
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">
                              Price on Arbitrum:
                            </span>
                            <span>$43.63</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Wallet
                  </span>
                  <span className="flex flex-wrap w-fit text-sm md:text-base leading-[17px]">
                    0.00 TND ($0.00)
                  </span>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked
                  </span>
                  <span className="flex flex-wrap w-fit text-sm md:text-base leading-[17px]">
                    0.00 TND ($0.00)
                  </span>
                </div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[18.5px] md:pt-[23px] pb-[20px] md:pb-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">APR</span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">20.16%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">ETH APR</span>
                            <span>5.58%</span>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987]">esTND APR</span>
                            <span>15.18%</span>
                          </div>
                          <p className="text-[#818987] text-left">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Rewards
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">$0.00</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">ETH</span>
                            <span className="">0.00 ($0.00)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">esTND</span>
                            <span className="">0.00 ($0.00)</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points APR
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span className="text-sm md:text-base">100.00%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Boost Percentage
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">0.00%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-[#818987] text-start">
                          You are earning 0.00% more TND rewards using 0.00
                          Staked Multiplier Points. <br />
                          <br />
                          Use the "Compound" button to stake your Multiplier
                          Points.
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[19px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Staked
                  </span>
                  <div className="flex items-center line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">
                      6,812,217 TND ($252,353,723)
                    </span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">Arbitrum:</span>
                            <span>6,479,541 TND</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Supply
                  </span>
                  <span className="flex flex-wrap w-fit text-sm md:text-base leading-[17px]">
                    6,812,217 TND ($252,353,723)
                  </span>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        Buy TND
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        unStake
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Transfer account
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="panel-custom mt-[31px]">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              ESCROWED TENDIES
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[19px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Price
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-sm md:text-base leading-[17px]">
                    $20.16
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Wallet
                  </span>
                  <div className="flex flex-wrap text-sm md:text-base leading-[17px]">
                    0.00 esTND ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked
                  </span>
                  <div className="flex flex-wrap  text-sm md:text-base leading-[17px]">
                    0.00 esTND ($0.00)
                  </div>
                </div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[13px] pb-[20px] md:pt-[24px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">APR</span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">20.16%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              ETH APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>5.58%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987] text-xs leading-[17px]">
                              esTND APR
                            </span>
                            <div className="text-xs leading-[17px]">
                              <span>15.18%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-xs  text-left leading-[17px]">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points APR
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span className="text-sm md:text-base">100.00%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-sm md:text-base leading-[17px]">
                    1,472,862 esTND ($54,630,107)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total Borrow
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-sm md:text-base leading-[17px]">
                    2,254,142 esTND ($83,608,654)
                  </div>
                </div>
              </div>

              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        unStake
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="panel-custom mt-[32px]">
            <div className="flex items-center font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Supply
              <svg
                className="mr-[4px] ml-[4px]"
                width="13"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
              >
                <path
                  d="M5.85453 6.20841L8.28208 9.14499L8.36277 9.06431C8.62349 8.78491 8.87184 8.50555 9.10157 8.22615C9.33124 7.94679 9.93969 7.30735 10.1508 7.01552L11.1006 8.75386C10.9393 8.98358 10.7219 9.26298 10.4612 9.57339C10.2005 9.8838 9.89005 10.2439 9.51134 10.6412L12.0195 13.7393H9.48029L8.13304 12.0816C6.90374 13.3606 5.60623 14 4.27761 14C3.07937 14 2.06742 13.6213 1.22925 12.8514C0.409767 12.0816 0 11.1317 0 10.0018C0 8.65454 0.63949 7.5246 1.94943 6.64302L2.83727 6.03458C2.8559 6.03458 2.86832 6.01595 2.90553 5.98495C2.93658 5.96632 2.97384 5.93526 3.01731 5.88558C2.12947 4.93573 1.67007 3.99821 1.67007 3.07937C1.67007 2.16057 1.96806 1.42172 2.55787 0.850536C3.16631 0.279451 3.94853 0 4.91706 0C5.85453 0 6.60576 0.279356 7.2142 0.838116C7.82264 1.39688 8.13304 2.09847 8.13304 2.93658C8.13304 3.52639 7.97163 4.0541 7.64259 4.52592C7.29493 4.97916 6.70512 5.55655 5.85453 6.20841ZM4.23414 7.35698L4.12241 7.43771C3.28425 8.00884 2.71307 8.48692 2.41508 8.82838C2.1171 9.16983 1.97427 9.54855 1.97427 9.9459C1.97427 10.5047 2.20399 11.0262 2.64481 11.4856C3.10421 11.9264 3.6257 12.1561 4.18446 12.1561C4.97295 12.1561 5.87316 11.647 6.90379 10.6164L4.23414 7.35698ZM4.67496 4.7867L4.83633 4.65633C5.07624 4.47518 5.31223 4.28888 5.54413 4.09757C5.72417 3.93616 5.87316 3.79954 5.95389 3.68781C6.13394 3.47671 6.21462 3.20978 6.21462 2.8869C6.21462 2.52682 6.10289 2.24746 5.85453 2.01774C5.60623 1.78801 5.29577 1.6887 4.88605 1.6887C4.52592 1.6887 4.21551 1.80043 3.94858 2.03016C3.70023 2.24125 3.56986 2.52061 3.56986 2.86827C3.56986 3.25941 3.73123 3.65676 4.04789 4.04789L4.55697 4.65633C4.5756 4.66875 4.60665 4.71843 4.67496 4.7867Z"
                  fill="white"
                />
              </svg>
              Borrow
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[23px] ">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Net APY
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]text-right w-fit text-sm md:text-base leading-[17px]">
                    20.16%
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Rewards
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]text-right w-fit text-sm md:text-base leading-[17px]">
                    $0.00
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Your Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px] text-right w-fit text-sm md:text-base leading-[17px]">
                    $54,630
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Your Borrow
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  text-right w-fit text-sm md:text-base leading-[17px]">
                    $83,608
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]">
                <div className="btn-custom-border rounded-[6px]">
                  <button
                    onClick={() => window.open("/", "_blank")}
                    className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]"
                  >
                    Dashboard
                  </button>
                </div>
                <div
                  onClick={() => window.open("/markets/", "_blank")}
                  className="btn-custom-border rounded-[6px]"
                >
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                    Markets
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="panel-custom mt-[32px]">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Total Rewards
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] ">ETH</span>
                  <div className="flex text-sm md:text-base leading-[17px]">
                    0.00 ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">TND</span>
                  <div className="flex text-sm md:text-base leading-[17px]">
                    0.00 ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    esTND
                  </span>
                  <div className="flex text-sm md:text-base leading-[17px]">
                    0.00 ($0.00)
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Multiplier Points
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span className="text-sm md:text-base">0.000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked Multiplier Points
                  </span>
                  <div className=" cursor-pointer group line-dashed text-xs leading-[17px]">
                    <span className="text-sm md:text-base">0.000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-left">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-white"
                              href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
                            >
                              More info.
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Total
                  </span>
                  <div className="text-sm md:text-base leading-[17px]">
                    $0.00
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Compound
                      </button>
                    </div>
                    <div
                      className="btn-custom-border rounded-[6px]"
                      onClick={() =>
                        setDataClaimModal({ ...dataClaimModal, open: true })
                      }
                    >
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Claim
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-space text-[30px] mt-[61px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Vest
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Convert esTND tokens to TND tokens. Please read the{" "}
          <a
            className="cursor-pointer line-solid text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives#vesting"
            target="_blank"
            rel="noreferrer"
          >
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full" id="vest">
          <div className="panel-custom">
            <div className="font-space text-lg md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TENDIES Vault
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Staked Tokens
                  </span>
                  <div className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]">
                    <span className="text-sm md:text-base">0.00</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[8px]">
                            <span className="text-xs leading-[17px]">
                              0.00 TND
                            </span>
                          </div>
                          <div className="flex justify-between items-center mb-[8px]">
                            <span className="text-xs leading-[17px]">
                              0.00 esTND
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs leading-[17px]">
                              0.00 Multiplier Points
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Reserved for Vesting
                  </span>
                  <div className="flex flex-wrap text-right w-fit text-sm md:text-base leading-[17px]">
                    0.00
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Vesting Status
                  </span>
                  <div className="flex flex-wrap group cursor-pointer line-dashed text-right w-fit text-sm md:text-base leading-[17px]">
                    <span>0.0000 / 0.0000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0.0000 tokens have been converted to TND from the
                            0.0000 esTND deposited for vesting.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-[10px] justify-between">
                  <span className="text-[#818987] w-fit text-[16px]">
                    Claimable
                  </span>
                  <div className="flex flex-wrap group cursor-pointer group  line-dashed text-right w-fit text-xs leading-[17px]">
                    <span className="text-sm md:text-base">
                      0.0000 / 0.0000
                    </span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0.0000 TND tokens can be claimed, use the options
                            under the Total Rewards section to claim them.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Deposit
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Withdraw
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
