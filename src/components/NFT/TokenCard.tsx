import React, { useState } from "react";
import { Avatar, Divider, Image } from "@nextui-org/react";
import { Item, TokenItem } from "@/interfaces/item.interface";

export const TokenCard = ({
  item,
  chain,
  isMicro,
}: {
  item: TokenItem;
  chain: string;
  isMicro: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const tokenImage = () => {
    return "/next.svg";
  };

  return (
    <div className="rounded-lg bg-gray-100 h-full border-2 border-gray-300 relative">
      <div
        className="h-full flex flex-col justify-around items-center pt-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar className="w-[60px] h-[60px]" src={tokenImage()} />
        <div className="w-full h-1/6 border-t border-gray-300 flex justify-center items-center">
          <p className="font-light pt-2 text-gray-600 text-sm">{item.name}</p>
        </div>
      </div>
      <Avatar
        className="absolute z-20 top-2 left-2 w-[15px] h-[15px]"
        src={"/images/polygon.jpeg"}
      />
    </div>
  );
};
