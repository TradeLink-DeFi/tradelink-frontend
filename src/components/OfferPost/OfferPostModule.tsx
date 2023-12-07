import {
  Button,
  Input,
  Select,
  SelectItem,
  Image,
  Avatar,
  Spinner,
} from "@nextui-org/react";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { getChains } from "@/services/chain.service";
import { getNftCollection } from "@/services/nftCollection.service";
import { getOffers } from "@/services/offer.service";
import OfferPost from "./OfferPost";

export default function OfferPostModule() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { data: offerPosts, isLoading } = useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });
  const [chainFilterList, setChainFilterList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [nftCollectionFilterList, setNftCollectioFilterList] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const getChainFilterList = async () => {
    const chains = await getChains();
    return chains?.map((chain) => ({
      label: chain.chainName,
      value: chain.chainId,
    }));
  };

  const getNftCollectionFilterList = async () => {
    const nftCollections = await getNftCollection();
    console.log("n", nftCollections);
    return nftCollections?.map((nftCollection) => ({
      label: nftCollection.name,
      value: nftCollection._id,
    }));
  };

  useEffect(() => {
    getChainFilterList().then((chain) => chain && setChainFilterList(chain));
    getNftCollectionFilterList().then(
      (nftCollection) =>
        nftCollection && setNftCollectioFilterList(nftCollection)
    );
  }, []);

  return (
    <div className="space-y-3">
      <Button
        color="primary"
        isDisabled={!isConnected}
        startContent={<Plus width={20} />}
        className="font-semibold text-base"
        onPress={() => router.push("offer")}
      >
        Create Offer
      </Button>
      <div className="flex justify-between items-center space-x-6">
        <Input
          type="text"
          size="lg"
          placeholder="Search ..."
          labelPlacement="outside"
          startContent={<Search color="#385BD2" />}
          className="w-3/4"
          variant="bordered"
          classNames={{
            innerWrapper: "bg-transparent",
            inputWrapper: ["border", "bg-white"],
          }}
        />
        <div className="flex space-x-2">
          <Select
            size="sm"
            placeholder="Select Collection NFT"
            className="w-48"
            variant="bordered"
            classNames={{
              label: "font-semibold text-sm text-[#000211]",
              trigger: ["border", "bg-white"],
            }}
            label=""
          >
            {nftCollectionFilterList.map((nftCollection) => (
              <SelectItem key={nftCollection.value} value={nftCollection.value}>
                {nftCollection.label}
              </SelectItem>
            ))}
          </Select>
          <div>
            <Select
              size="sm"
              items={chainFilterList}
              variant="bordered"
              classNames={{
                base: "w-24",
                label: ["font-semibold", "text-sm", "text-[#000211]"],
                trigger: ["border", "bg-white"],
              }}
              defaultSelectedKeys={["11155111"]}
              placeholder="chain"
              renderValue={(items) => {
                return items.map((item) => (
                  <Avatar
                    src={`/chains/${item.data?.label}.png`}
                    alt={item.data?.label}
                    size="sm"
                    key={item.key}
                  />
                ));
              }}
            >
              {(chain) => (
                <SelectItem key={chain.value} value={chain.value}>
                  <Image
                    src={`/chains/${chain.label}.png`}
                    alt={chain.label}
                    width={30}
                    height={30}
                  />
                </SelectItem>
              )}
            </Select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Spinner size="lg" />
      ) : (
        offerPosts?.map((offerPost, key) => <OfferPost key={key} data={offerPost} />)
      )}
    </div>
  );
}
