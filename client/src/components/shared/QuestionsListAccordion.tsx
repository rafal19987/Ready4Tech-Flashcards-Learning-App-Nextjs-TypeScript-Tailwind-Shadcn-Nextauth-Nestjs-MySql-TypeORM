import { QuestionsListAccordionItem } from '../QuestionsListAccordionItem';
import { Accordion } from './Accordion';
import type { Question } from '@/types';

export const QuestionsListAccordion: React.FC<{
  questions: Question[];
}> = ({ questions }) => {
  return (
    <Accordion
      type='single'
      className='h-96 overflow-y-auto overflow-x-hidden mt-12'
    >
      {questions.map((question) => (
        <QuestionsListAccordionItem key={question.id} question={question} />
      ))}
    </Accordion>
  );
};
