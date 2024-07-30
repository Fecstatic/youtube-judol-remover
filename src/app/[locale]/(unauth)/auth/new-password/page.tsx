import { getTranslations } from 'next-intl/server';

import { NewPasswordForm } from '@/components/auth/new-password-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'NewPassword',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function NewPasswordPage() {
  return <NewPasswordForm />;
}
