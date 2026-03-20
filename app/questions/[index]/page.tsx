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

  const [values, setValues] = useState<Record<string, string>>({})
  const [error, setError] = useState<string | null>(null)
  const questions = section?.questions ?? []

  useEffect(() => {
    // Load previous answers so going forward/back feels natural.
    const stored: LoveStoredAnswer[] = loadStoredAnswers()
    const map: Record<string, string> = {}
    for (const a of stored) map[a.questionId] = a.answer
    setValues(map)
  }, [])

  useEffect(() => {
    if (!section) {
      router.replace('/questions/0')
    }
  }, [router, section])

  const progressText =
    section ? `Página ${storyIndex + 1} de ${loveSite.story.length}` : 'Carregando...'

  const handleNext = () => {
    if (!section) return
    setError(null)

    const missing = questions.filter((q) => !values[q.id]?.trim()).map((q) => q.id)
    if (missing.length > 0) {
      setError('Por favor, responda todas as perguntas desta página.')
      return
    }

    const stored = loadStoredAnswers()
    const byId = new Map<string, LoveStoredAnswer>(stored.map((a) => [a.questionId, a]))

    for (const q of questions) {
      byId.set(q.id, { questionId: q.id, answer: values[q.id].trim() })
    }

    saveStoredAnswers(Array.from(byId.values()))

    const isLast = storyIndex >= loveSite.story.length - 1
    if (isLast) {
      router.push('/girlfriend')
    } else {
      router.push(`/questions/${storyIndex + 1}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-purple-600">{loveSite.bea.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{progressText}</p>
        </div>

        {!section ? (
          <div className="text-center text-gray-600">Carregando...</div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">{section.pageTitle}</h2>
              <p className="text-sm text-gray-500">
                {section.kind === 'poem' ? 'Poema' : 'Citação'} de {section.quote.author}
              </p>
            </div>

            <blockquote className="border-l-4 border-purple-400 pl-4 mb-6">
              <p className="text-lg text-gray-800 leading-relaxed">“{section.quote.text}”</p>
            </blockquote>

            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id}>
                  <p className="text-lg text-gray-700 mb-3 whitespace-pre-line">{q.prompt}</p>
                  <input
                    value={values[q.id] ?? ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    type="text"
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400"
                    placeholder="Escreva sua resposta aqui..."
                  />
                  {q.exampleAnswer ? (
                    <p className="text-sm text-gray-600 mt-2">
                      *Mensagem do autor: <span className="italic">{q.exampleAnswer}</span>
                    </p>
                  ) : null}
                </div>
              ))}
            </div>

            {error ? <p className="text-red-600 text-sm mt-4 text-center">{error}</p> : null}

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => {
                  if (storyIndex <= 0) router.replace('/questions/0')
                  else router.replace(`/questions/${storyIndex - 1}`)
                }}
                className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Voltar
              </button>

              <button
                onClick={handleNext}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                {storyIndex >= loveSite.story.length - 1 ? 'Ir para o final' : 'Próxima'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

