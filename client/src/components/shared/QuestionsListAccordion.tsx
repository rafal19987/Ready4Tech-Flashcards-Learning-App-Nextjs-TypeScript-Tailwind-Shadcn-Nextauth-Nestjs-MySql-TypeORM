import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { QuestionsListAccordionItem } from './QuestionsListAccordionItem';
import { Accordion } from './Accordion';
import type { Question } from '@/types';
import { DeleteQuestionDialog } from './DeleteQuestionDialog';
import { EditQuestionDialog } from './EditQuestionDialog';

export const QuestionsListAccordion: React.FC<{
  questions: Question[];
}> = async ({ questions }) => {
  const session = await getServerSession(authOptions);

  if (questions.length < 1)
    return (
      <span className='text-center pt-12 font-bold text-xl text-neutral-300'>
        Questions not added yet
      </span>
    );

  return (
    <Accordion
      type='single'
      collapsible
      className='h-96 overflow-y-auto overflow-x-hidden mt-12 thinScrollbar'
    >
      {questions.map((question) => (
        <div key={question.id} className='grid grid-cols-12'>
          <div className={`${session ? 'col-span-11' : 'col-span-12'}`}>
            <QuestionsListAccordionItem question={question} />
          </div>
          <div className='col-span-1 flex flex-col gap-0 h-full items-center'>
            <DeleteQuestionDialog question={question} />
            <EditQuestionDialog question={question} />
          </div>
        </div>
      ))}
    </Accordion>
  );
};
