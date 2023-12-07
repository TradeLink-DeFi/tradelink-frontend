import { truncateString } from "@/utils/formatString.util";
import { Button, Image } from "@nextui-org/react";
import { OfferResponse } from "@/interfaces/offer.interface";
import { convertTZ, diffDateMin } from "@/utils/date.util";
import { NftCard } from "../NFT/NftCard";
import { TokenCard } from "../NFT/TokenCard";

interface OfferPostProps {
  data: OfferResponse;
}

export default function OfferPost({ data }: OfferPostProps) {
  return (
    <div className="flex rounded-lg p-4 space-x-3 bg-white w-full border border-[#EEF0F1]">
      <div>
        <Image src="/offers/avatar.png" width={32} alt="Avatar" />
      </div>
      <div className="space-y-3 w-full">
        <div className="flex space-x-2 items-center my-1">
          <div className="font-semibold text-[#313235]">
            {truncateString(data.traderAddress[0].walletAddress)}
          </div>
          <Image src="/offers/verify.png" width={16} alt="Verify Badge" />
          <p className="text-sm font-light">
            {diffDateMin(convertTZ(data.createdAt))} min ago
          </p>
        </div>
        <div className="font-light">{data?.note || ""}</div>
        <div className="space-y-3">
          <div className="flex space-x-1 items-center">
            <Image src="/offers/IHave.png" width={16} alt="IHave Badge" />
            <p className="text-[#313235] text-base font-semibold">I want</p>
          </div>
          <div className="flex space-x-3">
            {data.nftIn.map((nft) => (
              <Image
                src={nft.imageUrl}
                width={64}
                alt={nft.name}
                key={nft.nftId}
              />
            ))}
            {data.tokenIn.map((token, key) => (
              <div key={key}>{token.name}</div>
            ))}
          </div>
          <hr className="w-full" />
          <div className="flex space-x-1 items-center">
            <Image src="/offers/IWant.png" width={16} alt="IWant Badge" />
            <p className="text-[#313235] text-base font-semibold">I have</p>
          </div>

          <div className="flex space-x-3">
            {data.nftOut.map((nft) => (
              <Image
                src={nft.imageUrl}
                width={64}
                alt={nft.name}
                key={nft.nftId}
              />
            ))}
          </div>
        </div>
        <hr />
        <div className="flex justify-end">
          <Button
            startContent={<Image src="/icons/trade.svg" alt="trade" />}
            color="primary"
            className="px-6"
          >
            Trade
          </Button>
        </div>
      </div>
    </div>
  );
}
