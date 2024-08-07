export const MainWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className='flex-grow flex flex-col items-center container bg-white w-full h-full max-w-3xl 4xl:max-w-4xl'>
      {children}
    </main>
  );
};
