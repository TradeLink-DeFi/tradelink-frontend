import { NftMetaData } from "./nft.interface";

export interface Item {
  id: number;
  name: string;
  chainId: string;
  contractAddress: string;
  tokenId: string | undefined;
  isNft: boolean;
  metaData: NftMetaData | null;
}


export interface DndItem {
  id: number;
  title: string;
  icon: string | undefined;
  components: Item[] | [];
}
