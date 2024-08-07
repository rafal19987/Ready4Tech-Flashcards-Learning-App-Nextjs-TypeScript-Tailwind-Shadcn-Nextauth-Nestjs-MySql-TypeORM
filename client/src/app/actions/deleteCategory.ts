'use server';

export async function deleteCategory(id: number) {
  const res = await fetch(`${process.env.API_URL}/categories/${id}`, {
    method: 'DELETE',
  });
}
