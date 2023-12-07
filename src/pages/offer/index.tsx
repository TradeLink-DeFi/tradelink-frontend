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

export default function OfferPage() {
  const [allNftsData, setAllNftsData] = useState<Array<Object>>();

  const { data: sepoliaNfts } = useQuery(GET_SEPOLIA, {
    context: { clientName: "sepolia" },
  });

  const { data: mumbaiNfts } = useQuery(GET_MUMBAI, {
    context: { clientName: "mumbai" },
  });

  const { data: bscNfts } = useQuery(GET_BSC, {
    context: { clientName: "bsc" },
  });

  const { data: fujiNfts } = useQuery(GET_FUJI, {
    context: { clientName: "fuji" },
  });

  const { data: optimismNfts } = useQuery(GET_OPTIMISM, {
    context: { clientName: "optimism" },
  });

  const { data: mySepolia } = useQuery(GET_SEPOLIA_BY_ADDRESS, {
    variables: { walletAddress: "0x443fe6af640c1e6dec1efc4468451e6765152e94" },
    context: { clientName: "sepolia" },
  });

  useEffect(() => {
    if (sepoliaNfts && mumbaiNfts && bscNfts && fujiNfts && optimismNfts) {
      const allNfts = [
        sepoliaNfts,
        mumbaiNfts,
        bscNfts,
        fujiNfts,
        optimismNfts,
      ];
      console.log("allNfts", allNfts);
      setAllNftsData(allNfts);
    }
  }, [sepoliaNfts, mumbaiNfts, bscNfts, fujiNfts, optimismNfts]);

  return (
    <MainLayout>
      <Head>
        <title>TradeLink | Trade</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>

      {allNftsData ? (
        <>
          <div className="w-full">
            <p className="text-xl font-semibold text-left">Create Offer</p>
          </div>
          <DndTrader isCreateOffer={true} />
        </>
      ) : (
        <p>Loading</p>
      )}
    </MainLayout>
  );
}
