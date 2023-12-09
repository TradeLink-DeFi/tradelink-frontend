import { Abi } from "viem";

export interface Call {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args: any[];
}

export interface IApporveEncode {
  contractAddress: `0x${string}`
  to: `0x${string}`;
  amountOrTokenId: string;
  isERC20: boolean;
}

export interface IAllowanceEncode {
  contractAddress: `0x${string}`
  myAddress?: `0x${string}`;
  to?: `0x${string}`;
  tokenId?: string;
  isERC20: boolean;
}