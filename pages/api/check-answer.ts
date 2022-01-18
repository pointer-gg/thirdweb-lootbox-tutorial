import { ThirdwebSDK } from "@3rdweb/sdk";
import { BigNumber, ethers } from "ethers";
import quizQuestions from "../../lib/questions"
import { packAddress } from "../../lib/contractAddresses";
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
};

export type CheckAnswerResponse = ErrorResponse | IncorrectResponse | CorrectResponse;

export default async function Open(req: NextApiRequest, res: NextApiResponse<CheckAnswerResponse>) {
  // Validate the request body contains expected fields
  if (!req.body.hasOwnProperty('address')) {
    res.status(400).json({
      kind: 'error',
      error: "No address in request body"
    });
    return;
  }

  if (!req.body.hasOwnProperty('questionIndex')) {
    res.status(400).json({
      kind: 'error',
      error: "No question index in request body"
    });
    return;
  }

  if (!req.body.hasOwnProperty('answerIndex')) {
    res.status(400).json({
      kind: 'error',
      error: "No answer index in request body"
    });
    return;
  }

  const body = req.body as Body

  // Validate the question index is valid
  if (body.questionIndex >= quizQuestions.length) {
    res.status(400).json({
      kind: 'error',
      error: `Invalid question index ${body.questionIndex}`
    });
    return;
  }

  const question = quizQuestions[body.questionIndex]

  // Check the answer, return if incorrect
  if (body.answerIndex !== question.correctAnswerIndex) {
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

  // Transfer a copy of the pack to the user
  console.log(`Transferring a pack to ${body.address}...`);
  const packModule = sdk.getPackModule(packAddress);
  const packTokenId = '0';
  // Note that this is async
  await packModule.transferFireAndForget(body.address, packTokenId, BigNumber.from(1));

  res.status(200).json({
    kind: 'correct',
  });
}
