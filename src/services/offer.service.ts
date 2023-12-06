import { OfferResponse } from "@/interfaces/offer.interface";
import axios from "axios";

const getOffers = async () => {
  try {
    const { data } = await axios.get<OfferResponse[]>("/offer");
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getOffers };
