// import { OfferResponse } from "@/interfaces/offer.interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTokens = async (chainId: string) => {
  try {
    const { data } = await axios.get(`/token?chainId=${chainId}`);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const useTokens = (chainId: string) => {
  return useQuery(["tokens", chainId], async () => getTokens(chainId), {
    // Optional configuration options
    staleTime: 10000, // 10 seconds
    cacheTime: 60000, // 1 minute
    refetchOnWindowFocus: false,
  });
};
