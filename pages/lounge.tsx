import { BundleMetadata, NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import NFT from "../components/nft";
import UseThirdweb from "../hooks/useThirdweb";
import { bundleAddress } from "../lib/contractAddresses";

export default function Lounge() {
  const { address, sdk } = UseThirdweb();
  const bundleModule = sdk.getBundleModule(bundleAddress);

  const [nfts, setNfts] = useState<BundleMetadata[]>([])

  async function getNfts() {
    const nfts = await (await bundleModule.getOwned(address))
    setNfts(nfts)
  }

  useEffect(() => {
    if(address) {
      getNfts()
    }
  }, [address])

  const render = () => {
    if(nfts.length > 0) {
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
    } else {
      return (
        <p>You need to open some lootboxes to access the lounge!</p>
      )
    }
  }

  return (
    <Layout title="The Lounge">
      {render()}
    </Layout>
  )
}
