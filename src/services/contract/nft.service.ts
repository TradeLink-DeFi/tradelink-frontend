import { contractAddressByChainId } from "@/configs/contract.config";
import { erc721ABI } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";

export const getApproved = async (
  tokenId: string,
  col: string,
  chainId: string
) => {
  const collection = col?.toLocaleLowerCase();
  const allAddress = contractAddressByChainId(chainId ?? "");
  const contractAddress = allAddress[collection];

  const tradelinkContract = allAddress["tradelink"];
  const parsedTokenId = BigInt(tokenId);

  return await readContract({
    address: contractAddress,
    abi: erc721ABI,
    functionName: "getApproved",
    args: [parsedTokenId],
  })
    .then(async (data) => {
      console.log("getApproved", data);
      if (data == "0x0000000000000000000000000000000000000000") {
        return await writeContract({
          address: contractAddress,
          abi: erc721ABI,
          functionName: "approve",
          args: [tradelinkContract!, parsedTokenId],
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
    .catch(async (error) => {
      console.log("getApproved error", error);
      return false;
    });
};
