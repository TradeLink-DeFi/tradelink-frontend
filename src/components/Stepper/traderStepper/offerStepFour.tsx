const OfferStepFour = () => {
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
          <div className="text-sm font-semibold">Offer Accepted</div>
          <div className="mt-2 text-sm">This trade has been accepted.</div>
        </div>
      </div>

      {/* 2 */}
      <div className=" flex gap-5 px-6 pt-2 ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="w-10 h-10 rounded-full text-white flex justify-center items-center">
            <img src="/vectors/check.svg" width={50} height={50} alt="check" />
          </div>
          <div className="w-[3px] h-[100px] bg-[#385BD2] flex justify-center items-center rounded-md" />
        </div>
        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[100px]">
          <div className="text-sm font-semibold">Confirmed</div>
          <div className="mt-2 text-sm">Tradee has confirmed the offer.</div>
        </div>
      </div>

      {/* 3 */}
      <div className=" flex gap-5 px-6 pt-2 ">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className=" w-10 h-10 rounded-full text-white flex justify-center items-center">
            <img src="/vectors/check.svg" width={50} height={50} alt="check" />
          </div>
          <div className="w-[3px] h-[100px] bg-[#385BD2] flex justify-center items-center rounded-md" />
        </div>

        <div className="flex flex-col bg-[#F1F5FD] rounded-md p-4 w-[500px] h-[100px]">
          <div className="text-sm font-semibold">Transaction Confirmed</div>
          <div className="mt-2 text-sm">
            {"The transaction has already been confirmed"}
          </div>
        </div>
      </div>

      {/* 4 */}
      <div className="flex gap-5 px-6 pt-2">
        <div className="flex flex-col justify-center items-center gap-1">
          <div className=" w-10 h-10 rounded-full text-white flex justify-center items-center">
            <img src="/vectors/check.svg" width={50} height={50} alt="check" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-md font-semibold text-[#03AD00] mt-1 ml-4">
            Success
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferStepFour;
