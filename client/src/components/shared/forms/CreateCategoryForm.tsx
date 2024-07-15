'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
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

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name can not contain less than 3 characters' })
    .max(20, { message: 'Name can not contain more than 20 characters' })
    .transform((value) => value.trim())
    .pipe(
      z.string().min(3, {
        message:
          'This field can not contain only spacebars. It is required atleat 3 characters',
      })
    ),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateCategoryForm: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/categories`, {
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
