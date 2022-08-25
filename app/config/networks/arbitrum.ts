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
