import React, { useState } from "react";
import { Image } from "@nextui-org/react";

export const BlankCard = () => {
  return (
    <div className="">
      <div className="relative">
        <Image
          draggable={false}
          className="rounded-md relative border-2 border-gray-300"
          width={200}
          height={200}
          src="/images/gray.svg"
          alt=""
        />
      </div>
    </div>
  );
};
