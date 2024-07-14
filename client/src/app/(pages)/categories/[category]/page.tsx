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
          <Accordion
            type='single'
            className='h-96 overflow-y-auto overflow-x-hidden mt-12'
          >
            {questions?.map((question) => (
              <AccordionItem key={question.id} value={question.title}>
                <AccordionTrigger>{question.title}</AccordionTrigger>
                <AccordionContent>{question.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size='icon'
                variant='default'
                className='rounded-full self-end mt-12 size-12 fixed bottom-24'
              >
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z'
                    fill='currentColor'
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateQuestionForm />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CategoryPage;
