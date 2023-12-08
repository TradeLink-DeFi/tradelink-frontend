import { GroupedOfferHistory, OfferResponse, OfferStatus } from "@/interfaces/offer.interface";
import axios from "axios";

interface GetOffersProps {
  chainId?: string;
  nftCollectionId?: string;
  search?: string;
  status?: OfferStatus;
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

// filterByUser
const getHistory = async (processing?: boolean) => {
  try {
    const { data } = await axios.get<OfferResponse[]>(processing ? `/offer/history?processing=true` : "/offer/history");
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const mapHistroyByDateGroup = async (processing?: boolean) => {
  const offer = await getHistory(processing);
  const offerGroupping = offer?.reduce((acc: GroupedOfferHistory[], item: any) => {
    const dateKey: string = new Date(item.createdAt).toLocaleDateString();
    const existingDateIndex: number = acc.findIndex(
      (group) => group.date === dateKey
    );

    if (existingDateIndex !== -1) {
      acc[existingDateIndex].offers.push({
        _id: item._id,
        createdAt: new Date(item.createdAt),
        status: item.status,
      });
    } else {
      acc.push({
        date: dateKey,
        offers: [
          {
            _id: item._id,
            createdAt: new Date(item.createdAt),
            status: item.status,
          },
        ],
      });
    }

    return acc;
  }, []);
  return offerGroupping;
};

export { getOffers, getHistory, mapHistroyByDateGroup };
