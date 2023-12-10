import React, { useState } from "react";
import { Avatar, Divider, Image } from "@nextui-org/react";
import { Item, TokenItem } from "@/interfaces/item.interface";
import { chainPathMapping } from "@/configs/chian.config";
import { IToken } from "@/interfaces/offer.interface";
import { cn } from "../../../lib/utils";
import { formatAmount } from "@/utils/amount.utils";

export const TokenCard = ({
  itemCache,
  item,
  chain,
  isMicro,
}: {
  item?: TokenItem;
  itemCache?: IToken & { amount: string };
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
        <Image className={cn("w-[30px] h-[30px]")} src={tokenImage()} alt="" />
        <p className={cn(" text-gray-600 text-xs", isMicro && "text-[10px]")}>
          {formatAmount(item?.amount ?? "0") ??
            formatAmount(itemCache?.amount ?? "0")}
        </p>
        {/* <div className="border-b border-gray-300 w-full"></div> */}
        <p className={cn("text-gray-600 text-xs mt-[-5px]", isMicro && "text-[10px]")}>
          {item?.symbol ?? itemCache?.symbol}
        </p>
      </div>
      <Avatar
        className={cn(
          "absolute z-20 top-2 left-2 w-[15px] h-[15px]",
          isMicro && "top-1 left-1 w-[10px] h-[10px]"
        )}
        src={chainPathMapping(chain)}
      />
    </div>
  );
};
