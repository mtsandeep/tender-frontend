export default function EmptyEarnContent() {
  return (
    <div className="switch__to__network c mt-[30px] mb-[60px] md:mb-[100px]">
      <div className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-3xl leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Earn
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 font-normal mb-[31px] font-nova text-[#ADB5B3]">
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
          Please connect your wallet.
        </p>
        <div className="font-nova w-full">
          <div className="panel-custom">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TENDIES
            </div>
            <div className="px-[15px] pt-[20px] pb-[16.9px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px]">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[18.5px] md:pt-[23px] pb-[20px] md:pb-[24px]">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[19px] md:pt-[24px]">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                <div className="animate w-full h-[33px] md:h-[38px]"></div>
              </div>
            </div>
          </div>
          <div className="panel-custom mt-[31px]">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Escrowed <span className="uppercase">TENDIES</span>
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[19px] md:pb-[23px] ">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[13px] pb-[20px] md:pt-[24px] md:pb-[23px] ">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[20px] md:pt-[24px]">
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
                <div className="animate w-full h-[20px] md:h-[24px]"></div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[32px] gap-[12px] gap-y-[13px] md:gap-x-[17px]">
                <div className="animate w-full h-[33px] md:h-[38px]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
