import { ModeToggle } from '@/components/ui/dark-mode';
import LocaleSwitcher from '@/components/ui/locale-switcher';

import LogoutButton from './logout-button';

interface UserNavProps {
  session: {
    user: {
      name: string;
      email: string;
    };
  };
}

export default function UserNav({ session }: UserNavProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold">{session.user.name}</h1>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <LocaleSwitcher />
        <LogoutButton />
      </div>
    </div>
  );
}
