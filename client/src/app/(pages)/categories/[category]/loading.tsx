import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { Small } from '@/components/shared/typography/Small';
import { Skeleton } from '@/components/shared/Skeleton';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='flex flex-col w-full'>
      <Small>Category</Small>
      <div className='flex items-center justify-between w-full h-12 mt-6'>
        <Skeleton className='w-44 h-full' />
        <Skeleton className='w-44 h-full' />
      </div>
      <div className='flex flex-col gap-4 items-center justify-center w-full h-96 overflow-hidden'>
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
        <Skeleton className='w-full h-12' />
      </div>
    </div>
  );
}
