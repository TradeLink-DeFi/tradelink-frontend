import { useAllowance } from "@/hooks/allowance.hook";
import {
  IAllowanceEncode,
  IApporveEncode,
} from "@/interfaces/encoder.interface";
import { allowanceEncoder } from "@/services/contract/encoder.service";
import { useState } from "react";
import { useAccount } from "wagmi";
import { parseEther } from "viem";
import { useApprove } from "@/hooks/approve_old.hook";
import MainLayout from "@/components/MainLayout/MainLayout";

export default function test() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { address } = useAccount();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { allowance, setParams } = useAllowance({});
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isSuccess, approve } = useApprove({});

  // const [message, setMessage] = useState("");

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
  const handleApprove = async () => {
    console.log("start");
    console.log(address);
    const param: IApporveEncode[] = [
      {
        contractAddress: "0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05",
        to: "0xaA4bd865A4da60AD9b79a19dca24EfeB8D798E1e",
        amountOrTokenId: "100",
        isERC20: true,
      },
      {
        contractAddress: "0x466D489b6d36E7E3b824ef491C225F5830E81cC1",
        to: "0xaA4bd865A4da60AD9b79a19dca24EfeB8D798E1e",
        amountOrTokenId: "100",
        isERC20: true,
      },
    ];
    approve(param);
  };
  console.log("res", allowance);
  return (
    <MainLayout>
      <button onClick={() => handleAllowance()}>handleAllowance</button>
      <br />
      <button onClick={() => handleApprove()}>handleApprove</button>
      {/* {message} */}
    </MainLayout>
  );
}
