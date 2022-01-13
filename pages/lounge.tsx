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

  const [nfts, setNfts] = useState<BundleMetadata[]>([]);

  async function getNfts() {
    const nfts = await bundleModule.getOwned(address);
    setNfts(nfts);
  }

  useEffect(() => {
    if (address) {
      getNfts()
    }
  }, [address])

  if (nfts.length === 0) {
    return (
      <p>You need to own some NFTs to access the lounge!</p>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2>Your Collection!</h2>
        <div className="grid grid-cols-2 md:grid-cols-3">
          {nfts.map((nft, i) => (
            <div key={i}>
              <NFT metadata={nft.metadata} />
              <p>Balance: {nft.ownedByAddress}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Some secret content!</h2>
        <p>This content is only available to users with NFTs! 🤫</p>
      </div>
    </div>
  )
}
