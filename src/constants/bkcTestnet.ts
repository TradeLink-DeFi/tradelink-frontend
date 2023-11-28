export const bkcTestnet = {
  id: 25925,
  name: "Bitkub Chain Testnet",
  network: "bkc-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "KUB",
    symbol: "tKUB",
  },
  rpcUrls: {
    default: { http: ["https://rpc-testnet.bitkubchain.io"] },
    public: { http: ["https://rpc-testnet.bitkubchain.io"] },
  },
  blockExplorers: {
    etherscan: { name: "BkcScan", url: "https://testnet.bkcscan.com" },
    default: { name: "BkcScan", url: "https://testnet.bkcscan.com" },
  },
  contracts: {},
  testnet: true,
};
