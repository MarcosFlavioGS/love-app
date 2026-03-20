'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';
import { clearStoredAnswers, loadStoredAnswers, type LoveStoredAnswer } from '../love-data';

const formSchema = z.object({
  message: z.string().min(5, 'Escreva uma mensagem um pouquinho maior (minimo 5 caracteres).'),
});

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const answersFromUrl = searchParams.get('answers');
  const [answersFromStorage] = useState<LoveStoredAnswer[]>(() => loadStoredAnswers());
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: data.message,
          answers: answersFromUrl ? JSON.parse(decodeURIComponent(answersFromUrl)) : answersFromStorage,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar o formulário');
      }

      clearStoredAnswers();
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Algo deu errado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-purple-600 mb-4">Obrigado! 💕</h1>
          <p className="text-lg text-gray-700">
            Entrarei em contato em breve! Tenha um ótimo dia! 😊
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
          Quase lá! 🎉
        </h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Escreva sua mensagem pra mim
            </label>
            <textarea
              {...form.register('message')}
              rows={5}
              className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 resize-none"
              placeholder="Ex.: Bea, eu gostei do que você escreveu... Querido, eu aceito ser sua namorada..."
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Carregando...</h1>
          <p className="text-gray-600">Preparando o formulário... 🎉</p>
        </div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
} 
