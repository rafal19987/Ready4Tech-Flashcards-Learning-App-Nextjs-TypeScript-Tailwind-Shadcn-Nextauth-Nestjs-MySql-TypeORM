import { Category } from '@/types';
import { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_URL
    : 'http://localhost:3000';

const staticRoutes: string[] = ['/', '/categories', '/about'];

function generateStaticRoutesSitemap() {
  return staticRoutes.map((route) => ({
    url: BASE_URL + route,
    lastModifed: new Date(),
  }));
}

export async function generateCategoriesSitemap() {
  const res = await fetch(`${BASE_URL}/categories`, {
    cache: 'no-store',
  });
  const categories: Category[] = await res.json();

  return categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.name}/`,
    lastModifed: new Date(),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicRoutesSitemap = generateStaticRoutesSitemap();
  const categoriesSitemap = await generateCategoriesSitemap();

  return [...publicRoutesSitemap, ...categoriesSitemap];
}
