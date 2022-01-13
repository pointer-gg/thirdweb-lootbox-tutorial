import { readFileSync } from 'fs';
import { sdk } from './helpers';

async function main() {
  const bundleModuleAddress = '0x4F9B996dC43C69B10F7DcD95895a5A67646664f1';
  const bundleModule = sdk.getBundleModule(bundleModuleAddress);

  console.log('Creating NFT batch...');

  const created = await bundleModule.createAndMintBatch([
    {
      metadata: {
        name: 'Tesla Model 3',
        description: 'A pretty rare car!',
        image: readFileSync('./assets/tesla-model3.jpeg'),
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Porsche 911',
        description: 'A pretty rare car!',
        image: readFileSync('./assets/porsche-911.jpeg'),
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Mclaren P1',
        description: 'A super rare car!',
        image: readFileSync('./assets/mclaren-p1.jpeg'),
      },
      supply: 10,
    }
  ]);

  console.log('NFTs created!')
  console.log(JSON.stringify(created, null, 2));
}

(async () => {
  try {
    await main();
  } catch (error) {
    console.error("Error minting the NFTs", error);
    process.exit(1);
  }
})();
