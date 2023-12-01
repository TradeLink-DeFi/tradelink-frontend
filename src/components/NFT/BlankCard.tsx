import React, { useState } from "react";
import { Image } from "@nextui-org/react";
import { NftMetaData } from "@/interfaces/nft.interface";

export const BlankCard = () => {
  return (
    <div className="rounded-lg">
      <div className="relative rounded-lg">
        <Image
          draggable={false}
          className="rounded-lg relative"
          width={200}
          height={200}
          src="./gray.svg"
          alt=""
        />
      </div>
    </div>
  );
};
