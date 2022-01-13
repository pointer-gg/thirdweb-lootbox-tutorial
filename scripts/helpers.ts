import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

//Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.log("Wallet private key missing")
}

export const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
    process.env.WALLET_PRIVATE_KEY as string,
    // We use Polygon Mumbai network
    ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
  ),
);

const appAddress = '0x1D21f7Fe4a1E3deADb6a03bd3bD75E4017DCB493';

export async function getApp() {
  const app = await sdk.getAppModule(appAddress);
  return app;
}
