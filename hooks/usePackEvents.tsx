import { ethers } from "ethers";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import UseThirdweb from "./useThirdweb";
import { packAddress } from "../lib/contractAddresses";
import packABI from "../utils/PackABI.json"

export default function UsePackEvents() {
  const { address, signer } = UseThirdweb()

  useEffect(() => {
    if (signer) {
      const packContract = new ethers.Contract(packAddress, packABI, signer);
      packContract.on('TransferSingle', (_operator, _from, to, _id, _value) => {
        if (to === address) {
          toast.success(
            <div className="flex flex-col gap-2" >
              <p className="text-green-800"> Congratulations! You were awarded a fancy cars pack!</p>
              <p>View and open it in the <Link href="/lounge"><a className="underline hover:no-underline">lounge</a></Link>!</p>
            </div >,
            {
              duration: 5000,
              id: address,
            }
          )
        }
      })
    }
  }, [signer])
}
