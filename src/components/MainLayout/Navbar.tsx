import React from "react";
import { Image } from "@nextui-org/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  return (
    <>
      <nav className="w-full sticky top-0 bg-white z-50">
        <div className="h-[72px] px-[10px] sm:px-[24px] flex flex-row justify-between items-center bg-white border-solid border-b-1 border-[##EFEFEF]">
          <Image
            alt="trans-logo"
            src="/images/logo.svg"
            width="142px"
            height="32px"
            className="cursor-pointer rounded-none ml-16"
            onClick={() => router.push("/")}
          />
          <div className="flex items-center space-x-3">
            <ConnectButton
              chainStatus="full"
              showBalance={true}
              accountStatus="full"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
