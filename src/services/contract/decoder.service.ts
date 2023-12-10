import { decodeFunctionResult, parseEther, Abi } from "viem";
import ERC20Abi from "@/constants/abis/erc20.abi.json";
import Nft721Abi from "@/constants/abis/nft721.abi.json";

export const approveDecoder = (result: string, isERC20: boolean) => {
  return decodeFunctionResult({
    abi: isERC20 ? (ERC20Abi as Abi) : (Nft721Abi as Abi),
    functionName: "approve",
    data: result as `0x${string}`,
  });
};

export const allowanceDecoder = (result: string, isERC20: boolean) => {
  console.log(result);
  return decodeFunctionResult({
    abi: isERC20 ? (ERC20Abi as Abi) : (Nft721Abi as Abi),
    functionName: isERC20 ? "allowance" : "getApproved",
    data: result as `0x${string}`,
  }) as bigint;
};
