import { useState } from "react";
import { Question } from "../lib/questions";
import QuizQuestion from "./quiz-question";

export type QuestionWithoutAnswer = Omit<Question, "correctAnswerIndex">;

type Props = {
  questions: QuestionWithoutAnswer[];
};

export default function QuizGame({ questions }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const nextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  if (quizComplete) {
    return <p>You&apos;ve reached the end of the quiz!</p>;
  }

  const question = questions[questionIndex];

  return (
    <QuizQuestion
      key={questionIndex}
      questionIndex={questionIndex}
      questionText={question.questionText}
      image={question.image}
      answers={question.answers}
      nextQuestionFunction={nextQuestion}
    />
  );
}
