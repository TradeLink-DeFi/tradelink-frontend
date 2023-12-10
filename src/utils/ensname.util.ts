import { fetchEnsName } from "@wagmi/core";
import { truncateString } from "./formatString.util";
export const getEnsName = async (walletAddress: string): Promise<string> => {
  const address = toPrefixedHexString(walletAddress);
  try {
    const ensName = await fetchEnsName({
      address,
      //fix chainId for sepolia
      chainId: 11155111,
    });
    console.log("try case");
    if (!ensName) {
      return truncateString(address);
    }
    return ensName;
  } catch (error) {
    console.log("catch case");

    return walletAddress;
  }
};

function toPrefixedHexString(value: string): `0x${string}` {
  return `${value}` as `0x${string}`;
}
