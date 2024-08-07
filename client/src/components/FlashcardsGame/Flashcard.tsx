import { FlashcardQuestion } from './FlashcardQuestion';
import { FlashcardAnswer } from './FlashcardAnswer';

export const Flashcard: React.FC<{
  question: string;
  answer: string;
  filled: number;
  isAnswerVisible: boolean;
  isTimeToAnswer: boolean;
  nextQuestion: (arg: boolean) => void;
  showAnswer: () => void;
}> = ({
  question,
  answer,
  isAnswerVisible,
  isTimeToAnswer,
  nextQuestion,
  showAnswer,
}) => {
  return (
    <>
      <FlashcardQuestion question={question} />
      <FlashcardAnswer
        answer={answer}
        isAnswerVisible={isAnswerVisible}
        isTimeToAnswer={isTimeToAnswer}
        nextQuestion={nextQuestion}
        showAnswer={showAnswer}
      />
    </>
  );
};
