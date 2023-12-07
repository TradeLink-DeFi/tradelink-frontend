import React, { useEffect, useState } from "react";
import { isTokenExpired } from "@/services/expired.service";
import useUserStore from "@/stores/userStore";
import { useDisclosure } from "@nextui-org/react";
import Navbar from "./Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { accessToken } = useUserStore()
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (event: Event) => {
    if (isTokenExpired(accessToken)) {
      onOpen()
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="bg-white h-full">
      <Navbar />
      <main className="flex min-h-[88vh] flex-col items-center px-1 pt-5 md:px-12 lg:pb-24 lg:px-24">
        {children}
      </main>
    </div>
  );
}
