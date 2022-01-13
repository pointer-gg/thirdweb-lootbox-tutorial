import { BundleMetadata } from "@3rdweb/sdk";
import { useEffect, useState } from "react";
import NFT from "../components/nft";
import UseThirdweb from "../hooks/useThirdweb";
import { bundleAddress } from "../lib/contractAddresses";

export function getStaticProps() {
  return {
    props: {
      title: "Winner's Lounge",
    },
  };
}

export default function Lounge() {
  const { address, sdk } = UseThirdweb();
  const bundleModule = sdk.getBundleModule(bundleAddress);

  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState<BundleMetadata[]>([]);

  async function getNfts() {
    setLoading(true);
    try {
      const nfts = await bundleModule.getOwned(address);
      setNfts(nfts);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (address) {
      getNfts()
    }
  }, [address])

  if(!address) {
    return <p className="text-red-800">Please connect your wallet to access the lounge!</p>
  }

  if (loading) {
    return (
      <svg className="animate-spin h-10 w-10 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        <span className="sr-only">Loading</span>
      </svg>
    )
  }

  if (nfts.length === 0) {
    return (
      <p>You need to own some NFTs to access the lounge!</p>
    )
  }

  return (
    <div className="flex flex-col gap-16">
      <div>
        <h2 className="text-4xl font-bold">Your Collection!</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 mt-4 gap-2">
          {nfts.map((nft, i) => (
            <div className="border border-blue-500 rounded-lg p-4" key={i}>
              <NFT metadata={nft.metadata} />
              <p className="text-gray-800">Balance: {nft.ownedByAddress}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-4xl font-bold">Some secret content!</h2>
        <p>This content is only available to users with NFTs! 🤫</p>
        <p>You can put anything you like here!</p>
      </div>
    </div>
  )
}
