import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";
import OfferPostModule from "@/components/OfferPost/OfferPostModule";
import OfferHistoryModule from "@/components/OfferHistory/OfferHistoryModule";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>TradeLink | App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </Head>
      <div className="flex w-full space-x-6">
        <div className="w-2/3">
          <OfferPostModule />
        </div>
        <div className="w-1/3">
          <OfferHistoryModule />
        </div>
      </div>
    </MainLayout>
  );
}
