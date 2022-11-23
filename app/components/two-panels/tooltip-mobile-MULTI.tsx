import ReactModal from "react-modal";

export default function TooltipMobileMulti({ ...props }) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={props.tooltipData.open}
      onRequestClose={() => props.handleClose()}
      portalClassName="modal"
      style={{
        content: {
          margin: "20px auto",
          position: "relative",
          maxWidth: 300,
        },
      }}
    >
      <div className="flex flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[16px] pr-[30px] pb-[16px] pl-[20px] lg:hidden">
        {props.tooltipData?.coins.map((coin: any, index: number) => {
          return (
            <div
              key={index}
              className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]"
            >
              <div className="flex gap-[8px]">
                <img
                  aria-hidden={true}
                  className="max-w-[18px]"
                  src={coin.iconSrc}
                  alt="..."
                />
                <span className="font-nova text-white text-sm font-normal">
                  {coin.coinTitle}
                </span>
              </div>
              <span
                className={`font-nova text-white text-sm font-normal ${coin.color}`}
              >
                {coin.data}
              </span>
            </div>
          );
        })}
      </div>
    </ReactModal>
  );
}
