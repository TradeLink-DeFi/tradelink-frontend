import React from "react";
import TraderTradeView from "./TraderTradeView";
import TradeeTradeView from "./TradeeTradeView";

interface IProps {
  isTrader: boolean;
  step: number;
}

export default function TradeView({ isTrader, step }: IProps) {
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
