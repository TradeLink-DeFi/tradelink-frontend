import React, { useState } from "react";
import { Avatar, Divider, Image } from "@nextui-org/react";
import { Item } from "@/interfaces/item.interface";
import { chainPathMapping } from "@/configs/chian.config";
import { IToken } from "@/interfaces/offer.interface";

export const TokenCard = ({
  itemCache,
  item,
  chain,
  isMicro = false,
}: {
  itemCache?: IToken & { amount: string };
  item?: Item;
  chain: string;
  isMicro?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const tokenImage = () => {
    return `/tokens/${item?.name ?? itemCache?.name}.png`;
  };

  return (
    <div className="rounded-lg bg-gray-100 h-full border-2 border-gray-300 relative">
      <div
        className="h-full flex flex-col justify-around items-center pt-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar className="w-[30px] h-[30px] mx-3 my-1" src={tokenImage()} />
        <div className="w-full h-1/6 border-t border-gray-300 flex justify-center items-center">
          <p className="font-light text-gray-600 text-xs px-1">
            {itemCache?.amount}{" "}{item?.name ?? itemCache?.name}
          </p>
        </div>
      </div>
      <Avatar
        className="absolute z-20 top-2 left-2 w-[15px] h-[15px]"
        src={chainPathMapping(chain)}
      />
    </div>
  );
};
