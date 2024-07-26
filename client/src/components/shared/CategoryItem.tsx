'use client';

import Link from 'next/link';
import type { Category } from '@/types';
import { DeleteCategoryDialog } from './DeleteCategoryDialog';
import { buttonVariants } from './Button';

export const CategoryItem: React.FC<{
  category?: Category;
  isSelected: boolean;
  selectCategory: (categoryName: string) => void;
  isCategorySavedInLocalstorage: boolean;
}> = ({
  category,
  isSelected,
  selectCategory,
  isCategorySavedInLocalstorage,
}) => {
  if (!category) return null;

  return (
    <li
      className={`relative flex items-center justify-between w-full min-h-20 max-h-20 border rounded-xl hover:bg-green-300 transition-all duration-300 hover:cursor-pointer ${
        isSelected && 'border-green-500'
      }`}
      onClick={() => selectCategory(category.name)}
    >
      {isCategorySavedInLocalstorage ? (
        <div
          className={`absolute -translate-y-5 left-20 w-fit h-10 py-1 px-2 border-green-500 border   bg-transparent transition-all duration-300 ${
            isSelected && '  bg-white -translate-y-12 '
          }`}
        >
          <span className='font-light'>Continue</span>
        </div>
      ) : null}

      <div className='bg-black w-fit p-3 h-full flex items-center justify-center rounded-l-xl'>
        <div
          className={`bg-white w-8 rounded-full h-8 duration-300 transition-colors ${
            isSelected && 'bg-green-400'
          }`}
        ></div>
      </div>

      <div className='w-full flex gap-2 items-center h-full grow  pl-6'>
        <span className='font-semibold text-lg'>{category.name}</span>
        {'|'}
        <span className='font-semibold text-lg'>
          {category.questions.length} questions
        </span>
      </div>
      <div className='flex items-center justify-center gap-3 h-full w-fit pr-3'>
        <DeleteCategoryDialog category={category} />

        <Link
          className={buttonVariants({ variant: 'secondary', size: 'icon' })}
          href={`categories/${category.name}`}
        >
          <svg
            className='w-4 h-auto 4xl:w-6'
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </Link>
      </div>
    </li>
  );
};
