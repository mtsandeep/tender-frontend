import * as animationData from "~/lotties/loader-tender.json";
import Lottie from "lottie-react";
import { useBlockchainExplorer } from "~/hooks/use-network-to-blockchain-explorer";
import { useContext } from "react";
import { TenderContext } from "~/contexts/tender-context";

interface Props {
  stopWaitingOnConfirmation: Function;
  txnHash: string | null;
}
export default function ConfirmingTransaction({
  stopWaitingOnConfirmation,
  txnHash,
}: Props) {
  let { isWaitingToBeMined, currentTransaction } = useContext(TenderContext);
  let { blockExplorerUrl } = useBlockchainExplorer();

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden py-[30px] md:py-[40px] h-[542px] md:h-[510px] pr-[15px] pl-[15px] md:pr-[88px] md:pl-[88px] relative">
      <svg
        onClick={() => stopWaitingOnConfirmation()}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="absolute right-[16px] sm:right-[22px] top-[24px] cursor-pointer group"
      >
        <path
          className="group-hover:fill-[#14f195]"
          d="M22.0567 3.05669C22.4961 3.49614 22.4961 4.20864 22.0567 4.64809L14.148 12.5567L22.0567 20.4654C22.4961 20.9048 22.4961 21.6173 22.0567 22.0568C21.6172 22.4962 20.9047 22.4962 20.4653 22.0568L12.5566 14.1481L4.64799 22.0568C4.20854 22.4962 3.49605 22.4962 3.05659 22.0568C2.61714 21.6173 2.61714 20.9048 3.05659 20.4654L10.9652 12.5567L3.05659 4.64809C2.61714 4.20864 2.61714 3.49614 3.05659 3.05669C3.49605 2.61723 4.20854 2.61723 4.64799 3.05669L12.5566 10.9653L20.4653 3.05669C20.9047 2.61724 21.6172 2.61724 22.0567 3.05669Z"
          fill="white"
        />
      </svg>
      <div className="flex w-[120px] h-[120px] md:w-[160px] md:h-[160px] max-w-[100%] items-end justify-center mb-[20px] md:mb-[70px] svg_animation_custom">
        {isWaitingToBeMined || currentTransaction ? (
          <Lottie
            loop={true}
            animationData={animationData}
            className="w-full h-full"
          />
        ) : (
          <img
            className="w-[84px] h-[84px] md:w-[120px] md:h-[120px]"
            src="/images/ico/done.svg"
            alt="..."
          />
        )}
      </div>
      <div className="text-center font-nova font-bold text-2xl md:text-[33px] leading-[120%] md:leading-[40px] mb-[30px] md:mb-[37px]">
        {isWaitingToBeMined || currentTransaction
          ? "Confirming transaction"
          : "Done!"}
      </div>
      <a
        href={`${blockExplorerUrl}/tx/${txnHash}`}
        rel="noreferrer"
        target="_blank"
        className="uppercase font-space font-bold text-base w-full max-w-[375px] flex justify-center items-center bg-[#14F195] text-[#000] rounded-[6px] h-[50px] md:h-[60px] hover:bg-[#14f195ce]"
      >
        VIEW ON EXPLORER
      </a>
    </div>
  );
}
