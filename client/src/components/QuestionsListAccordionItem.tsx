import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './shared/Accordion';
import type { Question } from '@/types';

export const QuestionsListAccordionItem: React.FC<{ question: Question }> = ({
  question,
}) => {
  return (
    <AccordionItem key={question.id} value={question.title} className='h-full'>
      <AccordionTrigger>{question.title}</AccordionTrigger>
      <AccordionContent>{question.answer}</AccordionContent>
    </AccordionItem>
  );
};
