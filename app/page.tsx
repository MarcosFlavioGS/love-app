'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
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
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center p-8'>
      <div className='text-center max-w-lg'>
        <div className='relative w-full max-w-sm mx-auto mb-8 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-4 ring-purple-300'>
          <Image
            src='/casal.jpg'
            alt='Nós dois'
            fill
            className='object-cover object-top'
            priority
          />
        </div>
        <h1 className='text-4xl font-bold text-purple-700 mb-3'>
          Feliz Dia dos Namorados, {loveSite.bea.name} 💜
        </h1>
        <p className='text-gray-500 text-base'>Preparei algo pra você...</p>
      </div>
    </div>
  )
}
