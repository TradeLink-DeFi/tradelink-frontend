import React, { useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NftMetaData } from "@/interfaces/nft.interface";
import { Item } from "@/interfaces/item.interface";

export const OfferCard = ({
  nftItem,
  chain,
}: {
  nftItem: Item | null;
  chain: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
          src={nftItem?.metaData?.image}
          alt={nftItem?.metaData?.name}
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
