'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '../ui/button';

export default function LogoutButton() {
  const router = useRouter();
  const t = useTranslations('Dashboard');

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      {t('logout')}
    </Button>
  );
}
