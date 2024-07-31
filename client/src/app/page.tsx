import { Button } from '@/components/shared/Button';
import { H1 } from '@/components/shared/typography/H1';
import { P } from '@/components/shared/typography/P';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='flex-grow flex flex-col h-full items-center justify-center'>
      <H1 className='text-center'>Preper yourself for tech interviews</H1>
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
