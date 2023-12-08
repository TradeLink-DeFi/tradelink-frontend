import axios from "axios";

const api = axios.create();

const getMetaData = async (uri: string) => {
  try {
    const metaData = await api.get(uri);
    return metaData;
  } catch (error) {
    console.log("error", error);
  }
};

export { getMetaData };
