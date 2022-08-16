export default {
  ChainId: 42161,
  blockExplorerName: "Arbiscan",
  blockExplorerUrl: "https://arbiscan.io//tx",
  Contracts: {
    Comptroller: "0x84A57414910FBfE9f5503bFCA2F1e31B6Ad0981A",
    PriceOracle: "0x8aA402BFA7ec284dEcfa8bf5e7F8B65f568d7B81",
  },
  Tokens: {
    DAI: {
      name: "DAI",
      symbol: "DAI",
      decimals: 6,
      address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
      icon: "/images/coin-icons/dai.svg",
      priceDecimals: 30,
      cToken: {
        name: "tUSDC",
        symbol: "tUSDC",
        decimals: 8,
        address: "0xaa604683c10eF6BE9fbA2add769442224Ef3cB20",
      },
    },
    // USDC: {
    //   name: "USDC",
    //   symbol: "m.USDC",
    //   decimals: 6,
    //   address: "0xEA32A96608495e54156Ae48931A7c20f0dcc1a21",
    //   icon: "/images/coin-icons/usdc.svg",
    //   priceDecimals: 30,
    //   cToken: {
    //     name: "tUSDC",
    //     symbol: "tUSDC",
    //     decimals: 8,
    //     address: "0x18320599eA58B19B3FE12d383F2969C61C1B43F4",
    //   },
    // },
    ETH: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
//   address: eth has no address
      icon: "/images/coin-icons/ethereum.svg",
      priceDecimals: 18,
      cToken: {
        name: "tETH",
        symbol: "tETH",
        decimals: 8,
        address: "0x4c250eC4858B32aA0e11E199C55922E63F41aF12",
      },
    },
    GLP: {
      name: "fsGLP",
      symbol: "fsGLP",
      decimals: 18,

      // staked glp is for approve
      sGLPAddress: "0x2F546AD4eDD93B956C8999Be404cdCAFde3E89AE",
      // fsGLP has balanceOf
      address: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",

      icon: "/images/coin-icons/metis.png",
      priceDecimals: 18,
      cToken: {
        name: "tGLP",
        symbol: "tGLP",
        decimals: 8,
        address: "0x7A0766e8540C15B8De6966cd5CBCC2372a21FAf8",
      },
    },
    WBTC: {
      name: "wBTC",
      symbol: "WBTC",
      decimals: 8,
      address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      icon: "/images/coin-icons/bitcoin.svg",
      priceDecimals: 30,
      cToken: {
        name: "tWBTC",
        symbol: "tWBTC",
        decimals: 8,
        address: "0x549580b92fBf534277Bc328bd8C12f0e9C2bA344",
      },
    },
// };


// {
//     "PriceOracle": "0x61706d8e55A41Ef1a652c2Aba2D072D27Bf21B41",
//     "Unitroller": "0x84A57414910FBfE9f5503bFCA2F1e31B6Ad0981A",
//     "Comptroller": "0xf38Cc17F8857290623BaD04911438d82586cA9DF",
//     "IRModels": {
//       "JumpRateModelV2": {
//         "0__80__50__1000": "0x8081100BA341f2d4962c6fbeBD82cA0F49dC511E"
//       }
//     },
//     "tDAIC": "0xaa604683c10eF6BE9fbA2add769442224Ef3cB20",
//     "tWBTC": "0x549580b92fBf534277Bc328bd8C12f0e9C2bA344",
//     "fsGLP": "0x0D830E0012eCD47652ED1C2b0d9DbB5C93c4d3Ff"
//   }
  }
}