import { useMemo, useState } from "react";
import { IUseMulticall, useMulticallRead } from "./multicall.hook";
import { formatEther } from "viem";
import { allowanceDecoder } from "@/services/contract/decoder.service";
import { IAllowanceEncode } from "@/interfaces/encoder.interface";
import { allowanceEncoder } from "@/services/contract/encoder.service";

export const useAllowance = ({
  chainId,
}: IUseMulticall) => {
  const [params, setParams] = useState<IAllowanceEncode[]>([]);

  // STEP1: encode data
  const paramEncoded = useMemo(() => allowanceEncoder(params), [params]);

  // STEP2: call multicall contract
  const { data, isLoading, isSuccess, isError, refetch } = useMulticallRead({
    chainId,
    encoded: paramEncoded.allowanceEncodedParam || undefined,
  });

  // STEP3: decode data
  const allowance = useMemo(() => {
    return data && data[1].map((item: string, key: number) =>
      formatEther(allowanceDecoder(item, paramEncoded.isErc20s[key]))
    );
  }, [data, paramEncoded.isErc20s]);

  return { allowance, isLoading, isSuccess, isError, setParams, params, refetch };
};
