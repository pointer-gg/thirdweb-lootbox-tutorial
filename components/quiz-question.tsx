import { useState } from "react"

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
  const [openedReward, setOpenedReward] = useState(false)

  const handleAnswerSelect = (index: number) => {
    if(index === correctAnswerIndex) {
      setAnswerResult("correct")
    } else {
      setAnswerResult("incorrect")
    }
    nextQuestionFunction()
  }

  return (
    <>
      <p>{questionText}</p>
      {image ? <img src={image} alt="" /> : null}
      <ol className='list-[upper-alpha]'>
        {answers.map((answerText, i) => {
          return <li onClick={(e) => handleAnswerSelect(i)} className='cursor-pointer'>{answerText}</li>
        })}
      </ol>

      {answerResult === "correct" && <p className="text-green-900">Correct!</p>}
      {answerResult === "incorrect" && <p className="text-red-900">Incorrect!</p>}
    </>
  )
}
