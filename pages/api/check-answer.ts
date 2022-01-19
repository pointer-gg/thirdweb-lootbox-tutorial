import quizQuestions from "../../lib/questions";
import type { NextApiRequest, NextApiResponse } from "next";

export type CheckAnswerPayload = {
  questionIndex: number;
  answerIndex: number;
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

  // TODO: send the reward!

  res.status(200).json({
    kind: "correct",
  });
}
