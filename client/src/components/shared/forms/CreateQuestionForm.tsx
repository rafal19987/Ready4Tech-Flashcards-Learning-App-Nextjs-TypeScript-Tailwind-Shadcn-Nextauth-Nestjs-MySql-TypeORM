'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import {
  type CreateQuestionInput,
  createQuestionSchema,
} from '@/validations/questions';
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

export const CreateQuestionForm: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const transforedPathname = pathname.split('/');
  const categoryNameFromPathname = transforedPathname[2];

  const form = useForm<CreateQuestionInput>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      title: '',
      answer: '',
    },
  });

  const onSubmit: SubmitHandler<CreateQuestionInput> = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryNameFromPathname}/questions`,
        {
          method: 'POST',
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
          return toast.error('Questions already exist');
        toast.error(statusText);
      }

      toast.success('Question added');
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
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder='Question' {...field} />
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
                <Input placeholder='Question`s answer' {...field} />
              </FormControl>
              <FormDescription>This is question`s answer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='self-center'>
          Add question
        </Button>
      </form>
    </Form>
  );
};
