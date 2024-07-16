export const MainWrapper: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <main className='container bg-white w-full h-full max-w-xl 3xl:max-w-4xl border py-24'>
      {children}
    </main>
  );
};
