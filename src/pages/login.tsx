import Head from "next/head";
import LoginScreen from "@/components/LoginModule/LoginScreen";

export default function Login() {
  return (
    <>
      <Head>
        <title>TradeLink | Login</title>
      </Head>
      <LoginScreen />
    </>
  );
}
