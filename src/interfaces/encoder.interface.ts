import { Abi } from "viem";

export interface Call {
  address: `0x${string}`;
  abi: Abi;
  functionName: string;
  args: any[];
}
