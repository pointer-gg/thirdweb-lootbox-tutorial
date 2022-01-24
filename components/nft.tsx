import type { NFTMetadata } from "@3rdweb/sdk";

type Props = {
  metadata: NFTMetadata
}

export default function NFT({ metadata }: Props) {
  return (
    <div className="flex flex-col">
      <p className="font-medium text-lg">{metadata.name}</p>
      <img className="w-48 h-36 object-cover" src={metadata.image} alt={metadata.name} />
    </div>
  )
}
