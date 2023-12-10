"use client";

import { getChainByChainDBId } from "@/configs/chian.config";
import { NFTItem, TokenItem } from "@/interfaces/item.interface";
import Image from "../../../node_modules/next/image";
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
  console.log({ iWant, iHave });

  const handleViewTradeItem = (data: any, key: number) => {
    if (data.nftId) {
      return (
        <NftCard
          key={key}
          nftItem={null}
          nftItemCache={{ nftUrl: data.imageUrl, nftId: data.nftId }}
          chain={"1"}
          isMicro
          width={64}
          height={64}
        />
      );
    } else {
      return (
        <div className="w-[64px] h-[64px]">
          <TokenCard
            chain={getChainByChainDBId(data.chain)}
            item={{ ...data }}
          />
        </div>
      );
    }
    return <></>;
  };

  return (
    <>
      <div className=" w-full p-4 border-1 border-gray-200 rounded-2xl min-h-[240px]">
        <div className="flex align-middle">
          <Image
            src="/offers/IWant.png"
            width={30}
            height={30}
            alt="IWant Badge"
          />
          <p className="pt-[3px] ml-1 font-bold">Offers you want</p>
        </div>
        <div className="flex flex-wrap justify-start gap-2 mt-4">
          {iWant?.map((item, index) => {
            return (
              <div className="" key={index}>
                {handleViewTradeItem(item, index)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="my-4 w-full content-center flex justify-center">
        <Image src="/images/trade.svg" alt="trade" width={30} height={30} />
      </div>
      <div className=" w-full p-4 border-1 border-gray-200 rounded-2xl min-h-[240px]">
        <div className="flex flex-wrap">
          <Image
            src="/offers/IHave.png"
            width={30}
            height={30}
            alt="IWant Badge"
          />
          <p className="pt-[3px] ml-1 font-bold">Your trade offer</p>
        </div>
        <div className="flex flex-wrap justify-start gap-2 mt-4">
          {iHave &&
            iHave?.map((item, index) => {
              return (
                <div className="" key={index}>
                  {handleViewTradeItem(item, index)}
                </div>
              );
            })}
        </div>
      </div>
      <div className="mt-5">
        <h1 className="font-bold">Offer Details</h1>
        <div className="p-1 text-gray-400">
          <p>{offerDetail || '-'}</p>
        </div>
      </div>
    </>
  );
}
