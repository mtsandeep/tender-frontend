function TokenInterestRateEmpty() {
  return (
    <div className="panel-custom border-custom font-nova w-full mb-[60px]">
      <div className="px-[15px] py-[17px] md:py-[20px] border-b border-[#282C2B] md:px-[30px] md:pt-[18px] md:pb-[19px] leading-[22px] font-semibold text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <p className="font-normal text-sm leading-[19px] text-[#818987] pb-[15px] pt-[15px] p-[30px] md:pt-[30px] md:pb-[30px] md:text-base  md:leading-[22px]">
        Utilization vs. APY
      </p>
      <div className="pb-[20px] md:pb-[40px] pl-[30px] pr-[30px]">
        <div className="animate w-full h-[260px] md:h-[350px]"></div>
      </div>
    </div>
  );
}

export default TokenInterestRateEmpty;
