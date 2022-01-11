import { NFTMetadata } from "@3rdweb/sdk";
import { useState } from "react";
import UseThirdweb from "../hooks/useThirdweb";
import PrimaryButton from "../components/primary-button";
import NFT from "./nft";

type OpenState = "NotOpened" | "Opening" | NFTMetadata

export default function OpenButton() {
  const sdk = UseThirdweb()

  const [openState, setOpenState] = useState<OpenState>("NotOpened")

  const packModule = sdk.getPackModule('0x3C91a689d0Ff2da33a6e8C3Ffe40A9801C20EFA9')

  const openPack = async () => {
    setOpenState("Opening")
    try {
      const openedPack = await packModule.open('0');
      console.log(JSON.stringify(openedPack, null, 2));
      setOpenState(openedPack[0]);
    } catch {
      setOpenState("NotOpened")
    }
  }

  if(openState === "NotOpened") {
    return <PrimaryButton onClick={openPack}>Open Reward!</PrimaryButton>
  } else if(openState === "Opening") {
    return <PrimaryButton disabled={true}>Opening...</PrimaryButton>
  } else {
    return (
      <>
        <p className="text-large">You opened a reward!</p>
        <NFT metadata={openState} />
      </>
    )
  }
}
