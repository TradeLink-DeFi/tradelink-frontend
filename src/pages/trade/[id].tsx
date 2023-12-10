import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";
import DndTrader from "@/components/Dnd/DndTrader";
import { Image } from "@nextui-org/react";
import { getOfferById } from "@/services/offer.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import TradeView from "@/components/TradeView/TradeView";
import { useEffect, useState } from "react";
import { NFTItem, TokenItem } from "@/interfaces/item.interface";

export default function TradeById() {
  const router = useRouter();

  const offerId: string = String(router.query.id);

  const [allOfferItems, setAllOfferItems] = useState<(TokenItem | NFTItem)[]>();
  const [allWantItems, setAllWantItems] = useState<(TokenItem | NFTItem)[]>();

  const { data: offerData } = useQuery(["offerById", offerId], async () =>
    getOfferById(offerId)
  );

  useEffect(() => {
    const editTokenIn = offerData?.tokenIn?.map((item: any, index: number) => {
      item.amount = offerData?.tokenInAmount[index];
      return item;
    });
    const editTokenOut = offerData?.tokenOut?.map(
      (item: any, index: number) => {
        item.amount = offerData?.tokenOutAmount[index];
        return item;
      }
    );

    const allOffer = offerData?.nftIn?.concat(editTokenIn);
    const wantItem = offerData?.nftOut?.concat(editTokenOut);

    if (allOffer) {
      setAllOfferItems(allOffer);
    }
    if (wantItem) {
      setAllWantItems(wantItem);
    }
  }, [offerData]);

  return (
    <MainLayout>
      <Head>
        <title>TradeLink | Trade</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <div className="w-full">
        <p className="text-xl font-semibold text-left">
          Trade Offer #{router.query.id}
        </p>
      </div>

      {offerData && allOfferItems && (
        <DndTrader
          isCreateOffer={false}
          offerItems={allOfferItems}
          wantItems={allWantItems}
        ></DndTrader>
      )}

      {/* <TradeView /> */}
    </MainLayout>
  );
}
