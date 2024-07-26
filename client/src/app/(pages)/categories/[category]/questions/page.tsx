import { notFound } from 'next/navigation';
import { type Question } from '@/types';
import { FlashcardsGame } from '@/components/FlashcardsGame';

const QuestionsPage: React.FC<{ params: { category: string } }> = async ({
  params: { category },
}) => {
  let questions: Question[] | [] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch(
      `http://localhost:3000/categories/${category}/questions`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      errorMessage = 'Category not found';
      throw new Error(errorMessage);
    }

    questions = await res.json();
  } catch (error) {
    console.log('error', error);
    questions = [];
  }

  if (errorMessage === 'Category not found') return notFound();

  return <FlashcardsGame category={category} initialQuestions={questions} />;
};

export default QuestionsPage;
