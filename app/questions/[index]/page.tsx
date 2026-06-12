'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { loveSite, loadStoredAnswers, saveStoredAnswers, type LoveStoredAnswer } from '../../love-data'

export default function QuestionByIndexPage() {
  const router = useRouter()
  const params = useParams<{ index: string }>()

  const storyIndex = useMemo(() => {
    const n = Number(params.index)
    return Number.isFinite(n) ? n : -1
  }, [params.index])

  const section = storyIndex >= 0 ? loveSite.story[storyIndex] : undefined

  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored: LoveStoredAnswer[] = loadStoredAnswers()
    const existing = stored.find((a) => a.questionId === section?.id)
    setValue(existing?.answer ?? '')
  }, [section?.id])

  useEffect(() => {
    if (storyIndex !== -1 && !section) {
      router.replace('/questions/0')
    }
  }, [router, section, storyIndex])

  const isLast = storyIndex >= loveSite.story.length - 1

  const handleNext = () => {
    if (!section) return
    if (!value.trim()) {
      setError('Escreva algo antes de continuar 💜')
      return
    }
    setError(null)

    const stored = loadStoredAnswers()
    const byId = new Map<string, LoveStoredAnswer>(stored.map((a) => [a.questionId, a]))
    byId.set(section.id, { questionId: section.id, answer: value.trim() })
    saveStoredAnswers(Array.from(byId.values()))

    if (isLast) {
      router.push('/girlfriend')
    } else {
      router.push(`/questions/${storyIndex + 1}`)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>

        <div className='mb-6 text-center'>
          <span className='text-xs text-purple-400 tracking-widest uppercase'>
            {section ? `${storyIndex + 1} de ${loveSite.story.length}` : ''}
          </span>
          <h2 className='text-2xl font-bold text-purple-700 mt-1'>{section?.pageTitle}</h2>
        </div>

        <div className='bg-purple-50 border-l-4 border-purple-300 rounded-r-lg px-6 py-5 mb-8'>
          <p className='text-gray-700 text-lg leading-relaxed italic whitespace-pre-line'>
            {section?.declaration}
          </p>
        </div>

        <div>
          <p className='text-gray-800 font-medium mb-3'>{section?.question}</p>
          <textarea
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(null)
            }}
            rows={4}
            className='w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 resize-none'
            placeholder='Escreva aqui...'
          />
          {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
        </div>

        <div className='flex justify-between items-center mt-8'>
          <button
            onClick={() => {
              if (storyIndex <= 0) router.replace('/questions/0')
              else router.replace(`/questions/${storyIndex - 1}`)
            }}
            className='bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors'
          >
            Voltar
          </button>

          <button
            onClick={handleNext}
            className='bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors'
          >
            {isLast ? 'Finalizar' : 'Próxima'}
          </button>
        </div>

      </div>
    </div>
  )
}
