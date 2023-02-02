import { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { hooks, metaMask } from "~/connectors/meta-mask";
import useAuth from "~/hooks/use-auth";
import ClaimRewardsModal from "../claimRewardsModal/claimRewardsModal";
import type { IReward } from "../claimRewardsModal/claimRewardsModal";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { getAllData, quotePriceInUSDC } from "~/lib/tnd";
import * as TND from "~/lib/tnd";
import { toCryptoString } from "~/lib/ui";
import toast from "react-hot-toast";
import { TenderContext } from "~/contexts/tender-context";
import { displayErrorMessage } from "../deposit-borrow-flow/displayErrorMessage";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits, parseUnits } from "@ethersproject/units";
import Modal from "./modal";
import ReactModal from "react-modal";

const PriceContext = createContext<{tnd?: number, eth?: number}>({});

// gets the return type of an async function
// https://stackoverflow.com/a/59774789
type AsyncReturnType<T extends (...args: any) => Promise<any>> =
    T extends (...args: any) => Promise<infer R> ? R : any



function MultiplierPointsExplainer() {
  return <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[14px]">
  <p className="text-[#818987] text-left">
    Boost your rewards with Multiplier Points.{" "}
    <a
      target="_blank"
      rel="noreferrer"
      className="line-solid cursor-pointer capitalize text-white"
      href="https://docs.tender.fi/tendienomics/rewards-and-incentives#multiplier-points"
    >
      More info.
    </a>
  </p>
</div>
}

const APR = (totalStaked: BigNumber, emissions: BigNumber, price?: number, l2SecondsPerBlock?: number): string => {
  if (totalStaked.eq(0)) return "0.00 staked"
  if (!price || !l2SecondsPerBlock) return "?"

  const BLOCKS_PER_YEAR = 365 * 24 * 60 * 60 / l2SecondsPerBlock
  const EMISSION_VALUE_PER_YEAR_IN_CENTS = emissions.mul(Math.floor(100 * price * BLOCKS_PER_YEAR))
  return formatUnits(EMISSION_VALUE_PER_YEAR_IN_CENTS.div(totalStaked), 2) + "%"
}

type APRwidgetArgs = {
  staked: BigNumber;
  emissions: BigNumber;
  l2SecondsPerBlock: number;
}

function APRWidget({staked, emissions, l2SecondsPerBlock}: APRwidgetArgs) {
  let { tnd, eth } = useContext(PriceContext)
  console.log(staked, "emissions", emissions)
  let formattedAPR = APR(staked, emissions, tnd, l2SecondsPerBlock)
  return <div
    className="flex items-center gap-x-[10px] justify-between"
    tabIndex={0}
  >
  <div
    className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]"
    tabIndex={0}
  >
    <span className="text-sm md:text-base">{formattedAPR}</span>
    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]">
      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px]">
          <div className="flex justify-between items-center mb-[4px]">
            <span className="text-[#818987] text-xs leading-[17px]">
              ETH APR
            </span>
            <div className="text-xs leading-[17px]">
              <span>0.00%</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-[12px]">
            <span className="text-[#818987] text-xs leading-[17px]">
              esTND APR
            </span>
            <div className="text-xs leading-[17px]">
              <span>{formattedAPR}</span>
            </div>
          </div>
          <p className="text-[#818987] text-xs  text-left leading-[17px]">
            APRs are updated weekly on Wednesday and will depend
            on the fees collected for the week.
          </p>
        </div>
      </div>
      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
    </div>
  </div>
</div>
}
  
function displayTND(amount: BigNumber) {
  if (amount.eq(0)) return "0.00"
  let formatted = formatUnits(amount, TND.TND_DECIMALS);
  return toCryptoString(formatted, 6);
}

const EMISSION_RATE = 100

/**
 * Display value of TND in USD
 * @param amount
 * @param the price of TND in USD as a number
 * @returns string
 */
function displayTNDInUSD(amount: BigNumber, tndPrice: number): string {
  if (amount.eq(0)) return "0.00"

  // BigNumber only works for ints, and price is in cents
  let tndInUSD = amount.mul(tndPrice * 100).div(100)
  return toCryptoString(formatUnits(tndInUSD, TND.TND_DECIMALS), 4)
}

function displayTNDWithUSD(amount?: BigNumber, price?: number | null): string {
  if (!amount) return "?"
  return `${displayTND(amount)} (${price ? displayTNDInUSD(amount, price) : "?"})`
}

type RowArgs = {
  left: string | ReactNode,
  right?: string | ReactNode,
  symbol?: "TND" | "ETH" | "esTND",
  amount?: BigNumber,
}

