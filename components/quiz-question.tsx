import { useState } from "react"
import { isGeneratorObject } from "util/types"
import OpenButton from "./open-button"

type Props = {
  questionText: string,
  image?: string,
  answers: string[],
  correctAnswerIndex: number,
  nextQuestionFunction: () => void
}

type AnswerResult = "correct" | "incorrect" | "none"

export default function QuizQuestion({questionText, image, answers, correctAnswerIndex, nextQuestionFunction}: Props) {
  const [answerResult, setAnswerResult] = useState<AnswerResult>("none")

  const handleAnswerSelect = (index: number) => {
    if(index === correctAnswerIndex) {
      setAnswerResult("correct")
    } else {
      setAnswerResult("incorrect")
    }
  }

  if(answerResult === "correct") return (
    <>
      <p className="text-green-900">Correct!</p>
      <OpenButton />
      <button onClick={nextQuestionFunction}>Next question!</button>
    </>
  )

  if(answerResult === "incorrect") return (
    <>
    <p className="text-red-900">Sorry, that was incorrect!</p>
    <button onClick={nextQuestionFunction}>Next question!</button>
    </>
  )

  return (
    <>
      <p>{questionText}</p>
      {image ? <img src={image} alt="" /> : null}
      <ol className='list-[upper-alpha]'>
        {answers.map((answerText, i) => {
          return <li key={i} onClick={(e) => handleAnswerSelect(i)} className='cursor-pointer'>{answerText}</li>
        })}
      </ol>
    </>
  )
}
