import { getTranslations } from 'next-intl/server';

import { NewVerificationForm } from '@/components/auth/new-verification-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Verification',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function NewVerificationPage() {
  return <NewVerificationForm />;
}
