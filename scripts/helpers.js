import { ThirdwebSDK } from "@thirdweb-dev/sdk"
import ethers from "ethers";

// Read environment variables from .env
import dotenv from "dotenv";
dotenv.config();

const walletPrivateKey = process.env.WALLET_PRIVATE_KEY;

if (!walletPrivateKey) {
  console.error("Wallet private key missing")
  process.exit(1)
}

export const wallet = new ethers.Wallet(
  // Wallet private key. NEVER CHECK THE KEY IN. ALWAYS USE ENVIRONMENT VARIABLES.
  process.env.WALLET_PRIVATE_KEY,
  // We use Polygon Mumbai network
  ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
);

export const sdk = new ThirdwebSDK(wallet);
