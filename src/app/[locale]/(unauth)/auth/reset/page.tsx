import { getTranslations } from 'next-intl/server';

import { ResetForm } from '@/components/auth/reset-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Reset',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function ResetPage() {
  return <ResetForm />;
}
