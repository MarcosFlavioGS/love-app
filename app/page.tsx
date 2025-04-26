'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/questions');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Carregando...</h1>
        <p className="text-gray-600">Redirecionando você para a parte divertida! 🎉</p>
      </div>
    </div>
  );
}
