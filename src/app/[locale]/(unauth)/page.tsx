import { getTranslations } from 'next-intl/server';

// import { CTA } from '@/components/landing/CTA';
import { FAQ } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';
import { Pricing } from '@/components/landing/pricing';
import { TechStack } from '@/components/landing/tech-stack';
// import { Sponsors } from '@/components/landing/Sponsors';

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
      {/* <Sponsors /> */}
      <TechStack />
      <Pricing />
      <FAQ />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
}
