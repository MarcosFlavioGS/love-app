'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { loadStoredAnswers, loveSite } from '../love-data'

export default function CelebrationPage() {
  const router = useRouter()

  const handleCta = () => {
    const answers = loadStoredAnswers()
    const encodedAnswers = encodeURIComponent(JSON.stringify(answers))
    router.push(`/contact?answers=${encodedAnswers}`)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8 flex items-center justify-center'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center'>

        <div className='relative w-full max-w-sm mx-auto mb-6 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-4 ring-purple-300'>
          <Image
            src='/casal.jpg'
            alt='Nós dois'
            fill
            className='object-cover object-top'
          />
        </div>

        <h1 className='text-4xl font-bold text-purple-700 mb-4'>
          {loveSite.celebration.title}
        </h1>
        <p className='text-gray-600 text-lg mb-8'>
          {loveSite.celebration.message}
        </p>

        <button
          onClick={handleCta}
          className='bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors text-lg'
        >
          {loveSite.celebration.ctaLabel}
        </button>

      </div>
    </div>
  )
}
