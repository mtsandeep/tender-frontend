function TokenInterestRate() {
  return (
    <div className="font-[ProximaNova] w-full max-w-[600px] mb-[60px]">
      <div className="leading-[22px] font-semibold mb-[18px] text-base md:text-lg md:leading-[25px]">
        Interest Rate Model
      </div>
      <div className="flex-col pane-custom">
        <p className="font-normal text-sm leading-[19px] text-[#818987] pl-[15px] pt-[17px] md:text-base  md:leading-[22px]">
          Utilization vs. APY
        </p>
        <div className="min-h-[253px]">chart</div>
      </div>
    </div>
  );
}

export default TokenInterestRate;
