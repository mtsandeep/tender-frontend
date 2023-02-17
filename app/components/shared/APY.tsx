import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { useTenderContext } from "~/hooks/use-tender-context";
import { formatApy } from "~/lib/apy-calculations";
import { TND_DECIMALS } from "~/lib/tnd";
import { Market } from "~/types/global"
import { checkColorClass } from "../two-panels/two-panels"

type APY_PROPS = {
    market?: Market,
    type: "borrow" | "supply"
}

function getBlocksPerYear(secondsPerBlock: number) {
    const SECONDS_PER_YEAR = 365 * 24 * 60 * 60;
    return Math.round(
      SECONDS_PER_YEAR / secondsPerBlock
    );    
}

export default function APY({market, type}: APY_PROPS) {
    let context = useTenderContext()
    if (!context || !market) return null

    let tndPrice = context.tndPrice
    
    let apy = type === "borrow" ? market.marketData.borrowApy : market.marketData.depositApy;
    var incentive = type === "borrow" ? "" : "?"

    if (tndPrice && market.compSupplySpeeds && market.marketData.marketSize) {
        let compSupplySpeeds = parseFloat(formatUnits(market.compSupplySpeeds, TND_DECIMALS))
        let esTNDPerYear = compSupplySpeeds * getBlocksPerYear(context.networkData.secondsPerBlock)
        let esTNDAPY = 100 * esTNDPerYear * tndPrice / market.marketData.marketSize
        incentive = formatApy(esTNDAPY)
    }

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
        apy
      )}`}
    >
    {type === "borrow" ? "-" : null}
      {formatApy(parseFloat(apy))}
    </span>
  </div>
  <ESTNDAPR incentive={incentive} />
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