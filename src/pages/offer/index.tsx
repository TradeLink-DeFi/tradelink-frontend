import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";
import DndTrader from "@/components/Dnd/DndTrader";

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

      <DndTrader />
    </MainLayout>
  );
}
