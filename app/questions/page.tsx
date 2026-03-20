'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { loveSite } from '../love-data'

export default function QuestionsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/questions/0')
  }, [router])

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-4 text-purple-600'>
          Olá! Eu sou o {loveSite.user.name}! 💕
        </h1>
        <p className='text-center text-gray-600 mb-2'>Vamos começar...</p>
        <p className='text-center text-gray-500'>Se não redirecionar, clique em `Próxima`.</p>
      </div>
    </div>
  )
}
