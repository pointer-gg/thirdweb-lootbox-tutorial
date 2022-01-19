import axios from "axios";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  CheckAnswerPayload,
  CheckAnswerResponse,
} from "../pages/api/check-answer";
import PrimaryButton from "./primary-button";
import invariant from "tiny-invariant";

type Props = {
  questionIndex: number;
  questionText: string;
  image?: string;
  answers: string[];
  nextQuestionFunction: () => void;
};

type AnswerResult = "correct" | "incorrect";

export default function QuizQuestion({
  questionIndex,
  questionText,
  image,
  answers,
  nextQuestionFunction,
}: Props) {
  const [answerIndex, setAnswerIndex] = useState<number | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [answerResult, setAnswerResult] = useState<AnswerResult | undefined>(
    undefined
  );
  const [correctAnswerWas, setCorrectAnswerWas] = useState<number | undefined>(
    undefined
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      invariant(
        answerIndex !== undefined,
        "Answer index is required to submit"
      );

      const payload: CheckAnswerPayload = {
        questionIndex,
        answerIndex,
      };

      const checkResponse = await axios.post("/api/check-answer", payload);
      const result = checkResponse.data as CheckAnswerResponse;

      if (result.kind === "error") {
        setError(result.error);
      }

      if (result.kind === "correct") {
        setAnswerResult("correct");
        setCorrectAnswerWas(answerIndex);
      }

      if (result.kind === "incorrect") {
        setAnswerResult("incorrect");
        setCorrectAnswerWas(result.correctAnswerIndex);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const renderResult = () => {
    if (submitting) {
      return <PrimaryButton disabled={true}>Checking Answer...</PrimaryButton>;
    }

    if (answerResult === "correct") {
      return (
        <>
          <p className="text-green-800">
            Congratulations! That was the right answer!
          </p>
          <p>
            A pack will be sent to you shortly. You'll be able to check it out
            and open it in the{" "}
            <Link href="/lounge">
              <a className="underline hover:no-underline">lounge</a>
            </Link>
            !
          </p>
        </>
      );
    }

    if (answerResult === "incorrect") {
      return <p className="text-red-800">Sorry, that was incorrect!</p>;
    }

    return (
      <>
        <PrimaryButton
          type="submit"
          onClick={handleSubmit}
          disabled={answerIndex === undefined}
        >
          Check Answer
        </PrimaryButton>
        {error ? <p className="text-red-500">{error}</p> : null}
      </>
    );
  };

  return (
    <form>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-lg text-gray-900">
              {questionText}
            </label>
            {image ? (
              <img src={image} className="object-cover h-48 w-96" alt="" />
            ) : null}
          </div>
          <fieldset className="mt-4">
            <div className="space-y-4">
              {answers.map((answerText, i) => (
                <div key={i} className="flex items-center">
                  <input
                    id={i.toString()}
                    name="quiz-answer"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 peer disabled:cursor-not-allowed"
                    value={i}
                    checked={answerIndex === i}
                    onChange={(e) => setAnswerIndex(Number(e.target.value))}
                    disabled={answerResult !== undefined}
                  />
                  <label
                    htmlFor={i.toString()}
                    className="ml-3 block text-sm font-medium text-gray-700 peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed"
                  >
                    {answerText}
                    {i === correctAnswerWas ? <span> ✅</span> : null}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        {renderResult()}

        {answerResult !== undefined ? (
          <PrimaryButton onClick={nextQuestionFunction}>
            Next Question
          </PrimaryButton>
        ) : null}
      </div>
    </form>
  );
}
