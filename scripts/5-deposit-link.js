import { ethers } from "ethers";
import { sdk } from "./helpers";

async function main() {
  const packModuleAddress = '0x5f0A84Be88a93C4F4f49B1732B77eaffcFDcb0a2';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Depositing link...')

  // LINK uses 18 decimals, same as Eth. So this gives us the amount to use for 2 LINK
  const amount = ethers.utils.parseEther('2');

  await packModule.depositLink(amount);
  console.log('Deposited!')

  const balance = await packModule.getLinkBalance();
  console.log(balance);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error depositing the LINK", error);
    process.exit(1);
  }
})();
