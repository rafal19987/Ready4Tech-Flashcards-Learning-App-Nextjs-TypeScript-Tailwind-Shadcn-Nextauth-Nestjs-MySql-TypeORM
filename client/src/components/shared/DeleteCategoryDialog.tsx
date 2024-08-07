'use client';

import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/shared/AlertDialog';
import { Button } from './Button';
import { Category } from '@/types';
import { deleteCategory } from '@/app/actions/deleteCategory';
import toast from 'react-hot-toast';

export const DeleteCategoryDialog: React.FC<{ category: Category }> = ({
  category,
}) => {
  const { data: session } = useSession();

  const deleteCategoryHandler = async (id: number): Promise<any> => {
    await deleteCategory(id);
    toast.success('Category deleted');
  };

  if (!session) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          onClick={(e) => e.stopPropagation()}
          aria-label='Delete category'
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
              d='M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
              fill='currentColor'
              fillRule='evenodd'
              clipRule='evenodd'
            ></path>
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {`This action cannot be undone. This will permanently remove the "${
              category.name
            }" category${
              category.questions.length
                ? ` along with all assigned questions (${category.questions.length}).`
                : '.'
            }`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteCategoryHandler(category.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
