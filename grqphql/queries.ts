import { gql } from "@apollo/client";

export const GET_SEPOLIA = gql`
  query Sepolia {
    badApeNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
    cyberBearNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
  }
`;

export const GET_SEPOLIA_BY_ADDRESS = gql`
  query MySepolia($walletAddress: String!) {
    users(where: { id: $walletAddress }) {
      badApeNfts {
        tokenId
        id
        createdAtTimestamp
        contentURI
      }
      cyberBearNfts {
        contentURI
        createdAtTimestamp
        id
        tokenId
      }
    }
  }
`;

export const GET_MUMBAI = gql`
  query Mumbai {
    astroDogNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
  }
`;

export const GET_MUMBAI_BY_ADDRESS = gql`
  query MyMumbai($walletAddress: String!) {
    users(where: { id: $walletAddress }) {
      astroDogNft {
        tokenId
        id
        contentURI
        createdAtTimestamp
      }
    }
  }
`;

export const GET_BSC = gql`
  query Bsc {
    goldenBullNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
  }
`;

export const GET_BSC_BY_ADDRESS = gql`
  query MyBsc($walletAddress: String!) {
    users(where: { id: $walletAddress }) {
      goldenBullNft {
        tokenId
        id
        contentURI
        createdAtTimestamp
      }
    }
  }
`;

export const GET_FUJI = gql`
  query Fuji {
    golem8BitNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
  }
`;

export const GET_FUJI_BY_ADDRESS = gql`
  query MyFuji($walletAddress: String!) {
    users(where: { id: $walletAddress }) {
      golem8bitNft {
        tokenId
        id
        contentURI
        createdAtTimestamp
      }
    }
  }
`;

export const GET_OPTIMISM = gql`
  query Optimism {
    koiCrapNfts {
      tokenId
      id
      contentURI
      createdAtTimestamp
    }
  }
`;

export const GET_OPTIMISM_BY_ADDRESS = gql`
  query MyOptimism($walletAddress: String!) {
    users(where: { id: $walletAddress }) {
      koiCrapNft {
        tokenId
        id
        contentURI
        createdAtTimestamp
      }
    }
  }
`;
