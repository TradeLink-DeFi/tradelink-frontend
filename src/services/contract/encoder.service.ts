import {
  encodeFunctionData,
  parseEther,
  Abi,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";

import {
  Call,
  IAllowanceEncode,
  IApporveEncode,
  ICreateOfferEncode,
  IFulfillOffer,
} from "@/interfaces/encoder.interface";

import ERC20Abi from "@/constants/abis/erc20.abi.json";
import Nft721Abi from "@/constants/abis/nft721.abi.json";
import TradeLinkV1 from "@/constants/abis/tradelinkv1.abi.json";

export const multicallEncoder = (calls: Call[]) => {
  const callsEncoded = calls.map((call) => {
    const encoded = encodeFunctionData({
      abi: call.abi,
      functionName: call.functionName,
      args: call.args,
    });
    return {
      target: call.address,
      callData: encoded,
    };
  });

  return callsEncoded;
};

// *** Deprecated ***
export const approveEncoder = (approveParams: IApporveEncode[]) => {
  const isERC20s: boolean[] = [];
  const approveParamFormat: Call[] = approveParams.map((item) => {
    isERC20s.push(item.isERC20 && true);
    return {
      address: item.contractAddress,
      abi: item.isERC20 ? (ERC20Abi as Abi) : (Nft721Abi as Abi),
      functionName: "approve",
      args: [
        item.to,
        item.isERC20 ? parseEther(item.amountOrTokenId) : item.amountOrTokenId,
      ],
    };
  });
  const approveEncodedParam = multicallEncoder(approveParamFormat);
  return { approveEncodedParam, isERC20s };
};

export const allowanceEncoder = (allowanceParams: IAllowanceEncode[]) => {
  const isErc20s: boolean[] = [];
  const allowanceParamFormat: Call[] = allowanceParams.map((item) => {
    isErc20s.push(item.isERC20 && true);
    return item.isERC20
      ? {
          address: item.contractAddress,
          abi: ERC20Abi as Abi,
          functionName: "allowance",
          args: [item.myAddress, item.to ?? item.contractAddress],
        }
      : {
          address: item.contractAddress,
          abi: Nft721Abi as Abi,
          functionName: "getApproved",
          args: [item.tokenId],
        };
  });
  const allowanceEncodedParam = multicallEncoder(allowanceParamFormat);
  return { allowanceEncodedParam, isErc20s };
};

// --- Note -------------
// in -> chain offer created
// out -> chain offer fulfilled
export const createOfferEncoder = (createOfferParams: ICreateOfferEncode) => {
  const {
    tokenIn,
    tokenInAmount,
    nftIn,
    nftInId,
    destSelectorOut, // default -> ""
    tokenOut,
    tokenOutAmount,
    nftOut,
    nftOutId,
    ownerOfferAddress,
    traderOfferAddress,
    deadLine, // current date [now]
    fee,
    feeAddress, // 0x00000000000000000000000000000000000000
    isSuccess, // default -> false
  } = createOfferParams;

  const createOfferEncoded = encodeAbiParameters(
    [
      {
        type: "tuple",
        name: "Offer",
        components: [
          { name: "tokenIn", type: "address[]" },
          { name: "tokenInAmount", type: "uint256[]" },
          { name: "nftIn", type: "address[]" },
          { name: "nftInId", type: "uint256[]" },
          { name: "destSelectorOut", type: "uint256" },
          { name: "tokenOut", type: "address[]" },
          { name: "tokenOutAmount", type: "uint256[]" },
          { name: "nftOut", type: "address[]" },
          { name: "nftOutId", type: "uint256[]" },
          { name: "ownerOfferAddress", type: "address" },
          { name: "traderOfferAddress", type: "address" },
          { name: "deadLine", type: "uint256" },
          { name: "fee", type: "uint256" },
          { name: "feeAddress", type: "address" },
          { name: "isSuccess", type: "bool" },
        ],
      },
    ],
    [
      {
        tokenIn,
        tokenInAmount,
        nftIn,
        nftInId,
        destSelectorOut,
        tokenOut,
        tokenOutAmount,
        nftOut,
        nftOutId,
        ownerOfferAddress,
        traderOfferAddress,
        deadLine,
        fee,
        feeAddress,
        isSuccess,
      },
    ]
  );
  return createOfferEncoded;
};

export const fulfillOfferEncoder = (fulfillOfferParams: IFulfillOffer) => {
  const {
    offerId,
    destChainSelector,
    destChainAddress,
    tokenIn,
    tokenInAmount,
    nftIn,
    nftInId,
    feeAddress,
    ownerFulfillAddress,
    traderFulfillAddress,
    isBridge,
    isSuccess,
  } = fulfillOfferParams;

  const fulfillOfferEncoded = encodeAbiParameters(
    [
      {
        type: "tuple",
        name: "FulFillOffer",
        components: [
          { name: "offerId", type: "uint256" },
          { name: "destChainSelector", type: "uint64" },
          { name: "destChainAddress", type: "address"},
          { name: "tokenIn", type: "address[]" },
          { name: "tokenInAmount", type: "uint256[]" },
          { name: "nftIn", type: "address[]" },
          { name: "nftInId", type: "uint256[]" },
          { name: "feeAddress", type: "address" },
          { name: "ownerFulfillAddress", type: "address" },
          { name: "traderFulfillAddress", type: "address" },
          { name: "isBridge", type: "bool" },
          { name: "isSuccess", type: "bool" },
        ],
      },
    ],
    [
      {
        offerId,
        destChainSelector,
        destChainAddress,
        tokenIn,
        tokenInAmount,
        nftIn,
        nftInId,
        feeAddress,
        ownerFulfillAddress,
        traderFulfillAddress,
        isBridge,
        isSuccess,
      },
    ]
  );
  return fulfillOfferEncoded;
};
