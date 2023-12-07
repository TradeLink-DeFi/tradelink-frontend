import { OfferResponse } from "@/interfaces/offer.interface";
import axios from "axios";

interface GetOffersProps {
  chainId?: string;
  nftCollectionId?: string;
  search?: string;
}

const getOffers = async (query: GetOffersProps) => {
  const key = Object.keys(query) as (keyof GetOffersProps)[];
  const path = key.reduce((acc, cur, key) => {
    if (cur === "search") {
      const length = query[cur]?.length;
      if (length && length > 0)
        return `${acc}${key === 0 ? "?" : "&"}nftId=${query[cur]}`;
      return acc;
    }
    if (cur === "nftCollectionId" && query[cur] === "all") return acc;
    return `${acc}${key === 0 ? "?" : "&"}${cur}=${query[cur]}`;
  }, "/offer");

  console.log("path", path);
  try {
    const { data } = await axios.get<OfferResponse[]>(path);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getOffers };
