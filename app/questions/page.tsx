'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const questions = [
  {
    id: 1,
    question: "Se você pudesse jantar com qualquer figura histórica, quem seria?",
    type: "text"
  },
  {
    id: 2,
    question: "Qual é a sua forma favorita de passar um domingo preguiçoso?",
    type: "text"
  },
  {
    id: 3,
    question: "Se você pudesse dominar instantaneamente qualquer habilidade, qual seria?",
    type: "text"
  },
  {
    id: 4,
    question: "Qual foi a coisa mais espontânea que você já fez?",
    type: "text"
  },
  {
    id: 5,
    question: "Se você pudesse viver em qualquer universo fictício, qual você escolheria?",
    type: "text"
  }
];

export default function QuestionsPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{questionId: number; answer: string}[]>([]);

  const handleAnswer = (answer: string) => {
    if (!answer.trim()) return;
    
    const newAnswers = [...answers, { 
      questionId: questions[currentQuestion].id, 
      answer: answer.trim() 
    }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Encode answers and redirect to contact page
      const encodedAnswers = encodeURIComponent(JSON.stringify(newAnswers));
      router.push(`/contact?answers=${encodedAnswers}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
          Vamos nos Conhecer! 💕
        </h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-4">
            {questions[currentQuestion].question}
          </p>
          
          <div className="space-y-4">
            <input
              type="text"
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400"
              placeholder="Digite sua resposta aqui..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAnswer((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Pergunta {currentQuestion + 1} de {questions.length}
          </span>
          <button
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement;
              handleAnswer(input.value);
              input.value = '';
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
} 