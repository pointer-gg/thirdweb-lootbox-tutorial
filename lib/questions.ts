export type Question = {
  questionText: string;
  image?: string;
  answers: string[];
  correctAnswerIndex?: number;
};

const quizQuestions: Question[] = [
  {
    questionText: "What do the initials DB in Aston Martin DB11 stand for?",
    image:
      "https://images.unsplash.com/photo-1642201855395-1c8b44e6e42b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    answers: [
      "Trick question: nothing!",
      "David Brown",
      "Drive Better",
      "Diane Blue",
    ],
    correctAnswerIndex: 1,
  },
  {
    questionText: "Which car brand is this logo for?",
    image: "https://www.carlogos.org/logo/Lexus-symbol-640x480.jpg",
    answers: ["Lamborghini", "Lada", "Lotus", "Lexus"],
    correctAnswerIndex: 3,
  },
  {
    questionText: "Where in the UK is the MINI plant?",
    image:
      "https://images.unsplash.com/photo-1591439346018-9d5df732ab7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    answers: ["Oxford", "Cambridge", "London", "Edinburgh"],
    correctAnswerIndex: 0,
  },
  {
    questionText:
      "Which was the first James Bond film to include an Aston Martin?",
    answers: ["Dr No", "From Russia with Love", "Goldfinger", "Thunderball"],
    correctAnswerIndex: 2,
  },
  {
    questionText: "What color were all Ferraris originally?",
    answers: ["Yellow", "White", "Blue", "Red"],
    correctAnswerIndex: 3,
  },
];

export default quizQuestions;
