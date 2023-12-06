// button, filter bar (search, select[nft collection, chain])

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import OfferPost from "./OfferPost";

// offer post list
export default function OfferPostModule() {
  const [isDisabledCreate, setIsDisabledCreate] = useState(false);

  const mockNftCollections = [
    {
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
  ];

  const mockChains = [
    {
      label: "A",
      value: "a",
    },
    {
      label: "B",
      value: "b",
    },
  ];

  const offerPosts = [1, 2];

  return (
    <div className="space-y-3">
      <Button
        color="primary"
        isDisabled={isDisabledCreate}
        startContent={<Plus width={20} />}
        className="font-semibold text-base"
      >
        Create Offer
      </Button>
      <div className="flex justify-between items-center">
        <Input
          type="text"
          size="lg"
          placeholder="Search ..."
          labelPlacement="outside"
          startContent={<Search color="#385BD2" />}
          className="w-3/5"
          variant="bordered"
          classNames={{
            innerWrapper: "bg-transparent",
            inputWrapper: ["border", "bg-white"],
          }}
        />
        <div className="flex space-x-3">
          <Select
            size="sm"
            placeholder="Select Collection NFT"
            className="w-48"
            variant="bordered"
            classNames={{
              label: "font-semibold text-sm text-[#000211]",
              trigger: ["border", "bg-white"],
            }}
          >
            {mockNftCollections.map((nftCollection) => (
              <SelectItem key={nftCollection.value} value={nftCollection.value}>
                {nftCollection.label}
              </SelectItem>
            ))}
          </Select>
          <div>
            <Select
              size="sm"
              placeholder="C"
              className="w-16"
              variant="bordered"
              classNames={{
                label: ["font-semibold", "text-sm", "text-[#000211]"],
                trigger: ["border", "bg-white"],
              }}
            >
              {mockChains.map((chain) => (
                <SelectItem key={chain.value} value={chain.value}>
                  {chain.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {/* content */}
      {offerPosts.map((offerPost, key) => {
        return <OfferPost key={key} />;
      })}
    </div>
  );
}
