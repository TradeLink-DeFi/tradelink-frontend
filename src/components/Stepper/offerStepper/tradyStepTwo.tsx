import { contractAddressByChainId } from "@/configs/contract.config";
import { useFulfillOffer } from "@/hooks/offer.hook";
import { IOffer } from "@/interfaces/offer.interface";
import { fulfillOfferEncoder } from "@/services/contract/encoder.service";
import { updateOfferStatus } from "@/services/offer.service";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type PropType = {
  offerData: IOffer;
};

const TradeyStepTwo = ({ offerData }: PropType) => {
  const { write: fulfillOffer, isSuccess, isLoading, data } = useFulfillOffer({});
  const [isConfirmLoading, setConfirmLoading] = useState(false);

  const handleClick = () => {
    setConfirmLoading(true);
    console.log({ offerData });
    const fulfillInfo = fulfillOfferEncoder({
      offerId: BigInt(offerData?.onChainId || ""),
      destChainSelector: BigInt(offerData.chainA.chainSelector),
      destChainAddress: contractAddressByChainId(offerData.chainA.chainId)
        .tradelink,
      tokenIn: offerData.tokenIn.map(
        (token) => token.tokenAddress as `0x${string}`
      ),
      tokenInAmount: offerData.tokenInAmount.map((token) => BigInt(token)),
      nftIn: offerData.nftIn.map((nft) => nft.nftAddress as `0x${string}`),
      nftInId: offerData.nftIn.map((nft) => BigInt(nft.nftId)),
      feeAddress: contractAddressByChainId(offerData.chainB.chainId).linkToken,
      ownerFulfillAddress: offerData.fulfilledAddress
        .walletAddress as `0x${string}`,
      traderFulfillAddress: offerData.traderAddress
        .walletAddress as `0x${string}`,
      isBridge: offerData.chainA.chainId !== offerData.chainB.chainId,
      isSuccess: false,
    });
    console.log(fulfillInfo);
    fulfillOffer({ args: [fulfillInfo] });
  };


  useEffect(() => {
    const handleUpdateStatus = async () => {
      updateOfferStatus(offerData._id, 3).then((_) => {
        setConfirmLoading(false);
        toast.success("Offer confirmed successfully");
        window.location.reload();
      });
    };
    if (isSuccess && !isLoading) {
      handleUpdateStatus();
    }
  }, [isSuccess, isLoading, offerData._id]);


  return (
    <>
      {/* 1 */}
      <div className="flex gap-5 px-6 pt-6">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="w-10 h-10 rounded-full text-white flex justify-center items-center">
            <img src="/vectors/check.svg" width={50} height={50} alt="check" />
          </div>
          <div className="w-[3px] h-[100px] bg-[#385BD2] flex justify-center items-center rounded-md" />
        </div>
        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[100px] mt-2">
          <div className="text-sm font-semibold">Waiting</div>
          <div className="mt-2 text-sm">
            Send a trade request to the offer owner.
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className=" flex gap-5 px-6 pt-2 ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#385BD2] w-11 h-11 rounded-full text-white flex justify-center items-center">
            2
          </div>
          <div className="w-[3px] h-[100px] bg-[#CCD1D5] flex justify-center items-center rounded-md" />
        </div>
        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[130px]">
          <div className="text-sm font-semibold">Confirm</div>
          <div className="mt-2 text-sm">
            {"Select 'Confirm' to complete the transaction."}
          </div>
          <div className="mt-3">
            <Button
              className="w-1/12 bg-primary text-white border border-primary font-bold"
              onClick={handleClick}
              isDisabled={isConfirmLoading}
            >
              {isConfirmLoading ? (
                <Spinner color="white" size="sm" />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 3 */}
      <div className="flex gap-5 px-6 pt-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#CCD1D5] w-11 h-11  rounded-full text-white flex justify-center items-center">
            3
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-[#CCD1D5] mt-1 ml-4">
            Success
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeyStepTwo;
