import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";
import TradeView from "@/components/TradeView/TradeView";
import { useRouter } from "next/router";

export default function TradeById() {
  const router = useRouter();
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
      {/* <DndTrader isCreateOffer={false}></DndTrader> */}
      <TradeView />
    </MainLayout>
  );
}
