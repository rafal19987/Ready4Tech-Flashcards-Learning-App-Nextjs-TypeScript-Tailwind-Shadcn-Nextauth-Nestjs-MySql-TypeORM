'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  type CreateCategoryInput,
  createCategorySchema,
} from '@/validations/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import { Input } from '../Input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../RadixForm';
import toast from 'react-hot-toast';

export const CreateCategoryForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<CreateCategoryInput> = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 409) return toast.error('Category already exist');
      }

      toast.success('Category added');
      router.refresh();
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
              <FormLabel>Name</FormLabel>
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
