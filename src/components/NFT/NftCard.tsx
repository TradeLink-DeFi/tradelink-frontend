import React, { useEffect, useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NFTFromAPI, NFTItem } from "@/interfaces/item.interface";
import { cn } from "../../../lib/utils";
import { NftMetaData } from "@/interfaces/nft.interface";
import { getMetaData } from "@/services/metadata.service";
import {
  chainPathMapping,
  getChainIdByCollection,
} from "@/configs/chian.config";

export const NftCard = ({
  nftItem,
  nftItemCache,
  chain,
  width = 200,
  height = 200,
  isMicro = false,
}: {
  nftItemCache?: { nftUrl: string; nftId: string };
  width?: number;
  height?: number;
  nftItem: NFTItem | NFTFromAPI | null;
  chain: string;
  isMicro?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [metaData, setMetaData] = useState<NftMetaData>();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function isNFTFromApi(item: any): item is NFTFromAPI {
    return item && typeof item.imageUrl === "string";
  }

  function isNFTItem(item: any): item is NFTItem {
    return item && typeof item.tokenId === "string";
  }

  useEffect(() => {
    const contentURI = isNFTItem(nftItem) && nftItem.contentURI;

    if (contentURI) {
      getMetaData(contentURI)
        .then((res) => {
          setMetaData(res?.data);
        })
        .catch((error) => {
          console.log("getMetaData error", error);
        });
    }
  }, [nftItem]);

  return (
    <div className="rounded-lg">
      <div
        className="relative rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="rounded-lg relative"
          width={width}
          height={height}
          src={
            isNFTItem(nftItem)
              ? metaData?.image
              : isNFTFromApi(nftItem)
              ? nftItem.imageUrl
              : nftItemCache?.nftUrl
          }
          alt=""
          draggable={false}
        />
        <Avatar
          className={cn(
            "absolute z-20 top-2 left-2 w-[15px] h-[15px] opacity-80",
            isMicro && "top-1 left-1 w-[10px] h-[10px]"
          )}
          src={chainPathMapping(
            isNFTItem(nftItem)
              ? chain
              : isNFTFromApi(nftItem)
              ? getChainIdByCollection(nftItem?.name)
              : -1
          )}
        />
        {isHovered && (
          <div className="z-10 absolute h-1/4 left-0 right-0 bottom-0 flex items-center justify-start px-2 bg-white bg-opacity-40 rounded-b-lg">
            <div className="flex flex-col items-center w-full">
              <p
                className={cn("text-white font-light", isMicro && "text-xs")}
              >{`#${
                isNFTItem(nftItem)
                  ? nftItem.tokenId
                  : isNFTFromApi(nftItem)
                  ? nftItem.nftId
                  : nftItemCache?.nftId
              }`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
