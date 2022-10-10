export interface cToken {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
}

export interface Token extends TokenConfig {
  priceInUsd: number;
  sGLPAddress?: any;
}

export interface TokenConfig {
  symbol: string;
  icon: string;
  name: string;
  decimals: number;
  address: string;
  cToken: cToken;
  priceDecimals: number;
}

export interface NetworkData {
  ChainId: number;
  name: string;
  blockExplorerName: string;
  blockExplorerUrl: string;
  userExplorerUrl?: string;
  rpcUrls?: string[];
  secondsPerBlock: number;
  graphUrl: string;
  Contracts: {
    Comptroller: string;
    PriceOracle: string;
  };
  Tokens: {
    [key: string]: TokenConfig;
  };
}

export enum NetworkName {
  rinkeby = "rinkeby",
  metisStartdust = "metisStartdust",
  metisMainnet = "metisMainnet",
  arbitrum = "arbitrum",
  avalanche = "avalanche",
}

export type Networks = {
  [key in NetworkName]: NetworkData;
};

export interface TokenPair {
  token: Token;
  cToken: cToken;
}

export type TenderContext = {
  tokenPairs: TokenPair[];
  networkData: NetworkData;
  markets: Market[];
  currentTransaction: string | null;
  updateTransaction: Function;
  isWaitingToBeMined: boolean;
  setIsWaitingToBeMined: Function;
  blockNumber: number | boolean;
};

export type Market = {
  id: string;
  tokenPair: TokenPair;
  marketData: {
    depositApy: string;
    borrowApy: string;
    totalBorrowed?: number;
    marketSize?: number;
    totalBorrowedUsd?: string;
    marketSizeUsd?: string;
  };
  walletBalance: number;
  supplyBalance: number;
  supplyBalanceInUsd: number;
  borrowBalance: number;
  borrowBalanceInUsd: number;
  borrowLimit: number;
  borrowLimitUsedOfToken: string;
  borrowLimitUsed: string;
  totalBorrowedAmountInUsd: number;
  comptrollerAddress: string;
  maxBorrowLiquidity: number;
  hasSufficientAllowance: boolean;
};
