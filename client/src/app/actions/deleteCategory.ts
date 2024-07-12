'use server';

import { revalidatePath } from 'next/cache';

export async function deleteCategory(id: number) {
  const res = await fetch(`http://localhost:3000/categories/${id}`, {
    method: 'DELETE',
  });

  revalidatePath('/');
}
