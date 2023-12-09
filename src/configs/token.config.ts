export const chainPathMapping = (chainId: string | number) => {
  switch (chainId.toString()) {
    case "11155111":
      return "/chains/sepolia.png";
    case "420":
      return "/chains/optimism.png";
    case "80001":
      return "/chains/mumbai.png";
    case "43113":
      return "/chains/fuji.png";
    case "97":
      return "/chains/binance.png";
    default:
      return "/";
  }
};
