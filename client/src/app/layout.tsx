import type { Metadata } from 'next';
import './globals.css';
import { PageWrapper } from '@/components/shared/PageWrapper';
import { MainWrapper } from '@/components/shared/MainWrapper';
import { TailwindIndicator } from '@/components/shared/TailwindIndicator';

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
          <MainWrapper>{children}</MainWrapper>
        </PageWrapper>
        <TailwindIndicator />
      </body>
    </html>
  );
}
