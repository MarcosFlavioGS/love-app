export type LoveUser = {
  name: string
}

export type LoveGirl = {
  name: string
}

export type LoveQuoteBlock = {
  author: string
  // Keep it short; this is displayed as a highlighted excerpt.
  text: string
}

export type LoveQuestion = {
  id: string
  prompt: string
  // Optional "author voice" message shown under each prompt.
  exampleAnswer?: string
}

export type LoveStorySection = {
  id: string
  kind: 'quote' | 'poem'
  pageTitle: string
  quote: LoveQuoteBlock
  questions: LoveQuestion[]
}

export type LoveFinalPage = {
  title: string
  message: string
  acceptLabel: string
  declineLabel: string
}

export type LoveSite = {
  user: LoveUser
  bea: LoveGirl
  story: LoveStorySection[]
  final: LoveFinalPage
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
    // TODO: edit your name here (single source of truth)
    name: 'Marcos'
  },
  bea: {
    name: 'Bea'
  },
  story: [
    {
      id: 'midsummer-love-looks',
      kind: 'quote',
      pageTitle: 'Quando o amor enxerga por dentro',
      quote: {
        author: 'William Shakespeare',
        text: 'Love looks not with the eyes, but with the mind.'
      },
      questions: [
        {
          id: 'q1',
          prompt: `Se você fosse a mulher desta cena, Bea, eu te veria no que ninguém prova em voz alta.\nEu te veria em silêncio, no jeito de amar com calma.\n\nE então eu te peço: como sua alma quer ser vista por mim?`,
          exampleAnswer: `Shakespeare: "Lady Bea, aqui fala um homem do teatro. O que esse Marcos fez por voce e adoravel de verdade. Ha muito rapaz que promete, mas ele escreveu, montou pagina por pagina e abriu o coracao. Da valor, minha dama."`
        }
      ]
    },
    {
      id: 'romeo-sweet-sorrow',
      kind: 'quote',
      pageTitle: 'Despedida que vira promessa',
      quote: {
        author: 'William Shakespeare',
        text: 'Parting is such sweet sorrow.'
      },
      questions: [
        {
          id: 'q2',
          prompt: `Na hora de se despedir, a saudade não é fim - é prenúncio.\nA distância vira ponte quando eu lembro do seu "sim" antes mesmo de te ver.\n\nAgora me diga: Que mensagem curta você deixaria pra mim na despedida, pra virar encontro?`,
          exampleAnswer: `Shakespeare, de novo e agora surpreso: "Meu Deus do palco... ele fez MAIS uma cena so pra voce? Bea, isso nao e jogo, isso e amor com esforco real. Eu, William, declaro: o rapaz ta apaixonado mesmo. Aceita esse homem."`
        }
      ]
    },
    {
      id: 'shakespeare-true-minds',
      kind: 'quote',
      pageTitle: 'Amor de verdade, sem encenação',
      quote: {
        author: 'William Shakespeare',
        text: 'Let me not to the marriage of true minds admit impediments.'
      },
      questions: [
        {
          id: 'q3',
          prompt: `E se tudo o que tenta atrapalhar fosse só barulho lá fora?\nDentro de você, o amor continua pedindo verdade.\n\nEscreva: qual valor seu coração não abre mão quando ama?`,
          exampleAnswer: `Shakespeare, com a mao no peito: "Se o amor verdadeiro pede atitude, esse Marcos entregou atitude em cada pagina. Bea, valoriza esse gesto raro. Nao aparece todo dia um homem que ama com criatividade e coragem."`
        }
      ]
    },
    {
      id: 'byron-she-walks-in-beauty',
      kind: 'poem',
      pageTitle: 'Beleza que não é só imagem',
      quote: {
        author: 'Lord Byron',
        text: 'She walks in beauty, like the night'
      },
      questions: [
        {
          id: 'q4',
          prompt: `Imagine que você caminha como nessa poesia.\nHá uma luz sua que não depende do olhar de ninguém.\nEla aparece nos detalhes: no jeito de tratar, no tempo que você oferece.\n\nQual é a luz que mais mora em você?`,
          exampleAnswer: `Lord Byron: "My lady Bea, eu conheco charme quando vejo. E o Marcos teve um charme rarissimo: dedicacao. O homem virou poeta digital por voce. Se isso nao merece um 'sim', eu devolvo meu titulo de lorde."`
        }
      ]
    },
    {
      id: 'browning-count-ways',
      kind: 'poem',
      pageTitle: 'Amor que sabe "contar"',
      quote: {
        author: 'Elizabeth Barrett Browning',
        text: 'How do I love thee? Let me count the ways.'
      },
      questions: [
        {
          id: 'q5',
          prompt: `Vamos contar do seu jeito.\nEm vez de promessas, você deixa marcas.\n\nEscreva 3 formas específicas de você amar`,
          exampleAnswer: `Elizabeth Barrett Browning: "Querida Bea, quando um homem ama de verdade, ele demonstra nos detalhes. Esse projeto inteiro grita carinho e intencao. Eu, Elizabeth, digo com toda poesia: considere seriamente aceitar esse namorado."`
        }
      ]
    },
    {
      id: 'donne-batter-my-heart',
      kind: 'quote',
      pageTitle: 'Coragem de recomeçar',
      quote: {
        author: 'John Donne',
        text: 'Batter my heart, three-person’d God;'
      },
      questions: [
        {
          id: 'q6',
          prompt: `Se o seu coração precisasse de coragem (e não de desculpas), ele não negociaria - ele chamaria.\nEle diria: "vem, deixa eu te mostrar o que eu sinto."\n\nQual é a primeira ação que você tomaria por amor, se tivesse certeza?`,
          exampleAnswer: `John Donne: "Bea, sem rodeio: isso que o Marcos fez e ato de amor. Nao e frase pronta; e coragem posta em pratica. Se o coracao pede verdade, aqui esta. Da essa chance ao rapaz."`
        }
      ]
    },
    {
      id: 'keats-bright-star',
      kind: 'poem',
      pageTitle: 'Permanecer com você',
      quote: {
        author: 'John Keats',
        text: 'Bright star, would I were steadfast as thou art'
      },
      questions: [
        {
          id: 'q7',
          prompt: `Ser firme no amor não é ficar perfeito - é ficar.\nÉ presença nos dias leves e nos dias difíceis.\n\nAgora me diga: qual desses jeitos é o mais verdadeiro em você?`,
          exampleAnswer: `Keats: "Bea, eu escrevi sobre estrelas, mas hoje eu diria sobre constancia. O Marcos foi constante no cuidado e no esforco por voce. Isso e bonito, e raro. Meu voto poetico: aceita e ve onde esse amor pode chegar."`
        }
      ]
    }
  ],
  final: {
    title: 'Bea... aceita ser minha namorada?',
    message: `Depois de imaginar você como a mulher das histórias e poemas, eu só cheguei a uma conclusão: eu quero cuidar de você de verdade. Quer ser minha namorada, Bea?`,
    acceptLabel: 'Sim, vamos viver isso !!',
    declineLabel: 'Com certeza !!'
  }
} satisfies LoveSite
