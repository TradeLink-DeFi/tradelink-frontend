import React from "react";
import TraderTradeView from "./TraderTradeView";
import TradeeTradeView from "./TradeeTradeView";
import { ShowTradeOffer } from "../TradeOffer/ShowTrade";
import { NFTItem, TokenItem } from "@/interfaces/item.interface";

export default function TradeView({
  offerItems,
  wantItems,
  note,
}: {
  offerItems?: (TokenItem | NFTItem)[];
  wantItems?: (TokenItem | NFTItem)[];
  note?: string;
}) {
  const isTrader = true;
  const step = 1;

  return (
    <>
      <div className="flex w-full space-x-5 pt-5">
        <div className="flex-1">
          {isTrader ? (
            <TraderTradeView step={step} />
          ) : (
            <TradeeTradeView step={step} />
          )}
        </div>
        <div className="flex-1">
          {/* TODO: Add NFT Preview */}{" "}
          {offerItems && wantItems ? (
            <ShowTradeOffer
              iWant={wantItems}
              iHave={offerItems}
              offerDetail={note || ""}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
