import { Toaster } from 'react-hot-toast';

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='bg-black w-dvw h-dvh overflow-hidden'>
      <Toaster />
      {children}
    </div>
  );
};
