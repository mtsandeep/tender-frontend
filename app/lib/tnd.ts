import type { Signer, Contract, BigNumber, BigNumberish, ContractTransaction }  from "ethers";
import type { TransactionReceipt } from "@ethersproject/providers";
import type { IncentiveTracker, IncentiveToken } from "~/types/global";

import { ethers } from "ethers";
import  { getArbitrumOneSdk } from ".dethcrypto/eth-sdk-client";

import { Tendies } from "~/config/networks/arbitrum"
import rewardTrackerAbi from "~/config/sample-reward-tracker-abi"
import rewardTokenAbi from "~/config/sample-reward-token-abi"

export const TND_DECIMALS = Tendies.Tokens.TND.decimals

interface Txn {
  wait: (n?: number) => TransactionReceipt;
  hash: string;
}

const UINT_MAX = ethers.constants.MaxUint256
const { Trackers, Tokens } = Tendies

const getToken = (token: IncentiveToken) => Tokens[token]
const getTracker = (tracker: IncentiveTracker) => Trackers[tracker]
const getTokenTracker = (token: IncentiveToken) => getTracker(getToken(token).tracker)

const getTrackerContract = (contractName: IncentiveTracker, signer: Signer): Contract  => {
  const address =  getTracker(contractName).address;
  return new ethers.Contract(address, rewardTrackerAbi, signer)
}

const getTokenContract = (contractName: IncentiveToken, signer: Signer): Contract  => {
  const address = getToken(contractName).address;
  return new ethers.Contract(address, rewardTokenAbi, signer)
}

export const getClaimable = async (token: IncentiveToken, signer: Signer): Promise<BigNumber> => {
  const trackerContract = getTrackerContract(getToken(token).tracker, signer)
  return trackerContract.claimable(await signer.getAddress());
}

export const enable = async (token: IncentiveToken, signer: Signer): Promise<Txn> => {
  const tokenContract = getTokenContract(token, signer);
  const trackerAddress = getTokenTracker(token).address
  return tokenContract.approve(trackerAddress, UINT_MAX)
}

export const stakeTnd = async (signer: Signer, amount: BigNumber): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  const address = await signer.getAddress();
  return sdk.RewardRouter.stakeTnd(amount)
}

export const stakeEsTnd = async (amount: BigNumberish, signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.stakeEsTnd(amount)
}

export const unstakeTnd = async (signer: Signer, amount: BigNumber): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.unstakeTnd(amount)
}

export const unstakeEsTnd = async (amount: BigNumberish, signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.unstakeEsTnd(amount)
}

export const compound = async (signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.compound()
}

export const claim = async (signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.claim()
}

export const claimEsTnd = async (signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.claimEsTnd()
}

export const claimFees = async (signer: Signer): Promise<ContractTransaction> => {
  let sdk = getArbitrumOneSdk(signer)
  return sdk.RewardRouter.claimFees()
}

export async function quotePriceInUSDC() {
  let contract = Tendies.Tokens.TND.address
  let response = await fetch(`https://api.coingecko.com/api/v3/simple/token_price/arbitrum-one?contract_addresses=${contract}&vs_currencies=usd`)
  let json = await response.json() as {[contract: string]: {"usd": number}}
  return json[contract].usd
}

export const getAllData = async (signer: Signer) => {
  let sdk = getArbitrumOneSdk(signer)
  let address = signer.getAddress()

  const dataPromises = {
    TNDBalance: sdk.TND.balanceOf(address),
    esTNDBalance: sdk.esTND.balanceOf(address),
    bnBalance: sdk.bnTND.balanceOf(address),

    TNDTotalSupply: sdk.TND.totalSupply(),

    claimableTND: sdk.sbTND.claimable(address),
    claimableBNTND: sdk.sbfTND.claimable(address),

    stakedTND: sdk.sTND.depositBalances(address, sdk.TND.address),
    stakedESTND: sdk.sTND.depositBalances(address, sdk.esTND.address),
    stakedBNTND: sdk.bnTND.stakedBalance(address),

    // bonus points are multipleir points
    bonusPoints: sdk.sbTND.depositBalances(address, sdk.bnTND.address),

    claimableESTND: sdk.sTND.claimable(address),
    claimableFees: sdk.sbfTND.claimable(address),
    claimableBonusPoints: sdk.sbTND.claimable(address),

    sTNDAllowance: sdk.TND.allowance(address, sdk.sTND.address),

    // bonus points = depositbalancesTND
    // boostPercentage: MP / bonusPoints+amountstaked // : 100 * (4.5656) / (7.54 + 2.00) = 47.85%


    totalTNDStaked: sdk.sTND.totalSupply()
  }

  await Promise.all(Object.values(dataPromises))
 
  type Datum = keyof typeof dataPromises
  let data: Record<Datum, BigNumber> = Object.create(dataPromises)

  // await all the promises for the return objet
  for (const [key, value] of Object.entries(dataPromises)) {
    data[key as Datum]  = await value
  }

  return data;

}
