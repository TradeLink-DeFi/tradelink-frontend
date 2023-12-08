import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";
import DndTrader from "@/components/Dnd/DndTrader";
import { useQuery } from "@apollo/client";
import {
  GET_SEPOLIA,
  GET_MUMBAI,
  GET_OPTIMISM,
  GET_SEPOLIA_BY_ADDRESS,
  GET_BSC,
  GET_FUJI,
} from "../../../grqphql/queries";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function OfferPage() {
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
        <p className="text-xl font-semibold text-left">Create Offer</p>
      </div>
      <DndTrader isCreateOffer={true} />
    </MainLayout>
  );
}
