import { ChainResponse } from "@/interfaces/chain.interface";
import axios from "axios";

const getChains = async () => {
  try {
    const { data } = await axios.get<ChainResponse[]>("/chain");
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export { getChains };
