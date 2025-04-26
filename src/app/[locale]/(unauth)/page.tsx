import { getTranslations } from 'next-intl/server';

import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';

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
  };
}

export default function IndexPage() {
  return (
    <div className="overflow-y-hidden">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}
