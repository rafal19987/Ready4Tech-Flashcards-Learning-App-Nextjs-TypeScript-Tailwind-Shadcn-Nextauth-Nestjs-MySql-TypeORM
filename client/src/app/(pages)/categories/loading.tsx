import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { H1 } from '@/components/shared/typography/H1';
import { Skeleton } from '@/components/shared/Skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className='flex flex-col gap-12 w-full items-center max-w-lg'>
      <PrevPageButton />
      <H1>Select category</H1>
      <Skeleton className='flex flex-col gap-4 w-full h-96 overflow-hidden bg-transparent'>
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
        <Skeleton className='w-full h-20 rounded-xl' />
      </Skeleton>
      <Button asChild>
        <Link href='/create'>Add category</Link>
      </Button>
    </section>
  );
}
