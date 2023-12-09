import { useQuery } from "@tanstack/react-query";
import OfferHistoryItem from "./OfferHistoryItem";
import { mapHistroyByDateGroup } from "@/services/offer.service";
import { Spinner, Image, Button } from "@nextui-org/react";
import { formattedDate } from "@/utils/date.util";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

interface OfferHistoryListProps {
  isTrader?: boolean;
}

export default function OfferHistoryList({
  isTrader,
}: OfferHistoryListProps) {
  const {
    data: offerHistoryGroup,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["offerHistoryGroup"],
    queryFn: () => mapHistroyByDateGroup(isTrader),
    refetchInterval: 3000,
  });
  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTrader, isConnected]);

  if (isLoading) return <Spinner size="lg" />;
  else if (offerHistoryGroup && offerHistoryGroup?.length)
    return offerHistoryGroup?.map((offerGroup, key) => (
      <div key={key}>
        <div className="text-sm font-semibold py-4">
          {formattedDate(new Date(offerGroup.date))}
        </div>
        {offerGroup.offers.map((offer, offerKey) => (
          <div className="py-2" key={offerKey}>
            <OfferHistoryItem data={offer} />
          </div>
        ))}
      </div>
    ));
  else
    return (
      <div className="min-h-screen flex flex-col justify-center space-y-4 items-center">
        <Image src="/offers/notFound-1.svg" alt="not found offer small" />
        <div className="text-lg font-semibold text-[#313235] text-center">
          No transaction history
          <br /> was found.
        </div>
        <div className="text-sm text-center">
          Please create an offer or exchange deals with people on{" "}
          <span className="font-semibold">TradeLink</span> to track the status.
        </div>
        <Button
          color="primary"
          isDisabled={!isConnected}
          startContent={<Plus width={20} />}
          className="font-semibold text-base"
          onPress={() => router.push("offer")}
        >
          Create Offer
        </Button>
      </div>
    );
}
