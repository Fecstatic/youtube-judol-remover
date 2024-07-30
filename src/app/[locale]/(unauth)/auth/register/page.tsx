import { getTranslations } from 'next-intl/server';

import { RegisterForm } from '@/components/auth/register-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Register',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function RegisterPage() {
  return <RegisterForm />;
}
