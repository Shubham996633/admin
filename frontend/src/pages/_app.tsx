import Navbar from "@/components/Navbar";
import { ToastProvider } from "@/context/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastProvider />
      <Navbar/>
      <Component {...pageProps} />
    </>
  );
}
