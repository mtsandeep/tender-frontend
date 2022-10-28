import ReactModal from "react-modal";
import type { Market } from "~/types/global";

ReactModal.setAppElement("#m");

export default function MarketRow(props: {
  market: Market;
  children: React.ReactChild[];
  openMarket: Function;
}) {
  return (
    <tr
      tabIndex={0}
      onKeyUp={(e) => e.key === "Enter" && props.openMarket()}
      onClick={() => props.openMarket()}
      className="h-[80px] md:h-auto text-gray-400 border-t border__top__custom cursor-pointer"
    >
      {props.children}
    </tr>
  );
}
