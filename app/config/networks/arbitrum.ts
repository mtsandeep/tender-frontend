export default {
  ChainId: 42161,
  blockExplorerName: "Arbiscan",
  blockExplorerUrl: "https://arbiscan.io/tx",
  Contracts: {
    Comptroller: "0x5aDa4F2951d6BDc644605FF7241354c85AC5B7B1",
    PriceOracle: "0x4F6D68130140578d2C071f210b544c27923E133d",
  },
  Tokens: {
    // DAI: {
    //   name: "DAI",
    //   symbol: "DAI",
    //   decimals: 18,
    //   address: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    //   icon: "/images/coin-icons/dai.svg",
    //   priceDecimals: 30,
    //   cToken: {
    //     name: "tDAI",
    //     symbol: "tDAI",
    //     decimals: 8,
    //     address: "0xeA4D2fF197fDf5d74554C17aCb720b9fA25D7cB7",
    //   },
    // },

    USDC: {
      name: "USDC",
      symbol: "USDC",
      decimals: 6,
      address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      icon: "/images/coin-icons/usdc.svg",
      priceDecimals: 28,
      cToken: {
        name: "tUSDC",
        symbol: "tUSDC",
        decimals: 8,
        address: "0x6995406a7e0f6D6808A0a8be54019dCaDeE23434",
      },
    },

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
        address: "0x7C0beDaF3aD27E50dF2810B4611B5222e12696Dc"
        // address: "0x39D3C99F3B8b86C44aAe49EAdaBab3b00f106FED"
        // address: "0x39D3C99F3B8b86C44aAe49EAdaBab3b00f106FED",
      },
    },

    GLP: {
      name: "GLP",
      symbol: "fsGLP",
      decimals: 18,

      // staked glp is for approve
      sGLPAddress: "0x2F546AD4eDD93B956C8999Be404cdCAFde3E89AE",
      // fsGLP has balanceOf
      address: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",

      icon: "/images/coin-icons/metis.png",
      priceDecimals: 28,
      cToken: {
        name: "tGLP",
        symbol: "tGLP",
        decimals: 8,
        address: "0x03FCED65cdde966555dB96bF2A5E9A97564dBe05"
        // address: "0x7A0766e8540C15B8De6966cd5CBCC2372a21FAf8", old
      },
    },

    WBTC: {
      name: "wBTC",
      symbol: "WBTC",
      decimals: 8,
      address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      icon: "/images/coin-icons/bitcoin.svg",
      priceDecimals: 28,
      cToken: {
        name: "tWBTC",
        symbol: "tWBTC",
        decimals: 8,
        address: "0xdE1Ec670986326312bc705b4ABC3aa18652DfbBC",
      },
    },

    // IWBTC: {
    //   name: "IwBTC",
    //   symbol: "IWBTC",
    //   decimals: 8,
    //   address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    //   icon: "/images/coin-icons/bitcoin.svg",
    //   priceDecimals: 30,
    //   cToken: {
    //     name: "tWBTC",
    //     symbol: "tWBTC",
    //     decimals: 8,
    //     // address: "0xb8Cc8EF4998796Cc940d3c6C64104f990e5620b5", delegator
    //     address: "0x5EC9A72e2987CE907Ad78724e83927d8C66A4555",
    //   },
    // },
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
