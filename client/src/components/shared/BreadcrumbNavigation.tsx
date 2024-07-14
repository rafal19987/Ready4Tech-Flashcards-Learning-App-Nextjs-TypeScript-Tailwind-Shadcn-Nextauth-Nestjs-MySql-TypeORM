'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shared/BreadcrumbRadix';
import Link from 'next/link';
import { Slash } from 'lucide-react';

export const BreadcrumbNavigation: React.FC = () => {
  const pathname = usePathname();
  const transformedPathname = pathname.split('/');
  const isHomePage = transformedPathname[1] === '';

  if (isHomePage) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {transformedPathname.map(
          (path, idx) =>
            path !== '' && (
              <>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {idx + 1 !== transformedPathname.length ? (
                    <BreadcrumbLink asChild href={path}>
                      <Link href={`/${path}`}>
                        {path.charAt(0).toUpperCase() + path.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </>
            )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
