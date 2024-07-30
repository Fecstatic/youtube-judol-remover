'use client';

import { ToggleMenuButton } from '@/components/toggle-menu-button';
import { useMenu } from '@/hooks/UseMenu';
import { cn } from '@/utils/Helpers';

const CenteredMenu = (props: {
  logo: React.ReactNode;
  children: React.ReactNode;
  rightMenu: React.ReactNode;
  className?: string;
}) => {
  const { showMenu, handleToggleMenu } = useMenu();

  const navClass = cn('max-lg:w-full max-lg:bg-secondary max-lg:p-5', {
    'max-lg:hidden': !showMenu,
  });

  return (
    <div
      className={cn(
        'z-50 flex flex-wrap items-center justify-between',
        props.className,
      )}
    >
      <div>{props.logo}</div>

      <div className="lg:hidden">
        <ToggleMenuButton onClick={handleToggleMenu} aria={showMenu} />
      </div>

      <nav className={cn('rounded-t max-lg:mt-2', navClass)}>
        {props.children}
      </nav>

      <div
        className={cn(
          'rounded-b max-lg:border-t max-lg:border-border',
          navClass,
        )}
      >
        <ul className="flex items-center gap-x-4 text-lg font-medium">
          {props.rightMenu}
        </ul>
      </div>
    </div>
  );
};

export { CenteredMenu };
