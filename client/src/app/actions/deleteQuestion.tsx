'use server';

export async function deleteQuestion(categoryName: string, id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryName}/questions/${id}`,
      { method: 'DELETE' }
    );

    console.log(res.status);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
