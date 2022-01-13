import QuizGame from '../components/quiz-game'
import Layout from '../components/layout'
import quizQuestions from '../lib/questions'
import type { QuestionWithoutAnswer } from '../components/quiz-game';
import { getUnpackedSettings } from 'http2';

export default function Home() {
  quizQuestions.forEach(q => delete q.correctAnswerIndex)

  return (
    <Layout title="My Quiz!">
      <QuizGame questions={quizQuestions} />
    </Layout>
  )
}
