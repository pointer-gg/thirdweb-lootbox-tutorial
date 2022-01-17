import { PackModule } from "@3rdweb/sdk";
import { useState } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../components/primary-button";
import NFT from "./nft";

type Props = {
  packModule: PackModule,
  afterOpen: () => Promise<unknown>,
}

export default function OpenButton({ packModule, afterOpen }: Props) {
  const [opening, setOpening] = useState(false);

  const openPack = async () => {
    setOpening(true);
    try {
      const nftMetadata = await packModule.open('0');
      console.log('opened', nftMetadata);
      setOpening(false);
      toast.success(
        <NFT metadata={nftMetadata[0]} />,
        {
          style: {
            minWidth: '300px',
          },
          duration: 5000,
        }
      ),
        await afterOpen();
    } catch {
      setOpening(false);
    }
  }

  return (
    <PrimaryButton onClick={openPack} disabled={opening}>
      {opening ? 'Opening...' : 'Open!'}
    </PrimaryButton>
  )
}
