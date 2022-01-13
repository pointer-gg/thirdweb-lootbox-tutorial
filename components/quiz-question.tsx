import { useWeb3 } from "@3rdweb/hooks"
import { NFTMetadata } from "@3rdweb/sdk"
import axios from "axios"
import { useState } from "react"
import { CheckAnswerResponse } from "../pages/api/check-answer"
import NFT from "./nft"
import PrimaryButton from "./primary-button"

type Props = {
  questionIndex: number,
  questionText: string,
  image?: string,
  answers: string[],
  nextQuestionFunction: () => void
}

type AnswerResult = "correct" | "incorrect"

export default function QuizQuestion({questionIndex, questionText, image, answers, nextQuestionFunction}: Props) {
  const { address } = useWeb3();
  const [answerIndex, setAnswerIndex] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null);
  const [reward, setReward] = useState<NFTMetadata | null>(null);
  const [correctAnswerWas, setCorrectAnswerWas] = useState<number | null>(null);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault()

    setSubmitting(true);

    try {
      console.log("submitted")
      const checkResponse = await axios.post("/api/check-answer", {
        address,
        questionIndex,
        answerIndex,
      });
      const result = checkResponse.data as CheckAnswerResponse;

      if(result.kind === "error") {
        setError(result.error);
      }

      if(result.kind === "correct") {
        setAnswerResult("correct");
        setReward(result.reward);
        setCorrectAnswerWas(answerIndex);
      }

      if(result.kind === "incorrect") {
        setAnswerResult("incorrect");
        setCorrectAnswerWas(result.correctAnswerIndex);
      }


    } finally {
      setSubmitting(false)
    }
  }

  if(!address) {
    return <p>Please connect your wallet to take the quiz!</p>
  }

  const renderResult = () => {
    if(submitting) {
      return (
        <>
          <PrimaryButton disabled="disabled">Checking Answer...</PrimaryButton>
          <p>If your answer is correct then a random NFT will be minted for you! This will take a while...</p>
        </>
      )
    }

    if(answerResult === "correct") {
      return <>
        <p className="text-green-800">Congratulations! You were awarded an NFT:</p>
        <NFT metadata={reward as NFTMetadata} />
      </>
    }

    if(answerResult === "incorrect") {
      return <p className="text-red-800">Sorry, that was incorrect!</p>
    }

    return (
      <>
        <PrimaryButton type="submit" onClick={handleSubmit} disabled={answerIndex === null}>Check Answer</PrimaryButton>
        {error ? <p className="text-red-500">{error}</p> : null}
      </>
    )
  }
  
  return (
    <form>
      <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-col gap-2">
          <label className="font-medium text-lg text-gray-900">{questionText}</label>
          {image ? <img src={image} className="object-cover h-48 w-96" alt="" /> : null}
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
                  disabled={answerResult !== null}
                />
                <label htmlFor={i.toString()} className="ml-3 block text-sm font-medium text-gray-700 peer-disabled:text-gray-500 peer-disabled:cursor-not-allowed">
                  {answerText}
                  {i === correctAnswerWas ? <span> ✅</span> : null}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      {renderResult()}

      {answerResult !== null ? <PrimaryButton onClick={nextQuestionFunction}>Next Question</PrimaryButton> : null }
    </div>
    </form>
  )
}
