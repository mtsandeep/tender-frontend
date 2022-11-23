/* eslint-disable @typescript-eslint/consistent-type-imports */

export default function TwoPanelsEmpty({ loading }: { loading: boolean }) {
  return (
    <div
      className={`${
        loading ? "switch__to__network" : ""
      } flex flex-col xl:grid grid-cols-2 gap-[60px] xl:gap-[20px] mb-14`}
    >
      <div>
        <div
          tabIndex={0}
          className="panel-custom border-custom mb-[20px] md:mb-[40px]"
        >
          <div className="px-[15px] border-b border-[#282C2B] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Supply
          </div>
          <div className="p-[20px] md:p-[30px] md:p-[30px] md:pb-[26px] md:pt-[14px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="panel-custom border-custom mb-[20px] md:mb-[40px]"
        >
          <div className="px-[15px] border-b border-[#282C2B] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Supply Markets
          </div>
          <div className="p-[20px] md:p-[30px] md:p-[30px] md:pb-[26px] md:pt-[14px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
      </div>
      <div>
        <div
          tabIndex={0}
          className="panel-custom border-custom mb-[20px] md:mb-[40px]"
        >
          <div className="px-[15px] border-b border-[#282C2B] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Borrow
          </div>
          <div className="p-[20px] md:p-[30px] md:p-[30px] md:pb-[26px] md:pt-[14px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
        <div
          tabIndex={0}
          className="panel-custom border-custom mb-[20px] md:mb-[40px]"
        >
          <div className="px-[15px] border-b border-[#282C2B] textSize22 py-[17px] md:py-[20px] font-space font-bold text-lg md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Borrow Markets
          </div>
          <div className="p-[20px] md:p-[30px] md:p-[30px] md:pb-[26px] md:pt-[14px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
