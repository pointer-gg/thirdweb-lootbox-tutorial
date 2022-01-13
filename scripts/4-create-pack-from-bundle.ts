import { readFileSync } from 'fs';
import { sdk } from './helpers';

async function main() {
  const bundleModuleAddress = '0x4F9B996dC43C69B10F7DcD95895a5A67646664f1';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  const packModuleAddress = '0x0e08a5374c92406D128e11678c299b21d0032BD9';
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
    })),
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
