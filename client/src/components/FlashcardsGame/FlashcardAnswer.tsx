import { H4 } from '@components/shared/typography/H4';
import { P } from '@components/shared/typography/P';

interface props {
  isTimeToAnswer: boolean;
  isAnswerVisible: boolean;
  answer: string;
  showAnswer: () => void;
  nextQuestion: (arg: boolean) => void;
}

export const FlashcardAnswer: React.FC<props> = ({
  isTimeToAnswer,
  isAnswerVisible,
  answer,
  showAnswer,
  nextQuestion,
}) => {
  return (
    <div
      className={`w-full h-80 bg-transparent cursor-pointer group perspective rounded-lg`}
      onClick={() => (isTimeToAnswer ? showAnswer() : nextQuestion(true))}
    >
      <div
        className={`relative preserve-3d ${
          !isTimeToAnswer && 'my-rotate-y-180'
        } w-full h-full duration-300 bg-black rounded-lg`}
      >
        <div className='absolute top-24 -left-10 rotate-90 flex flex-col gap-2 w-fit h-fit '>
          <H4 className='text-white text-4xl'>Learning app</H4>
          <P className='text-white text-lg [&:not(:first-child)]:mt-0'>
            Prepare youreself
          </P>
        </div>

        <div className='absolute my-rotate-y-180 backface-hidden w-full h-full rounded-lg border bg-white border-neutral-300 overflow-hidden'>
          <div className='text-center flex flex-col items-center justify-center h-full text-gray-800 px-2 pb-24'>
            <p className='w-full h-full text-xl py-12 px-6 text-left'>
              {isAnswerVisible && answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
