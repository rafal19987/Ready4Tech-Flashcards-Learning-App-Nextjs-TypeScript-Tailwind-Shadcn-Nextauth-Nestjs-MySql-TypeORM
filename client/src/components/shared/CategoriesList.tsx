import type { Category } from '@/types';
import { CategoryItem } from './CategoryItem';

export const CategoriesList = async () => {
  const res = await fetch('http://localhost:3000/categories', {
    cache: 'no-store',
  });
  const categories: Category[] = await res.json();

  console.log('categories', categories);

  if (categories.length < 1)
    return (
      <div className='flex flex-col gap-4 w-full overflow-y-hidden h-96'>
        <span className='text-center font-bold text-xl'>
          Categories not found
        </span>
      </div>
    );

  return (
    <ul className='flex flex-col gap-4 w-full overflow-y-auto  h-96 transition-all thinScrollbar'>
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </ul>
  );
};
