/* eslint-disable @typescript-eslint/consistent-type-imports */

export default function TwoPanelsEmpty() {
  // markets with less than this amount are shown as not actively supplying or borrowing

  return (
    <div className="flex flex-col md:grid grid-cols-2 gap-[60px] md:gap-[20px] mb-14">
      <div>
        <div className="panel-custom border-custom mb-[20px] md:mb-[40px]">
          <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-[18px] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Supply
          </div>
          <div className="p-[20px] md:p-[30px] pt-[4px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
        <div>
          <div className="mb-[12px] font-nova text-white text-[16px] font-semibold md:mb-[15px] md:text-[18px]">
            All Markets
          </div>
          <div className="panel-custom border-custom">
            <div className="p-[20px] md:p-[30px]">
              <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px]"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="panel-custom border-custom mb-[20px] md:mb-[40px]">
          <div className="px-[15px] textSize22 py-[17px] md:py-[20px] font-space font-bold text-[18px] md:px-[30px] md:pt-[18px] md:pb-[19px] md:text-xl">
            Borrow
          </div>
          <div className="p-[20px] md:p-[30px] pt-[4px]">
            <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
            <div className="animate w-full h-[60px] md:h-[72px]"></div>
          </div>
        </div>
        <div>
          <div className="mb-[12px] font-nova text-white text-[16px] font-semibold md:mb-[15px] md:text-[18px]">
            All Markets
          </div>
          <div className="panel-custom border-custom">
            <div className="p-[20px] md:p-[30px]">
              <div className="animate w-full h-[32px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px] mb-[15px] md:mb-[20px]"></div>
              <div className="animate w-full h-[60px] md:h-[72px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
