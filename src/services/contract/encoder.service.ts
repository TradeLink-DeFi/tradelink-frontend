import {
  Call,
  IAllowanceEncode,
  IApporveEncode,
} from "@/interfaces/encoder.interface";
import { encodeFunctionData, parseEther, Abi } from "viem";
import ERC20Abi from "@/constants/abis/erc20.abi.json";
import Nft721Abi from "@/constants/abis/nft721.abi.json";

export const multicallEncoder = (calls: Call[]) => {
  const callsEncoded = calls.map((call) => {
    const encoded = encodeFunctionData({
      abi: call.abi,
      functionName: call.functionName,
      args: call.args,
    });
    return {
      target: call.address,
      callData: encoded,
    };
  });

  return callsEncoded;
};

// Note: to -> the person is approved
// isERC20 -> if true is erc20, other is nft
export const approveEncoder = (approveParams: IApporveEncode[]) => {
  const isERC20s: boolean[] = [];
  const approveParamFormat: Call[] = approveParams.map((item) => {
    isERC20s.push(item.isERC20 && true);
    return {
      address: item.contractAddress,
      abi: item.isERC20 ? (ERC20Abi as Abi) : (Nft721Abi as Abi),
      functionName: "approve",
      args: [
        item.to,
        item.isERC20 ? parseEther(item.amountOrTokenId) : item.amountOrTokenId,
      ],
    };
  });
  const approveEncodedParam = multicallEncoder(approveParamFormat);
  return { approveEncodedParam, isERC20s };
};

export const allowanceEncoder = (allowanceParams: IAllowanceEncode[]) => {
  const isErc20s: boolean[] = [];
  const allowanceParamFormat: Call[] = allowanceParams.map((item) => {
    isErc20s.push(item.isERC20 && true);
    return item.isERC20
      ? {
          address: item.contractAddress,
          abi: ERC20Abi as Abi,
          functionName: "allowance",
          args: [item.myAddress, item.to ?? item.contractAddress],
        }
      : {
          address: item.contractAddress,
          abi: Nft721Abi as Abi,
          functionName: "getApproved",
          args: [item.tokenId],
        };
  });
  const allowanceEncodedParam = multicallEncoder(allowanceParamFormat);
  return { allowanceEncodedParam, isErc20s };
};
