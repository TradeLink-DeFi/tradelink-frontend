import { truncateString } from "@/utils/formatString.util";
import { CircleUserRound } from "lucide-react";

export default function OfferPost() {
  const mockAddress = "0x1234567890123456789012345678901234567890";
  // const createdAt = new Date();
  const note = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  // nftIn + tokenIn and nftOut + tokenOut
  return (
    <div className="flex space-x-3 rounded-lg p-4 bg-white">
      <CircleUserRound size={32} />
      <div className="space-y-3">
        <div className="flex space-x-1 items-center my-1">
          <div className="font-semibold text-[#313235]">
            {truncateString(mockAddress)}
          </div>
          <p className="text-sm font-light">3 min ago</p>
        </div>
        <div className="font-light">{note}</div>
        <div className="flex">
          <div className="w-full border-r-1 border-r-[#EEF0F1]">
            <p className="text-[#313235] text-base font-semibold">I want</p>
          </div>
          <div className="w-full px-10">
            <p className="text-[#313235] text-base font-semibold">I have</p>
          </div>
        </div>
      </div>
    </div>
  );
}
