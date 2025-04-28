export const userConfig = {
  name: 'Marcos'
  // Add more user-related configurations here if needed
} as const

export type Question = {
  id: number
  question: string
  my: string
  type: 'text'
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'Se você pudesse jantar com qualquer figura histórica, quem seria?)',
    my: 'Você, minha linda !; Ou William Shakespeare... Mas prefiro a primeira opção.)',
    type: 'text'
  },
  {
    id: 2,
    question: 'Qual é a sua forma favorita de passar um domingo preguiçoso?',
    my: "Assistir 'Vai dar namoro', com você de preferência",
    type: 'text'
  },
  {
    id: 3,
    question: 'Se você pudesse dominar instantaneamente qualquer habilidade, qual seria?',
    my: 'Conquistar o seu coração !; Ou Voar, sei lá.',
    type: 'text'
  },
  {
    id: 4,
    question: 'Qual foi a coisa mais espontânea que você já fez?',
    my: 'Prefiro não comentar',
    type: 'text'
  },
  {
    id: 5,
    question: 'Se você pudesse viver em qualquer universo fictício, qual você escolheria?',
    my: 'Seu coração !; Ok, Ok... Senhor do anáis, digo, anéis. Senhor dos anéis !',
    type: 'text'
  }
] as const
