import { CategoriesList } from '@/components/shared/CategoriesList';
import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { H1 } from '@/components/shared/typography/H1';
import { CreateCategoryDialog } from '@/components/shared/CreateCategoryDialog';

export default function CategoriesPage() {
  return (
    <section className='flex flex-col gap-12 w-full items-center max-w-xl 3xl:max-w-4xl'>
      <H1>Select category</H1>
      <CategoriesList />
      <CreateCategoryDialog />
    </section>
  );
}
