export default {
  ChainId: 42161,
  name: "Arbitrum",
  blockExplorerName: "Arbiscan",
  blockExplorerUrl: "https://arbiscan.io/tx",
  Contracts: {
    Comptroller: "0x60437FEE4ddBdA6e47955b6255E312F1ED067033",
    PriceOracle: "0xD550A36DC56046afa908c52579f130e724D83eae",
  },
  Tokens: {

    FRAX: {
      name: "FRAX",
      symbol: "FRAX",
      decimals: 18,
      address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
      icon: "/images/coin-icons/frax.svg",
      priceDecimals: 28,
      cToken: {
        name: "tFRAX",
        symbol: "tFRAX",
        decimals: 8,
        address: "0x86356683eca061FA3dD795aF3A22a1530a999b58",
      },
    },


    DAI: {
      name: "DAI",
      symbol: "DAI",
      decimals: 18,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      icon: "/images/coin-icons/dai.svg",
      priceDecimals: 28,
      cToken: {
        name: "tDAI",
        symbol: "tDAI",
        decimals: 8,
        address: "0x916b44509CcfC5238f8Ce9a30bEB1BF861B70779",
      },
    },


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
        address: "0x0BdF3cb0D390ce8d8ccb6839b1CfE2953983b5f1",
      },
    },

    USDT: {
      name: "USDT",
      symbol: "USDT",
      decimals: 6,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      icon: "/images/coin-icons/usdt.svg",
      priceDecimals: 28,
      cToken: {
        name: "tUSDC",
        symbol: "tUSDC",
        decimals: 8,
        address: "0xCAA772eaCbCAD50E0decC64Ab4748DC1A11Cf731",
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
        address: "0x3EfFa48cB7c65399676D49f4B08696151f2446CC"
      },
    },

    GLP: {
      name: "GLP",
      symbol: "GLP",
      decimals: 18,

      // staked glp is for approve
      sGLPAddress: "0x2F546AD4eDD93B956C8999Be404cdCAFde3E89AE",
      // fsGLP has balanceOf
      address: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",

      icon: "/images/coin-icons/glp.svg",
      priceDecimals: 28,
      cToken: {
        name: "tGLP",
        symbol: "tGLP",
        decimals: 8,
        address: "0x3fD112f5c6648DD3832722099D034c9bdb0798bD"
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
        address: "0x29D4Cf28db3f978591F9868006BD3c5D2f36801f",
      },
    },

    LINK: {
      name: "LINK",
      symbol: "LINK",
      decimals: 18,
      address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      icon: "/images/coin-icons/link.svg",
      priceDecimals: 28,
      cToken: {
        name: "tLINK",
        symbol: "tLINK",
        decimals: 8,
        address: "0xE30a6c7caBFB3b509EC2e765A70cA399a4d9e2f1",
      },
    },


    UNI: {
      name: "UNI",
      symbol: "UNI",
      decimals: 18,
      address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
      icon: "/images/coin-icons/uni.svg",
      priceDecimals: 28,
      cToken: {
        name: "tUNI",
        symbol: "tUNI",
        decimals: 8,
        address: "0x75095636CD74FdDA8bC36a2bdC455489C86B30bf",
      },
    },

  }
}