function Row(args: RowArgs) {
  let context = useContext(PriceContext)
  let price = args.symbol === "ETH" ? context.eth : context.tnd;
  return <div className="flex items-center gap-x-[10px] justify-between" tabIndex={0}>
    <span className="text-[#818987] w-fit text-base">{args.left}</span>
    <span className="flex flex-wrap w-fit text-sm md:text-base leading-[17px]">
      <>
        {args.right && args.right } 
        {args.amount && price && displayTNDWithUSD(args.amount, price)}
      </>
    </span>
  </div>
}

export default function EarnContent(): JSX.Element {
  const { useIsActive } = hooks;
  const [dataClaimModal, setDataClaimModal] = useState<{
    open: boolean;
    rewards: IReward[];
  }>({ open: false, rewards: [] });
  const [tabFocus, setTabFocus] = useState<number>(0);
  const [onClient, setOnClient] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState<"stake" | "unstake" | "stakeESTND" | "unstakeESTND" | null>(null);
  const [tndPrice, setTNDPrice] = useState<number | null>(null);
  const [data, setData] = useState<AsyncReturnType<(typeof getAllData)> | null>(null)  

  const { networkData } = useContext(TenderContext);
  const { connect, isDisconnected } = useAuth();
  const isActive = useIsActive();
  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);

  function closeModal() {
    return setCurrentModal(null);
  }

  function RefreshData() {
    if(signer) getAllData(signer).then(setData);

  }
  console.log(networkData)

  useEffect(() => {
    quotePriceInUSDC().then(setTNDPrice)   
    RefreshData()

    setOnClient(true);
    if (isDisconnected()) {
      metaMask.connectEagerly();
    }
  }, [isDisconnected, signer]);


  const onStake = async (amount: BigNumber, symbol: "TND" | "ESTND" = "TND") => {
    if (!signer || amount.lte(0)) return
    try {
      if (symbol === "TND") {
        var tx = await TND.stakeTnd(signer, amount)
      } else {
        tx = await TND.stakeEsTnd(signer, amount)
      }
      toast.success("Submitting transaction")
      await tx.wait(1)
      toast.success("Stake successful")
    } catch (e) {
      displayErrorMessage(networkData, e, "Stake unsuccessful");
    }

    RefreshData()
 }

  const onUnStake = async (amount: BigNumber, symbol: "TND" | "ESTND" = "TND") => {
    if (!signer || amount.lte(0)) return
    try {
      if (symbol === "TND") {
        var tx = await TND.unstakeTnd(signer, amount)
      } else {
        tx = await TND.unstakeEsTnd(signer, amount)
      }
      toast.success("Submitting transaction")
      await tx.wait(1)
      toast.success("unstake successful")
    } catch (e) {
      displayErrorMessage(networkData, e, "Unstake unsuccessful");
      RefreshData()
    }
  }

  const onClaimmESTND = async ()=> {
    if (!signer || data?.claimableESTND.eq(0)) return
    try {
      var tx = await TND.claimEsTnd(signer)
      toast.success("Submitting transaction")
      await tx.wait(1)
      toast.success("Claim successful")
    } catch (e) {
      displayErrorMessage(networkData, e, "Compound unsuccessful");
      RefreshData()
    }
  }

  const onCompound = async ()=> {
    if (!signer) return
    try {
      var tx = await TND.compound(signer)
      toast.success("Submitting transaction")
      await tx.wait(1)
      toast.success("Compound successful")
    } catch (e) {
      displayErrorMessage(networkData, e, "Compound unsuccessful");
      RefreshData()
    }
  }

  return (
    <PriceContext.Provider value={{ tnd: tndPrice ?? undefined, eth: undefined}}>
      <ReactModal
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        isOpen={currentModal !== null}
        onRequestClose={() => setCurrentModal(null)}
        portalClassName="modal"
        style={{
          content: {
            inset: "unset",
            margin: "20px auto",
            position: "relative",
            maxWidth: 450,
          },
        }}
        closeTimeoutMS={200}
      >
        { currentModal === "stake" && <Modal
          closeModal={closeModal}
          balance={data?.TNDBalance ?? BigNumber.from(0)}
          signer={signer}
          sTNDAllowance={data?.sTNDAllowance}
          complete={onStake}
          action="Stake"
        />
      }

        { currentModal === "unstake" && <Modal
          closeModal={closeModal}
          balance={data?.stakedTND ?? BigNumber.from(0)}
          signer={signer}
          sTNDAllowance={data?.sTNDAllowance}
          complete={onUnStake}
          action="Unstake"
        />
      }

      { currentModal === "stakeESTND" && <Modal
          closeModal={closeModal}
          balance={data?.esTNDBalance ?? BigNumber.from(0)}
          signer={signer}
          sTNDAllowance={data?.sESTNDAllowance}
          complete={(amount) => onStake(amount, "ESTND")}
          action="stake"
          symbol="ESTND"
        />

      }

      { currentModal === "unstakeESTND" && <Modal
          closeModal={closeModal}
          balance={data?.stakedESTND ?? BigNumber.from(0)}
          signer={signer}
          sTNDAllowance={data?.sESTNDAllowance}
          complete={(amount) => onUnStake(amount, "ESTND")}
          action="Unstake"
          symbol="ESTND"
        />
      }
      </ReactModal>

    <div className="c focus:outline-none mt-[30px] mb-[60px] md:mb-[100px] font-nova">
      <ClaimRewardsModal
        data={{
          open: dataClaimModal.open,
          rewards: [
          {
              title: "Protocol Rewards (esTND)",
              exchange: `1 esTND = ${tndPrice ?? "?"}`,
              unclaimed:  data ? `${displayTND(data.claimableESTND)} esTND` : "?",
              unclaimedUsd: `$${data ? displayTNDInUSD(data?.claimableESTND, tndPrice ?? 0) : "?"}`,
              onClickClaim: onClaimmESTND
            },
          ],
        }}
        handlerClose={() =>
          setDataClaimModal({ ...dataClaimModal, open: false })
        }
      />
      <div tabIndex={0} className="max-w-[820px] my-o mx-auto">
        <p className="font-space text-3xl leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Earn
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Stake TND to earn rewards. <br />
          Please read the{" "}
          <a
            className="line-solid cursor-pointer text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives"
            target="_blank"
            rel="noreferrer"
          >
            staking details
          </a>{" "}
          to learn more.
          <br />
          {data && <span>
            You are earning TND rewards with {displayTND(data.TNDBalance)} tokens.
            <br />
            Tokens: {displayTND(data.TNDBalance)}, {displayTND(data.esTNDBalance)} esTND, {displayTND(data.claimableBonusPoints)} MP.
            </span>
          }
        </p>
        <div className="font-[ProximaNova] w-full">
          <div tabIndex={0} className="panel-custom">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              TENDIES
            </div>
            <div className="px-[15px] pt-[20px] pb-[16.9px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[20px] md:pb-[24px]">
                <Row left="Price" right={tndPrice} />
                <Row left="Wallet" amount={data?.TNDBalance} symbol="TND" />
                <Row left="Staked" amount={data?.stakedTND} symbol="TND" />
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[18.5px] md:pt-[23px] pb-[20px] md:pb-[24px]">
                {data &&
                  <Row left="APR" right={<APRWidget staked={data.stakedTND} emissions={data.stakedTND}
                    l2SecondsPerBlock={networkData.l2SecondsPerBlock} />} />              
                }
                <Row left="Rewards" right={<>
                  <div
                    className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">${data && tndPrice ? displayTNDInUSD(data?.claimableESTND, tndPrice) : "?"}</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-xs leading-[17px]">
                          <div className="flex justify-between items-center mb-[4px]">
                            <span className="text-[#818987]">ETH</span>
                            <span className="">0.00 ($0.00)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[#818987]">esTND</span>
                            <span className="">{displayTNDWithUSD(data?.claimableESTND, tndPrice)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                
                </>} />
                <Row left="Multiplier Points APR" right={<>
                  <div
                    onFocus={(e) => setTabFocus(1)}
                    className="cursor-pointer group line-dashed text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">100.00%</span>
                    <div
                      className={`${
                        tabFocus === 1 ? "flex" : "hidden"
                      } z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]`}
                    >
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <MultiplierPointsExplainer />
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>                
                </>} />

                <Row left="Boost Percentage" right={<>
                  <div
                    className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    {data && 
                    <span className="text-sm md:text-base">
                      {/*100 * (Staked Multiplier Points) / (Staked tND + Staked esTND)*/}
                      { (data?.stakedBonusPoints && data?.stakedTND.add(data?.stakedESTND).gt(0)) ?
                        `${(data.stakedBonusPoints.mul(100).div(data.stakedTND.add(data.stakedESTND)).toString())} %`
                        : "0.00%"
                      }
                      </span>
                    }
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-[#818987] text-start">
                          You are earning
                          { (data?.stakedBonusPoints && data?.stakedTND.add(data?.stakedESTND).gt(0)) ?
                            ` ${(data.stakedBonusPoints.mul(100).div(data.stakedTND.add(data.stakedESTND)).toString())} % `
                            : "0.00% " }
                          more TND rewards using {data ? displayTND(data?.stakedBonusPoints) : " 0.00 "}
                          Staked Multiplier Points. <br />
                          <br />
                          Use the "Compound" button to stake your Multiplier
                          Points.
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </>} />

              </div>
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[19px] md:pt-[24px]">
                <Row left="Total Staked" amount={data?.totalTNDStaked}  symbol="TND" />
                <Row left="Total Supply" amount={data?.TNDTotalSupply}  symbol="TND" />
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        Buy TND
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button
                        onClick={()=> setCurrentModal("stake") }
                        className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button
                        onClick={()=> setCurrentModal("unstake")}
                        className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        unStake
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div tabIndex={0} className="panel-custom mt-[31px]">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px]">
              ESCROWED TENDIES
            </div>
            <div className="px-[15px] pt-[20px] pb-[15.9px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="border-[#282C2B] border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pb-[19px] md:pb-[23px] ">
                <Row left="Price" right={tndPrice?.toString()} />
                <Row left="Wallet" amount={data?.esTNDBalance} symbol="esTND" />
                <Row left="Staked" amount={data?.stakedESTND} symbol="esTND" />
              </div>
              <div className="border-[#282C2B]  border-b-[1px] flex flex-col gap-y-[12px] md:gap-y-[15px] pt-[13px] pb-[20px] md:pt-[24px] md:pb-[23px] ">
                {data &&
                  <Row left="APR" right={<APRWidget l2SecondsPerBlock={networkData.l2SecondsPerBlock} staked={data.esTNDBalance} emissions={data.tndEmissions} />} />                
                }
                <div
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">
                    Multiplier Points APR
                  </span>
                  <div
                    onFocus={(e) => setTabFocus(2)}
                    className=" cursor-pointer group line-dashed text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">100.00%</span> {/** this is Fixed on gmx  */}
                    <div
                      className={`${
                        tabFocus === 2 ? "flex" : "hidden"
                      } z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]`}
                    >
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <MultiplierPointsExplainer />
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
          
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                      onClick={() => setCurrentModal("stakeESTND")}
                      >
                        STAKE
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]"
                        onClick={() => setCurrentModal("unstakeESTND")}
                      >
                        unStake
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
          <div tabIndex={0} className="panel-custom mt-[32px]">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] pb-[18px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              Total Rewards
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[23px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <Row left="ETH" amount={data?.claimableFees} symbol="ETH" />
                <Row left="TND" amount={data?.claimableTND} />
                <Row left="esTND" amount={data?.claimableESTND} />
                <Row left="Multiplier Points" right={<>
                  <div
                    onFocus={(e) => setTabFocus(3)}
                    className=" cursor-pointer group line-dashed text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">{data ? displayTND(data.claimableBonusPoints) : ""}</span>
                    <div
                      className={`${
                        tabFocus === 3 ? "flex" : "hidden"
                      } z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]`}
                    >
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <MultiplierPointsExplainer />
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>                
                </>} />
                <div
                  onFocus={(e) => setTabFocus(4)}
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">
                    Staked Multiplier Points
                  </span>
                  <div
                    className=" cursor-pointer group line-dashed text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">{data ? displayTND(data.stakedBonusPoints) : ""}</span>
                    <div
                      className={`${
                        tabFocus === 4 ? "flex" : "hidden"
                      } z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]`}
                    >
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <MultiplierPointsExplainer />
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">Total</span>
                  <div className="text-sm md:text-base leading-[17px]">$0.00</div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button
                        onClick={onCompound}
                        className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Compound
                      </button>
                    </div>
                    <div
                      className="btn-custom-border rounded-[6px]"
                      onClick={() =>
                        setDataClaimModal({ ...dataClaimModal, open: true })
                      }
                    >
                      <button
                        className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Claim
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="font-space text-3xl mt-[61px] leading-[38px] md:text-[42px] font-bold md:leading-[54px] mb-[16px] md:mb-[15px]">
          Vest
        </p>
        <p className="md:text-base md:leading-[22px] text-sm leading-5 mb-[31px] text-[#ADB5B3]">
          Convert esTND tokens to TND tokens. Please read the{" "}
          <a
            className="cursor-pointer line-solid text-white"
            href="https://docs.tender.fi/tendienomics/rewards-and-incentives#vesting"
            target="_blank"
            rel="noreferrer"
          >
            vesting details
          </a>{" "}
          before using the vault.
        </p>
        <div className="font-[ProximaNova] w-full" id="vest">
          <div tabIndex={0} className="panel-custom">
            <div className="font-space text-lg md:text-xl leading-[23px] md:leading-[26px] px-[15px] py-[19px] md:px-[30px] md:pt-[23px] md:pb-[20px] border-b-[1px] border-[#282C2B] border-solid px-[15px] uppercase">
              TENDIES Vault
            </div>
            <div className="px-[15px] pt-[20px] pb-[15px] md:px-[30px] md:pt-[24px] md:pb-[30px] text-sm leading-5 md:text-base md:leading-[22px]">
              <div className="flex flex-col gap-y-[12px] md:gap-y-[15px]">
                <Row left="Staked Tokens" right={ !data ? "?" :
                  <div
                  className="line-dashed group relative cursor-pointer md:w-fit text-right text-xs leading-[17px]"
                  tabIndex={0}
                >
                  <span className="text-sm md:text-base">{displayTND(data.stakedAmounts)}</span>
                  <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[18px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                    <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                      <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[15px] text-[#818987]">
                        <div className="flex justify-between items-center mb-[8px]">
                          <span className="text-xs leading-[17px]">
                            0.00 TND
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-[8px]">
                          <span className="text-xs leading-[17px]">
                            0.00 esTND
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs leading-[17px]">
                            0.00 Multiplier Points
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                  </div>
                </div>

                }/>

                <div
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">
                    Reserved for Vesting
                  </span>
                  <div className="flex flex-wrap text-right w-fit text-sm md:text-base leading-[17px]">
                    0.00
                  </div>
                </div>
                <div
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">
                    Vesting Status
                  </span>
                  <div
                    className="flex flex-wrap group cursor-pointer line-dashed text-right w-fit text-sm md:text-base leading-[17px]"
                    tabIndex={0}
                  >
                    <span>0.0000 / 0.0000</span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0.0000 tokens have been converted to TND from the
                            0.0000 esTND deposited for vesting.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-x-[10px] justify-between"
                  tabIndex={0}
                >
                  <span className="text-[#818987] w-fit text-base">
                    Claimable
                  </span>
                  <div
                    className="flex flex-wrap group cursor-pointer group  line-dashed text-right w-fit text-xs leading-[17px]"
                    tabIndex={0}
                  >
                    <span className="text-sm md:text-base">
                      0.0000 / 0.0000
                    </span>
                    <div className="hidden z-10 flex-col absolute right-[-5px] bottom-[24px] items-center group-hover:flex group-focus:flex rounded-[10px]">
                      <div className="relative z-11 leading-none whitespace-no-wrap shadow-lg w-[242px] panel-custom !rounded-[10px]">
                        <div className="w-full h-full bg-[#181D1B] shadow-lg rounded-[10px] p-[14px] pr-[16px] pl-[14px] pb-[13px]">
                          <p className="text-[#818987] text-xs text-left leading-[17px]">
                            0.0000 TND tokens can be claimed, use the options
                            under the Total Rewards section to claim them.
                          </p>
                        </div>
                      </div>
                      <div className="custom__arrow__tooltip relative right-[-95px] top-[-6px] z-[11] !mt-[0] !border-none w-3 h-3 rotate-45 bg-[#181D1B]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="font-space flex flex-wrap items-center pt-[31px] gap-[10px] gap-y-[13px] md:gap-x-[17px]">
                {onClient && isActive ? (
                  <>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Deposit
                      </button>
                    </div>
                    <div className="btn-custom-border rounded-[6px]">
                      <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] uppercase hover:bg-[#1e573fb5]">
                        Withdraw
                      </button>
                    </div>
                  </>
                ) : !window.ethereum ? (
                  <a
                    className="btn-custom-border rounded-[6px]"
                    target="_blank"
                    rel="noreferrer"
                    href="https://metamask.io/"
                  >
                    <button className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]">
                      CONNECT WALLET
                    </button>
                  </a>
                ) : (
                  !isActive && (
                    <button
                      onClick={() => connect()}
                      className="px-[12px] pt-[6px] py-[7px] md:px-[16px] md:py-[8px] text-[#14F195] text-xs leading-5 md:text-sm md:leading-[22px] rounded-[6px] bg-[#0e3625] relative z-[2] hover:bg-[#1e573fb5]"
                    >
                      CONNECT WALLET
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PriceContext.Provider>
  );
}
