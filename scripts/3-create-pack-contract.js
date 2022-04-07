import { sdk, wallet } from './helpers.js';

async function main() {
  console.log('Deploying pack contract...');

  const packAddress = await sdk.deployer.deployPack({
    name: 'Lootbox Pack',
  });

  console.log(`Deployed pack contract with address ${packAddress}`);
}

try {
  await main();
} catch (error) {
  console.error("Error creating the pack contract", error);
  process.exit(1);
}