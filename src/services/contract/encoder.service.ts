import { Call } from "@/interfaces/encoder.interface";
import { encodeFunctionData } from "viem";

export const multicallEncoder = async (calls: Call[]) => {
  const callsEncoded = calls.map((call) => {
    const encoded = encodeFunctionData({
      abi: call.abi,
      functionName: call.functionName,
      args: call.args,
    });
    return {
      target: call.address,
      callData: encoded,
    };
  });

  return callsEncoded;
};
