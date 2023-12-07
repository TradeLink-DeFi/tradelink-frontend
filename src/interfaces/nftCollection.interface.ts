import { ChainResponse } from "./chain.interface";

export interface NftCollectionResponse {
  _id: string;
  name: string;
  address: string;
  chain: ChainResponse[];
}
