import {
  useContractWrite,
  useContractRead,
  useNetwork,
  UseContractReadConfig,
} from "wagmi";
import { Abi } from "viem";
import Multicallv3Abi from "@/constants/abis/multicall3.abi.json";
import { contractAddressByChainId } from "@/configs/contract.config";

export interface IUseMulticall {
  chainId?: string;
  encoded?: { target: `0x${string}`; callData: `0x${string}` }[];
}

export const useMulticallWrite = ({ chainId }: IUseMulticall) => {
  const { chain } = useNetwork();

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.multicall || "",
    abi: Multicallv3Abi as Abi,
    functionName: "aggregate",
  });

  return { data, isLoading, isSuccess, isError, write };
};

export const useMulticallRead = ({ chainId, encoded }: IUseMulticall) => {
  const { chain } = useNetwork();

  const { data, isError, isLoading, isSuccess, refetch } = useContractRead({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.multicall || "",
    abi: Multicallv3Abi as Abi,
    functionName: "aggregate",
    args: [encoded],
    watch: true,
  } as unknown as UseContractReadConfig<Abi, "aggregate", unknown>);

  return { data, isError, isLoading, isSuccess, refetch };
};
