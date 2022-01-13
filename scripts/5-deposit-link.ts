import { BigNumber, ethers } from "ethers";
import { sdk } from "./helpers";

async function main() {
  const packModuleAddress = '0x0e08a5374c92406D128e11678c299b21d0032BD9';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Depositing link...')

  // link uses 18 decimals, same as Eth. So this gives us the amount to use for 1 LINK
  const amount = ethers.utils.parseEther('1');

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
