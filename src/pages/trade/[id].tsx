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
import { useAccount, useSwitchNetwork } from "wagmi";
export default function TradeById() {
  const router = useRouter();

  const offerId: string = String(router.query.id);

  const [allOfferItems, setAllOfferItems] = useState<(TokenItem | NFTItem)[]>();
  const [allWantItems, setAllWantItems] = useState<(TokenItem | NFTItem)[]>();

  const { data: offerData, isLoading } = useQuery(
    ["offerById", offerId],
    async () => getOfferById(offerId)
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
  const account = useAccount();
  if (isLoading) return <div>Loading...</div>;

  // console.log("offerData", offerData);

  const { traderAddress, status } = offerData || {
    traderAddress: { walletAddress: "" },
    status: "0",
  };

  const ownerAddress = account?.address?.toLocaleLowerCase();

  const renderTrade = () => {
    console.log({ status, traderAddress, ownerAddress });

    if (status === 0 && traderAddress.walletAddress !== ownerAddress) {
      if (offerData && allOfferItems) {
        return (
          <DndTrader
            isCreateOffer={false}
            offerItems={allOfferItems}
            wantItems={allWantItems}
          ></DndTrader>
        );
      }
    }

    if (traderAddress.walletAddress === ownerAddress) {
      return (
        <TradeView
          offerItems={allWantItems}
          wantItems={allOfferItems}
          note={offerData?.node}
          isTrader={true}
          step={status}
        />
      );
    }

    if (offerData?.fullFillAddress === ownerAddress) {
      return (
        <TradeView
          offerItems={allWantItems}
          wantItems={allOfferItems}
          note={offerData?.node}
          isTrader={false}
          step={status}
        />
      );
    }
  };

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
      {renderTrade()}
    </MainLayout>
  );
}
