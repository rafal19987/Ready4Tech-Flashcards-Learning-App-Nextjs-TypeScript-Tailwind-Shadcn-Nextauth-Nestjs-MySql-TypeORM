'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
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

const formSchema = z.object({
  title: z.string().min(1, { message: 'This field is required' }),
  answer: z.string().min(1, { message: 'This field is required' }),
});

type FormSchema = z.infer<typeof formSchema>;

export const CreateQuestionForm: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const transforedPathname = pathname.split('/');
  const categoryNameFromPathname = transforedPathname[2];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      answer: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const res = await fetch(
        `http://localhost:3000/categories/${categoryNameFromPathname}/questions`,
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
