import quizQuestions from "../../lib/questions";
import type { NextApiRequest, NextApiResponse } from "next";
import { BigNumber, ethers } from "ethers";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { packAddress } from "../../lib/contractAddresses";

export type CheckAnswerPayload = {
  questionIndex: number;
  answerIndex: number;
  message: string;
  signedMessage: string;
};

type ErrorResponse = {
  kind: "error";
  error: string;
};

type IncorrectResponse = {
  kind: "incorrect";
  correctAnswerIndex: number;
};

type CorrectResponse = {
  kind: "correct";
};

export type CheckAnswerResponse =
  | ErrorResponse
  | IncorrectResponse
  | CorrectResponse;

export default async function Open(
  req: NextApiRequest,
  res: NextApiResponse<CheckAnswerResponse>
) {
  // Validate the request body contains expected fields
  if (!req.body.hasOwnProperty("questionIndex")) {
    res.status(400).json({
      kind: "error",
      error: "No question index in request body",
    });
    return;
  }

  if (!req.body.hasOwnProperty("answerIndex")) {
    res.status(400).json({
      kind: "error",
      error: "No answer index in request body",
    });
    return;
  }

  const body = req.body as CheckAnswerPayload;

  let address = "";
  try {
    address = ethers.utils.verifyMessage(body.message, body.signedMessage);
  } catch (err) {
    res.status(400).json({
      kind: "error",
      error: `Unable to verify message: ${err}`,
    });
    return;
  }

  // Validate the question index is valid
  if (body.questionIndex >= quizQuestions.length) {
    res.status(400).json({
      kind: "error",
      error: `Invalid question index ${body.questionIndex}`,
    });
    return;
  }

  const question = quizQuestions[body.questionIndex];

  // Check the answer, return if incorrect
  if (body.answerIndex !== question.correctAnswerIndex) {
    res.status(200).json({
      kind: "incorrect",
      correctAnswerIndex: question.correctAnswerIndex as number,
    });
    return;
  }

  // If we get here then the answer was correct

  // Initialize the Thirdweb SDK using the private key that owns the wallet
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.WALLET_PRIVATE_KEY as string,
      // Using Polygon Mumbai network
      ethers.getDefaultProvider("https://rpc-mumbai.maticvigil.com")
    )
  );

  // Transfer a copy of the pack to the user
  console.log(`Transferring a pack to ${address}...`);
  const packModule = sdk.getPackModule(packAddress);
  const packTokenId = "0";
  // Note that this is async
  packModule.transfer(address, packTokenId, BigNumber.from(1));

  res.status(200).json({
    kind: "correct",
  });
}
