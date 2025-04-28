'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { userConfig, questions } from '../config'

export default function QuestionsPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ questionId: number; answer: string }[]>([])

  const handleAnswer = (answer: string) => {
    if (!answer.trim()) return

    const newAnswers = [
      ...answers,
      {
        questionId: questions[currentQuestion].id,
        answer: answer.trim()
      }
    ]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Encode answers and redirect to contact page
      const encodedAnswers = encodeURIComponent(JSON.stringify(newAnswers))
      router.push(`/contact?answers=${encodedAnswers}`)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-4 text-purple-600'>
          Olá! Eu sou o {userConfig.name}! 💕
        </h1>
        <p className='text-center text-gray-600 mb-8'>
          Já que você está por aqui, vamos nos conhecer melhor através dessas perguntas!
        </p>

        <div className='mb-8'>
          <p className='text-lg text-gray-700 mb-4'>{questions[currentQuestion].question}</p>

          <div className='space-y-4'>
            <input
              type='text'
              className='w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400'
              placeholder='Digite sua resposta aqui...'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer((e.target as HTMLInputElement).value)
                  ;(e.target as HTMLInputElement).value = ''
                }
              }}
            />
          </div>

          <p className='text-sm text-gray-700 mb-4'>*Minha resposta: {questions[currentQuestion].my}</p>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-sm text-gray-500'>
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement
              handleAnswer(input.value)
              input.value = ''
            }}
            className='bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors'>
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  )
}
