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
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { MicroNftCard } from "../NFT/MicroNftCard";

interface Cards {
  id: number;
  title: string;
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

const DndTrader = () => {
  const myElementRef = useRef<HTMLDivElement>(null);

  const [myElementHeight, setMyElementHeight] = useState(0);
  const [myElementWidth, setMyElementWidth] = useState(0);
  const [chooseType, setChooseType] = useState<ChooseType>(ChooseType.MyItems);
  const [itemType, setItemType] = useState<ItemType>(ItemType.NFTs);
  const [data, setData] = useState<Cards[] | []>([]);

  const onDragEnd = (result: DropResult) => {
    console.log("result", result);
    const { source, destination } = result;
    if (!destination) return;
    console.log("source.droppableId", source.droppableId);
    console.log("destination.droppableId", destination.droppableId);
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

  useEffect(() => {
    setData(itemsData);
  }, []);

  console.log("data", data);

  const mockNft: NftMetaData = {
    description: "This is mock nft",
    external_url: "",
    image:
      "https://th.bing.com/th/id/OIG.ikef0T2SW.9nnZUF.E8j?w=1024&h=1024&rs=1&pid=ImgDetMain",
    name: "Mock NFT",
    attributes: [],
  };

  useEffect(() => {
    if (myElementRef.current) {
      setMyElementHeight(myElementRef.current.offsetHeight);
      setMyElementWidth(myElementRef.current.offsetWidth);
      console.log("high::", myElementRef.current.offsetHeight);
    }
  }, [myElementRef]);

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

  return (
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
                    "bg-white text-primary font-semibold",
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
                    "bg-white text-primary font-semibold",
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
                  size="sm"
                  defaultSelectedKeys={[collections[0].value]}
                  disallowEmptySelection
                  classNames={{
                    base: ["w-[400px]"],
                    trigger: ["border border-gray-300", "bg-white"],
                  }}
                >
                  {collections.map((collection) => (
                    <SelectItem key={collection.value} value={collection.value}>
                      {collection.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  size="sm"
                  defaultSelectedKeys={[chains[0].value]}
                  startContent={
                    <Avatar className="w-12" size="sm" src="/polygon.jpeg" />
                  }
                  disallowEmptySelection
                  classNames={{
                    base: ["w-[300px]"],
                    trigger: ["border border-gray-300", "bg-white"],
                  }}
                >
                  {chains.map((chain) => (
                    <SelectItem
                      key={chain.value}
                      value={chain.value}
                      startContent={<Avatar size="sm" src="/polygon.jpeg" />}
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
                            key={index}
                            draggableId={component.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
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

              <div className="flex flex-row justify-center gap-4 text-sm font-medium">
                <p className={cn("text-gray-400 hover:cursor-pointer")}>Back</p>
                <p className="text-md">{"1/3"}</p>
                <p className={cn("text-primary hover:cursor-pointer")}>Next</p>
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
                      <svg
                        width="39"
                        height="39"
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.875 27.6413L24.375 34.125L30.875 27.6413H26L26 16.25H22.75V27.6413H17.875ZM14.625 4.875L8.125 11.3587H13L13 22.75H16.25L16.25 11.3587H21.125L14.625 4.875Z"
                          fill="#385BD2"
                        />
                      </svg>
                    </div>
                  )}
                  <Droppable
                    key={index}
                    droppableId={`droppable-${index}`}
                    direction="horizontal"
                  >
                    {(provided) => (
                      <div
                        className="p-5 min-h-[260px] w-full bg-[#F3F3F3] rounded-lg overflow-hidden relative"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        <h2 className="text-left font-bold mb-6 text-black">
                          {val.title}
                        </h2>

                        {DropableBg()}

                        {
                          <div className="grid grid-cols-5 gap-2">
                            {val?.components?.map((component, index) => (
                              <Draggable
                                key={component.id}
                                draggableId={component.id.toString()}
                                index={index}
                                isDragDisabled={true}
                              >
                                {(provided) => (
                                  <div
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
  );
};

export default DndTrader;
