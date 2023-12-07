import { GroupedOfferHistory, OfferResponse } from "@/interfaces/offer.interface";
import axios from "axios";

const getOffers = async () => {
  try {
    const { data } = await axios.get<OfferResponse[]>("/offer");
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
