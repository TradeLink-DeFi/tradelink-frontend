/* eslint-disable react-hooks/rules-of-hooks */
import { useAllowance } from "@/hooks/allowance.hook";
import { IAllowanceEncode } from "@/interfaces/encoder.interface";
import { useAccount } from "wagmi";
import MainLayout from "@/components/MainLayout/MainLayout";
import {
  useCreateOffer,
  useFulfillOffer,
  useGetFeeFulfillOffer,
  useGetFeeOffer,
} from "@/hooks/offer.hook";
import {
  createOfferEncoder,
  fulfillOfferEncoder,
} from "@/services/contract/encoder.service";
import { Address } from "viem";

export default function test() {
  const { address } = useAccount();
  const { allowance, setParams } = useAllowance({});
  const { data: feeOffer, setParams: setFeeOfferParam } = useGetFeeOffer({});
  const { data: feeFulfillOffer, setParams: setFeeFulfillOfferParam } =
    useGetFeeFulfillOffer({});
  const { write: createOffer } = useCreateOffer({});
  const { write: fulfillOffer } = useFulfillOffer({});

  const handleAllowance = async () => {
    console.log("start");
    // BnM, LnM sepolia
    const param: IAllowanceEncode[] = [
      {
        contractAddress: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
        myAddress: address,
        to: "0xaA4bd865A4da60AD9b79a19dca24EfeB8D798E1e",
        isERC20: true,
      },
      {
        contractAddress: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
        myAddress: address,
        to: "0xaA4bd865A4da60AD9b79a19dca24EfeB8D798E1e",
        isERC20: true,
      },
    ];
    setParams(param);
  };
  const handleGetFeeOffer = async () => {
    console.log("start");
    // mumbai -> sepolia
    setFeeOfferParam({
      fulfillOfferId: "1",
      destChainSelector: "12532609583862916517",
      destChainAddress: "0x6F45F16a3F159985983953c5c1938B8E00345A1d",
      feeTokenAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    });
  };
  const handleGetFeeFulfillOffer = async () => {
    console.log("start");
    const fulfillInfo = fulfillOfferEncoder({
      offerId: BigInt('1'),
      destChainSelector: BigInt("16015286601757825753"),
      destChainAddress: "0x6Cc3f2e4672FcB347c4878C4702df60048827072",
      tokenIn: [],
      tokenInAmount: [],
      nftIn: [],
      nftInId: [],
      feeAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
      ownerFulfillAddress: "0x15Df80761aE0bE9E814dC75F996690cf028C4B62",
      traderFulfillAddress: "0xCc6c3917df90E5c4504dc611816c3CDCE033D2F0",
      isBridge: false,
      isSuccess: false,
    });
    console.log(fulfillInfo);
    setFeeFulfillOfferParam({
      step: "1",
      offerId: "1",
      fulfillOfferId: "1",
      fulfillInfo: fulfillInfo,
    });
  };
  const handleCreateOffer = async () => {
    const createOfferEncoded = createOfferEncoder({
      tokenIn: [],
      tokenInAmount: [],
      nftIn: [],
      nftInId: [],
      destSelectorOut: BigInt(""),
      tokenOut: [],
      tokenOutAmount: [],
      nftOut: [],
      nftOutId: [],
      ownerOfferAddress: "0x85b907c521b930E7b425A2e4Dd7DF01677dE1321",
      traderOfferAddress: "0x15Df80761aE0bE9E814dC75F996690cf028C4B62",
      deadLine: BigInt(0),
      fee: BigInt(84942352680556055),
      feeAddress: "0x0000000000000000000000000000000000000000",
      isSuccess: false,
    });
    console.log("createOfferEncoded", createOfferEncoded);
    createOffer({ args: [createOfferEncoded] });
  };
  const handleFulfillOffer = async () => {
    console.log("start");
    const fulfillInfo = fulfillOfferEncoder({
      offerId: BigInt('1'),
      destChainSelector: BigInt("16015286601757825753"),
      destChainAddress: "0x6Cc3f2e4672FcB347c4878C4702df60048827072",
      tokenIn: [],
      tokenInAmount: [],
      nftIn: [],
      nftInId: [],
      feeAddress: "0x0000000000000000000000000000000000000000",
      ownerFulfillAddress: "0x85b907c521b930E7b425A2e4Dd7DF01677dE1321",
      traderFulfillAddress: "0x15Df80761aE0bE9E814dC75F996690cf028C4B62",
      isBridge: false,
      isSuccess: false,
    });
    fulfillOffer({ args: [fulfillInfo] });
  };

  console.log("allowance", allowance);
  console.log("getFee", feeOffer);
  console.log("getFeeFulfill", feeFulfillOffer);
  return (
    <MainLayout>
      <button onClick={() => handleAllowance()}>handleAllowance</button>
      <br />
      <button onClick={() => handleGetFeeOffer()}>handleGetFeeOffer</button>
      <br />
      <button onClick={() => handleGetFeeFulfillOffer()}>
        handleGetFeeFulfillOffer
      </button>
      <br />
      <button onClick={() => handleCreateOffer()}>handleCreateOffer</button>
      <br />
      <button onClick={() => handleFulfillOffer()}>handleFulfillOffer</button>
      <br />
    </MainLayout>
  );
}
