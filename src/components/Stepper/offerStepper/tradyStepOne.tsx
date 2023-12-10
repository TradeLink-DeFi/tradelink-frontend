import { useState } from "react";

type PropType = {
  currentStep: string;
};

const TradeyStepOne = () => {
  return (
    <>
      {/* 1 */}
      <div className="flex gap-5 px-6 pt-6">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="w-10 h-10 rounded-full text-white flex justify-center items-center">
            <img src="/vectors/check.svg" width={50} height={50} alt="check" />
          </div>
          <div className="w-[3px] h-[100px] bg-[#385BD2] flex justify-center items-center rounded-md" />
        </div>
        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[100px] mt-2">
          <div className="text-sm font-semibold">Waiting</div>
          <div className="mt-2 text-sm">
            Waiting for owner to accept the offer.
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className=" flex gap-5 px-6 pt-2 ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#CCD1D5] w-11 h-11 rounded-full text-white flex justify-center items-center">
            2
          </div>
          <div className="w-[3px] h-[100px] bg-[#CCD1D5] flex justify-center items-center rounded-md" />
        </div>
        <div className="flex flex-col rounded-md p-4 w-[500px] h-[100px]">
          <div className="text-sm font-semibold text-[#CCD1D5]">Confrim</div>
        </div>
      </div>

      {/* 3 */}
      <div className="flex gap-5 px-6 pt-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="bg-[#CCD1D5] w-11 h-11  rounded-full text-white flex justify-center items-center">
            3
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-[#CCD1D5] mt-1 ml-4">
            Success
          </div>
        </div>
      </div>
    </>
  );
};

export default TradeyStepOne;
