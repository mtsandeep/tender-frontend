import { formatUnits } from "@ethersproject/units";
import { useTenderContext } from "~/hooks/use-tender-context";
import { formatApy } from "~/lib/apy-calculations";
import { TND_DECIMALS } from "~/lib/tnd";
import { Market, TenderContext } from "~/types/global"
import { checkColorClass } from "../two-panels/two-panels"

type APY_PROPS = {
    market?: Market,
    type: "borrow" | "supply"
}

function getBlocksPerYear(secondsPerBlock: number) {
    const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
    return Math.round(SECONDS_PER_YEAR / secondsPerBlock);
}

type HoverableAPYProps = {
  market: Market;
  type: "supply" | "borrow";
  onClick: () => void;
}

export function HoverableAPY({market, type, onClick}: HoverableAPYProps) {
  var info = getAPY(type, market);

  return <a
    className="flex items-center h-full relative pb-[30px] text-white font-nova font-normal md:pt-[24px] md:pb-[39px] pl-[15px] pr-[15px] text-sm md:text-base"
    href={`/markets/${market.tokenPair.token.symbol}`}
    target="_blank"
    rel="noreferrer"
  >
    <div className={`custom__hidden ${checkColorClass(info.APY)} `} >
      {info.formattedTotalAPY}
    </div>
    <div
      tabIndex={0}
      className="group  focus:outline-none"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute top-[25px] md:top-[61px] left-[15px] h-[22px]">
        <div onClick={onClick}
          className="!flex items-center break-words bg-[#181D1B] text-[#A3AEAC] rounded-md text-[11px] text-center h-[20px] px-[5px]"
        >
          <img
            aria-hidden={true}
            className="w-[13px] h-[13px]"
            src={market.tokenPair.token.icon}
            alt={market.tokenPair.token.symbol}
          />
          <img
            aria-hidden={true}
            className="w-[13px] h-[13px] ml-[6px]"
            src="/images/wallet-icons/balance-icon.svg"
            alt="..."
          />
        </div>
        <div className="hidden flex-col absolute bottom__custom items-center group-hover:hidden lg:group-hover:flex lg:group-focus:flex rounded-[10px]">
          <div className="relative z-10 leading-none whitespace-no-wrap shadow-lg w-[100%] mx-[0px] !rounded-[10px] panel-custom">
            <div className="flex-col w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] pt-[14px] pr-[16px] pb-[14px] pl-[16px]">
            <APY market={market} type={type} />
            </div>
          </div>
          <div className="custom__arrow__tooltip relative top-[-6px] left-[0.5px] w-3 h-3 rotate-45 bg-[#181D1B]"></div>
        </div>
      </div>
    </div>
  </a>
}

type APYObject = {
  APY: number;
  ESTNDAPY: number;
  formattedESTND: string;
  formattedTotalAPY: string;
  formattedAPY: string
}

export function getAPY(type: string, market: Market, context?: TenderContext | null | undefined): APYObject {
  context = context ?? useTenderContext()
  let tndPrice = context?.tndPrice

  let apyString = type === "supply" ? market.marketData.depositApy : market.marketData.borrowApy;
  let compSeeds = type === "supply" ? market.compSupplySpeeds : market.compBorrowSpeeds
  var apy = parseFloat(apyString) * (type === "borrow" ? -1 : 1);
  var ESTNDAPY = 0
  
  if (context && tndPrice && compSeeds && market.marketData.marketSize) {
    let seeds = parseFloat(formatUnits(compSeeds, TND_DECIMALS))
    let esTNDPerYear = seeds * getBlocksPerYear(context.networkData.secondsPerBlock)
    ESTNDAPY = (100 * esTNDPerYear * tndPrice) / (market.marketData.marketSize * market.tokenPair.token.priceInUsd )
  }

  let formattedESTND = formatApy(ESTNDAPY)
  let formattedTotalAPY = formatApy(apy + ESTNDAPY)
  let formattedAPY = formatApy(apy);

  return { ESTNDAPY, formattedAPY, formattedTotalAPY, formattedESTND, APY: apy };
}

export default function APY({market, type}: APY_PROPS) {    
  if (!market) return null
  let info =  getAPY(type, market);
  return <>
    <div className="flex justify-between gap-[30px] mb-[12px] last:mb-[0]">
    <div className="flex gap-[8px]">
      <img
        aria-hidden={true}
        className="max-w-[18px]"
        src={market.tokenPair.token.icon}
        alt={market.tokenPair.token.symbol}
      />
      <span className="font-nova text-white text-sm font-normal">
        {market.tokenPair.token.symbol}
      </span>
    </div>
    <span
      className={`font-nova text-white text-sm font-normal ${checkColorClass(
        info.APY
      )}`}
    >
      {info.formattedAPY}
    </span>
  </div>
  <ESTNDAPR incentive={info.formattedESTND} />
  </>
}
export function ESTNDAPR({ incentive }: {incentive?: string}) {
    return  <div className="flex justify-between gap-[30px]">
      <div className="flex gap-[8px]">
        <img
          className="max-w-[18px]"
          src="/images/wallet-icons/balance-icon.svg"
          alt="..."
        />
        <span className="font-nova text-white text-sm font-normal">
          esTND
        </span>
      </div>
      <span className="font-nova text-white text-sm font-normal whitespace-nowrap">
        {incentive}
      </span>
    </div>
  
  }