'use client';

import { type Question } from '@/types';
import { useState, useEffect } from 'react';
import { Flashcard } from './Flashcard';
import { FlashcardProgressbar } from './FlashcardProgressbar';
import { FlashcardsCompletion } from './FlashcardsCompletion';
import { H2 } from '@components/shared/typography/H2';
import { Small } from '@components/shared/typography/Small';
import { FlashcardNavigationButtons } from './FlashcardNavigationButtons';

export const FlashcardsGame: React.FC<{
  initialQuestions: Question[];
  category: string;
}> = ({ initialQuestions, category }) => {
  // TO DO ADD TIMER FOR QUESTION VISIBLE TIME

  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [filled, setFilled] = useState<number>(1);
  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [isTimeToAnswer, setIsTimeToAnswer] = useState<boolean>(true);
  const [isLastQuestion, setIsLastQuestion] = useState<boolean>(false);

  const showAnswer = (): void => {
    setIsTimeToAnswer(false);
    setFilled(100);
    setIsAnswerVisible(true);
  };

  const nextQuestion = (remove: boolean) => {
    if (questions.length > 1) {
      setIsAnswerVisible(false);
      setIsTimeToAnswer(true);
      setFilled(0);
      localStorage.setItem(category, String(questions[0].id));

      if (remove) {
        setQuestions((prev) => prev.slice(1));
        return;
      } else {
        setQuestions((prev) => {
          const [first, ...rest] = prev;
          return [...rest, first];
        });
      }
    } else {
      setIsLastQuestion(true);
      setIsTimeToAnswer(false);
      setFilled(100);
      localStorage.removeItem(category);
    }
  };

  useEffect(() => {
    const questionIdFromLocalStorage = localStorage.getItem(category);
    if (questionIdFromLocalStorage) {
      const filteredQuestions = questions.filter(
        (q) => q.id > Number(questionIdFromLocalStorage)
      );
      setQuestions(filteredQuestions);
      setIsAnswerVisible(false);
      setIsTimeToAnswer(true);
      setFilled(0);
    }
  }, []);

  useEffect(() => {
    if (filled < 101 && isTimeToAnswer && questions.length > 0) {
      setTimeout(() => setFilled((prev) => (prev += 1)), 50);
      setIsAnswerVisible(false);
    } else {
      setIsTimeToAnswer(false);
      setIsAnswerVisible(true);
    }
  }, [filled, isTimeToAnswer, questions]);

  if (isLastQuestion)
    return <FlashcardsCompletion currentCategory={category} />;

  return (
    <>
      <H2 className='border-none'>{category} questions</H2>
      <div className='flex flex-col gap-6 items-center w-full max-w-md'>
        {questions.length > 1 ? (
          <Small>{`${questions.length - 1} questions left`}</Small>
        ) : (
          <Small>Last question</Small>
        )}
        <FlashcardProgressbar filled={filled} isTimeToAnswer={isTimeToAnswer} />
        <Flashcard
          question={questions[0]?.title}
          answer={questions[0]?.answer}
          filled={filled}
          isAnswerVisible={isAnswerVisible}
          isTimeToAnswer={isTimeToAnswer}
          nextQuestion={nextQuestion}
          showAnswer={showAnswer}
        />
        <FlashcardNavigationButtons
          isTimeToAnswer={isTimeToAnswer}
          nextQuestion={nextQuestion}
          showAnswer={showAnswer}
        />
      </div>
    </>
  );
};
