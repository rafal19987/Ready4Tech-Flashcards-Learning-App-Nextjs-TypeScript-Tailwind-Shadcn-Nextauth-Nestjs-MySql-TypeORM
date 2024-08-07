import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import type { Question } from '@/types';
import { H2 } from '@/components/shared/typography/H2';
import { Small } from '@/components/shared/typography/Small';
import { P } from '@/components/shared/typography/P';
import { QuestionsListAccordion } from '@/components/shared/QuestionsListAccordion';
import { CreateQuestionDialog } from '@/components/shared/CreateQuestionDialog';
import { EditCategoryDialog } from '@/components/shared/EditCategoryDialog';

type Params = {
  category: string;
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const category = params.category;

  return {
    title: `Ready4Tech | ${category} interview questions list`,
    description: `Ready4Tech | ${category} interview questions are tricky, but with good preparation, you will walk through the tech interview smoothly and confidently.`,
  };
}

const CategoryPage: React.FC<{
  params: Params;
}> = async ({ params: { category } }) => {
  let questions: Question[] | [] = [];
  let errorMessage: string | null = null;

  try {
    const res = await fetch(
      `${process.env.API_URL}/categories/${category}/questions`,
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

  return (
    <div className='flex flex-col w-full'>
      {errorMessage === 'Category not found' ? (
        <span>Not found</span>
      ) : (
        <>
          <Small>Category</Small>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-start justify-between '>
              <H2 className='border-none'>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </H2>
              <EditCategoryDialog />
            </div>
            {questions.length > 0 && (
              <P className='[&:not(:first-child)]:mt-0 text-[#737373]'>
                {questions.length} questions
              </P>
            )}
          </div>
          <QuestionsListAccordion questions={questions} />
          <CreateQuestionDialog />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
