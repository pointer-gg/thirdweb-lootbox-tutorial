import Head from 'next/head'
import { useState } from 'react'
import QuizGame from '../components/quiz-game'
import type { Question } from '../components/quiz-game'
import Layout from '../components/layout'
import quizQuestions from '../lib/questions'

export default function Home() {
  return (
    <Layout title="My Quiz!">
      <QuizGame questions={quizQuestions} />
    </Layout>
  )
}
