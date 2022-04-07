import { wallet, sdk } from './helpers.js';

async function main() {
  console.log('Deploying edition contract...');

  console.log({ address: wallet.address })

  const editionAddress = await sdk.deployer.deployEdition({
    name: 'Lootbox NFTs',
    primary_sale_recipient: wallet.address, // seems to be required
  });

  console.log(`Deployed edition contract with address ${editionAddress}`);
}

try {
  await main();
} catch (error) {
  console.error("Error creating the bundle collection module", error);
  process.exit(1);
}
