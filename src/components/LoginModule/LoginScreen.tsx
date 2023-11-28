import Image from "next/image";
import React from "react";
import { Button } from "@nextui-org/react";
import { Wallet } from "lucide-react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import LoginBgSvg from "./LoginBgSvg";
import useUserStore from "@/stores/userStore";

export default function LoginScreen() {
  const { openConnectModal } = useConnectModal();

  const { logout } = useUserStore();

  const handleClearStore = () => {
    logout();
    localStorage.clear();
  };

  return (
    <div className="relative h-screen w-full">
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <LoginBgSvg />
        <Image
          src={"/next.svg"}
          alt="logo"
          width={70}
          height={70}
        />
        <p className="text-3xl text-gray-800 mt-10">Login to Tradelink</p>
        <Button
          onClick={openConnectModal}
          className="mt-10 px-20 py-6 font-medium bg-white border border-solid border-gray-200"
          // color="white"
          startContent={<Wallet className="mr-0.5" color="#1263F1" />}
        >
          Continue with Wallet
        </Button>
      </div>
      <div className="w-full flex flex-row justify-center pb-4">
        <p onClick={handleClearStore} className="text-xs text-gray-400">
          {"Version 2.0.1"}
        </p>
      </div>
    </div>
  );
}
