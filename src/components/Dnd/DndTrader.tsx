"use client";

import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { DndContext } from "@/contexts/DndContext";
import { NftCard } from "../NFT/NftCard";
import { BlankCard } from "../NFT/BlankCard";
import { cn } from "../../../lib/utils";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Avatar,
  Image,
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
  Textarea,
  Spinner,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { ChevronIcon } from "@/constants/ChavronIcon";
import { OfferCard } from "../NFT/OfferCard";
import { DndItem, Item, NFTItem } from "@/interfaces/item.interface";
import { TokenCard } from "../NFT/TokenCard";
import { getChains } from "@/services/chain.service";
import { getNftCollection } from "@/services/nftCollection.service";
import * as query from "../../../grqphql/queries";
import { InitialDnd } from "@/constants/initialDnd";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";

enum ChooseType {
  MyItems,
  MarketItems,
}

enum ItemType {
  NFTs,
  Tokens,
}

const mockupOfferItemData = [
  {
    contentURI:
      "https://ipfs.filebase.io/ipfs/QmVDX4qk6vDW6LysYCo8zuGbLMESeWhPCHtG4EPKPUDTC2",
    createdAtTimestamp: "1701422328",
    id: "0",
    tokenId: "0",
    __typename: "BadApeNft",
  },
];

interface DndProps {
  isCreateOffer: boolean;
}

interface SelectItemProps {
  label: string;
  value: string;
}

