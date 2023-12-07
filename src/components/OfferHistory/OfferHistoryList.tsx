import { useQuery } from "@tanstack/react-query";
import OfferHistoryItem from "./OfferHistoryItem";
import { mapHistroyByDateGroup } from "@/services/offer.service";
import { Spinner } from "@nextui-org/react";
import { formattedDate } from "@/utils/date.util";
import { useEffect } from "react";

interface OfferHistoryListProps {
  isProcessing?: boolean;
}

export default function OfferHistoryList({
  isProcessing,
}: OfferHistoryListProps) {
  const {
    data: offerHistoryGroup,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["offerHistoryGroup"],
    queryFn: () => mapHistroyByDateGroup(isProcessing),
  });

  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProcessing]);

  if (isLoading) return <Spinner size="lg" />;
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
}
