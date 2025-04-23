import '@/styles/global.css';

import { getTranslations } from 'next-intl/server';

import IntlLayout from '@/components/intl-wrapper';

// export const metadata: Metadata = {
//   icons: [
//     {
//       rel: 'apple-touch-icon',
//       url: '/apple-touch-icon.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '32x32',
//       url: '/favicon-32x32.png',
//     },
//     {
//       rel: 'icon',
//       type: 'image/png',
//       sizes: '16x16',
//       url: '/favicon-16x16.png',
//     },
//     {
//       rel: 'icon',
//       url: '/favicon.ico',
//     },
//   ],
// };

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations({
    locale: (await props.params).locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    generator: 'Next.js',
    manifest: '/manifest.json',
    keywords: ['nextjs', 'nextjs15', 'next15', 'pwa', 'next-pwa'],
    authors: [
      { name: 'Ferdi Rahmad Rizaldi' },
      {
        name: 'Ferdi Rahmad Rizaldi',
        url: 'https://www.linkedin.com/in/ferdi-rahmad-rizaldi/',
      },
    ],
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <html lang={(await props.params).locale} suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <IntlLayout>{props.children}</IntlLayout>
      </body>
    </html>
  );
}
