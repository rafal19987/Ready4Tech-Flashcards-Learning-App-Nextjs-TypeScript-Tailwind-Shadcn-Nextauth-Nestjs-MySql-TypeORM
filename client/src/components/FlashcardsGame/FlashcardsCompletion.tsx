'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { H2 } from '@components/shared/typography/H2';
import { Button } from '@components/shared/Button';
import { buttonVariants } from '@components/shared/Button';

export const FlashcardsCompletion: React.FC<{
  children?: React.ReactNode;
  currentCategory: string;
}> = ({ children, currentCategory }) => {
  useEffect(() => {
    localStorage.removeItem(currentCategory);
  }, []);

  return (
    <div className='bg-red w-full h-full'>
      <H2>It`s all for now</H2>
      <div className='w-full flex items-center justify-between'>
        <Button>Start again</Button>
        <Link
          className={buttonVariants({ variant: 'outline' })}
          href='/categories'
        >
          Select different category
        </Link>
      </div>
    </div>
  );
};
