import { CONTRACT_ADDRESS } from "@/constants/address.constant";

export const contractAddressByChainId = (chainId: string) => {
  return CONTRACT_ADDRESS[
    chainId as unknown as keyof typeof CONTRACT_ADDRESS
  ] as { [contract: string]: `0x${string}` };
};
