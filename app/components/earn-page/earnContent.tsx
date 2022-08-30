export default function EarnContent() {
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
          <a
            className="line-solid cursor-pointer text-[#ffffff]"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives"
            target="_blank"
            rel="noreferrer"
          >
            staking details
          </a>{" "}
          to learn more.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[18px] md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TND
            </div>
            <div
              key="1"
              className="px-[15px] pt-[20px] pb-[16.9px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
            >
              <div
                key="1"
                className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Price
                  </span>
                  <div className="font-normal line-dashed  font-medium max-w-[52%] md:w-fit text-right">
                    <span>$</span>
                    <span>37.10</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className=" font-normal text-[#818987] max-w-[44%]">
                    Wallet
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px] font-medium  max-max-w-[52%] md:w-fit text-right">
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
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Staked
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px] font-medium  max-max-w-[52%] md:w-fit text-right">
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
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[18.5px] md:pt-[23px] pb-[20px] md:pb-[24px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    APR
                  </span>
                  <div className="font-medium line-dashed group relative cursor-pointer   max-max-w-[52%] md:w-fit text-right">
                    <span>20.16</span>
                    <span>%</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987] text-[12px] leading-[17px] uppercase">
                              Escrowed TND APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>15.18</span>
                              <span>%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-[12px]">
                            <span className="text-[#818987] text-[12px] leading-[17px]">
                              ETH APR
                            </span>
                            <div className="text-[12px] leading-[17px]">
                              <span>5.58</span>
                              <span>%</span>
                            </div>
                          </div>
                          <p className="text-[#818987] text-[12px]  text-left leading-[17px] font-nova">
                            APRs are updated weekly on Wednesday and will depend
                            on the fees collected for the week.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Rewards
                  </span>
                  <div className="font-medium line-dashed  font-medium  max-max-w-[52%] md:w-fit text-right">
                    <span>$</span>
                    <span>0.00</span>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Multiplier Points APR
                  </span>
                  <div className="font-normal  line-dashed font-medium max-max-w-[52%] md:w-fit text-right">
                    <span>100.00</span>
                    <span>%</span>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Boost Percentage
                  </span>
                  <div className="font-normal  line-dashed font-medium max-max-w-[52%] md:w-fit text-right">
                    <span>$</span>
                    <span>0.00</span>
                  </div>
                </div>
              </div>
              <div
                key="3"
                className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[19px] md:pt-[24px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="whitespace-nowrap font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Total Staked
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row line-dashed-m justify-end gap-y-[1px] gap-x-[6px] font-medium text-right max-max-w-[52%] w-fit">
                    <div className="flex justify-end line-dashed-sm  max-max-w-[52%] md:gap-x-[6px] gap-x-[5px] md:w-fit text-right">
                      <span>6,812,217</span>
                      <span>TND</span>
                    </div>
                    <div className="line-dashed-sm">
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="whitespace-nowrap font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row line-dashed-m justify-end gap-y-[1px] gap-x-[6px]  font-medium text-right max-max-w-[52%] w-fit">
                    <div className="flex justify-end line-dashed-sm max-max-w-[52%] md:gap-x-[6px] gap-x-[5px] md:w-fit text-right">
                      <span>6,812,217</span>
                      <span>TND</span>
                    </div>
                    <div className="line-dashed-sm">
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px] ">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Buy <span className="uppercase">TND</span>
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Stake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    unStake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Transfer accont
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div key="2" className="panel-custom mt-[31px]">
            <div className="font-space text-[18px] md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Escrowed <span className="uppercase">TND</span>
            </div>
            <div
              key="1"
              className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
            >
              <div
                key="1"
                className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[19px] md:pb-[23px] "
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Price
                  </span>
                  <div className="font-normal line-dashed  font-medium max-w-[52%] md:w-fit text-right">
                    <span>$</span>
                    <span>37.10</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Wallet
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px]  font-medium">
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
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Staked
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px]  font-medium]">
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
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[13px] pb-[20px] md:pt-[24px] md:pb-[23px] "
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    APR
                  </span>
                  <div className="font-normal  line-dashed font-medium">
                    <span>20.16</span>
                    <span>%</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Multiplier Points APR
                  </span>
                  <div className="font-normal cursor-pointer group line-dashed font-medium">
                    <span>100.00</span>
                    <span>%</span>

                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
                          <p className="text-[#818987] text-[12px]  text-left leading-[17px] font-nova">
                            Boost your rewards with Multiplier Points.{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              className="line-solid cursor-pointer capitalize text-[#ffffff]"
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
              <div
                key="3"
                className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="whitespace-nowrap font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Total Staked
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  font-medium text-right max-max-w-[52%] w-fit">
                    <div className="flex justify-end max-max-w-[52%] md:gap-x-[6px] gap-x-[5px] md:w-fit text-right">
                      <span>1,472,862</span>
                      <span>TND</span>
                    </div>
                    <div>
                      (<span>$</span>
                      <span>54,630,107</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="whitespace-nowrap font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Total Supply
                  </span>
                  <div className="flex flex-wrap flex-col md:flex-row justify-end gap-x-[6px]  font-medium text-right max-max-w-[52%] w-fit">
                    <div className="flex justify-end max-max-w-[52%] md:gap-x-[6px] gap-x-[5px] md:w-fit text-right">
                      <span>2,254,142</span>
                      <span>TND</span>
                    </div>
                    <div>
                      (<span>$</span>
                      <span>83,608,654</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Stake
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    unStake
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div key="3" className="panel-custom mt-[32px]">
            <div className="font-space text-[18px] md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Total Rewards
            </div>
            <div
              key="1"
              className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
            >
              <div
                key="1"
                className="flex flex-col gap-y-[12px] md:gap-y-[15px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    ETH (WETH)
                  </span>
                  <div className="flex gap-x-[4px] md:gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] ">TND</span>
                  <div className="flex gap-x-[4px] md:gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    esTND
                  </span>
                  <div className="flex gap-x-[4px] md:gap-x-[6px] font-medium">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Multiplier Points
                  </span>
                  <div className="font-medium">
                    <span>0.0000</span>
                  </div>
                </div>
                <div
                  key="5"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Staked Multiplier Points
                  </span>
                  <div className="font-medium">
                    <span>0.0000</span>
                  </div>
                </div>
                <div
                  key="6"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
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
                className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Compound
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="font-space text-[30px] mt-[61px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Vest
        </p>
        <p className="md:text-[16px] md:leading-[22px] text-[14px] leading-[20px] font-normal mb-[31px] font-nova text-[#ADB5B3]">
          Convert esTND tokens to TND tokens. Please read the{" "}
          <a
            className="cursor-pointer line-solid text-[#ffffff]"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives#vesting"
            target="_blank"
            rel="noreferrer"
          >
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[18px] md:text-[20px] leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px]  border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TND Vault
            </div>
            <div
              key="1"
              className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-[14px] leading-[20px] md:text-[16px] md:leading-[22px]"
            >
              <div
                key="1"
                className="flex flex-col gap-y-[12px] md:gap-y-[15px]"
              >
                <div
                  key="1"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Staked Tokens
                  </span>
                  <div className="font-normal  line-dashed font-medium">
                    <span>0.00</span>
                  </div>
                </div>
                <div
                  key="2"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Reserved for Vesting
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px] ">
                    <span>0.00</span>/<span>0.00</span>
                  </div>
                </div>
                <div
                  key="3"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Vesting Status
                  </span>
                  <div className="flex flex-wrap group cursor-pointer gap-x-[4px] md:gap-x-[6px] group  line-dashed font-medium text-right w-fit">
                    <span>0.0000</span>/<span>0.0000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-[12px] text-left leading-[17px] font-nova">
                            0.0000 tokens have been converted to GMX from the
                            0.0000 esGMX deposited for vesting.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  key="4"
                  className="flex items-start md:items-center gap-x-[10px] justify-between"
                >
                  <span className="font-normal text-[#818987] max-w-[44%] md:w-fit">
                    Claimable
                  </span>
                  <div className="flex flex-wrap gap-x-[4px] md:gap-x-[6px]  line-dashed font-medium text-right w-fit text-right w-fit">
                    <span>0.0000</span>
                    <span className="">TND</span>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
                    Deposit
                  </button>
                </div>
                <div className="btn-custom-border rounded-[6px]">
                  <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195]  text-[12px] leading-[20px]  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase">
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
