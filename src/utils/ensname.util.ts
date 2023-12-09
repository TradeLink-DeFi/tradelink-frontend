import { fetchEnsName } from "@wagmi/core";
import { truncateString } from "./formatString.util";
export const getEnsName = async (walletAddress: string): Promise<string> => {
  const address = toPrefixedHexString(walletAddress);
  const ensName = await fetchEnsName({
    address,
    //fix chainId for sepolia
    chainId: 11155111,
  });

  if (!ensName) {
    return truncateString(address);
  }
  return ensName;
};

function toPrefixedHexString(value: string): `0x${string}` {
  return `${value}` as `0x${string}`;
}
