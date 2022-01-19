import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

type Props = {
  title: string;
};

export default function Layout({
  children,
  title,
}: React.PropsWithChildren<Props>) {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto my-4">
        <div className="flex flex-col gap-8">
          <h1 className="text-6xl font-bold text-blue-600">{title}</h1>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
