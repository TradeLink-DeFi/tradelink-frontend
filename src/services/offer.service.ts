import {
  GroupedOfferHistory,
  OfferResponse,
  OfferStatus,
} from "@/interfaces/offer.interface";
import axios from "axios";

interface GetOffersProps {
  chainId?: string;
  nftCollectionId?: string;
  search?: string;
  status?: OfferStatus;
}

export interface INftItem {
  nftId: string;
  nftAddress: string;
  name: string;
  imageUrl: string;
  nftCollection: string;
}

interface ICreateOffer {
  tokenIn: string[] | [];
  tokenOut: string[] | [];
  tokenInAmount: string[];
  tokenOutAmount: string[];
  nftIn: INftItem[] | [];
  nftOut: INftItem[] | [];
  traderAddress: string;
  note: string;
  chainA: string;
  chainB: string;
}

const createOffer = async (offer: ICreateOffer) => {
  try {
    const { data } = await axios.post("/offer", offer);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

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
const getHistory = async (isTrader?: boolean) => {
  try {
    const { data } = await axios.get<OfferResponse[]>(
      isTrader ? `/offer/history?isTrader=true` : "/offer/history"
    );
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const mapHistroyByDateGroup = async (isTrader?: boolean) => {
  const offer = await getHistory(isTrader);
  const offerGroupping = offer?.reduce(
    (acc: GroupedOfferHistory[], item: any) => {
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
    },
    []
  );
  return offerGroupping;
};

const getOfferById = async (offerId: string) => {
  try {
    const { data } = await axios.get(`/offer/find/${offerId}`);
    return data;
  } catch (error) {
    console.log("getOfferById error ", error);
  }
};

const updateOfferStatus = async (offerId: string, status: number) => {
  try {
    const { data } = await axios.patch(`/offer/${offerId}`, {
      status: status,
    });
    return data;
  } catch (error) {
    console.log("updateOfferStatus error ", error);
  }
};

export {
  createOffer,
  getOffers,
  getHistory,
  mapHistroyByDateGroup,
  getOfferById,
  updateOfferStatus,
};
