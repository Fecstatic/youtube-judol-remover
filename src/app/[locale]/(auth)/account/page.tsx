'use client';

import { UserInfo } from '@/components/account/user-info';
import { useCurrentUser } from '@/hooks/UseCurrentUser';

const ClientPage = () => {
  const user = useCurrentUser();

  // @ts-ignore
  return <UserInfo label="Account" user={user} />;
};

export default ClientPage;
