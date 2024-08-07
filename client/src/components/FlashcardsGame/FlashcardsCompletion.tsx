'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { H2 } from '@components/shared/typography/H2';
import { buttonVariants } from '@components/shared/Button';

export const FlashcardsCompletion: React.FC<{
  currentCategory: string;
}> = ({ currentCategory }) => {
  useEffect(() => {
    localStorage.removeItem(currentCategory);
  }, []);

  return (
    <div className='w-full h-full max-w-md space-y-4'>
      <H2 className='text-center'>It`s all for now</H2>
      <div className='w-full flex items-center justify-center'>
        {/* TODO CREATE START AGAIN BUTTON
        <Button>Start again</Button> */}
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
