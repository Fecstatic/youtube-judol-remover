import { Menu } from '@/components/dashboard/menu';
import { SidebarToggle } from '@/components/dashboard/sidebar-toggle';
import { useSidebarToggle } from '@/hooks/UseSidebarToggle';
import { useStore } from '@/hooks/UseStore';
import { cn } from '@/utils/Helpers';

import TeamSwitcher from './team-switcher';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0',
        sidebar?.isOpen === false ? 'w-[70px]' : 'w-72',
      )}
      // onMouseEnter={() => sidebar?.setIsOpen?.()}
      // onMouseLeave={() => sidebar?.setIsOpen?.()}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div
        className={`relative flex h-full flex-col border-r px-1 py-2 ${sidebar?.isOpen === true ? 'overflow-y-auto' : 'overflow-hidden'} dark:shadow-zinc-800`}
      >
        <TeamSwitcher state={sidebar?.isOpen} personal />
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
