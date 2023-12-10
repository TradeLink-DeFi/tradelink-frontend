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

export const getChainIdByCollection = (typename: string) => {
  switch (typename) {
    case "BadApeNft":
      return "11155111";
    case "CyberBearNft":
      return "11155111";
    case "AstroDogNft":
      return "80001";
    case "GoldenBullNft":
      return "97";
    case "Golem8bitNft":
      return "43113";
    case "KoiCrapNft":
      return "420";
    default:
      return "/";
  }
};
