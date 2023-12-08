import React, { useEffect, useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NftMetaData } from "@/interfaces/nft.interface";
import { NFTItem } from "@/interfaces/item.interface";
import { useQuery } from "@tanstack/react-query";
import { getMetaData } from "@/services/metadata.service";

export const OfferCard = ({
  nftItem,
  chain,
}: {
  nftItem: NFTItem | null;
  chain: string;
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

  return (
    <div className="rounded-lg opacity-30">
      <div
        className="relative rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="rounded-lg relative"
          width={200}
          height={200}
          src={metaData?.image}
          alt={metaData?.name}
          draggable={false}
        />
        <Avatar
          className="absolute z-20 top-2 left-2 w-[15px] h-[15px] opacity-80"
          src={"/images/polygon.jpeg"}
        />
        {isHovered && (
          <div className="z-10 absolute h-1/4 left-0 right-0 bottom-0 flex items-center justify-start px-2 bg-black bg-opacity-80 rounded-b-lg">
            <div className="flex flex-col items-center w-full">
              <p className="text-white text-xs font-light">{`#${nftItem?.tokenId}`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
