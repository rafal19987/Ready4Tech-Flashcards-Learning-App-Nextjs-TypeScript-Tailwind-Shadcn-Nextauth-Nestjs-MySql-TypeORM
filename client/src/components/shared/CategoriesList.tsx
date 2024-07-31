'use client';

import { useState, useEffect } from 'react';
import type { Category } from '@/types';
import { CategoryItem } from './CategoryItem';
import { buttonVariants } from './Button';
import Link from 'next/link';

export const CategoriesList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
    console.log(selectedCategory);
  };

  const isCategorySavedInLocalstorage = (categoryName: string): boolean => {
    if (localStorage.getItem(categoryName)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        cache: 'no-store',
      });
      const categories: Category[] = await res.json();
      setCategories(categories);
    })();
    setLoading(false);
  }, []);

  if (loading) return <span>Loading</span>;

  if (categories.length < 1)
    return (
      <div className='flex flex-col gap-4 w-full overflow-y-hidden h-96'>
        <span className='text-center font-bold text-xl'>
          Categories not found
        </span>
      </div>
    );

  return (
    <>
      <ul className='flex flex-col gap-8 w-full overflow-y-auto h-[25rem] transition-all thinScrollbar'>
        {categories?.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            selectCategory={selectCategory}
            isSelected={selectedCategory === category.name}
            isCategorySavedInLocalstorage={isCategorySavedInLocalstorage(
              category.name
            )}
          />
        ))}
      </ul>
      {selectedCategory && (
        <Link
          className={buttonVariants({ variant: 'default', size: 'lg' })}
          href={`/categories/${selectedCategory}/questions`}
        >
          Start
        </Link>
      )}
    </>
  );
};
