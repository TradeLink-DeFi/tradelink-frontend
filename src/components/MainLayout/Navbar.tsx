import React from "react";
import { Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Menu, X } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NAV_MENU } from "@/constants/menu";
import { useRouter } from "next/router";
import { cn } from "../../../lib/utils";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <>
      <nav className="w-full sticky top-0 bg-white z-50">
        <div className="h-[72px] px-[10px] sm:px-[24px] flex flex-row justify-between items-center bg-white border-solid border-b-1 border-[##EFEFEF]">
          <Image
            alt="trans-logo"
            src="/logo.svg"
            width="142px"
            height="32px"
            className="cursor-pointer rounded-none ml-16"
            onClick={() => router.push("/")}
          />
          {/* <div className="flex items-center space-x-3">
            <ConnectButton showBalance={false} accountStatus="address" />
            <button
              onClick={() => onOpen()}
              className="bg-[#F9F9F9] hover:opacity-50 w-[40px] h-[40px] rounded-full flex flex-row justify-center items-center"
            >
              <Menu />
            </button>
          </div> */}
        </div>
      </nav>
      <Modal
        className="bg-white/80 backdrop-blur-sm"
        hideCloseButton
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <div className="w-full h-full">
              <div className="w-full flex items-center justify-between px-[14px] py-[14px]">
                <Image
                  alt="trans-logo"
                  src="/images/logo-transcrypt.png"
                  width="142px"
                  height="32px"
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <button
                  onClick={() => onClose()}
                  className="bg-[#F9F9F9] hover:opacity-50 w-[40px] h-[40px] rounded-full flex flex-row justify-center items-center"
                >
                  <X />
                </button>
              </div>
              <div className="h-full w-full flex justify-start pt-20 items-center flex-col">
                {NAV_MENU.map((item, index) => (
                  <p
                    onClick={() => router.push(item.path)}
                    className={cn(
                      "text-3xl mb-10 font-bold cursor-pointer hover:opacity-60",
                      router.pathname === item.path &&
                        "text-blue-500 cursor-default hover:opacity-100"
                    )}
                    key={index}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
