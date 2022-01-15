import { sdk } from "./helpers";

async function main() {
  const packModuleAddress = '0x5f0A84Be88a93C4F4f49B1732B77eaffcFDcb0a2';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Opening the pack...');
  const opened = await packModule.open('0');
  console.log('Opened the pack!');
  console.log(opened);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error opening the pack", error);
    process.exit(1);
  }
})();
