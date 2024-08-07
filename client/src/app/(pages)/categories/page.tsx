import { Metadata } from 'next';
import { CategoriesList } from '@/components/shared/CategoriesList';
import { H1 } from '@/components/shared/typography/H1';
import { CreateCategoryDialog } from '@/components/shared/CreateCategoryDialog';

export const metadata: Metadata = {
  title: 'Ready4Tech | Select Category',
  description:
    'Ready4Tech | Select the tech category you want to prepare interview questions for.',
};

export default function CategoriesPage() {
  return (
    <section className='flex flex-col gap-12 w-full items-center max-w-xl 3xl:max-w-4xl'>
      <H1>Select category</H1>
      <CategoriesList />
      <CreateCategoryDialog />
    </section>
  );
}
