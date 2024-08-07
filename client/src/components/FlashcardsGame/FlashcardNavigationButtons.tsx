import { Button } from '@components/shared/Button';

export const FlashcardNavigationButtons: React.FC<{
  isTimeToAnswer: boolean;
  showAnswer: () => void;
  nextQuestion: (arg: boolean) => void;
}> = ({ isTimeToAnswer, showAnswer, nextQuestion }) => {
  if (isTimeToAnswer)
    return (
      <Button size='lg' className='self-end' onClick={showAnswer}>
        Show answer
      </Button>
    );

  return (
    <div className='w-full flex items-center justify-between'>
      <Button variant='red' onClick={() => nextQuestion(false)}>
        Repeat
      </Button>
      <Button variant='green' onClick={() => nextQuestion(true)}>
        Next question
      </Button>
    </div>
  );
};
