import { SheetMenu } from '@/components/dashboard/sheet-menu';
import { UserNav } from '@/components/dashboard/user-nav';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import { ModeToggle } from '@/components/ui/mode-toggle';

import NotificationRequest from './notification';
import Search from './search';

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="mx-4 flex h-14 items-center lg:ml-[3.10rem]">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <Search />
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <NotificationRequest />
          <LocaleSwitcher
            className="size-8 rounded-full bg-background"
            size="icon"
          />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
