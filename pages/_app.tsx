import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
