import { getTranslations } from 'next-intl/server';

import { LoginForm } from '@/components/auth/login-form';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Login',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
