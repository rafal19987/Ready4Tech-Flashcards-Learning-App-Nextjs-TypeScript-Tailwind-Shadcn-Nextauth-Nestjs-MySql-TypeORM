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
  title: 'Ready4Tech | Home',
  description: 'Ready4Tech | Prepare yourslef for Tech Interviews',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <link
        rel='shortcut icon'
        href='/favicons/favicon.ico'
        type='image/x-icon'
      />
      <link rel='icon' href='/favicons/favicon.ico' type='image/x-icon' />
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/favicons/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/favicons/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/favicons/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/favicons/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/favicons/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/favicons/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/favicons/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/favicons/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/favicons/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/favicons/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicons/favicon-16x16.png'
      />
      <meta name='msapplication-TileColor' content='#000' />
      <meta
        name='msapplication-TileImage'
        content='/favicons/ms-icon-144x144.png'
      />
      <link
        rel='canonical'
        href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        key='canonical'
      />
      <link
        rel='sitemap'
        type='application/xml'
        title='Sitemap'
        href={`${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`}
      />
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
