export type LoveUser = {
  name: string
}

export type LoveGirl = {
  name: string
}

export type LoveStorySection = {
  id: string
  pageTitle: string
  declaration: string
  question: string
}

export type LoveCelebrationPage = {
  title: string
  message: string
  ctaLabel: string
}

export type LoveHomeIntro = {
  /** How long the first page stays visible before redirect (milliseconds). */
  redirectDelayMs: number
}

export type LoveSite = {
  user: LoveUser
  bea: LoveGirl
  homeIntro: LoveHomeIntro
  story: LoveStorySection[]
  celebration: LoveCelebrationPage
}

export const LOVE_STORAGE_KEY = 'love_site.answers'

export type LoveStoredAnswer = {
  questionId: string
  answer: string
}

export function loadStoredAnswers(): LoveStoredAnswer[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(LOVE_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as LoveStoredAnswer[]
  } catch {
    return []
  }
}

export function saveStoredAnswers(answers: LoveStoredAnswer[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(LOVE_STORAGE_KEY, JSON.stringify(answers))
}

export function clearStoredAnswers() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(LOVE_STORAGE_KEY)
}

export const loveSite = {
  user: {
    name: 'Marcos'
  },
  bea: {
    name: 'Bea'
  },
  homeIntro: {
    redirectDelayMs: 4000
  },
  story: [
    {
      id: 'vizinhos',
      pageTitle: 'Vizinhos, Volumes e o que não Víamos',
      declaration: `Vivemos vidas vizinhas por dez anos — a mesma vila, as mesmas vielas, volumes de livros nas mãos e nenhum sinal do que viria. Ver você todos esses anos sem ver o que você era pra mim: talvez fosse o jeito do destino guardar o melhor pro final.`,
      question: 'Onde você estava todo esse tempo ein ?'
    },
    {
      id: 'comum',
      pageTitle: 'Comum, Compatível, Casal',
      declaration: `Cada coisa que descobrimos em comum chegava como um susto — os mesmos gostos, os mesmos silêncios confortáveis, as mesmas causas. Coincidir tanto assusta, mas também consola: quando duas pessoas cabem assim dentro de um ao outro, não é acidente. É confirmação'.`,
      question: 'Qual coincidência nossa ainda te surpreende?'
    },
    {
      id: 'melhor',
      pageTitle: 'O Melhor que Me Aconteceu',
      declaration: `Não planejei. Não suspeitei. Mas de repente a melhor parte da minha vide é você — e o que mais me encanta é que a gente não precisou de distância pra se encontrar. Você sempre esteve aqui. Eu é que precisei abrir os olhos.`,
      question: 'Como se sente sendo o amor da minha vida ?'
    }
  ],
  celebration: {
    title: 'Feliz Dia dos Namorados, Meu amor 💜',
    message: 'Obrigado por ser tudo isso. Obrigado por ser a gente.',
    ctaLabel: 'Me mande alguma mensagem pra eu poder receber mais uma mensagem sua e melhorar o dia.'
  }
} satisfies LoveSite
