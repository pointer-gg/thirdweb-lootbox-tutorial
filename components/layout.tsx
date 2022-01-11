import { ConnectWallet } from "@3rdweb/react";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <Navbar />
      <main className='max-w-3xl mx-auto my-4'>
        {children}
      </main>
      <Footer />
    </>
  )
}
