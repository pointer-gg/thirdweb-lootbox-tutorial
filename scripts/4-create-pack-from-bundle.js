import { readFileSync } from 'fs';
import { sdk } from './helpers';

async function main() {
  const bundleModuleAddress = '0x7c4be03e80e1c482491f63f46c46c4e6caef8cc2';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0xdF168480C5F4CA170c648aEDc5F5a44fB1617775';
  const packModule = sdk.getPackModule(packModuleAddress);

  console.log('Getting all NFTs from bundle...');
  const nftsInBundle = await bundleModule.getAll();

  console.log('NFTs in bundle:');
  console.log(nftsInBundle);

  console.log('Creating a pack containing the NFTs from bundle...');
  const created = await packModule.create({
    assetContract: bundleModuleAddress,
    metadata: {
      name: 'Fancy Cars Pack!',
      image: readFileSync('./assets/fancy-cars.jpeg'),
    },
    assets: nftsInBundle.map(nft => ({
      tokenId: nft.metadata.id,
      amount: nft.supply,
    }))
  });

  console.log('Pack created!')
  console.log(created);
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
  }
})();
