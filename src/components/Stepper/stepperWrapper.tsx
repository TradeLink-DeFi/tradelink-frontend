import { ReactNode } from "react";

interface StepperWarpperProp {
  children: ReactNode;
}

const StepperWarpper = ({ children }: StepperWarpperProp) => {
  return (
    <>
      <div className="flex flex-col border-1 rounded-2xl  mx-4">
        <div className="p-4 flex gap-4">
          <img src="/vectors/lamb.svg" alt="lamb" width={30} height={30}></img>
          <div className="flex justify-center items-center text-[20px] font-bold">
            Follow Status
          </div>
        </div>
        <div className="h-[1px] border-1" />
        <div className="mb-4">{children}</div>
      </div>
    </>
  );
};

export default StepperWarpper;
