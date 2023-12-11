import { useCreateOffer } from "@/hooks/offer.hook";
import { IOffer } from "@/interfaces/offer.interface";
import { createOfferEncoder } from "@/services/contract/encoder.service";
import { truncateString } from "@/utils/formatString.util";
import { Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { updateOfferStatus } from "@/services/offer.service";
import toast from "react-hot-toast";

type PropType = {
  offerData: IOffer;
};

const OfferStepTwo = ({ offerData }: PropType) => {
  const [trady, setTrady] = useState(offerData.traderAddress.walletAddress);
  const tradyAddress = truncateString(trady);
  const [isConfirmLoading, setConfirmLoading] = useState(false);
  const { address } = useAccount();
  const { write: createOffer, result } = useCreateOffer({});

  const handleClick = () => {
    console.log({ offerData });
    setConfirmLoading(true);
    const createOfferEncoded = createOfferEncoder({
      tokenIn: offerData.tokenOut.map(
        (token) => token.tokenAddress as `0x${string}`
      ),
      tokenInAmount: offerData.tokenOutAmount.map((token) => parseEther(token)),
      nftIn: offerData.nftOut.map((nft) => nft.nftAddress as `0x${string}`),
      nftInId: offerData.nftOut.map((nft) => BigInt(nft.nftId)),
      destSelectorOut: BigInt(""),
      tokenOut: offerData.tokenIn.map(
        (token) => token.tokenAddress as `0x${string}`
      ),
      tokenOutAmount: offerData.tokenInAmount.map((token) => parseEther(token)),
      nftOut: offerData.nftIn.map((nft) => nft.nftAddress as `0x${string}`),
      nftOutId: offerData.nftIn.map((nft) => BigInt(nft.nftId)),
      ownerOfferAddress: address || "0x0",
      traderOfferAddress: offerData.fulfilledAddress
        .walletAddress as `0x${string}`,
      deadLine: BigInt(0),
      fee: parseEther("5"),
      feeAddress: "0x0000000000000000000000000000000000000000",
      isSuccess: false,
    });
    createOffer({ args: [createOfferEncoded] });
  };



  console.log("res", result);

  useEffect(() => {
    const handleUpdateStatus = async (offerId: string) => {
      console.log({ offerId });
      updateOfferStatus(offerData._id, 2, offerId).then((_) => {
        setConfirmLoading(false);
        toast.success("Offer confirmed successfully");
        window.location.reload();
      });
    };
    if (result?.offerId) {
      handleUpdateStatus(result?.offerId);
    }
  }, [offerData._id, result]);

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
          <div className="text-sm font-semibold">Offer Accepted</div>
          <div className="mt-2 text-sm">This trade has been accepted.</div>
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
        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[170px]">
          <div className="text-sm font-semibold">Pending</div>
          <div className="mt-2 text-sm">
            Wallet: <span className="font-bold">{tradyAddress}</span> has traded
            your offer.
          </div>
          <div className="text-sm">{"Select 'Confirm' to continue."}</div>
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
      <div className=" flex gap-5 px-6 pt-2 ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#CCD1D5] w-11 h-11  rounded-full text-white flex justify-center items-center">
            3
          </div>
          <div className="w-[3px] h-[100px] bg-[#CCD1D5] flex justify-center items-center rounded-md" />
        </div>

        <div className="flex flex-col rounded-md p-4 w-[500px]  h-[100px]">
          <div className="text-sm font-semibold text-[#CCD1D5]">Waiting</div>
        </div>
      </div>

      {/* 4 */}
      <div className="flex gap-5 px-6 pt-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#CCD1D5] w-11 h-11  rounded-full text-white flex justify-center items-center">
            4
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

export default OfferStepTwo;
