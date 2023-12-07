import { NftCollectionResponse } from "@/interfaces/nftCollection.interface";
import axios from "axios";

const getNftCollection = async () => {
  try {
    const { data } = await axios.get<NftCollectionResponse[]>("/nft-collection");
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getNftCollection };
