import { useQuery } from "@apollo/client";
import * as query from "../../grqphql/queries";
import { useState } from "react";

export const useCheckTradeStatus = (offerId: string, chainId: number) => {
  const [sepoliaComplete, setSepoliaComplete] = useState(false);
  const [mumbaiComplete, setMumbaiComplete] = useState(false);
  const [fujiComplete, setFujiComplete] = useState(false);

  //sepolia
  const { data: tradeSepoliaStatus, refetch: refetchSepolia } = useQuery(
    query.GET_TRADE_STATUS_SEPOLIA_BY_OFFER_ID,
    {
      variables: {
        offerId: offerId.toLocaleLowerCase(),
      },
      context: { clientName: "statusChekcerSepolia" },
    }
  );

  //mumbai
  const { data: tradeMumbaiStatusData, refetch: refetchMUMBAI } = useQuery(
    query.GET_TRADE_STATUS_MUMBAI_BY_OFFER_ID,
    {
      variables: {
        offerId: offerId.toLocaleLowerCase(),
      },
      context: { clientName: "statusChekcerMumbai" },
    }
  );

  //Fuji
  const { data: tradeFujiStatusData, refetch: refetchFuji } = useQuery(
    query.GET_TRADE_STATUS_MUMBAI_BY_OFFER_ID,
    {
      variables: {
        offerId: offerId.toLocaleLowerCase(),
      },
      context: { clientName: "statusChekcerFuji" },
    }
  );

  const pollData = async () => {
    let checkCondition = () => {};
    switch (chainId) {
      case 11155111:
        const intervalSepoliaId = setInterval(() => {
          refetchSepolia();
        }, 2000);
        const maxSepoliaAttempts = 10;
        let sepoliaAttempts = 0;
        const stopSepoliaPolling = () => {
          clearInterval(intervalSepoliaId);
        };
        checkCondition = () => {
          if (tradeSepoliaStatus && tradeSepoliaStatus.successes.length > 0) {
            stopSepoliaPolling();
            setSepoliaComplete(true);
          } else if (sepoliaAttempts >= maxSepoliaAttempts) {
            stopSepoliaPolling();
          }
          sepoliaAttempts++;
        };
        intervalSepoliaId && setInterval(checkCondition, 2000);

      case 80001:
        const intervalMumbaiId = setInterval(() => {
          refetchMUMBAI();
        }, 2000);
        const maxMumbaiAttempts = 10;
        let mumbaiAttempts = 0;
        const stopMumbaiPolling = () => {
          clearInterval(intervalMumbaiId);
        };
        checkCondition = () => {
          if (
            tradeMumbaiStatusData &&
            tradeMumbaiStatusData.successes.length > 0
          ) {
            stopMumbaiPolling();
            setMumbaiComplete(true);
          } else if (mumbaiAttempts >= maxMumbaiAttempts) {
            stopMumbaiPolling();
          }
          mumbaiAttempts++;
        };
        intervalMumbaiId && setInterval(checkCondition, 2000);

      case 43113:
        const intervaFujilId = setInterval(() => {
          refetchFuji();
        }, 2000);
        const maxFujiAttempts = 10;
        let fujiAttempts = 0;
        const stopPolling = () => {
          clearInterval(intervaFujilId);
        };
        checkCondition = () => {
          if (tradeFujiStatusData && tradeFujiStatusData.successes.length > 0) {
            stopPolling();
            setFujiComplete(true);
          } else if (fujiAttempts >= maxFujiAttempts) {
            stopPolling();
          }
          fujiAttempts++;
        };
        intervaFujilId && setInterval(checkCondition, 2000);
    }
  };

  pollData();

  switch (chainId) {
    case 1155511:
      return sepoliaComplete;
    case 80001:
      return mumbaiComplete;
    case 43113:
      return fujiComplete;
    default:
      return false;
  }
};
