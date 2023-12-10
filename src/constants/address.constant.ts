// FIXME: deploy multicall contract on bsc testnet
export const CONTRACT_ADDRESS = {
  11155111: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradeLinkCCIPV1: "0x6Cc3f2e4672FcB347c4878C4702df60048827072",
  },
  420: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradeLinkCCIPV1: "",
  },
  80001: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradeLinkCCIPV1: "0xf5baF435A186f26C764d2FEc238Bab71Af62aE1A",
  },
  43113: {
    multicall: "0xcA11bde05977b3631167028862bE2a173976CA11",
    tradeLinkCCIPV1: "0x57Ab29018003d6288B7572501FD8587Dbc345F1f",
  },
  97: {
    multicall: "",
    tradeLinkCCIPV1: "",
  },
} as const;
