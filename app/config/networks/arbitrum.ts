export default {
  ChainId: 42161,
  name: "Arbitrum",
  blockExplorerName: "Arbiscan",
  blockExplorerUrl: "https://arbiscan.io/tx",
  Contracts: {
    Comptroller: "0x5aDa4F2951d6BDc644605FF7241354c85AC5B7B1",
    PriceOracle: "0x4F6D68130140578d2C071f210b544c27923E133d",
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
        address: "0x6995406a7e0f6D6808A0a8be54019dCaDeE23434",
      },
    },

    ETH: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      //   address: eth has no address
      address: "eth_has_no_address...duh", // necessary for type checker
      icon: "/images/coin-icons/ethereum.svg",
      priceDecimals: 18,
      cToken: {
        name: "tETH",
        symbol: "tETH",
        decimals: 8,
        address: "0x7C0beDaF3aD27E50dF2810B4611B5222e12696Dc"
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
        address: "0xEcCAECa08a6AD9D96A782B65c5e7F9834a5126c3"
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
        address: "0x07Fc3fC969d938Bd34EA506fC85eb3A62627F23A",
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
        address: "0x423dB304E318693EB14c891B104AcB3af35fC69f",
      },
    },

  }
}
