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

export interface NFTItem {
  contentURI: string;
  createdAtTimestamp: string;
  id: string;
  tokenId: string;
  __typename: string;
}

export interface TokenItem {
  decimals: number;
  isActive: boolean;
  name: string;
  symbol: string;
  tokenAddress: string;
  type: string;
  __v: number;
  _id: string;
}

export interface DndItem {
  id: number;
  title: string;
  icon: string | undefined;
  components: NFTItem[] | TokenItem[] | [];
}
