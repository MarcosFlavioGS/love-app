'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loveSite } from './love-data'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const delayMs = loveSite.homeIntro.redirectDelayMs
    const id = window.setTimeout(() => {
      router.replace('/questions/0')
    }, delayMs)
    return () => window.clearTimeout(id)
  }, [router])

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-purple-600 mb-4'>
          Olá! Eu sou o {loveSite.user.name}, mais conhecido como AMOR DA SUA VIDA ! 👋
        </h1>
        <p className='text-gray-600'>Redirecionando você para a parte que importa ! 🎉</p>
      </div>
    </div>
  )
}
