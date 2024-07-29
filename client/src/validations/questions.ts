import * as z from 'zod';

export const createQuestionSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'This field is required' })
    .transform((value) => value.trim())
    .pipe(
      z.string().min(1, {
        message:
          'This field can not contain only spacebars. It is required atleat 1 characters',
      })
    ),
  answer: z
    .string()
    .min(1, { message: 'This field is required' })
    .transform((value) => value.trim())
    .pipe(
      z.string().min(1, {
        message:
          'This field can not contain only spacebars. It is required atleat 1 characters',
      })
    ),
});

export const editQuestionSchema = createQuestionSchema;

export type EditQuestionInput = z.infer<typeof editQuestionSchema>;

export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
