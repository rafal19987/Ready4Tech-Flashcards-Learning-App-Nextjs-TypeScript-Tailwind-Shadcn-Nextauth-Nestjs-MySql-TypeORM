import { H3 } from '@components/shared/typography/H3';

export const FlashcardQuestion: React.FC<{ question: string }> = ({
  question,
}) => {
  return (
    <div className='w-full min-h-24 h-fit py-2 px-4 border border-neutral-300 rounded-lg'>
      <H3 className='text-center '>{question}</H3>
    </div>
  );
};
