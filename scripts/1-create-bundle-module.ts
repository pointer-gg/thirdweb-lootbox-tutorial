import { getApp } from './helpers';

async function main() {
  const app = await getApp();

  console.log('Deploying bundle module...');

  const bundleModule = await app.deployBundleModule({
    name: 'Lootbox Bundle',
    sellerFeeBasisPoints: 0,
  });

  console.log(`Deployed bundle module with address ${bundleModule.address}`);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error creating the bundle module", error);
    process.exit(1);
  }
})();
