import { OfferHistory, OfferStatus } from "@/interfaces/offer.interface";
import { formattedTime } from "@/utils/date.util";
import { truncateString } from "@/utils/formatString.util";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  ClipboardCheck,
  Clock,
  Eye,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useMemo } from "react";

interface OfferHistoryItemProps {
  data: OfferHistory;
}

export default function OfferHistoryItem({ data }: OfferHistoryItemProps) {
  // export enum OfferStatus {
  //   CREATE_OFFER_A = 0,
  //   ACCEPT_B = 1,
  //   ACCEPT_A = 2,
  //   CONFIRM_B = 3,
  //   EXPIRED = 5,
  //   DELETED = 6,
  //   SUCCESS = 4,
  //   FAILED = 7,
  // }
  const status = useMemo(() => {
    switch (data.status) {        
      case 4:
        return <div>Completed</div>;
      case 5:
        return <div className="text-[#FF0000]">EXPIRED</div>;
      case 7:
        return <div className="text-[#FF0000]">Failed</div>;
      default:
        return <div className="text-[#E7BC02]">Pending</div>;
    }
  }, [data.status]);
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-[#F1F5FD] h-fit rounded-full p-3">
        <ClipboardCheck color="#739DE7" />
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex font-semibold text-sm items-center">
            My Offer&nbsp;
            <div className="text-xs">#{truncateString(data._id)}</div>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <MoreHorizontal />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="view">
                <div className="flex items-center">
                  <Eye />
                  View Details
                </div>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <div className="flex items-center">
                  <Trash2 />
                  Delete Offer
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex justify-between text-[#A3A9B1] text-xs">
          <div className="flex items-center space-x-1">
            <Clock size={13} />
            <p>{formattedTime(data.createdAt)}</p>
          </div>
          {status}
        </div>
      </div>
    </div>
  );
}
