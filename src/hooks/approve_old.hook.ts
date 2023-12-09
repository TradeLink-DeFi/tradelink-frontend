import { useCallback } from "react";
import { useMulticallWrite } from "./multicall.hook";
import { IApporveEncode } from "@/interfaces/encoder.interface";
import { approveEncoder } from "@/services/contract/encoder.service";
import { parseEther } from 'viem';
interface IUseApprove {
  chainId?: string;
  encoded?: IApporveEncode;
}

export const useApprove = ({ chainId }: IUseApprove) => {

  const { data, isLoading, isSuccess, isError, write } = useMulticallWrite({
    chainId,
  });

  const approve = useCallback((params: IApporveEncode[]) => {
    console.log(approveEncoder(params).approveEncodedParam)
    return write({ args: [approveEncoder(params).approveEncodedParam] });
  }, [write]);

  return { data, isLoading, isSuccess, isError, approve };
};
