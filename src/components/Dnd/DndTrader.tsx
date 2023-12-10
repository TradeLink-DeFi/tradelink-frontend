"use client";
import { getMetaData } from "@/services/metadata.service";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Draggable, DropResult, Droppable } from "react-beautiful-dnd";
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
  useDisclosure,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { ChevronIcon } from "@/constants/ChavronIcon";
import { OfferCard } from "../NFT/OfferCard";
import {
  DndItem,
  NFTFromAPI,
  NFTItem,
  TokenItem,
} from "@/interfaces/item.interface";
import { TokenCard } from "../NFT/TokenCard";
import { getChains } from "@/services/chain.service";
import { getNftCollection } from "@/services/nftCollection.service";
import * as query from "../../../grqphql/queries";
import { InitialDnd } from "@/constants/initialDnd";
import { useQuery } from "@apollo/client";
import { useQuery as tanstackUseQuery } from "@tanstack/react-query";
import { useAccount, useSwitchNetwork } from "wagmi";
import { ERC20Modal } from "./ERC20Modal";
import { getApproved } from "@/services/contract/nft.service";
import { LoadingModal } from "./LoadingModal";
import { getAllowance } from "@/services/contract/erc20.service";
import { getChainIdByCollection } from "@/configs/chian.config";
import {
  INftItem,
  createOffer,
  updateOfferStatus,
} from "@/services/offer.service";
import { NFTMapper } from "@/constants/nftMapper";
import { useRouter } from "next/router";

enum ChooseType {
  MyItems,
  MarketItems,
}

enum ItemType {
  NFTs,
  Tokens,
}

interface DndProps {
  isCreateOffer: boolean;
  offerItems?: (TokenItem | NFTItem)[];
  wantItems?: (TokenItem | NFTItem)[];
  queryOfferId?: string;
}

interface SelectItemProps {
  label: string;
  value: string;
}

