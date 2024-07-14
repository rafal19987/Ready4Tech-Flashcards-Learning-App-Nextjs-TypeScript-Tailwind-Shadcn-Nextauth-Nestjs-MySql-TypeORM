import type { Metadata } from 'next';
import './globals.css';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { MainWrapper } from '@/components/shared/MainWrapper';
import { TailwindIndicator } from '@/components/shared/TailwindIndicator';
import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { BreadcrumbNavigation } from '@/components/shared/BreadcrumbNavigation';

export const metadata: Metadata = {
  title: 'Title',
  description: 'Description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <PageWrapper>
          <MainWrapper>
            <div className='w-full flex items-center justify-between pb-12'>
              <BreadcrumbNavigation />
              <PrevPageButton />
            </div>
            {children}
          </MainWrapper>
        </PageWrapper>
        <TailwindIndicator />
      </body>
    </html>
  );
}
