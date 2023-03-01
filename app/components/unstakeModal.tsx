import ReactModal from "react-modal";


interface IProps {
  handlerClose: () => void;
  isOpen: boolean;
}

const UnstakeModal = ({ isOpen, handlerClose }: IProps) => {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={isOpen}
      onRequestClose={handlerClose}
      portalClassName="modal"
      style={{
        content: {
          inset: "unset",
          margin: "50px auto",
          position: "relative",
          maxWidth: 500,
        },
      }}
      closeTimeoutMS={200}
    >
      <div className="relative border-[#B5CFCC2B] bg-[#0D0D0D]">
        <div className="pt-[21px] pb-[21px] md:pt-[23px] md:pb-[23px] text-center text-lg md:text-xl font-bold leading-[26px] bg-[#151515] font-space uppercase border-b-[1px] border-[#282C2B] custom__line relative">
          Claim Rewards
          <img
            onClick={handlerClose}
            src="/images/ico/close.svg"
            className="absolute cursor-pointer right-[20px] md:right-[26px] top-[50%] translate-y-[-50%] w-[16px] h-[16px] md:w-auto md:h-auto"
            alt="close"
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default UnstakeModal;
