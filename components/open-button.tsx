import { PackModule } from "@3rdweb/sdk";
import { useState } from "react";
import PrimaryButton from "../components/primary-button";

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
      await afterOpen()
    } finally {
      setOpening(false);
    }
  }

  return (
    <PrimaryButton onClick={openPack} disabled={opening}>
      {opening ? 'Opening...' : 'Open!'}
    </PrimaryButton>
  )
}
