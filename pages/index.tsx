import QuizGame from "../components/quiz-game";
import quizQuestions from "../lib/questions";

export function getStaticProps() {
  return {
    props: {
      title: "My Quiz!",
    },
  };
}

export default function Home() {
  // Delete the correct answer fields before rendering!
  quizQuestions.forEach((q) => delete q.correctAnswerIndex);

  return <QuizGame questions={quizQuestions} />;
}
