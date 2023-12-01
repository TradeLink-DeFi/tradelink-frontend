import React, { useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NftMetaData } from "@/interfaces/nft.interface";

export const NftCard = ({
  nft,
  chain,
}: {
  nft: NftMetaData;
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
    <div className="rounded-lg">
      <div
        className="relative rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className="rounded-lg relative"
          width={200}
          height={200}
          src={nft.image}
          alt=""
          draggable={false}
        />
        <Avatar
          className="absolute z-20 top-2 left-2 w-[15px] h-[15px] opacity-80"
          src={"/polygon.jpeg"}
        />
        {isHovered && (
          <div className="z-10 absolute h-2/5 left-0 right-0 bottom-0 flex items-center justify-start px-2 bg-black bg-opacity-40 rounded-lg">
            <div className="flex flex-col items-start truncate">
              <p className="text-white text-xs font-semibold">
                {"Weapon Scifi"}
              </p>
              <p className="text-gray-400 text-xs">{"#123456"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
