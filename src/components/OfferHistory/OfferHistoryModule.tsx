import { Button } from "@nextui-org/react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import OfferHistoryList from "./OfferHistoryList";

// filter my offer and on going offer
export default function OfferHistoryModule() {
  const { isConnected } = useAccount();
  const [isNotTrader, setIsNotTrader] = useState(false);

  const onSelectFiltterOffer = (filter: boolean) => {
    setIsNotTrader(filter);
  };
  return (
    <div className="bg-white rounded-lg min-h-screen py-4 space-y-3 border">
      <h2 className="font-semibold text-xl px-6">History</h2>
      <hr />
      {isConnected ? (
        <div className="px-6 space-y-2 min-h-screen">
          <div className="flex space-x-2">
            <Button
              radius="full"
              color="primary"
              className={cn(
                "text-sm font-semibold",
                isNotTrader ? "text-[#313235] bg-[#DFE9FA]" : ""
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
                !isNotTrader ? "text-[#313235] bg-[#DFE9FA]" : ""
              )}
              onPress={() => onSelectFiltterOffer(true)}
            >
              On Going
            </Button>
          </div>
          <OfferHistoryList isTrader={!isNotTrader} />
        </div>
      ) : (
        <div className="flex flex-col px-6 space-y-3 justify-center items-center pt-56">
          <div className="text-[#313235] text-lg font-semibold text-center">
            <p>Connect wallet to see the</p>
            <p>transaction history.</p>
          </div>
          <div className="text-center">
            You currently have no transaction history to be shown. Connect your
            wallet to view transaction history.
          </div>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
