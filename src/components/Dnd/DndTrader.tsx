"use client";

import React from "react";
import { itemsData } from "@/constants/mockDndData";
import { useEffect, useRef, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { DndContext } from "@/contexts/DndContext";
import { NftCard } from "../NFT/NftCard";
import { NftMetaData } from "@/interfaces/nft.interface";
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
} from "@nextui-org/react";
import { Search, ChevronLeft } from "lucide-react";
import { MicroNftCard } from "../NFT/MicroNftCard";
import { ChevronIcon } from "@/constants/ChavronIcon";

interface Cards {
  id: number;
  title: string;
  icon: string;
  components: {
    id: number;
    name: string;
  }[];
}

enum ChooseType {
  MyItems,
  MarketItems,
}

enum ItemType {
  NFTs,
  Tokens,
}

const collections = [
  {
    label: "Collection 1",
    value: "Collection 1",
  },
  {
    label: "Collection 2",
    value: "Collection 2",
  },
];

const chains = [
  {
    label: "Polygon",
    value: "POL",
  },
  {
    label: "Ethereum",
    value: "ETH",
  },
];

interface DndProps {
  isCreateOffer: boolean;
}

const DndTrader = (dndProps: DndProps) => {
  const myElementRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const [chooseType, setChooseType] = useState<ChooseType>(ChooseType.MyItems);
  const [itemType, setItemType] = useState<ItemType>(ItemType.NFTs);
  const [data, setData] = useState<Cards[] | []>([]);

  const MAX_LINES = 5;
  const MAX_LENGTH = 200;

  useEffect(() => {
    setData(itemsData);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
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
      const newData = [...JSON.parse(JSON.stringify(data))];
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable-")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };

  const mockNft: NftMetaData = {
    description: "This is mock nft",
    external_url: "",
    image:
      "https://th.bing.com/th/id/OIG.ikef0T2SW.9nnZUF.E8j?w=1024&h=1024&rs=1&pid=ImgDetMain",
    name: "Mock NFT",
    attributes: [],
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
    <div className={cn(`absolute pr-[20px] grid grid-cols-6 gap-4 -z-10`)}>
      {Array.from({ length: 18 }).map((_, index) => (
        <BlankCard key={index} />
      ))}
    </div>
  );
  const DropableBg = () => (
    <div className={cn(`absolute pr-[20px] grid grid-cols-5 gap-2 z-0`)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <BlankCard key={index} />
      ))}
    </div>
  );

  const renderItem = ({
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

  return (
    <>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex flex-col justify-center">
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
                    onClick={() => setItemType(ItemType.NFTs)}
                    className={cn(
                      "rounded-full text-sm px-5 py-1 bg-primary-50 hover:cursor-pointer",
                      itemType == ItemType.NFTs && "text-white bg-primary"
                    )}
                  >
                    NFTs
                  </p>
                  <p
                    onClick={() => setItemType(ItemType.Tokens)}
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
                    classNames={{
                      inputWrapper: [
                        "border border-gray-300",
                        "bg-white",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-white",
                        "group-data-[focused=true]:bg-default-200/50",
                        "!cursor-text",
                      ],
                    }}
                    startContent={
                      <Search className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                  />
                  <Select
                    aria-label="collection"
                    size="sm"
                    defaultSelectedKeys={[collections[0].value]}
                    disallowEmptySelection
                    classNames={{
                      base: ["w-[400px]"],
                      trigger: ["border border-gray-300", "bg-white"],
                    }}
                  >
                    {collections.map((collection, index) => (
                      <SelectItem
                        key={collection.value}
                        value={collection.value}
                      >
                        {collection.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    aria-label="chains"
                    size="sm"
                    defaultSelectedKeys={[chains[0].value]}
                    startContent={
                      <Avatar
                        className="w-12"
                        size="sm"
                        src="/images/polygon.jpeg"
                      />
                    }
                    disallowEmptySelection
                    classNames={{
                      base: ["w-[300px]"],
                      trigger: ["border border-gray-300", "bg-white"],
                    }}
                  >
                    {chains.map((chain, index) => (
                      <SelectItem
                        key={chain.value}
                        value={chain.value}
                        startContent={
                          <Avatar size="sm" src="/images/polygon.jpeg" />
                        }
                      >
                        {chain.value}
                      </SelectItem>
                    ))}
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
                                  <NftCard nft={mockNft} chain={"polygon"} />
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
                    renderItem={renderItem}
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
                          className="p-5 min-h-[260px] w-full border border-gray-100 rounded-lg overflow-hidden relative"
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

                          {DropableBg()}

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
                                      <MicroNftCard
                                        nft={mockNft}
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
                    "placeHolder: text-gray-400",
                    "hover:bg-white",
                    "group-data-[focused=true]:bg-white",
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
  );
};

export default DndTrader;
