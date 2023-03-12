import { Address, defineConfig } from '@dethcrypto/eth-sdk'
import * as config from "../app/config/networks/arbitrum"
import { Tendies } from "../app/config/networks/arbitrum"

export default defineConfig({
  rpc: {
    arbitrumOne: "https://arb1.arbitrum.io/rpc"
  },
  contracts: {
    arbitrumOne: {
      RewardRouter: Tendies.RewardRouter,
      RewardDistributor: Tendies.RewardDistributor,
      EthRewardDistributor: Tendies.EthRewardDistributor,

      Comptroller: config.default.Contracts.Comptroller as Address,

      TND_USDC_UNISWAP_POOL: Tendies.TND_USDC_UNISWAP_POOL,
      UNISWAP_QUOTER: Tendies.UNISWAP_QUOTER,

      TND: Tendies.Tokens.TND.address,
      esTND: Tendies.Tokens.esTND.address,

      // bonus
      bnTND: Tendies.Tokens.bnTND.address,
      
      // staked bonus fee TND
      sbfTND: Tendies.Trackers.sbfTND.address,

      // staked tnd
      sTND: Tendies.Trackers.sTND.address,

      // staked bonus tnd
      sbTND: Tendies.Trackers.sbTND.address,

      vTND: Tendies.Trackers.vTND.address
    },
  },
})
