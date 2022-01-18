import { useWeb3 } from "@3rdweb/hooks"
import { ThirdwebSDK } from "@3rdweb/sdk"
import { useEffect } from "react"

export default function UseThirdweb() {
  const { address, provider } = useWeb3()
  const signer = provider?.getSigner()

  const sdk = new ThirdwebSDK("https://rpc-mumbai.maticvigil.com")

  useEffect(() => {
    if (signer) {
      sdk.setProviderOrSigner(signer)
    }
  }, [signer])

  return {
    address,
    sdk,
    signer
  }
}
