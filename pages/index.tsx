import Head from 'next/head'
import { useState } from 'react'
import QuizGame from '../components/quiz-game'
import type { Question } from '../components/quiz-game'

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const quizQuestions: Question[] = [
    {
      questionText: "the answer is C. What is the answer?",
      image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
      answers: ["Hello", "World", "Thirdweb", "Polygon"],
      correctAnswerIndex: 2,
    },
    {
      questionText: "Which number is odd?",
      answers: ["100", "200", "300", "305"],
      correctAnswerIndex: 3,
    }
  ]

  return (
    <div className='flex flex-col gap-8'>
      <h1 className="text-6xl font-bold text-blue-600">My Cars Quiz</h1>
      <QuizGame questions={quizQuestions} />
    </div>
  )
}