const DndTrader = (dndProps: DndProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenLoading,
    onOpen: onOpenLoading,
    onClose: onCloseLoading,
  } = useDisclosure();

  const myElementRef = useRef<HTMLDivElement>(null);
  const account = useAccount();

  const [inputValue, setInputValue] = useState<string>("");
  const [chooseType, setChooseType] = useState<ChooseType>(ChooseType.MyItems);
  // const [itemType, setItemType] = useState<ItemType>(ItemType.NFTs);
  const [data, setData] = useState<DndItem[] | []>([]);
  const [offerItem, setOfferItem] = useState<
    Array<NFTItem | TokenItem | null> | []
  >([]);
  const [droppableBg, setDroppableBg] =
    useState<Array<NFTItem | TokenItem | null>>();
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

  const [myOfferItems, setMyOfferItems] = useState<Array<NFTItem | TokenItem>>(
    []
  );
  const [offerWantItems, setOfferWantItems] = useState<
    Array<NFTItem | TokenItem>
  >([]);

  const [toggleDnd, setToggleDnd] = useState<boolean>(false);
  const [isMyOffer, setIsMyOffer] = useState<boolean>(false);

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

  const { data: myFujiNfts, refetch: fujiRefetch } = useQuery(
    query.GET_FUJI_BY_ADDRESS,
    {
      variables: { walletAddress: account?.address?.toLocaleLowerCase() ?? 0 },
      context: { clientName: "fuji" },
    }
  );

  const { data: myOptimismNfts, refetch: optimismRefetch } = useQuery(
    query.GET_OPTIMISM_BY_ADDRESS,
    {
      variables: { walletAddress: account?.address?.toLocaleLowerCase() ?? 0 },
      context: { clientName: "optimism" },
    }
  );

  useEffect(() => {
    if (dndProps.isCreateOffer) {
      setOfferItem([]);
      setOfferWantItems([]);
      setToggleDnd(!toggleDnd);
    } else {
      if (dndProps.wantItems && !dndProps.isCreateOffer) {
        setOfferWantItems(dndProps.wantItems);
      }
      if (dndProps.offerItems && !dndProps.isCreateOffer) {
        setOfferItem(dndProps.offerItems);
      }
      setToggleDnd(!toggleDnd);
    }
  }, [dndProps]);

  // useEffect(() => {
  //   if (dndProps.offerItems && !dndProps.isCreateOffer) {
  //     setOfferItem(dndProps.offerItems);
  //   }
  // }, [dndProps.isCreateOffer]);

  useEffect(() => {
    if (sepoliaNfts && mumbaiNfts && bscNfts && fujiNfts && optimismNfts) {
      const allNfts = [
        sepoliaNfts,
        mumbaiNfts,
        bscNfts,
        fujiNfts,
        optimismNfts,
      ];
      setAllNftsData(allNfts);
    }
  }, [sepoliaNfts, mumbaiNfts, bscNfts, fujiNfts, optimismNfts]);

  useEffect(() => {
    if (
      mySepoliaNfts &&
      myMumbaiNfts &&
      myBscNfts &&
      myFujiNfts &&
      myOptimismNfts
    ) {
      const myNfts = [
        mySepoliaNfts?.users[0] ?? null,
        myMumbaiNfts?.users[0] ?? null,
        myBscNfts?.users[0] ?? null,
        myFujiNfts?.users[0] ?? null,
        myOptimismNfts?.users[0] ?? null,
      ];
      handleFilterNft();
      setMyNftsData(myNfts);
    }
  }, [mySepoliaNfts, myMumbaiNfts, myBscNfts, myFujiNfts, myOptimismNfts]);

  useEffect(() => {
    getChainFilterList().then((chain) => {
      if (chain) {
        setChainFilterList(chain);
      }
    });
    getNftCollectionFilterList(selectedChain).then((nftCollection) => {
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
      if (data[2]?.components && myOfferItems?.length > 0) {
        data[2].components = [...myOfferItems];
        setData(data);
      }
      if (data[1]?.components && offerWantItems?.length > 0) {
        data[1].components = [...offerWantItems];
        setData(data);
        setToggleDnd(!toggleDnd);
      }
    }
  }, [data, myOfferItems, offerWantItems]);

  const getChainFilterList = async () => {
    const chains = await getChains();
    return chains?.map((chain) => ({
      label: chain.chainName,
      value: chain.chainId,
    }));
  };

  const getNftCollectionFilterList = async (chainId: string) => {
    const nftCollections = await getNftCollection(chainId);
    return nftCollections?.map((nftCollection) => ({
      label: nftCollection.name,
      value: nftCollection._id,
    }));
  };

  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  useEffect(() => {
    if (selectedChain && chooseType == ChooseType.MyItems) {
      switchNetwork?.(Number(selectedChain) ?? 11155111);
      const newData = data;
      if (newData[2]?.components) {
        newData[2].components = [];
        setData(newData);
        setMyOfferItems([]);
      }
      handleFilterNft();
    }
    if (selectedChain && chooseType == ChooseType.MarketItems) {
      const newData = data;
      if (newData[1]?.components) {
        newData[1].components = [];
        setData(newData);
        setOfferWantItems([]);
      }
      handleFilterNft();
    }
  }, [selectedChain, chooseType]);

  const handleChangeChain = async (chainId: string) => {
    setSelectedChain(chainId);
    getNftCollectionFilterList(chainId).then((nftCollection) => {
      if (nftCollection) {
        setNftCollectioFilterList(nftCollection);
        setSelectedCollection(nftCollection[0]);
      }
    });
    setMyOfferItems([]);
  };

  const handleChangeCollection = async (collectionId: string) => {
    const selectedCol = nftCollectionFilterList.filter(
      (col) => col.value == collectionId
    )[0];
    setSelectedCollection(selectedCol);
  };

  const handleChangeChooseType = async (chooseType: ChooseType) => {
    setChooseType(chooseType);
    handleFilterNft(chooseType);
  };

  const handleAddToken = async (token: TokenItem, amount: string) => {
    token.amount = amount;
    const newData = data;
    if (isMyOffer && newData[2].components) {
      const isAlreadyAdd = await newData[2].components.findIndex((item) => {
        if (isTokenItem(item)) {
          return item.tokenAddress == token.tokenAddress;
        } else {
          return false;
        }
      });

      if (isAlreadyAdd > -1) {
        newData[2].components[isAlreadyAdd] == token;
      } else {
        newData[2].components = [...newData[2]?.components, token];
        setMyOfferItems([...myOfferItems, token]);
      }

      onOpenLoading();
      const isApproved = await getAllowance(
        token,
        selectedChain,
        account?.address as `0x${string}`,
        amount
      );
      onCloseLoading();
      if (!isApproved) {
        return;
      }

      setData(newData);
      setToggleDnd(!toggleDnd);
    } else if (!isMyOffer && newData[1].components) {

      const isAlreadyAdd = await newData[1].components.findIndex((item) => {
        if (isTokenItem(item)) {
          return item.tokenAddress == token.tokenAddress;
        } else {
          return false;
        }
      });

      if (isAlreadyAdd > -1) {
        newData[1].components[isAlreadyAdd] == token;
      } else {
        newData[1].components = [...newData[1]?.components, token];
        setOfferWantItems([...offerWantItems, token]);
      }
      setData(newData);
      setToggleDnd(!toggleDnd);
    }
  };

  useEffect(() => {
    if (selectedChain || selectedCollection) {
      handleFilterNft();
    }
  }, [selectedChain, selectedCollection]);


  const handleFilterNft = async (choose?: ChooseType) => {
    let myNftsFiltered: NFTItem[] | [];

    switch (selectedChain) {
      case "11155111":
        await sepoliaRefetch();
        if (selectedCollection?.label == "BadApe") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? mySepoliaNfts?.users[0]?.badApeNfts
              : sepoliaNfts?.badApeNfts?.filter(
                  (nft: NFTItem) =>
                    !mySepoliaNfts?.users[0]?.badApeNfts?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else if (selectedCollection?.label == "CyberBear") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? mySepoliaNfts?.users[0]?.cyberBearNfts
              : await sepoliaNfts?.cyberBearNfts?.filter(
                  (nft: NFTItem) =>
                    !mySepoliaNfts?.users[0]?.cyberBearNfts?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else {
          myNftsFiltered = [];
        }
        break;
      case "80001":
        await mumbaiRefetch();
        if (selectedCollection?.label == "AstroDog") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? myMumbaiNfts?.users[0]?.astroDogNft
              : await mumbaiNfts?.astroDogNfts?.filter(
                  (nft: NFTItem) =>
                    !myMumbaiNfts?.users[0]?.astroDogNft?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else {
          myNftsFiltered = [];
        }
        break;
      case "420":
        await optimismRefetch();
        if (selectedCollection?.label == "KoiCrap") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? myOptimismNfts?.users[0]?.koiCrapNft
              : await optimismNfts?.koiCrapNfts?.filter(
                  (nft: NFTItem) =>
                    !myOptimismNfts?.users[0]?.koiCrapNft?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else {
          myNftsFiltered = [];
        }
        break;
      case "43113":
        await fujiRefetch();
        if (selectedCollection?.label == "Golem8bit") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? myFujiNfts?.users[0]?.golem8BitNft
              : await fujiNfts?.golem8BitNfts?.filter(
                  (nft: NFTItem) =>
                    !myFujiNfts?.users[0]?.golem8BitNft?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else {
          myNftsFiltered = [];
        }
        break;
      case "97":
        await bscRefetch();
        if (selectedCollection?.label == "GoldenBull") {
          myNftsFiltered =
            (choose ?? chooseType) == ChooseType.MyItems
              ? myBscNfts?.users[0]?.goldenBullNft
              : await bscNfts?.goldenBullNfts?.filter(
                  (nft: NFTItem) =>
                    !myBscNfts?.users[0]?.goldenBullNft?.some(
                      (my: NFTItem) => my.tokenId == nft.id
                    )
                );
        } else {
          myNftsFiltered = [];
        }
        break;
      default:
        myNftsFiltered = [];
        break;
    }
    if (myOfferItems?.length > 0) {
      const result = myNftsFiltered?.filter(
        (item) =>
          !myOfferItems.some(
            (offerItem) =>
              isNFTItem(offerItem) &&
              offerItem.__typename == item.__typename &&
              offerItem.id == item.id
          )
      );
      myNftsFiltered = result;
    }
    if (offerWantItems?.length > 0) {
      const result = myNftsFiltered?.filter(
        (item) =>
          !offerWantItems.some(
            (offerItem) =>
              isNFTItem(offerItem) &&
              offerItem.__typename == item.__typename &&
              offerItem.id == item.id
          )
      );
      myNftsFiltered = result;
    }
    setMyNftsFiltered(myNftsFiltered);
    return myNftsFiltered;
  };

  const onDragEnd = async (result: DropResult) => {
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

      if (
        source.droppableId == "droppable-0" &&
        destination.droppableId == "droppable-2"
      ) {
        onOpenLoading();
        const isApproved = await getApproved(
          item?.tokenId,
          selectedCollection?.label!,
          selectedChain
        );
        onCloseLoading();
        if (!isApproved) {
          return;
        }
      }

      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);

      if (destination.droppableId == "droppable-2") {
        setMyOfferItems([...myOfferItems, item]);
      } else if (destination.droppableId == "droppable-1") {
        setOfferWantItems([...offerWantItems, item]);
      }
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

  function isNFTItem(item: any): item is NFTItem {
    return item && typeof item.tokenId === "string";
  }

  function isTokenItem(item: any): item is TokenItem {
    return item && typeof item.tokenAddress === "string";
  }

  function isNFTFromApi(item: any): item is NFTFromAPI {
    return item && typeof item.imageUrl === "string";
  }

  const handleDroppableBg = () => {
    let offerArray = [...offerItem];
    const droppableItem = data[2]?.components || [];
    let result: (NFTItem | TokenItem | null)[] = Array(
      droppableItem?.length
    ).fill(null);
    if (droppableItem?.length > 0) {
      droppableItem?.forEach(async (item, index) => {
        // const offerItemIndex = offerItem.findIndex(
        //   (offer) =>
        //     offer &&
        //     (offer.tokenId == item.tokenId) &&
        //     offer.__typename == item.__typename
        // );
        const offerItemIndex = offerItem.findIndex((offer) => {
          if (offer) {
            if (isNFTFromApi(offer) && isNFTItem(item)) {
              return (
                offer.nftId == item.tokenId &&
                offer.nftAddress == NFTMapper[item.__typename].address
              );
            } else if (isTokenItem(offer) && isTokenItem(item)) {
              return (
                offer.tokenAddress === item.tokenAddress &&
                Number(offer.amount!) <= Number(item.amount!)
              );
            }
          }
          return false;
        });
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

  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const handleCreateOffer = async () => {
    setCreating(true);
    if (data[1]?.components?.length > 0 && data[2]?.components?.length > 0) {
      let tokenIn = [] as string[];
      let tokenOut = [] as string[];
      let tokenInAmount = [] as string[];
      let tokenOutAmount = [] as string[];
      let nftIn = [] as INftItem[];
      let nftOut = [] as INftItem[];

      for (const item of data[1].components) {
        if (item && isTokenItem(item)) {
          item.tokenAddress && tokenIn.push(item._id);
          item.amount && tokenInAmount.push(item.amount);
        } else if (item && isNFTItem(item)) {
          const res = await getMetaData(item.contentURI);
          item &&
            nftIn.push({
              nftId: item.tokenId,
              nftAddress: NFTMapper[item.__typename].address,
              name: item.__typename,
              imageUrl: res?.data?.image,
              nftCollection: NFTMapper[item.__typename].id,
            });
        }
      }

      for (let i = 0; i < data[2].components.length; i++) {
        const item = data[2].components[i];
        if (item && isTokenItem(item)) {
          item.tokenAddress && tokenOut.push(item._id);
          item.amount && tokenOutAmount.push(item.amount);
        } else if (item && isNFTItem(item)) {
          const res = await getMetaData(item.contentURI);
          item &&
            nftOut.push({
              nftId: item.tokenId,
              nftAddress: NFTMapper[item.__typename].address,
              name: item.__typename,
              imageUrl: res?.data?.image,
              nftCollection: NFTMapper[item.__typename].id,
            });
        }
      }

      await createOffer({
        tokenIn,
        tokenOut,
        tokenInAmount,
        tokenOutAmount,
        nftIn,
        nftOut,
        traderAddress: account?.address as `0x${string}`,
        note: inputValue,
        chainA: "65702ab5014714803a8dd795",
        chainB: "65702b22014714803a8dd799",
      })
        .then((res: any) => {
          setCreating(false);
          router.push(`/trade/${res._id}`);
        })
        .catch((err) => {
          setCreating(false);
        });
    } else {
      console.log("dont have item");
    }
  };

  const checkIsMatchOffer = async () => {
    console.log("__handleAcceptOffer");
    if (
      dndProps?.offerItems &&
      data[1]?.components?.length > 0 &&
      data[2]?.components?.length >= dndProps?.offerItems?.length
    ) {

      const result = dndProps.offerItems?.map((item) =>
        data[2]?.components.findIndex((my) => {
          if (isNFTFromApi(item) && isNFTItem(my)) {
            return item.nftId == my.tokenId;
          } else if (isTokenItem(item) && isTokenItem(my)) {
            return item.tokenAddress == my.tokenAddress;
          }
        })
      );


      return !result.includes(-1);
    } else {
      return false;
    }
  };

  const handleAcceptOffer = async () => {
    const isMatch = await checkIsMatchOffer();
    if (isMatch) {
      const checkApprove = Promise.all(
        data[2]?.components.map(async (item) => {
          if (isNFTItem(item)) {
            const isApproved = await getApproved(
              item?.tokenId,
              selectedCollection?.label!,
              selectedChain
            ).then((res) => res);
            return isApproved; // Add this line to return the result
          }
          if (isTokenItem(item)) {
            const isApproved = await getAllowance(
              item,
              selectedChain,
              account?.address as `0x${string}`,
              item?.amount!
            );
            return isApproved; // Add this line to return the result
          }
        })
      );
      checkApprove.then((results) => {
        const isHaveFalse = results.includes(false);
        if (!isHaveFalse && dndProps.queryOfferId) {
          updateOfferStatus(dndProps.queryOfferId, 1);
        }
      });
    }
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
              return <OfferCard key={index} nftItem={droppableBg![index]} />;
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
                    onClick={() => handleChangeChooseType(ChooseType.MyItems)}
                    className={cn(
                      "bg-white text-primary-600 font-semibold",
                      chooseType == ChooseType.MyItems &&
                        "bg-primary text-white font-semibold"
                    )}
                  >
                    {"All my items"}
                  </Button>
                  {dndProps.isCreateOffer && (
                    <Button
                      onClick={() =>
                        handleChangeChooseType(ChooseType.MarketItems)
                      }
                      className={cn(
                        "bg-white text-primary-600 font-semibold",
                        chooseType == ChooseType.MarketItems &&
                          "bg-primary text-white font-semibold"
                      )}
                    >
                      {"Items on the market"}
                    </Button>
                  )}
                </div>

                <div className="px-4 py-3">
                  <Divider />
                </div>

                {/* <div className="flex gap-2 pl-4 items-center font-semibold">
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
                </div> */}

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
                    selectedKeys={[selectedCollection?.value!]}
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
                              key={index}
                              draggableId={"myItem" + index}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  key={
                                    isNFTItem(component)
                                      ? component.id
                                      : component._id
                                  }
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}
                                >
                                  {isNFTItem(component) ? (
                                    <NftCard
                                      isMicro={false}
                                      nftItem={component}
                                      chain={getChainIdByCollection(
                                        component.__typename
                                      )}
                                    />
                                  ) : (
                                    <TokenCard
                                      item={component}
                                      chain={selectedChain}
                                      isMicro={false}
                                    />
                                  )}
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
                      isDropDisabled={
                        (chooseType == ChooseType.MyItems && val.id == 1) ||
                        (chooseType == ChooseType.MarketItems && val.id == 2)
                      }
                    >
                      {(provided) => (
                        <div
                          className="p-5 min-h-[280px] w-full border border-gray-300 rounded-lg overflow-hidden relative"
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
                                  key={
                                    isNFTItem(component)
                                      ? component.id
                                      : component._id
                                  }
                                  draggableId={String(index)}
                                  index={index}
                                  isDragDisabled={true}
                                >
                                  {(provided) => (
                                    <div
                                      key={index}
                                      {...provided.dragHandleProps}
                                      {...provided.draggableProps}
                                      ref={provided.innerRef}
                                    >
                                      {isNFTItem(component) ||
                                      isNFTFromApi(component) ? (
                                        <NftCard
                                          isMicro={true}
                                          nftItem={component}
                                          chain={getChainIdByCollection(
                                            isNFTItem(component)
                                              ? component.__typename
                                              : ""
                                          )}
                                        />
                                      ) : (
                                        <TokenCard
                                          item={component}
                                          chain={selectedChain}
                                          isMicro={true}
                                        />
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          }
                          <Button
                            size="sm"
                            color="primary"
                            className="absolute bottom-3 right-5"
                            onClick={() => {
                              setIsMyOffer(val.id == 2);
                              onOpen();
                            }}
                          >
                            Add ERC20 Token
                          </Button>
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
              <Button
                isLoading={creating}
                disabled={creating}
                onClick={handleCreateOffer}
                className="w-1/12 bg-primary text-white border border-primary"
              >
                Create
              </Button>
            </div>
          </>
        )
      }
      {
        // Create offer section
        !dndProps.isCreateOffer && (
          <div className="w-full flex flex-row justify-end gap-4">
            <Button className="w-1/12 bg-white text-primary border border-primary">
              Cancel
            </Button>
            <Button
              // isLoading={creating}
              onClick={handleAcceptOffer}
              className="w-1/12 bg-primary text-white border border-primary disabled:bg-primary-200 disabled:border-primary-200"
            >
              Accept
            </Button>
          </div>
        )
      }
      <ERC20Modal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        selectedChain={selectedChain}
        handleAddToken={handleAddToken}
      />
      <LoadingModal
        isOpen={isOpenLoading}
        onOpen={onOpenLoading}
        onClose={onCloseLoading}
        message={"Checking approval ... "}
      />
    </>
  ) : (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Spinner size="lg" color="primary" />
    </div>
  );
};

export default DndTrader;
