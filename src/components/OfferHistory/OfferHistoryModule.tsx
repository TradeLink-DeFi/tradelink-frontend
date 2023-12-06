import { Button } from "@nextui-org/react";
import { useState } from "react";
import { cn } from "../../../lib/utils";

// filter my offer and on going offer
export default function OfferHistoryModule() {
  const [isFilterOfferProcessing, setIsFilterOfferProcessing] = useState(false);

  const onSelectFiltterOffer = (filter: boolean) => {
    setIsFilterOfferProcessing(filter);
  };
  return (
    <div className="bg-white rounded-lg min-h-full py-4 px-6 space-y-3">
      <h2 className="font-semibold text-xl">History</h2>
      <div className="flex space-x-2">
        <Button
          radius="full"
          color="primary"
          className={cn(
            "text-sm font-semibold",
            isFilterOfferProcessing ? "text-[#313235] bg-[#DFE9FA]" : ""
          )}
          onPress={() => onSelectFiltterOffer(false)}
        >
          My Offers
        </Button>
        <Button
          radius="full"
          color="primary"
          className={cn(
            "text-sm font-semibold",
            !isFilterOfferProcessing ? "text-[#313235] bg-[#DFE9FA]" : ""
          )}
          onPress={() => onSelectFiltterOffer(true)}
        >
          On Going
        </Button>
      </div>
    </div>
  );
}
