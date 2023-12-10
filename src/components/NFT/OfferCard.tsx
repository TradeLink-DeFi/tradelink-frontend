import React, { useEffect, useState } from "react";
import { Avatar, Image } from "@nextui-org/react";
import { NftMetaData } from "@/interfaces/nft.interface";
import { NFTFromAPI, NFTItem, TokenItem } from "@/interfaces/item.interface";
import { formatAmount } from "@/utils/amount.utils";
import { cn } from "../../../lib/utils";
import { chainPathMapping, getChainByChainDBId } from "@/configs/chian.config";

export const OfferCard = ({
  nftItem,
}: {
  nftItem: NFTItem | TokenItem | NFTFromAPI | null;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  function isTokenItem(item: any): item is TokenItem {
    return item && typeof item.symbol === "string";
  }

  function isNFTFromApi(item: any): item is NFTFromAPI {
    return item && typeof item.imageUrl === "string";
  }

  const tokenImage = () => {
    return `/tokens/${isTokenItem(nftItem) ? nftItem?.name : ""}.png`;
  };

  useEffect(() => {
    console.log("nftItem", nftItem);
  }, [nftItem]);

  return (
    <>
      {isNFTFromApi(nftItem) ? (
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
              src={isNFTFromApi(nftItem) ? nftItem.imageUrl : ""}
              alt={isNFTFromApi(nftItem) ? nftItem.name : ""}
              draggable={false}
            />
            <Avatar
              className="absolute z-20 top-2 left-2 w-[15px] h-[15px] opacity-80"
              src={"/images/polygon.jpeg"}
            />
            {isNFTFromApi(nftItem) && isHovered && (
              <div className="z-10 absolute h-1/4 left-0 right-0 bottom-0 flex items-center justify-start px-2 bg-black bg-opacity-80 rounded-b-lg">
                <div className="flex flex-col items-center w-full">
                  <p className="text-white text-xs font-light">{`#${
                    isNFTFromApi(nftItem) ? nftItem.nftId : ""
                  }`}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-gray-100 h-full border-2 border-gray-300 relative opacity-40">
          <div className="h-full flex flex-col justify-around items-center pt-2">
            <Image
              className={cn("w-[25px] h-[25px]")}
              src={tokenImage()}
              alt=""
            />
            <p className={cn(" text-gray-600 text-[10px]")}>
              {formatAmount(
                isTokenItem(nftItem) ? String(nftItem?.amount) : ""
              )}
            </p>
            {/* <div className="border-b border-gray-300 w-full"></div> */}
            <p className={cn("text-gray-600 text-[10px] mt-[-5px]")}>
              {isTokenItem(nftItem) ? nftItem?.symbol : ""}
            </p>
          </div>
          <Avatar
            className={cn(
              "absolute z-20 top-2 left-2 w-[15px] h-[15px]",
              true && "top-1 left-1 w-[10px] h-[10px]"
            )}
            src={chainPathMapping(
              isTokenItem(nftItem) ? getChainByChainDBId(nftItem.chain!) : ""
            )}
          />
        </div>
      )}
    </>
  );
};