const DndTrader = (dndProps: DndProps) => {
  const myElementRef = useRef<HTMLDivElement>(null);
  const account = useAccount();

  const [inputValue, setInputValue] = useState<string>("");
  const [chooseType, setChooseType] = useState<ChooseType>(ChooseType.MyItems);
  const [itemType, setItemType] = useState<ItemType>(ItemType.NFTs);
  const [data, setData] = useState<DndItem[] | []>([]);
  const [offerItem, setOfferItem] =
    useState<Array<NFTItem | null>>(mockupOfferItemData);
  const [droppableBg, setDroppableBg] = useState<Array<NFTItem | null>>();
  const [allNftsData, setAllNftsData] = useState<Array<Object>>();
  const [myNftsData, setMyNftsData] = useState<Array<Object>>();
  const [myNftsFiltered, setMyNftsFiltered] = useState<Array<NFTItem>>();

  const [selectedChain, setSelectedChain] = useState<string>("11155111");
  const [selectedCollection, setSelectedCollection] =
    useState<SelectItemProps>();

  const [chainFilterList, setChainFilterList] = useState<SelectItemProps[]>([]);
  const [nftCollectionFilterList, setNftCollectioFilterList] = useState<
    SelectItemProps[]
  >([]);

  const [toggleDnd, setToggleDnd] = useState<boolean>(false);

  const MAX_LINES = 5;
  const MAX_LENGTH = 200;

  const { data: sepoliaNfts } = useQuery(query.GET_SEPOLIA, {
    context: { clientName: "sepolia" },
  });

  const { data: mumbaiNfts } = useQuery(query.GET_MUMBAI, {
    context: { clientName: "mumbai" },
  });

  const { data: bscNfts } = useQuery(query.GET_BSC, {
    context: { clientName: "bsc" },
  });

  const { data: fujiNfts } = useQuery(query.GET_FUJI, {
    context: { clientName: "fuji" },
  });

  const { data: optimismNfts } = useQuery(query.GET_OPTIMISM, {
    context: { clientName: "optimism" },
  });

  const { data: mySepoliaNfts, refetch: sepoliaRefetch } = useQuery(
    query.GET_SEPOLIA_BY_ADDRESS,
    {
      variables: { walletAddress: account?.address?.toLocaleLowerCase() ?? 0 },
      context: { clientName: "sepolia" },
    }
  );

  const { data: myMumbaiNfts, refetch: mumbaiRefetch } = useQuery(
    query.GET_MUMBAI_BY_ADDRESS,
    {
      variables: { walletAddress: account?.address?.toLocaleLowerCase() ?? 0 },
      context: { clientName: "mumbai" },
    }
  );

  const { data: myBscNfts, refetch: bscRefetch } = useQuery(
    query.GET_BSC_BY_ADDRESS,
    {
      variables: { walletAddress: account?.address?.toLocaleLowerCase() ?? 0 },
      context: { clientName: "bsc" },
    }
  );

  useEffect(() => {
    if (sepoliaNfts && mumbaiNfts && bscNfts && fujiNfts && optimismNfts) {
      const allNfts = [
        sepoliaNfts,
        mumbaiNfts,
        bscNfts,
        fujiNfts,
        optimismNfts,
      ];
      console.log("allNfts", allNfts);
      setAllNftsData(allNfts);
    }
  }, [sepoliaNfts, mumbaiNfts, bscNfts, fujiNfts, optimismNfts]);

  useEffect(() => {
    if (mySepoliaNfts && myMumbaiNfts && myBscNfts) {
      const myNfts = [
        mySepoliaNfts?.users[0] ?? null,
        myMumbaiNfts?.users[0] ?? null,
        myBscNfts?.users[0] ?? null,
      ];
      handleFilterNft();
      setMyNftsData(myNfts);
    }
  }, [mySepoliaNfts, myMumbaiNfts, myBscNfts]);

  useEffect(() => {
    getChainFilterList().then((chain) => {
      if (chain) {
        setChainFilterList(chain);
      }
    });
    getNftCollectionFilterList().then((nftCollection) => {
      if (nftCollection) {
        setNftCollectioFilterList(nftCollection);
        setSelectedCollection(
          nftCollection.filter((col) => col.label == "BadApe")[0]
        );
      }
    });
  }, []);

  useEffect(() => {
    if (myNftsFiltered && myNftsFiltered?.length > 0) {
      InitialDnd[0].components = [...myNftsFiltered];
      setData(InitialDnd);
      setToggleDnd(!toggleDnd);
    } else {
      InitialDnd[0].components = [];
      setData(InitialDnd);
      setToggleDnd(!toggleDnd);
    }
  }, [myNftsFiltered]);

  useEffect(() => {
    if (data) {
      handleDroppableBg();
    }
  }, [data]);

  const getChainFilterList = async () => {
    const chains = await getChains();
    return chains?.map((chain) => ({
      label: chain.chainName,
      value: chain.chainId,
    }));
  };

  const getNftCollectionFilterList = async () => {
    const nftCollections = await getNftCollection();
    return nftCollections?.map((nftCollection) => ({
      label: nftCollection.name,
      value: nftCollection._id,
    }));
  };

  const handleChangeItemType = (type: ItemType) => {
    setItemType(type);
  };

  const handleChangeChain = (chainId: string) => {
    setSelectedChain(chainId);
  };

  const handleChangeCollection = async (collectionId: string) => {
    const selectedCol = nftCollectionFilterList.filter(
      (col) => col.value == collectionId
    )[0];
    setSelectedCollection(selectedCol);
  };

  useEffect(() => {
    if (selectedChain || selectedCollection) {
      handleFilterNft();
    }
  }, [selectedChain, selectedCollection]);

  const handleFilterNft = async () => {
    let myNftsFiltered: NFTItem[] | [];
    console.log("selectedChain", selectedChain);
    console.log("selectedCollection", selectedCollection);
    switch (selectedChain) {
      case "11155111":
        await sepoliaRefetch();
        if (selectedCollection?.label == "BadApe") {
          myNftsFiltered = mySepoliaNfts?.users[0]?.badApeNfts;
        } else if (selectedCollection?.label == "CyberBear") {
          myNftsFiltered = mySepoliaNfts?.users[0]?.cyberBearNfts;
        } else {
          myNftsFiltered = [];
        }
        break;
      case "80001":
        await mumbaiRefetch();
        if (selectedCollection?.label == "AstroDog") {
          myNftsFiltered = myMumbaiNfts?.users[0]?.astroDogNft;
        } else {
          myNftsFiltered = [];
        }
        break;
      default:
        myNftsFiltered = [];
        console.log("Invalid selectedChain");
        break;
    }
    setMyNftsFiltered(myNftsFiltered);
    return myNftsFiltered;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    // # drag to other droppable
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable-")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable-")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      // # drag in same droppable
      const newData = [...JSON.parse(JSON.stringify(data))];
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable-")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };

  const handleDroppableBg = () => {
    let offerArray = [...offerItem];
    const droppableItem = data[2]?.components || [];
    let result: (NFTItem | null)[] = Array(droppableItem?.length).fill(null);
    if (droppableItem?.length > 0) {
      droppableItem?.forEach(async (item, index) => {
        const offerItemIndex = offerItem.findIndex(
          (offer) =>
            offer &&
            offer.tokenId == item.tokenId &&
            offer.__typename == item.__typename
        );
        if (offerItemIndex !== -1) {
          result[index] = offerArray[offerItemIndex];
        }
      });
      offerArray.forEach((item) => {
        if (!result.includes(item)) {
          result.push(item);
        }
      });
      setDroppableBg(result);
    } else {
      setDroppableBg(offerItem);
    }
  };

  const handleInputChange = (event: any) => {
    const lines = event.target.value.split("\n");
    if (lines.length > MAX_LINES) {
      return;
    }
    const inputValueLimited = event.target.value.slice(0, MAX_LENGTH);
    setInputValue(inputValueLimited);
  };

  const MyItemDropableBg = () => (
    <div className={cn(`absolute pr-[20px] grid grid-cols-6 gap-4 z-0`)}>
      {Array.from({ length: 18 }).map((_, index) => (
        <BlankCard key={index} />
      ))}
    </div>
  );

  const DropableBg = (isMyOffer: boolean) => {
    if (!dndProps.isCreateOffer && isMyOffer) {
      return (
        <div className={cn(`absolute pr-[20px] grid grid-cols-5 gap-2 z-0`)}>
          {Array.from({ length: 10 }).map((_, index) => {
            if (droppableBg && droppableBg[index]) {
              return (
                <OfferCard
                  key={index}
                  nftItem={droppableBg![index]}
                  chain={""}
                />
              );
            } else {
              return <BlankCard key={index} />;
            }
          })}
        </div>
      );
    } else {
      return (
        <div className={cn(`absolute pr-[20px] grid grid-cols-5 gap-2 z-0`)}>
          {Array.from({ length: 10 }).map((_, index) => (
            <BlankCard key={index} />
          ))}
        </div>
      );
    }
  };

  const PaginationItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "min-w-8 w-8 h-8 text-gray-800")}
          onClick={onNext}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "min-w-8 w-8 h-8 text-gray-800")}
          onClick={onPrevious}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive &&
            "text-white bg-gradient-to-br from-[#385BD2] to-[#00A0FC] font-light"
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return allNftsData && myNftsData ? (
    <>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex flex-col justify-center w-full">
          <div className="w-full flex flex-row gap-4 justify-between my-8">
            {data[0]?.id == 0 ? (
              <div className="w-8/12 h-full">
                <div className="flex gap-2 pl-4">
                  <Button
                    onClick={() => {
                      setChooseType(ChooseType.MyItems);
                    }}
                    className={cn(
                      "bg-white text-primary-600 font-semibold",
                      chooseType == ChooseType.MyItems &&
                        "bg-primary text-white font-semibold"
                    )}
                  >
                    {"All my items"}
                  </Button>
                  <Button
                    onClick={() => {
                      setChooseType(ChooseType.MarketItems);
                    }}
                    className={cn(
                      "bg-white text-primary-600 font-semibold",
                      chooseType == ChooseType.MarketItems &&
                        "bg-primary text-white font-semibold"
                    )}
                  >
                    {"Items on the market"}
                  </Button>
                </div>

                <div className="px-4 py-3">
                  <Divider />
                </div>

                <div className="flex gap-2 pl-4 items-center font-semibold">
                  <p className=" text-sm">Select Type</p>
                  <p
                    onClick={() => handleChangeItemType(ItemType.NFTs)}
                    className={cn(
                      "rounded-full text-sm px-5 py-1 bg-primary-50 hover:cursor-pointer",
                      itemType == ItemType.NFTs && "text-white bg-primary"
                    )}
                  >
                    NFTs
                  </p>
                  <p
                    onClick={() => handleChangeItemType(ItemType.Tokens)}
                    className={cn(
                      "rounded-full text-sm px-5 py-1 bg-primary-50 hover:cursor-pointer",
                      itemType == ItemType.Tokens && "text-white bg-primary"
                    )}
                  >
                    Tokens
                  </p>
                </div>

                <div className="px-4 my-4 flex flex-row w-full gap-2 relative">
                  <Input
                    size="sm"
                    aria-label="search"
                    placeholder="Search"
                    variant="bordered"
                    classNames={{
                      innerWrapper: "bg-transparent",
                      inputWrapper: ["border", "bg-white"],
                    }}
                    startContent={<Search color="#385BD2" />}
                  />
                  <Select
                    size="sm"
                    placeholder="Select Collection NFT"
                    defaultSelectedKeys={["65716f0d31a5f409f8fbdc54"]}
                    disallowEmptySelection
                    variant="bordered"
                    classNames={{
                      base: ["w-[400px]"],
                      label: "font-semibold text-sm text-[#000211]",
                      trigger: ["border", "bg-white"],
                    }}
                    label=""
                    onChange={(e) => {
                      handleChangeCollection(e.target.value);
                    }}
                  >
                    {nftCollectionFilterList.map((nftCollection) => (
                      <SelectItem
                        key={nftCollection.value}
                        value={nftCollection.value}
                      >
                        {nftCollection.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="sm"
                    items={chainFilterList}
                    disallowEmptySelection
                    variant="bordered"
                    classNames={{
                      base: "w-[160px]",
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
                    onChange={(e) => {
                      handleChangeChain(e.target.value);
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

                <Droppable droppableId={`droppable-0`} direction="horizontal">
                  {(provided) => (
                    <div
                      className="p-5 overflow-hidden relative min-h-[450px]"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {MyItemDropableBg()}
                      {
                        <div
                          id="myElement"
                          ref={myElementRef}
                          className="grid grid-cols-6 gap-4 z-10"
                        >
                          {data[0]?.components?.map((component, index) => (
                            <Draggable
                              key={component.id}
                              draggableId={component.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  key={component.id}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  <NftCard
                                    nftItem={component}
                                    chain={"polygon"}
                                    isMicro={false}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      }
                    </div>
                  )}
                </Droppable>
                <div id="pagination" className="flex flex-row justify-center">
                  <Pagination
                    disableCursorAnimation
                    showControls
                    total={10}
                    initialPage={1}
                    className="gap-2"
                    radius="full"
                    renderItem={PaginationItem}
                    variant="light"
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="w-4/12 flex flex-col gap-4 mt-14">
              {data.map((val, index) => {
                return val.id != 0 ? (
                  <>
                    {val.id == 2 && (
                      <div className="w-full flex justify-center">
                        <Image alt="" src="/images/trade.svg" />
                      </div>
                    )}
                    <Droppable
                      key={index}
                      droppableId={`droppable-${index}`}
                      direction="horizontal"
                    >
                      {(provided) => (
                        <div
                          className="p-5 min-h-[260px] w-full border border-gray-300 rounded-lg overflow-hidden relative"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div className="flex flex-row gap-2">
                            <Image
                              src={val.icon}
                              alt={val.title}
                              width={20}
                              height={20}
                            />
                            <h2 className="text-left font-bold mb-6 text-black">
                              {val.title}
                            </h2>
                          </div>

                          {DropableBg(val.id == 2)}

                          {
                            <div className="grid grid-cols-5 gap-2">
                              {val?.components?.map((component, index) => (
                                <Draggable
                                  key={component.id}
                                  draggableId={component.id.toString()}
                                  index={index}
                                  // isDragDisabled={true}
                                >
                                  {(provided) => (
                                    <div
                                      key={component.id}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                    >
                                      <NftCard
                                        isMicro={true}
                                        nftItem={component}
                                        chain={"polygon"}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          }
                        </div>
                      )}
                    </Droppable>
                  </>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        </div>
      </DndContext>

      {
        // Create offer section
        dndProps.isCreateOffer && (
          <>
            <div className="w-full pl-4">
              <p className="pl-1 pb-2 text-sm text-gray-400 font-light">Note</p>
              <Textarea
                onChange={handleInputChange}
                value={inputValue}
                aria-label="note"
                endContent={
                  <div>
                    <p className="text-[10px] text-gray-300">{`${inputValue.length}/${MAX_LENGTH}`}</p>
                  </div>
                }
                classNames={{
                  input: [
                    "bg-transparent",
                    "text-black/90",
                    "placeholder:text-default-700/50",
                  ],
                  inputWrapper: [
                    "border border-gray-200",
                    "bg-white",
                    "group-data-[hover=true]:bg-white",
                    "placeHolder: text-gray-400",
                  ],
                }}
                placeholder="Write something ..."
              />
            </div>
            <div className="w-full mt-8 flex flex-row justify-end gap-4">
              <Button className="w-1/12 bg-white text-primary border border-primary">
                Cancel
              </Button>
              <Button className="w-1/12 bg-primary text-white border border-primary">
                Create
              </Button>
            </div>
          </>
        )
      }
    </>
  ) : (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
};

export default DndTrader;
