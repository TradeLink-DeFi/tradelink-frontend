import axios from "../../lib/axios.config";

const getChallengeMessage = () => {
  return axios.get("/auth/get-challenge-message");
};

const login = (signature: string) => {
  return axios.post("/auth/login", { signature });
};

const me = async (): Promise<any> => {
  return axios
    .get("/user/me")
    .then((res) => res)
    .catch((error) => {
      console.log("error", error);
    });
};

const authService = {
  login,
  getChallengeMessage,
  me,
};

export default authService;
