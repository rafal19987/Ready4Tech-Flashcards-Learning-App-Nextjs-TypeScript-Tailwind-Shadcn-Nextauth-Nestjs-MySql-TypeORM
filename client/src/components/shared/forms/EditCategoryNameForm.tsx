'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  type EditCategoryInput,
  editCategorySchema,
} from '@/validations/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import toast from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../RadixForm';
import { Input } from '../Input';

export const EditCategoryNameForm: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const transforedPathname = pathname.split('/');
  const categoryNameFromPathname = transforedPathname[2];

  const form = useForm<EditCategoryInput>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name:
        categoryNameFromPathname.charAt(0).toUpperCase() +
        categoryNameFromPathname.slice(1),
    },
  });

  const onSubmit: SubmitHandler<EditCategoryInput> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryNameFromPathname}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Cross-Origin-Opener-Policy': 'same-origin',
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        console.log(res);
        const statusText = res.statusText;
        if (statusText === 'Conflict')
          return toast.error('Category already exist');
        toast.error(statusText);
      }

      toast.success('Category updated');
      return router.replace(`/categories/${data.name}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 w-full flex flex-col'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder='Category name' {...field} />
              </FormControl>
              <FormDescription>This is category name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='self-center'>
          Submit
        </Button>
      </form>
    </Form>
  );
};
