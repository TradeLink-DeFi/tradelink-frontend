import { useContractWrite, usePrepareContractWrite } from "wagmi";
import Multicallv3Abi from "@/constants/abis/multicall3.abi.json";

export const useAllowances = () => {
  const { config } = usePrepareContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: Multicallv3Abi,
    functionName: "aggregate",
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
};
