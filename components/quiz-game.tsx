import { useState } from "react"
import QuizQuestion from "./quiz-question"

export type Question = {
  questionText: string,
  image?: string,
  answers: string[],
  correctAnswerIndex: number,
}

type Props = {
  questions: Question[],
}

export default function QuizGame({questions}: Props) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const hasNextQuestion = questionIndex + 1 < questions.length;

  const nextQuestion = () => {
    if(hasNextQuestion) {
      setQuestionIndex(questionIndex + 1)
    } else {
      setQuizComplete(true)
    }
  }

  if(quizComplete) {
    return <p>Done</p>
  }

  const question = questions[questionIndex]

  return (
    <>
      <QuizQuestion
        questionText={question.questionText}
        image={question.image}
        answers={question.answers}
        correctAnswerIndex={question.correctAnswerIndex}
        nextQuestionFunction={nextQuestion}
      />

      {hasNextQuestion && <button>Next Question</button>}
    </>
  )
}
