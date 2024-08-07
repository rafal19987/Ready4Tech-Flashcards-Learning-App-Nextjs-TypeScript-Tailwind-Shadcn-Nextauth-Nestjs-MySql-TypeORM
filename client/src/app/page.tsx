import { Button } from '@/components/shared/Button';
import { H2 } from '@/components/shared/typography/H2';
import { P } from '@/components/shared/typography/P';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='flex-grow flex flex-col h-full items-center justify-center'>
      <H2 className='text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl border-none'>
        Prepare yourself for tech interviews
      </H2>
      <P className='text-center lg:w-2/3'>
        The king, seeing how much happier his subjects were, realized the error
        of his ways and repealed the joke tax.
      </P>
      <div className='flex gap-6 mt-6'>
        <Button asChild>
          <Link href='/categories'>Select category</Link>
        </Button>
        <Button asChild variant='outline'>
          <Link href='/about'>About application</Link>
        </Button>
      </div>
    </div>
  );
}
