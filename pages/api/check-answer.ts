import { NFTMetadata, ThirdwebSDK } from "@3rdweb/sdk";
import { BigNumber, ethers } from "ethers";
import quizQuestions from "../../lib/questions"
import { bundleAddress, packAddress } from "../../lib/contractAddresses";
import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  address: string,
  questionIndex: number,
  answerIndex: number
};

type ErrorResponse = {
  kind: 'error',
  error: string,
};

type IncorrectResponse = {
  kind: 'incorrect',
  correctAnswerIndex: number
};

type CorrectResponse = {
  kind: 'correct',
  reward: NFTMetadata
};

export type CheckAnswerResponse = ErrorResponse | IncorrectResponse | CorrectResponse;

export default async function Open(req: NextApiRequest, res: NextApiResponse<CheckAnswerResponse>) {
  // Validate the request body contains expected fields
  if(!req.body.hasOwnProperty('address')) {
    res.status(400).json({
      kind: 'error',
      error: "No address in request body"
    });
    return;
  }

  if(!req.body.hasOwnProperty('questionIndex')) {
    res.status(400).json({
      kind: 'error',
      error: "No question index in request body"
    });
    return;
  }

  if(!req.body.hasOwnProperty('answerIndex')) {
    res.status(400).json({
      kind: 'error',
      error: "No answer index in request body"
    });
    return;
  }

  const body = req.body as Body

  // Validate the question index is valid
  if(body.questionIndex >= quizQuestions.length) {
    res.status(400).json({
      kind: 'error',
      error: `Invalid question index ${body.questionIndex}`
    });
    return;
  }

  const question = quizQuestions[body.questionIndex]

  // Check the answer, return if incorrect
  if(body.answerIndex !== question.correctAnswerIndex) {
    res.status(200).json({
      kind: 'incorrect',
      correctAnswerIndex: question.correctAnswerIndex as number,
    });
    return;
  }

  // If we get here then the answer was correct, send the reward!

  // Initialize the Thirdweb SDK using the private key that owns the wallet
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.WALLET_PRIVATE_KEY as string,
      // Using Polygon Mumbai network
      ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
    ),
  );

  // Open the pack and check which NFT was opened
  console.log('Opening the pack...');
  const packModule = sdk.getPackModule(packAddress);
  const opened = await packModule.open('0');

  // Transfer a copy of that NFT to the address that answered correctly
  const { id } = opened[0];
  console.log(`Transferring NFT with ID ${id} to address ${body.address}`);
  const bundleModule = sdk.getBundleModule(bundleAddress);
  await bundleModule.transfer(body.address, id, BigNumber.from(1));

  res.status(200).json({
    kind: 'correct',
    reward: opened[0]
  });
}
