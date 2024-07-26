export const FlashcardProgressbar: React.FC<{
  isTimeToAnswer: boolean;
  filled: number;
}> = ({ isTimeToAnswer, filled }) => {
  return (
    <div className='w-full rounded-full bg-neutral-300 h-2 overflow-hidden'>
      <div
        className={`bg-neutral-950 h-full ${
          isTimeToAnswer ? 'transition-all' : 'transition-none'
        }`}
        style={{
          width: `${filled}%`,
        }}
      />
    </div>
  );
};
