import { QuestionsListAccordionItem } from '../QuestionsListAccordionItem';
import { Accordion } from './Accordion';
import type { Question } from '@/types';
import { DeleteQuestionDialog } from './DeleteQuestionDialog';

export const QuestionsListAccordion: React.FC<{
  questions: Question[];
}> = ({ questions }) => {
  return (
    <Accordion
      type='single'
      className='h-96 overflow-y-auto overflow-x-hidden mt-12'
    >
      {questions.map((question) => (
        <div key={question.id} className='grid grid-cols-12'>
          <div className='col-span-11'>
            <QuestionsListAccordionItem question={question} />
          </div>
          <div className='col-span-1 flex flex-col gap-2 h-full'>
            <DeleteQuestionDialog question={question} />
          </div>
        </div>
      ))}
    </Accordion>
  );
};
