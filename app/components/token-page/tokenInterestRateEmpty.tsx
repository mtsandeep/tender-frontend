function TokenInterestRateEmpty() {
  return (
    <div className="font-nova w-full mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[20px] text-base md:text-lg font-nova">
        Interest Rate Model
      </div>
      <div className="flex-col panel-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] p-[15px] pl-[25px] pr-[25px] md:p-[30px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="pb-[20px] md:pb-[40px] pr-[20px] pl-[20px] md:pl-[30px] md:pr-[30px]">
          <div className="animate w-full h-[370px] md:h-[350px]"></div>
        </div>
      </div>
    </div>
  );
}

export default TokenInterestRateEmpty;
