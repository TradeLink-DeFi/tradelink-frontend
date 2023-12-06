import { NftMetaData } from "./nft.interface";

export interface Item {
  id: number;
  name: string;
  token: string;
  contractAddress: string;
  metaData: NftMetaData;
}
