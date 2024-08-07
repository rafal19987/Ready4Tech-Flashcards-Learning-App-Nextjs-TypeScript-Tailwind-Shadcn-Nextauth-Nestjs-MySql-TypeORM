export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='flex flex-col items-center w-full min-h-dvh h-full bg-white'>
      {children}
    </div>
  );
};
