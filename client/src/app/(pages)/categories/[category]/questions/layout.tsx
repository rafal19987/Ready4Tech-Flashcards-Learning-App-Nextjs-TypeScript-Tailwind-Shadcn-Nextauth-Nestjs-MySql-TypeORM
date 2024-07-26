import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech Interview Questions',
  description: 'Description',
};

const QuestionsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <section className='flex flex-col w-full h-full'>{children}</section>;
};

export default QuestionsLayout;
