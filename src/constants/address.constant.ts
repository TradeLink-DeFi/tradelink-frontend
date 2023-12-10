// FIXME: deploy multicall contract on bsc testnet
export const CONTRACT_ADDRESS = {
  11155111: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradelink: "0x6Cc3f2e4672FcB347c4878C4702df60048827072",
    badape: "0x16bC29a24f74FB915f78eB7d2104684CaD3356b6",
    cyberbear: "0x70781b27df4c2F7AE884C6C352D82027b5892801",
  },
  420: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradelink: "",
    koicarp: "0xf7F023d94E013De2239f9827BC242772763d1456",
  },
  80001: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradelink: "0xf5baF435A186f26C764d2FEc238Bab71Af62aE1A",
    astrodog: "0x84d1242291dA9bd26613B86003aB48a696F5AB05",
  },
  43113: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradelink: "0x57Ab29018003d6288B7572501FD8587Dbc345F1f",
    golem8bit: "0xf7F023d94E013De2239f9827BC242772763d1456",
  },
  97: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradelink: "",
    goldenbull: "0xf7F023d94E013De2239f9827BC242772763d1456",
  },
} as const;
