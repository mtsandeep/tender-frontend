import ReactModal from "react-modal";

export default function TooltipMobile(props: {
  mobileTooltipData: {
    open: boolean;
    textTop?: string;
    icon?: string;
    token?: string;
    textBottom?: string;
  };
  handleClose: () => void;
}) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={props.mobileTooltipData.open}
      onRequestClose={() => props.handleClose()}
      portalClassName="modal"
      style={{
        content: {
          margin: "20px auto",
          position: "relative",
          maxWidth: 300,
          inset: "unset",
        },
      }}
    >
      <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[24px] pr-[30px] pb-[20px] pl-[20px] lg:pl-[15px] lg:p-[16px]">
        <button
          className="absolute top-[12px] right-[12px] cursor-pointer lg:hidden block"
          onClick={() => props.handleClose()}
        >
          <img
            className="w-[12px] h-[12px]"
            src="/images/ico/close.svg"
            alt="..."
          />
        </button>
        <p className="text-[#818987] text-sm lg:text-xs text-left leading-5 lg:leading-[17px] font-nova">
          {props.mobileTooltipData.textTop}
        </p>
        {props.mobileTooltipData.icon && (
          <div className="flex items-center justify-between lg:mt-[13px] mt-[19px]">
            <div className="flex items-center">
              <img
                className="w-[18px] h-[18px] mr-[8px]"
                src={props.mobileTooltipData.icon}
                alt="..."
              />
              <span className="font-nova font-semibold text-sm leading-[14px] lg:leading-[17px] text-white">
                {props.mobileTooltipData.token}
              </span>
            </div>
            <span className="font-nova font-normal text-sm leading-[14px] lg:leading-[17px] text-[#14F195]">
              {props.mobileTooltipData.textBottom}
            </span>
          </div>
        )}
      </div>
    </ReactModal>
  );
}
