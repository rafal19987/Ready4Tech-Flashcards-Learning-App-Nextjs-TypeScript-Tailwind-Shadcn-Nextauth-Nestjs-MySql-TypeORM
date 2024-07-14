import type { Question } from '@/types';
import { CreateQuestionForm } from '@/components/shared/forms/CreateQuestionForm';
import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { H2 } from '@/components/shared/typography/H2';
import { Small } from '@/components/shared/typography/Small';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/shared/Accordion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shared/Dialog';
import { Button } from '@/components/shared/Button';
import { P } from '@/components/shared/typography/P';
import { QuestionsListAccordion } from '@/components/shared/QuestionsListAccordion';
import { CreateQuestionDialog } from '@/components/shared/CreateQuestionDialog';

const CategoryPage: React.FC<{
  params: { category: string };
}> = async ({ params: { category } }) => {
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

  return (
    <div className='flex flex-col'>
      <PrevPageButton />
      {errorMessage === 'Category not found' ? (
        <span>Not found</span>
      ) : (
        <>
          <Small>Category</Small>
          <div className='flex items-center justify-between'>
            <H2 className='border-none'>{category}</H2>
            <P className='[&:not(:first-child)]:mt-0 text-[#737373]'>
              {questions.length} questions
            </P>
          </div>
          <QuestionsListAccordion questions={questions} />
          <CreateQuestionDialog />
        </>
      )}
    </div>
  );
};

export default CategoryPage;
