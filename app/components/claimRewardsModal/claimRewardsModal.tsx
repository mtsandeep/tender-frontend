import ReactModal from "react-modal";

export interface IReward {
  unclaimed: string;
  unclaimedUsd: string;
  exchange?: string;
}

interface IProps {
  onClickClaim: () => void;
  handlerClose: () => void;
  title: string;
  data: { open: boolean; rewards: IReward[] };
}

const ClaimRewardsModal = ({ data, handlerClose, onClickClaim, title }: IProps) => {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      isOpen={data.open}
      onRequestClose={handlerClose}
      portalClassName="modal"
      style={{
        content: {
          inset: "unset",
          margin: "50px auto",
          position: "relative",
          maxWidth: 600,
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
          <div className="py-[26px] px-[15px] md:p-[30px] font-nova leading-[140%] border-b-[1px] border-[#282C2B] last:border-b-0"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[12px] md:mb-[26px]">
              <div className="flex items-center mr-0 md:mr-[20px] mb-[12px] md:mb-0">
                <img
                  className="w-[20px] h-[20px] mr-[10px] md:w-[28px] md:h-[28px] md:mr-[16px]"
                  src="/images/wallet-icons/balance-icon-m.svg"
                  alt="..."
                />
                <div className="text-sm md:text-lg font-semibold">
                  {title}
                </div>
              </div>
              <div className="text-right font-normal text-sm md:text-base text-[#818987]">
                {data.rewards[0]?.exchange ?? ""}
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-base">
              <table className="mr-0 md:mr-[20px]">
                <thead>
                  <tr>
                    <th className="pr-[20px] md:pr-[50px] sm:pr-[78px] text-[#818987] pb-[6px] text-left font-normal text-sm md:text-base">
                      Unclaimed
                    </th>
                    <th className="text-[#818987] pb-[6px] text-left font-normal text-sm md:text-base">
                      Unclaimed Value (USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.rewards?.map((reward: IReward, index: number) => (
                    <tr>
                      <td className="w-fit font-normal text-left">{reward.unclaimed}</td>
                      <td className="w-fit font-normal text-right">{reward.unclaimedUsd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="btn-custom-border rounded-[6px] mt-[20px] md:mt-0">
                <button
                  onClick={onClickClaim}
                  className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]"
                >
                  Claim
                </button>
              </div>
            </div>
          </div>
      </div>

    </ReactModal>
  );
};

export default ClaimRewardsModal;
