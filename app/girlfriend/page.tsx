'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { loadStoredAnswers, loveSite, type LoveStoredAnswer } from '../love-data'

export default function GirlfriendPage() {
  const router = useRouter()
  const [storedAnswers, setStoredAnswers] = useState<LoveStoredAnswer[]>([])

  useEffect(() => {
    setStoredAnswers(loadStoredAnswers())
  }, [])

  const handleAccept = () => {
    const answers = loadStoredAnswers()
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers))
    router.push(`/contact?answers=${encodedAnswers}`)
  }

  const handleDecline = () => {
    // Even the "second" option is an accept; both go to the contact form.
    handleAccept()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">{loveSite.final.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{loveSite.final.message}</p>

        <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-purple-900 font-medium">
            Você respondeu {storedAnswers.length} pergunta{storedAnswers.length === 1 ? '' : 's'}.
          </p>
          <p className="text-sm text-purple-900 mt-1">
            Quando você clicar em qualquer opção, eu vou enviar suas respostas para eu te conhecer melhor.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {loveSite.final.acceptLabel}
          </button>

          <button
            onClick={handleDecline}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {loveSite.final.declineLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

