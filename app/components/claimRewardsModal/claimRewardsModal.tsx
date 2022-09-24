import ReactModal from "react-modal";

export interface IReward {
  title: string;
  exchange: string;
  unclaimed: string;
  unclaimedUsd: string;
  onClickClaim: () => void;
}

interface IProps {
  handlerClose: () => void;
  data: { open: boolean; rewards: IReward[] };
}

const ClaimRewardsModal = ({ data, handlerClose }: IProps) => {
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
          zoom: "75%",
          position: "relative",
          maxWidth: 500,
        },
      }}
      closeTimeoutMS={200}
    >
      <div className="relative border-[#B5CFCC2B] bg-[#0D0D0D]">
        <div className="absolute right-[16px] sm:right-[20px] top-[26px]">
          <button onClick={handlerClose}>
            <img src="/images/ico/close.svg" alt="close" />
          </button>
        </div>
        <div className="pt-[25px] pb-[21px] text-center text-[20px] font-bold leading-[26px] bg-[#151515] font-space uppercase border-b-[1px] border-[#282C2B] custom__line">
          Claim Rewards
        </div>
        {data?.rewards?.map((reward: IReward, index: number) => (
          <div
            key={index}
            className="p-[30px] font-nova leading-[140%] border-b-[1px] border-[#282C2B]"
          >
            <div className="flex justify-between items-center mb-[26px]">
              <div className="flex items-center mr-[20px]">
                <img
                  className="w-[28px] h-[28px] mr-[16px]"
                  src="/images/wallet-icons/balance-icon-m.svg"
                  alt="..."
                />
                <div className="text-[18px] font-semibold">{reward.title}</div>
              </div>
              <div className="text-right font-normal text-[16px] text-[#818987]">
                {reward.exchange}
              </div>
            </div>
            <div className="flex justify-between items-center text-[16px]">
              <table className="mr-[20px]">
                <thead>
                  <tr className="">
                    <th className="pr-[50px] sm:pr-[78px] text-[#818987] pb-[6px] text-left font-normal">
                      Unclaimed
                    </th>
                    <th className="text-[#818987] pb-[6px] text-left font-normal">
                      Unclaimed Value (USD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="line-dashed group relative cursor-pointer w-fit">
                        <span className="font-normal">{reward.unclaimed}</span>
                        <div className="hidden z-10 flex-col absolute justify-center left-[50%] translate-x-[-50%] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                          <div className="relative z-11 leading-none whitespace-nowrap shadow-lg w-[auto] panel-custom !rounded-[10px] !bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                            {reward.unclaimed}
                          </div>
                          <div className="custom__arrow__tooltip relative top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="line-dashed group relative cursor-pointer w-fit">
                        <span className="font-normal">
                          {reward.unclaimedUsd}
                        </span>
                        <div className="hidden z-10 flex-col absolute justify-center left-[50%] translate-x-[-50%] bottom-[24px] items-center group-hover:flex rounded-[10px]">
                          <div className="relative z-11 leading-none whitespace-nowrap shadow-lg w-[auto] panel-custom !rounded-[10px] !bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                            {reward.unclaimedUsd}
                          </div>
                          <div className="custom__arrow__tooltip relative top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={reward.onClickClaim}
                className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]"
              >
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <ReactModal
        shouldCloseOnOverlayClick={true}
        isOpen={false}
        onRequestClose={() => setOpenMarket(null)}
        portalClassName="modal"
        style={{
          content: {
            inset: "unset",
            margin: "50px auto",
            zoom: "75%",
            position: "relative",
            maxWidth: 400,
          },
        }}
        closeTimeoutMS={200}
      >
        <div className="relative border-[#B5CFCC2B] bg-[#0D0D0D]">
          <div
            key={1}
            className="absolute right-[16px] sm:right-[20px] top-[26px]"
          >
            <button>
              <img src="/images/ico/close.svg" alt="close" />
            </button>
          </div>
          <div
            key={2}
            className="pt-[25px] pb-[21px] text-center text-[20px] font-bold leading-[26px] bg-[#151515] font-space uppercase border-b-[1px] border-[#282C2B]"
          >
            Claim Rewards
          </div>
          <div
            key={3}
            className="p-[30px] font-nova leading-[140%] border-b-[1px] border-[#282C2B]"
          >
            <div key={1} className="mb-[20px]">
              <div className="flex items-center">
                <img
                  className="w-[28px] h-[28px] mr-[16px]"
                  src="/images/wallet-icons/balance-icon-m.svg"
                  alt="..."
                />
                <div className="text-[18px] font-semibold">
                  Protocol Rewards (<span>esTND</span>)
                </div>
              </div>
            </div>
            <div
              key={2}
              className="flex justify-between items-center mb-[15px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Price
              </div>
              <div key={2}>
                <span>$</span>
                <span>0.0035</span>
              </div>
            </div>
            <div
              key={3}
              className="flex justify-between items-center mb-[15px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Unclaimed
              </div>
              <div
                key={2}
                className="line-dashed group relative cursor-pointer w-fit"
              >
                <span>0</span> <span>esTND</span>
                <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                  <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Arbitrum:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.63</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Avalanche:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.98</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative right-[-105px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
            </div>
            <div
              key={4}
              className="flex justify-between items-center mb-[24px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Unclaimed Value (<span>USD</span>)
              </div>
              <div
                key={2}
                className="line-dashed group relative cursor-pointer w-fit"
              >
                <span>$</span>
                <span>0</span>
                <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                  <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Arbitrum:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.63</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Avalanche:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.98</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative right-[-105px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
            </div>
            <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
              Claim
            </button>
          </div>
          <div key={4} className="p-[30px] font-nova leading-[140%]">
            <div key={1} className="mb-[20px]">
              <div className="flex items-center">
                <img
                  className="w-[28px] h-[28px] mr-[16px]"
                  src="/images/wallet-icons/balance-icon-m.svg"
                  alt="..."
                />
                <div className="text-[18px] font-semibold">
                  Protocol Rewards (<span>esTND</span>)
                </div>
              </div>
            </div>
            <div
              key={2}
              className="flex justify-between items-center mb-[15px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Price
              </div>
              <div key={2}>
                <span>$</span>
                <span>0.0035</span>
              </div>
            </div>
            <div
              key={3}
              className="flex justify-between items-center mb-[15px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Unclaimed
              </div>
              <div
                key={2}
                className="line-dashed group relative cursor-pointer w-fit"
              >
                <span>0</span> <span>TND</span>
                <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                  <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Arbitrum:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.63</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Avalanche:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.98</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative right-[-105px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
            </div>
            <div
              key={4}
              className="flex justify-between items-center mb-[24px] text-[16px] font-normal"
            >
              <div key={1} className="text-[#818987]">
                Unclaimed Value (<span>USD</span>)
              </div>
              <div
                key={2}
                className="line-dashed group relative cursor-pointer w-fit"
              >
                <span>$</span>
                <span>0</span>
                <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex rounded-[10px]">
                  <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                    <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
                      <div className="flex justify-between items-center mb-[4px]">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Arbitrum:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.63</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#818987] text-xs leading-[17px]">
                          Price on Avalanche:
                        </span>
                        <div className="text-xs leading-[17px]">
                          <span>$43.98</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="custom__arrow__tooltip relative right-[-105px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                </div>
              </div>
            </div>
            <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5  md:text-[13px] md:leading-[22px] font-medium rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
              Claim
            </button>
          </div>
        </div>
      </ReactModal> */}
    </ReactModal>
  );
};

export default ClaimRewardsModal;
