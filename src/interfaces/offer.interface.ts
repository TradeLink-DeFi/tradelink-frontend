import { ChainResponse } from "./chain.interface";

export interface OfferResponse {
  _id: string;
  // FIXME: tokenIn, tokenOut, nftIn, nftOut
  tokenAmountIn: string[];
  tokenOutAmount: string[];
  // FIXME: status -> enum
  note: string;
  // FIXME: traderAddress, fulfilledAddress
  chainA: ChainResponse[];
  chainB: ChainResponse[];
}
