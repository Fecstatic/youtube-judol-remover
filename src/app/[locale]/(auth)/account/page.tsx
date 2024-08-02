'use client';

import { UserInfo } from '@/components/account/user-info';
import { useCurrentUser } from '@/hooks/UseCurrentUser';

export default function ClientPage() {
  const user = useCurrentUser();

  // @ts-ignore
  return <UserInfo label="Account" user={user} />;
}
