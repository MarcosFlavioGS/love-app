export const userConfig = {
  name: "Marcos",
  // Add more user-related configurations here if needed
} as const;

export type Question = {
  id: number;
  question: string;
  type: "text";
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Se você pudesse jantar com qualquer figura histórica, quem seria?",
    type: "text"
  },
  {
    id: 2,
    question: "Qual é a sua forma favorita de passar um domingo preguiçoso?",
    type: "text"
  },
  {
    id: 3,
    question: "Se você pudesse dominar instantaneamente qualquer habilidade, qual seria?",
    type: "text"
  },
  {
    id: 4,
    question: "Qual foi a coisa mais espontânea que você já fez?",
    type: "text"
  },
  {
    id: 5,
    question: "Se você pudesse viver em qualquer universo fictício, qual você escolheria?",
    type: "text"
  }
] as const; 