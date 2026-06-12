'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSearchParams } from 'next/navigation';
import { clearStoredAnswers, loadStoredAnswers, loveSite, type LoveStoredAnswer } from '../love-data';

const formSchema = z.object({
  message: z.string().min(5, 'Escreva um pouquinho mais (mínimo 5 caracteres).'),
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
    defaultValues: { message: '' },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: data.message,
          answers: answersFromUrl ? JSON.parse(decodeURIComponent(answersFromUrl)) : answersFromStorage,
        }),
      });

      if (!response.ok) throw new Error('Falha ao enviar');

      clearStoredAnswers();
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Algo deu errado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8 flex items-center justify-center'>
        <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center'>
          <p className='text-5xl mb-4'>💜</p>
          <h1 className='text-3xl font-bold text-purple-700 mb-4'>Obrigado, {loveSite.bea.name}</h1>
          <p className='text-lg text-gray-600'>Feliz Dia dos Namorados. Você é a o meu maior presente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 p-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <h1 className='text-3xl font-bold text-center mb-2 text-purple-700'>Escreve pra mim 💜</h1>
        <p className='text-center text-gray-500 mb-8 text-sm'>Qualquer coisa que você queira me dizer.</p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'>
          <div>
            <textarea
              {...form.register('message')}
              rows={6}
              className='w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder-gray-400 resize-none'
              placeholder='Ex.: Você é insuportável e eu te amo muito...'
            />
            {form.formState.errors.message && (
              <p className='text-red-500 text-sm mt-1'>{form.formState.errors.message.message}</p>
            )}
          </div>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center'>
          <p className='text-purple-600 text-xl'>Carregando... 💜</p>
        </div>
      }>
      <ContactForm />
    </Suspense>
  );
}
