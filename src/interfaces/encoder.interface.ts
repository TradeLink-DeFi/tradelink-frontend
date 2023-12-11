import { Abi } from "viem";

export interface Call {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args: any[];
}

export interface IApporveEncode {
  contractAddress: `0x${string}`;
  to: `0x${string}`;
  amountOrTokenId: string;
  isERC20: boolean;
}

export interface IAllowanceEncode {
  contractAddress: `0x${string}`;
  myAddress?: `0x${string}`;
  to?: `0x${string}`;
  tokenId?: string;
  isERC20: boolean;
}

export interface ICreateOfferEncode {
  tokenIn: `0x${string}`[];
  tokenInAmount: bigint[]; // parseEther
  nftIn: `0x${string}`[];
  nftInId: bigint[];
  destSelectorOut: bigint;
  tokenOut: `0x${string}`[];
  tokenOutAmount: bigint[]; // parseEther
  nftOut: `0x${string}`[];
  nftOutId: bigint[];
  ownerOfferAddress: `0x${string}`;
  traderOfferAddress: `0x${string}`;
  deadLine: bigint; // parseEther(timestamp)
  fee: bigint; // parseEther
  feeAddress: `0x${string}`;
  isSuccess: boolean;
}

export interface IFulfillOffer {
  offerId: bigint; // from contract
  destChainSelector: bigint; // chain selector of offer created 
  destChainAddress: `0x${string}`;
  tokenIn: `0x${string}`[];
  tokenInAmount: bigint[]; // parseEther
  nftIn: `0x${string}`[];
  nftInId: bigint[];
  feeAddress: `0x${string}`;
  ownerFulfillAddress: `0x${string}`;
  traderFulfillAddress: `0x${string}`;
  isBridge: boolean; // if token in fulfillOffer chain not same with offer created chain
  isSuccess: boolean; // false
}
