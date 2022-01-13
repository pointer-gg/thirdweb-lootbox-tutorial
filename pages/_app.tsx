import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@3rdweb/react';
import Layout from '../components/layout';

// Polygon Mumbai chain ID is 80001, see https://chainlist.org
const supportedChainIds = [80001];

// We'll only support MetaMask which is an injected connector
const connectors = {
  injected: {},
};

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Layout title={pageProps.title}>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  )
}
