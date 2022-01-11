import { NFTMetadata } from "@3rdweb/sdk";

type Props = {
  metadata: NFTMetadata
}

export default function NFT({ metadata }: Props) {
  return (
    <>
      <p>{metadata.name}</p>
      <img src={metadata.image} alt={metadata.name} width={200} />
    </>
  )
}
