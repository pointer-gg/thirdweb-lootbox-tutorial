import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import type { PackMetadataWithBalance } from "@3rdweb/sdk";
import { useEffect, useState } from "react";
import { packAddress } from "../lib/contractAddresses";

export function getStaticProps() {
  return {
    props: {
      title: "Winner's Lounge",
    },
  };
}

export default function Lounge() {
  const { address } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [packNfts, setPackNfts] = useState<PackMetadataWithBalance[]>([]);

  const sdk = new ThirdwebSDK("https://rpc-mumbai.maticvigil.com");
  const packModule = sdk.getPackModule(packAddress);

  async function getNftsWithLoading() {
    setLoading(true);
    try {
      const fetchedPackNfts = await packModule.getOwned(address);
      console.log(fetchedPackNfts);
      setPackNfts(fetchedPackNfts);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (address) {
      getNftsWithLoading();
    }
  }, [address]);

  return <p>You need to own some NFTs to access the lounge!</p>;
}
