import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { Toaster } from '@/components/ui/sonner';
import { AllLocales } from '@/utils/AppConfig';
import { ThemeProvider } from '@/utils/ThemeProvider';
import { TrpcProvider } from '@/utils/TrpcProvider';

import SessionWrapper from './session-wrapper';

export default function IntlLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  if (!AllLocales.includes(locale)) notFound();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SessionWrapper>
          <TrpcProvider>
            {children}
            <Toaster position="top-right" richColors closeButton />
          </TrpcProvider>
        </SessionWrapper>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
