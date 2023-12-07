import { truncateString } from "@/utils/formatString.util";
import { CircleUserRound } from "lucide-react";
import { Button, Image } from "@nextui-org/react";
import { OfferResponse } from "@/interfaces/offer.interface";
import { convertTZ, diffDateMin } from "@/utils/date.util";

interface OfferPostProps {
  data: OfferResponse;
}

// nft, token,
export default function OfferPost({ data }: OfferPostProps) {
  // nftIn + tokenIn and nftOut + tokenOut
  return (
    <div className="flex space-x-3 rounded-lg p-4 bg-white w-full">
      <CircleUserRound size={32} />
      <div className="space-y-3 w-full">
        <div className="flex space-x-2 items-center my-1">
          <div className="font-semibold text-[#313235]">
            {truncateString(data.traderAddress[0].walletAddress)}
          </div>
          <p className="text-sm font-light">
            {diffDateMin(convertTZ(data.createdAt))} min ago
          </p>
        </div>
        <div className="font-light">{data?.note || ""}</div>
        <div className="space-y-3">
          <p className="text-[#313235] text-base font-semibold">I want</p>
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
          <p className="text-[#313235] text-base font-semibold">I have</p>
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
