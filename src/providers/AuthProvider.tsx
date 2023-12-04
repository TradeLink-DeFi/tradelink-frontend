import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { signMessage } from "@wagmi/core";
import authService from "@/services/auth.service";
import useUserStore from "@/stores/userStore";
import { Spinner } from "@nextui-org/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isGetting, setIsGetting] = useState(false);
  const { address } = useAccount();
  const { user, accessToken, authenticate, login, logout } = useUserStore();

  const handleLogin = useCallback(async () => {
    try {
      setIsGetting(true);
      const { message } = (await authService.getChallengeMessage()).data;
      setIsGetting(false);
      setIsSigning(true);
      const signature = await signMessage({
        message,
      }).catch((error) => {
        setIsSigning(false);
        logout();
      });
      setIsSigning(false);
      const { accessToken: token } = (await authService.login(signature!)).data;
      login(token);
    } catch (e) {
      console.error(e);
      logout();
    }
  }, [login, logout]);

  // Redirect to home if logged in
  useEffect(() => {
    if (
      address &&
      user.walletAddress.toLowerCase() !== address?.toLowerCase()
    ) {
      handleLogin();
    }
  }, [address, handleLogin, user]);

  // Authenticate if logged in
  useEffect(() => {
    if (accessToken) {
      authenticate();
    }
  }, [accessToken, authenticate]);

  // login again if wallet address changes
  useEffect(() => {
    if (
      user.walletAddress &&
      user.walletAddress.toLowerCase() !== address?.toLowerCase()
    ) {
      logout();
    }
  }, [user, address, logout]);

  // set mount to true
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isSigning || isGetting) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <Spinner size="lg" />
        {isSigning ? (
          <p className="text-gray-400 mt-8">
            {"Please sign message to continue"}
          </p>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
