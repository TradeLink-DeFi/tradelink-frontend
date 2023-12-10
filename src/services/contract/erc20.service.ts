import { contractAddressByChainId } from "@/configs/contract.config";
import { erc20ABI } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";
import { TokenItem } from "@/interfaces/item.interface";
import { parseEther } from "viem";

export const getAllowance = async (
  token: TokenItem,
  chainId: string,
  address: `0x${string}`,
  amount: string
) => {
  const allAddress = contractAddressByChainId(chainId ?? "");
  const tradelinkContract = allAddress["tradelink"];
  const contractAddress: `0x${string}` = token.tokenAddress;

  console.log("allAddress", allAddress);
  console.log("tradelinkContract", tradelinkContract);

  const paresAmount = parseEther(amount);
  console.log("paresAmount ", paresAmount);

  return await readContract({
    address: contractAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address, tradelinkContract],
  })
    .then(async (allowance: bigint) => {
      if (allowance < paresAmount) {
        console.log("not approved");
        return await writeContract({
          address: contractAddress,
          abi: erc20ABI,
          functionName: "approve",
          args: [tradelinkContract!, paresAmount],
        })
          .then((hash) => {
            if (hash) {
              return true;
            } else {
              return false;
            }
          })
          .catch((err) => {
            return false;
          });
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.log("allowance error", error);
      return false;
    });
};
