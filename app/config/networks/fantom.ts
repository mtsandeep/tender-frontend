
export default {
  ChainId: 250,
  name: "Fantom",
  blockExplorerName: "Fantom",
  blockExplorerUrl: "https://ftmscan.com",
  secondsPerBlock: 1, // 1
  rpcUrls: ["https://rpcapi.fantom.network"],
  userExplorerUrl: "https://ftmscan.com/address/",
  graphUrl: "https://gateway-arbitrum.network.thegraph.com/api/063a2dcfd5d957670864cbe96174e598/subgraphs/id/EN8psujv6UbDVRMs4S1ZcAwWPcQ3ZU2VUk5tj81aaoSk",
  Contracts: {
    Comptroller: "0xaeCc8D03213A2cb39153Eea18B9ab2bB1aB9182b",
    //Comptroller: "0xaeCc8D03213A2cb39153Eea18B9ab2bB1aB9182b",
    PriceOracle: "0x694c23A52827D0349378A4d280956aF98BcA20CF",
    //Maximillion: "0x",
    //interestratemodel: "0x03c2cbB77ba3db103456FE401FEA7A6B52468617",
    //Unitroller: "0x330D4A50630ad2b85Aa8046780A8653b6ef6A98d"
  },
  Tokens: {
    FTM: {
      name: "WFTM",
      symbol: "WFTM",
      decimals: 18,
      address: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83", // Wrapped fantom Address
      icon: "/images/ico/fantom_network.png",
      cToken: {
        name: "eFTM",
        symbol: "eFTM",
        decimals: 8,
        address: "0x32572d9c9291b1B7C5eAC0040af86FfBe1461082", //CERC20 Immutable Contract
        isVault: false,
      },
    },
    /*WETH: {
      name: "WETH",
      symbol: "WETH",
      decimals: 18,
      address: "0x695921034f0387eAc4e11620EE91b1b15A6A09fE", // Wrapped Ethereum Address
     icon: "/images/coin-icons/ethereum.svg",
     cToken: {
        name: "eETH",
        symbol: "eETH",
        decimals: 8,
        address: "0x29b48f04732e02Ec0afEb3Ee4Ec6CdB2D8e1fF56", //CERC20 Immutable Contract
        isVault: false,
      },
    },*/
    BTC: {
      name: "BTC",
      symbol: "BTC",
      decimals: 8,
      address: "0xf1648C50d2863f780c57849D812b4B7686031A3D", // Wrapped Bitcoin Address
      icon: "/images/coin-icons/bitcoin.svg",
      cToken: {
        name: "eWBTC",
        symbol: "eWBTC",
        decimals: 8,
        address: "0x70C566c5e71da54A8F5afc7fc598920D6f5dE206", //CERC20 Immutable Contract
        isVault: false,
      },
    },
    USDC: {
      name: "USDC",
      symbol: "USDC",
      decimals: 6,
      address: "0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf", // USDC Address
      icon: "/images/coin-icons/usdc.svg",
      cToken: {
        name: "eUSDC",
        symbol: "eUSDC",
        decimals: 8,
        address: "0x745CF370167C41efb7179d8A3a819711e79437B9", //CERC20 Immutable Contract
        isVault: false,
      },
    },
    //USDT: {
    //  name: "USDT",
    //  symbol: "USDT",
    //  decimals: 6,
    //  address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    //  icon: "/images/coin-icons/usdt.svg",
    //  cToken: {
    //    name: "tUSDT",
    //    symbol: "tUSDT",
    //    decimals: 8,
    ///    address: "0x4A5806A3c4fBB32F027240F80B18b26E40BF7E31",
     //   isVault: false,
     // },
    //},

    //DAI: {
    //  name: "DAI",
    //  symbol: "DAI",
    //  decimals: 18,
    //  address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    //  icon: "/images/coin-icons/dai.svg",
    //  priceDecimals: 18,
    //  cToken: {
     //   name: "tDAI",
    //    symbol: "tDAI",
    //    decimals: 8,
    //    address: "0xB287180147EF1A97cbfb07e2F1788B75df2f6299",
    ////    isVault: false,
    //  },
    //},

    //FRAX: {
    //  name: "FRAX",
    //  symbol: "FRAX",
    //  decimals: 18,
    //  address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    //  icon: "/images/coin-icons/frax.svg",
    //  cToken: {
    //    name: "tFRAX",
    //    symbol: "tFRAX",
    //    decimals: 8,
    //    address: "0x27846A0f11EDC3D59EA227bAeBdFa1330a69B9ab",
    //    isVault: false,
    //  },
    //},
    //UNI: {
    //  name: "UNI",
    //  symbol: "UNI",
     // decimals: 18,
    //  address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
    ///  icon: "/images/coin-icons/uni.svg",
    //  cToken: {
    //    name: "tUNI",
    //    symbol: "tUNI",
    //    decimals: 8,
    //    address: "0x8b44D3D286C64C8aAA5d445cFAbF7a6F4e2B3A71",
    //    isVault: false,
    //  },
    //},
    //LINK: {
    //  name: "LINK",
    //  symbol: "LINK",
    //  decimals: 18,
    //  address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    //  icon: "/images/coin-icons/link.svg",
    //  cToken: {
    //    name: "tLINK",
    //    symbol: "tLINK",
    //    decimals: 8,
    //   address: "0x87D06b55e122a0d0217d9a4f85E983AC3d7a1C35",
   //    isVault: false,
    //  },
   // },

  },
};
