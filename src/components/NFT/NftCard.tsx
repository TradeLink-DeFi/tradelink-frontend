import React, { useEffect, useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NFTItem } from "@/interfaces/item.interface";
import { cn } from "../../../lib/utils";
import { NftMetaData } from "@/interfaces/nft.interface";
import { getMetaData } from "@/services/metadata.service";
import { chainPathMapping } from "@/configs/chian.config";

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
  nftItem: NFTItem | null;
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

  useEffect(() => {
    if (nftItem?.contentURI) {
      getMetaData(nftItem?.contentURI)
        .then((res) => {
          setMetaData(res?.data);
        })
        .catch((error) => {
          console.log("getMetaData error", error);
        });
    }
  }, [nftItem?.contentURI]);

  console.log("chain", chain);

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
          src={metaData?.image ?? nftItemCache?.nftUrl}
          alt=""
          draggable={false}
        />
        <Avatar
          className={cn(
            "absolute z-20 top-2 left-2 w-[15px] h-[15px] opacity-80",
            isMicro && "top-1 left-1 w-[10px] h-[10px]"
          )}
          src={chainPathMapping(chain || -1)}
        />
        {isHovered && (
          <div className="z-10 absolute h-1/4 left-0 right-0 bottom-0 flex items-center justify-start px-2 bg-white bg-opacity-40 rounded-b-lg">
            <div className="flex flex-col items-center w-full">
              <p
                className={cn("text-white font-light", isMicro && "text-xs")}
              >{`#${nftItem?.tokenId ?? nftItemCache?.nftId}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
