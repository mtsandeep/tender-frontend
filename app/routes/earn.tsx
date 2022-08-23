export default function App() {
  return (
    <div
      className="c mt-[30px] mb-[60px] md:mb-[100px]"
      data-testid="app-frame"
    >
      <div className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-[30px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Earn
        </p>
        <p className="md:text-[16px] md:leading-[22px] text-[14px] leading-[20px] font-normal mb-[31px] font-nova text-[#ADB5B3]">
          Stake TND to earn rewards. Please read the{" "}
          <a className="underline cursor-pointer" href="/">
            staking details
          </a>{" "}
          to learn more.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[18px] md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TNDS
            </div>
            <div
              key="1"
              className="px-[15px] pt-[20px] md:px-[30px] md:pt-[24px] pb-[30px]"
            >
              <div
                key="1"
                className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Price
                  </span>
                  <div className="font-normal uppercase font-medium w-[52%] md:w-fit">
                    <span className="line-dashed">$</span>
                    <span className="line-dashed">37.10</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className=" font-normal text-[#818987] w-[44%]">
                    Wallet
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] font-medium uppercase max-w-[52%] md:w-fit">
                    <span>0.00</span>
                    <span>TND</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Staked
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] font-medium uppercase max-w-[52%] md:w-fit">
                    <span>0.00</span>
                    <span>TND</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="2"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[10px] md:gap-y-[15px] pt-[20px] md:pt-[23px] pb-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    APR
                  </span>
                  <div className="font-medium group relative cursor-pointer uppercase  max-w-[52%] md:w-fit">
                    <span className=" line-dashed">20.16</span>
                    <span className=" line-dashed">%</span>
                    <div className="hidden flex-row md:flex-col absolute right-[0px]  bottom-[18px] bottom__custom items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <div className="flex justify-between items-center mb-[3px]">
                            <span className="text-[#818987] text-[12px] leading-[17px]">
                              Escrowed TND APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>15.18</span>
                              <span>%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[#818987] text-[12px] leading-[17px]">
                              ETH APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>5.58</span>
                              <span>%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-[12px]  text-left leading-[140%] font-nova">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                          {/* <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <img
                                      className="w-[18px] h-[18px] mr-[8px]"
                                      src="/images/wallet-icons/balance-icon.svg"
                                      alt="..."
                                    />
                                    <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                      TNDS
                                    </span>
                                  </div>
                                  <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                    0.10 % APR
                                  </span>
                                </div> */}
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[10] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Rewards
                  </span>
                  <div className="font-medium uppercase font-medium  max-w-[52%] md:w-fit">
                    <span className=" line-dashed">$</span>
                    <span className=" line-dashed">0.00</span>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Multiplier Points APR
                  </span>
                  <div className="font-normal uppercase font-medium max-w-[52%] md:w-fit">
                    <span className=" line-dashed">100.00</span>
                    <span className=" line-dashed">%</span>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Boost Percentage
                  </span>
                  <div className="font-normal uppercase font-medium max-w-[52%] md:w-fit">
                    <span className=" line-dashed">$</span>
                    <span className=" line-dashed">0.00</span>
                  </div>
                </div>
              </div>
              <div
                key="3"
                className="flex flex-col gap-y-[15px] pt-[22px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Total Staked
                  </span>
                  <div className="flex flex-wrap justify-end gap-x-[6px] uppercase text-right max-w-[52%] w-fit">
                    <div className="flex gap-x-[6px] max-w-[52%] md:w-fit">
                      <span className=" line-dashed">6,812,217</span>
                      <span className=" line-dashed">TND</span>
                    </div>
                    <div className="line-dashed">
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap justify-end gap-x-[6px] uppercase font-medium text-right max-w-[52%] md:w-fit">
                    <div className="flex gap-x-[6px]">
                      <span className="line-dashed">6,812,217</span>
                      <span className="line-dashed">TND</span>
                    </div>
                    <div className="line-dashed">
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[32px] gap-[10px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Buy TNDS
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Stake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    unStake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Transfer accont
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div key="2" className="panel-custom mt-[31px]">
            <div className="font-space text-[20px] leading-[26px] px-[30px] pt-[24px] pb-[21px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              Escrowed TNDS
            </div>
            <div key="1" className="px-[30px] pt-[23px] pb-[30px]">
              <div
                key="1"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[15px] pb-[23px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Price
                  </span>
                  <div className=" uppercase font-medium ">
                    <span>$</span>
                    <span>37.10</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Wallet
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] uppercase font-medium">
                    <span>0.00</span>
                    <span className="">TND</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Staked
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] uppercase font-medium]">
                    <span>0.00</span>
                    <span>TND</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="2"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[15px] pt-[24px] pb-[23px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    APR
                  </span>
                  <div className="font-normal uppercase line-dashed font-medium">
                    <span>20.16</span>
                    <span>%</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Multiplier Points APR
                  </span>
                  <div className="font-normal uppercase line-dashed font-medium">
                    <span>100.00</span>
                    <span>%</span>
                  </div>
                </div>
              </div>
              <div
                key="3"
                className="flex flex-col gap-y-[15px] pt-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Total Staked
                  </span>
                  <div className="flex flex-wrap justify-end gap-x-[6px] uppercase font-medium text-right w-fit">
                    <div className="flex gap-x-[6px]">
                      <span>6,812,217</span>
                      <span>TND</span>
                    </div>
                    <div>
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap justify-end gap-x-[6px] uppercase font-medium text-right w-fit">
                    <div className="flex gap-x-[6px]">
                      <span>6,812,217</span>
                      <span>TND</span>
                    </div>
                    <div>
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[30px] gap-[10px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Stake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    unStake
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div key="3" className="panel-custom mt-[32px]">
            <div className="font-space text-[20px] leading-[26px] px-[30px] pt-[24px] pb-[21px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              Total Rewards
            </div>
            <div key="1" className="px-[30px] pt-[23px] pb-[30px]">
              <div
                key="1"
                className="flex flex-col gap-y-[15px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    ETH (WETH)
                  </span>
                  <div className="flex gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] uppercase md:text-base  md:leading-[22px]">
                    TND
                  </span>
                  <div className="flex gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Escrowed <span className="uppercase">TND</span>
                  </span>
                  <div className="flex gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Multiplier Points
                  </span>
                  <div className="font-medium">
                    <span>0.0000</span>
                  </div>
                </div>
                <div
                  key="5"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Staked Multiplier Points
                  </span>
                  <div className="font-medium">
                    <span>0.0000</span>
                  </div>
                </div>
                <div
                  key="6"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Total
                  </span>
                  <div className="font-medium">
                    <div>
                      <span>$</span>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="2"
                className="font-space flex flex-wrap items-center pt-[30px] gap-[10px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Compound
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="font-space text-[42px] font-bold leading-[54px] mt-[63px] mb-[15px]">
          Vest
        </p>
        <p className="leading-[22px] font-normal mb-[16px] md:mb-[30px] text-base md:text-[16px] font-nova">
          Convert esTNDS tokens to TNDS tokens. Please read the{" "}
          <a className="underline" href="/">
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[20px] leading-[26px] px-[30px] pt-[24px] pb-[21px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TND Vault
            </div>
            <div key="1" className="px-[30px] pt-[24px] pb-[30px]">
              <div
                key="1"
                className="flex flex-col gap-y-[15px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Staked Tokens
                  </span>
                  <div className="font-normal uppercase line-dashed font-medium">
                    <span>0.00</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Reserved for Vesting
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] uppercase">
                    <span>0.00</span>/<span>0.00</span>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Vesting Status
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] group uppercase line-dashed font-medium text-right w-fit">
                    <span>0.0000</span>/<span>0.0000</span>
                    <div className="hidden flex-row md:flex-col absolute right-[0px]  bottom-[18px] bottom__custom items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <div className="flex justify-between items-center mb-[3px]">
                            <span className="text-[#818987] text-[12px] leading-[17px]">
                              Escrowed TND APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>15.18</span>
                              <span>%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[15px]">
                            <span className="text-[#818987] text-[12px] leading-[17px]">
                              ETH APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>5.58</span>
                              <span>%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-[12px]  text-left leading-[140%] font-nova">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                          {/* <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <img
                                      className="w-[18px] h-[18px] mr-[8px]"
                                      src="/images/wallet-icons/balance-icon.svg"
                                      alt="..."
                                    />
                                    <span className="font-nova font-semibold text-[14px] leading-[17px] text-[#FFFFFF]">
                                      TNDS
                                    </span>
                                  </div>
                                  <span className="font-nova font-normal text-[14px] leading-[17px] text-[#14F195]">
                                    0.10 % APR
                                  </span>
                                </div> */}
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[10] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between text-[14px] leading-[20px] md:text-[16px] md:leading-[22px] "
                >
                  <span className="font-normal text-[#818987] w-[44%] md:w-fit">
                    Claimable
                  </span>
                  <div className="flex flex-wrap gap-x-[6px] uppercase line-dashed font-medium text-right w-fit text-right w-fit">
                    <span>0.0000</span>
                    <span className="uppercase">TND</span>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[30px] gap-[10px] md:gap-x-[18px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Deposit
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
