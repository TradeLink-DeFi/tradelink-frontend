import React from "react";
import TraderTradeView from "./TraderTradeView";
import TradeeTradeView from "./TradeeTradeView";
import { NFTItem, TokenItem } from "@/interfaces/item.interface";
import { ShowTradeOffer } from "../TradeOffer/ShowTrade";
import { IOffer } from "@/interfaces/offer.interface";

interface IProps {
  offerData: IOffer;
  isTrader: boolean;
  step: number;
  offerItems?: (TokenItem | NFTItem)[];
  wantItems?: (TokenItem | NFTItem)[];
  note?: string;
}

export default function TradeView({
  offerData,
  isTrader,
  step,
  offerItems,
  wantItems,
  note,
}: IProps) {
  console.log({ offerData });
  return (
    <>
      <div className="flex w-full space-x-5 pt-5">
        <div className="flex-1">
          {isTrader ? (
            <TraderTradeView offerData={offerData} step={step} />
          ) : (
            <TradeeTradeView offerData={offerData} step={step} />
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
