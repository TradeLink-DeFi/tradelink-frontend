import { ChainResponse } from "./chain.interface";

export enum OfferStatus {
  CREATE_OFFER_A = 0,
  ACCEPT_B = 1,
  ACCEPT_A = 2,
  CONFIRM_B = 3,
  EXPIRED = 5,
  DELETED = 6,
  SUCCESS = 4,
  FAILED = 7,
}

export enum TokenType {
  ERC20 = "erc20",
  NATIVE = "native",
}

export interface User {
  _id: string;
  walletAddress: string;
}

interface Nft {
  nftId: string;
  nftAddress: string;
  name: string;
  imageUrl: string;
  nftCollection: string;
}

export interface IToken {
  _id: string;
  tokenAddress: string;
  type: TokenType;
  name: string;
  symbol: string;
  decimals: number;
  isActive: boolean;
  chain: string;
}

export interface OfferHistory {
  _id: string;
  createdAt: Date;
  status: number;
}

export interface GroupedOfferHistory {
  date: string;
  offers: OfferHistory[];
}

interface ChainToken {
  _id: string;
  chainName: string;
  chainId: string;
  chainSelector: string;
}

export interface OfferResponse {
  _id: string;
  tokenIn: IToken[];
  tokenOut: IToken[];
  tokenInAmount: string[];
  tokenOutAmount: string[];
  nftIn: Nft[];
  nftOut: Nft[];
  chainTokenIn: ChainToken[];
  chainTokenOut: ChainToken[];
  status: OfferStatus;
  note: string;
  traderAddress: User[];
  fulfilledAddress: User[];
  chainA: ChainResponse[];
  chainB: ChainResponse[];
  createdAt: Date;
  deadline: Date;
}

export interface IOffer {
  _id: string;
  tokenIn: IToken[];
  tokenOut: IToken[];
  tokenInAmount: string[];
  tokenOutAmount: string[];
  nftIn: Nft[];
  nftOut: Nft[];
  chainTokenIn: ChainToken[];
  chainTokenOut: ChainToken[];
  status: OfferStatus;
  note: string;
  traderAddress: User;
  fulfilledAddress: User;
  chainA: ChainResponse[];
  chainB: ChainResponse[];
  createdAt: Date;
  deadline: Date;
}
