"use client";

import { getChainByChainDBId } from "@/configs/chian.config";
import { NFTItem, TokenItem } from "@/interfaces/item.interface";
import { cn } from "../../../lib/utils";
import Image from "../../../node_modules/next/image";
import { BlankCard } from "../NFT/BlankCard";
import { NftCard } from "../NFT/NftCard";
import { TokenCard } from "../NFT/TokenCard";

export function ShowTradeOffer({
  iWant,
  iHave,
  offerDetail,
}: {
  iWant: (TokenItem | NFTItem)[];
  iHave: (TokenItem | NFTItem)[];
  offerDetail: string;
}) {
  const handleViewTradeItem = (data: any, key: number) => {
    if (data.nftId) {
      return (
        <NftCard
          key={key}
          nftItem={null}
          nftItemCache={{ nftUrl: data.imageUrl, nftId: data.nftId }}
          chain={"1"}
          isMicro
        />
      );
    } else {
      return (
        <TokenCard chain={getChainByChainDBId(data.chain)} item={{ ...data }} />
      );
    }
  };

  const calRowBlankCard = (num: number) => {
    const r = Math.ceil(num / 5);
    return r <= 2 ? 10 : r * 5;
  };

  return (
    <>
      <div className=" w-full p-6 border-1 border-gray-200 rounded-2xl min-h-[350px]">
        <div className="flex align-middle">
          <Image
            src="/offers/IWant.png"
            width={30}
            height={30}
            alt="IWant Badge"
          />
          <p className="pt-[3px] ml-1 font-bold">Offers you want</p>
        </div>
        <div
          className={cn(
            "grid grid-cols-5 gap-4 justify-start mt-4 relative  h-full "
          )}
        >
          {iWant?.map((item, index) => {
            return (
              <div className="z-20" key={index}>
                {handleViewTradeItem(item, index)}
              </div>
            );
          })}

          <div className={cn(`absolute grid grid-cols-5 gap-4 z-[0]`)}>
            {Array.from({
              length: calRowBlankCard(iWant.length),
            }).map((_, index) => (
              <BlankCard key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="my-4 w-full content-center flex justify-center">
        <Image src="/images/trade.svg" alt="trade" width={30} height={30} />
      </div>
      <div className=" w-full p-6 border-1 border-gray-200 rounded-2xl min-h-[350px]">
        <div className="flex flex-wrap">
          <Image
            src="/offers/IHave.png"
            width={30}
            height={30}
            alt="IWant Badge"
          />
          <p className="pt-[3px] ml-1 font-bold">Your trade offer</p>
        </div>
        <div className="grid grid-cols-5 gap-4 justify-start mt-4 relative  h-full ">
          {iHave &&
            iHave?.map((item, index) => {
              return (
                <div className="z-20" key={index}>
                  {handleViewTradeItem(item, index)}
                </div>
              );
            })}

          <div className={cn(`absolute grid grid-cols-5 gap-4 z-[0]`)}>
            {Array.from({
              length: calRowBlankCard(iHave.length),
            }).map((_, index) => (
              <BlankCard key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="font-bold">Offer Details</h1>
        <div className="p-1 text-gray-400">
          <p>{offerDetail || "-asdasdasdwawdas"}</p>
        </div>
      </div>
    </>
  );
}
