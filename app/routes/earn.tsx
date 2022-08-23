export default function App() {
  return (
    <div
      className="c mt-[30px] mb-[60px] md:mb-[100px]"
      data-testid="app-frame"
    >
      <div className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-[42px] font-bold leading-[54px] mb-[15px]">
          Earn
        </p>
        <p className="leading-[22px] font-normal mb-[16px] md:mb-[31px] text-base md:text-[16px] font-nova">
          Stake <span className="uppercase">TendieS</span> to earn rewards.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[20px] leading-[26px] px-[30px] pt-[23px] pb-[20px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TendieS
            </div>
            <div key="1" className="px-[30px] pt-[24px] pb-[30px]">
              <div
                key="1"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[15px] pb-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Price
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>$</span>
                    <span>37.10</span>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Wallet
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase   md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>
                    <span className="">Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div key="3" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Staked
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase  md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>
                    <span>TENDIE</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="2"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[15px] pt-[23px] pb-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    APR
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>20.16</span>
                    <span>%</span>
                  </span>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Rewards
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>$</span>
                    <span>0.00</span>
                  </span>
                </div>
                <div key="3" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Multiplier Points APR
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>100.00</span>
                    <span>%</span>
                  </span>
                </div>
                <div key="4" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Boost Percentage
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>$</span>
                    <span>0.00</span>
                  </span>
                </div>
              </div>
              <div
                key="3"
                className="flex flex-col gap-y-[15px] pt-[22px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Total Staked
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase  line-dashed  md:font-medium md:text-base  md:leading-[22px]">
                    <span>6,812,217</span>
                    <span>Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Total Supply
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase  line-dashed  md:font-medium md:text-base  md:leading-[22px]">
                    <span>6,812,217</span>
                    <span>Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>252,353,723</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex items-center pt-[32px] gap-x-[17px]"
              >
                <div className="btn-custom-border rounded-[6px]">
                  <button className=" px-[16px] py-[8px] text-[#14F195] uppercase text-[13px] font-medium leading-[22px]  rounded-[6px] bg-[#0e3625] relative z-[2] ">
                    Buy tendieS
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
              Escrowed TendieS
            </div>
            <div key="1" className="px-[30px] pt-[23px] pb-[30px]">
              <div
                key="1"
                className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[15px] pb-[23px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Price
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>$</span>
                    <span>37.10</span>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Wallet
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>
                    <span className="">Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div key="3" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Staked
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>
                    <span>TENDIE</span>
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
                <div key="1" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    APR
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>20.16</span>
                    <span>%</span>
                  </span>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Multiplier Points APR
                  </span>
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>100.00</span>
                    <span>%</span>
                  </span>
                </div>
              </div>
              <div
                key="3"
                className="flex flex-col gap-y-[15px] pt-[24px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Total Staked
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>1,472,862</span>
                    <span>Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>54,630,107</span>)
                    </div>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Total Supply
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>2,254,142</span>
                    <span>Tendie</span>
                    <div>
                      (<span>$</span>
                      <span>83,608,654</span>)
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex items-center pt-[30px] gap-x-[17px]"
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
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    ETH (WETH)
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] uppercase md:text-base  md:leading-[22px]">
                    Tendie
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div key="3" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Escrowed <span className="uppercase">Tendie</span>
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                    <div>
                      (<span>$</span>
                      <span>0.00</span>)
                    </div>
                  </div>
                </div>
                <div key="4" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Multiplier Points
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px] md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                  </div>
                </div>
                <div key="5" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Staked Multiplier Points
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px]   md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                  </div>
                </div>
                <div key="6" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Total
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px]  md:font-medium md:text-base  md:leading-[22px]">
                    <div>
                      <span>$</span>
                      <span>0.00</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                key="2"
                className="font-space flex items-center pt-[30px] gap-x-[17px]"
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
          Convert esTENDIES tokens to TENDIES tokens. Please read the{" "}
          <a className="underline" href="/">
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full">
          <div key="1" className="panel-custom">
            <div className="font-space text-[20px] leading-[26px] px-[30px] pt-[24px] pb-[21px] uppercase border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              Tendie Vault
            </div>
            <div key="1" className="px-[30px] pt-[24px] pb-[30px]">
              <div
                key="1"
                className="flex flex-col gap-y-[15px] font-bold font-normal text-[14px] md:text-sm leading-5"
              >
                <div key="1" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Staked Tokens
                  </span>
                  <div className="font-normal text-[16px] md:text-sm leading-[22px] uppercase line-dashed md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>
                  </div>
                </div>
                <div key="2" className="flex items-center justify-between">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Reserved for Vesting
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.00</span>/<span>0.00</span>
                  </div>
                </div>
                <div key="3" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Vesting Status
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase  line-dashed  md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>/<span>0.0000</span>
                  </div>
                </div>
                <div key="4" className="flex items-center justify-between ">
                  <span className="font-normal text-[16px] md:text-sm leading-[22px] text-[#818987] md:text-base  md:leading-[22px]">
                    Claimable
                  </span>
                  <div className="flex gap-x-[6px] font-normal text-[16px] md:text-sm leading-[22px] uppercase  line-dashed  md:font-medium md:text-base  md:leading-[22px]">
                    <span>0.0000</span>
                    <span className="uppercase">Tendie</span>
                  </div>
                </div>
              </div>
              <div
                key="4"
                className="font-space flex items-center pt-[30px] gap-x-[18px]"
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
