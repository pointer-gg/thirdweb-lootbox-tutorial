import { readFileSync } from 'fs';
import { sdk } from './helpers.js';

async function main() {
  // Paste in the address from when you created the bundle collection module
  const editionContractAddress = '0x600d87bEb97145412322b29b13f6a60E6C80aAB1';
  const editionContract = sdk.getEdition(editionContractAddress);

  console.log('Creating NFT batch...');

  await editionContract.mintBatch([
    {
      metadata: {
        name: 'Tesla Model 3',
        description: 'A pretty fancy car!',
        image: readFileSync('./assets/tesla-model3.jpeg'),
        properties: {
          rarity: 'a bit rare',
          fanciness: 7,
        }
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Porsche 911',
        description: 'A pretty fancy car!',
        image: readFileSync('./assets/porsche-911.jpeg'),
        properties: {
          rarity: 'a bit rare',
          fanciness: 7,
        }
      },
      supply: 50,
    },
    {
      metadata: {
        name: 'Mclaren P1',
        description: 'A super fancy car!',
        image: readFileSync('./assets/mclaren-p1.jpeg'),
        properties: {
          rarity: 'super rare!',
          fanciness: 10,
        }
      },
      supply: 10,
    }
  ])


  console.log('NFTs created!')
}

try {
  await main();
} catch (error) {
  console.error("Error minting the NFTs", error);
  process.exit(1);
}