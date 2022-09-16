function TokenInterestRateEmpty() {
  return (
    <div className="font-nova w-full mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[20px] text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] p-[15px] md:p-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="pb-[20px] md:pb-[40px] pl-[10px] pr-[10px] md:pl-[20px] md:pr-[20px]">
          <div className="animate w-full h-[180px] md:h-[315px]"></div>
        </div>
      </div>
    </div>
  );
}

export default TokenInterestRateEmpty;
