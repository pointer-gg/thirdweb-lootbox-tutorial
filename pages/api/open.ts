import { ThirdwebSDK } from "@3rdweb/sdk";
import { BigNumber, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  address: string
}

export default async function Open(req: NextApiRequest, res: NextApiResponse) {
  console.log({ body: req.body })

  if(!req.body.hasOwnProperty('address')) {
    res.status(400).send("No address in request body");
    return;
  }

  const address = (req.body as Body).address;
  console.log({ address });

  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      // Your wallet private key
      process.env.WALLET_PRIVATE_KEY as string,
      // RPC URL, we'll use Polygon Mumbai
      ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
    )
  );

  const packModule = sdk.getPackModule('0x3C91a689d0Ff2da33a6e8C3Ffe40A9801C20EFA9')
  const opened = await packModule.open('0');
  console.log({ opened })

  const { id } = opened[0];

  const bundleModule = sdk.getBundleModule('0xaD62C2Ec189bF8301c129d361f8B6b1CEa56F284')
  await bundleModule.transfer(address, id, BigNumber.from(1));

  res.status(200).json(opened[0])
}