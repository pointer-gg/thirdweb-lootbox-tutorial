export type Question = {
  questionText: string,
  image?: string,
  answers: string[],
  correctAnswerIndex?: number,
}

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

export default quizQuestions;
