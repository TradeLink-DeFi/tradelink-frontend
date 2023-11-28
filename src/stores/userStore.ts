import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../../lib/axios.config";
import authService from "@/services/auth.service";
import { disconnect } from "@wagmi/core";

interface userState {
  user: {
    id: string;
    walletAddress: string;
  };
  accessToken: string;
  login: (accessToken: string) => void;
  logout: () => void;
  authenticate: () => void;
}

const useUserStore = create<userState>()(
  persist(
    (set, get) => ({
      user: {
        id: "",
        walletAddress: "",
      },
      accessToken: "",
      login: (accessToken: string) => {
        set({ accessToken });
      },
      logout: async () => {
        set({
          user: {
            id: "",
            walletAddress: "",
          },
          accessToken: "",
        });
        axios.defaults.headers.common["Authorization"] = ``;
        await disconnect();
        localStorage.clear();
      },
      authenticate: async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${get().accessToken
          }`;
        await authService
          .me()
          .then((res) => {
            set({
              user: {
                id: res.data._id,
                walletAddress: res.data.walletAddress.toLowerCase(),
              },
            });
          })
          .catch(async (err) => {
            console.log(err);
            get().logout();
          });
      },
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
