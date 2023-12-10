import React from "react";
import TraderTradeView from "./TraderTradeView";
import TradeeTradeView from "./TradeeTradeView";

export default function TradeView() {
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
        <div className="flex-1">{/* TODO: Add NFT Preview */}</div>
      </div>
    </>
  );
}
