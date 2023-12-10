import { useMemo, useState } from "react";
import { formatEther, Abi } from "viem";
import {
  useNetwork,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { contractAddressByChainId } from "@/configs/contract.config";
import TradeLinkCCIPV1 from "@/constants/abis/tradelinkv1.abi.json";
import { createOrderLogDecoder } from "@/services/contract/decoder.service";

interface IUseGetFeeOfferParams {
  fulfillOfferId: string;
  destChainSelector: string;
  destChainAddress: `0x${string}`;
  feeTokenAddress: `0x${string}`;
}

// -> getFeeOffer - pass
// TODO: recommended change hook to function
export const useGetFeeOffer = ({ chainId }: { chainId?: string }) => {
  const { chain } = useNetwork();
  const [params, setParams] = useState<IUseGetFeeOfferParams>({
    fulfillOfferId: "",
    destChainSelector: "",
    destChainAddress: "0x",
    feeTokenAddress: "0x",
  });

  const {
    fulfillOfferId,
    destChainSelector,
    destChainAddress,
    feeTokenAddress,
  } = params;

  const {
    data: raw,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useContractRead({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.tradelink || "",
    abi: TradeLinkCCIPV1 as Abi,
    functionName: "getFeeOffer",
    args: [
      fulfillOfferId,
      destChainSelector,
      destChainAddress,
      feeTokenAddress,
    ],
    watch: true,
  });

  const data = useMemo(
    () => formatEther(BigInt((raw || "").toString())),
    [raw]
  );

  return {
    raw,
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
    params,
    setParams,
  };
};

interface IUseGetFeeFulfillOfferParams {
  step: string;
  offerId: string;
  fulfillOfferId: string;
  fulfillInfo: string; // encode by fulfillOfferEncoder function
}

// -> getFeeFulfillOffer - test - demo
// TODO: recommended change hook to function
export const useGetFeeFulfillOffer = ({ chainId }: { chainId?: string }) => {
  const { chain } = useNetwork();
  const [params, setParams] = useState<IUseGetFeeFulfillOfferParams>({
    step: "",
    offerId: "",
    fulfillOfferId: "",
    fulfillInfo: "", // use fulfillOfferEncoder function
  });

  const { step, offerId, fulfillOfferId, fulfillInfo } = params;

  const {
    data: raw,
    isError,
    isLoading,
    isSuccess,
    refetch,
  } = useContractRead({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.tradelink || "",
    abi: TradeLinkCCIPV1 as Abi,
    functionName: "getFeeFulfillOffer",
    args: [[step, offerId, fulfillOfferId, fulfillInfo]],
    watch: true,
  });

  const data = useMemo(
    () => formatEther(BigInt((raw || "").toString())),
    [raw]
  );

  return {
    raw,
    data,
    isError,
    isLoading,
    isSuccess,
    refetch,
    params,
    setParams,
  };
};

// creaetOffer - test - demo
// Note: use createOfferEncoder function to encode argument
export const useCreateOffer = ({ chainId }: { chainId?: string }) => {
  const { chain } = useNetwork();

  console.log(
    chainId ?? chain?.id.toString() ?? "",
    contractAddressByChainId(chainId ?? chain?.id.toString() ?? ""),
    contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
      ?.tradelink || ""
  );

  const { data: _data, write } = useContractWrite({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.tradelink || "",
    abi: TradeLinkCCIPV1 as Abi,
    functionName: "createOffer",
  });

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: _data?.hash,
  });

  const result = useMemo(() => {
    const length = data?.logs.length;
    if (length && data?.logs[length - 1]) {
      return createOrderLogDecoder(data.logs[length - 1].topics as [], data.logs[length - 1].data);
    }
    return null;
  }, [data]);

  return { result, isLoading, isSuccess, isError, write };
};

// fulfillOffer - test - demo
// Note: use fulfillOfferEncoder function to encode argument
export const useFulfillOffer = ({ chainId }: { chainId?: string }) => {
  const { chain } = useNetwork();

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    address:
      contractAddressByChainId(chainId ?? chain?.id.toString() ?? "")
        ?.tradelink || "",
    abi: TradeLinkCCIPV1 as Abi,
    functionName: "fulfillOffer",
  });

  return { data, isLoading, isSuccess, isError, write };
};
