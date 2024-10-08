'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
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
import { Question } from '@/types';
import {
  type EditQuestionInput,
  editQuestionSchema,
} from '@/validations/questions';
import toast from 'react-hot-toast';

export const EditQuestionForm: React.FC<{ question: Question }> = ({
  question,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const categoryName = pathname.split('/')[2];

  const form = useForm<EditQuestionInput>({
    resolver: zodResolver(editQuestionSchema),
    defaultValues: {
      title: question.title,
      answer: question.answer,
    },
  });

  const onSubmit: SubmitHandler<EditQuestionInput> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryName}/questions/${question.id}`,
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
        if (res.status === 409) return toast.error('Question already exists.');
        return toast.error('Something went wrong');
      }

      toast.success('Updated');
      return router.refresh();
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
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Question Title' {...field} />
              </FormControl>
              <FormDescription>This is question title.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='answer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <Input placeholder='Question Answer' {...field} />
              </FormControl>
              <FormDescription>This is question answer.</FormDescription>
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
