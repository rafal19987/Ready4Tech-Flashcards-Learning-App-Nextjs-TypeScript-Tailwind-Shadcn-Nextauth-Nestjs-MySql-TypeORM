import type { Metadata } from 'next';
import './globals.css';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { MainWrapper } from '@/components/shared/MainWrapper';
import { TailwindIndicator } from '@/components/shared/TailwindIndicator';
import { PrevPageButton } from '@/components/shared/PrevPageButton';
import { BreadcrumbNavigation } from '@/components/shared/BreadcrumbNavigation';
import { Providers } from './Providers';
import { AuthButtons } from '@/components/auth/AuthButtons';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components/shared/Header';
import { H1 } from '@/components/shared/typography/H1';
import Link from 'next/link';
import { Footer } from '@/components/shared/Footer';

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
        <Providers>
          <PageWrapper>
            <Toaster />
            <Header className='py-4'>
              <Link href='/'>
                <H1 className='text-xl 3xl:text-xl'>Ready4Tech</H1>
              </Link>
              <AuthButtons />
            </Header>
            <MainWrapper>
              <div className='w-full flex items-center justify-between pb-12'>
                <BreadcrumbNavigation />
                <PrevPageButton />
              </div>
              {children}
            </MainWrapper>
            <Footer>
              <span className='text-sm text-[#545454]'>version 1.0</span>
            </Footer>
          </PageWrapper>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  );
}
