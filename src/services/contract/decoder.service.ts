import { decodeFunctionResult, decodeEventLog, Abi } from "viem";

import ERC20Abi from "@/constants/abis/erc20.abi.json";
import Nft721Abi from "@/constants/abis/nft721.abi.json";
import TradelinkCCIPV1Abi from "@/constants/abis/tradelinkv1.abi.json";

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

export const createOrderLogDecoder = (topics: [], data: `0x${string}`) => {
  const event = decodeEventLog({
    abi: TradelinkCCIPV1Abi,
    data: data,
    topics: topics,
  }) as {
    eventName: string;
    args: { offerId: bigint; ownerOffer: string };
  };

  return {
    offerId: event.args.offerId.toString(),
    ownerOffer: event.args.ownerOffer,
  };
};
