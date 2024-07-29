import * as z from 'zod';

export const createCategorySchema = z.object({
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

export const editCategorySchema = z.object({
  name: z
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

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export type EditCategoryInput = z.infer<typeof editCategorySchema>;
