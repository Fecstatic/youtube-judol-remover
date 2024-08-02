import type { LucideIcon } from 'lucide-react';
import {
  Bookmark,
  LayoutGrid,
  Settings,
  SquarePen,
  Tag,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Submenu {
  href: string;
  label: string;
  active: boolean;
}

interface Menu {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
}

interface Group {
  groupLabel: string;
  menus: Menu[];
}

export function getMenuList(pathname: string): Group[] {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations('Sidebar');
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: t('dashboard'),
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Contents',
      menus: [
        {
          href: '',
          label: 'Posts',
          active: pathname.includes('/posts'),
          icon: SquarePen,
          submenus: [
            {
              href: '/posts',
              label: 'All Posts',
              active: pathname === '/posts',
            },
            {
              href: '/posts/new',
              label: 'New Post',
              active: pathname === '/posts/new',
            },
          ],
        },
        {
          href: '/categories',
          label: 'Categories',
          active: pathname.includes('/categories'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: '/tags',
          label: 'Tags',
          active: pathname.includes('/tags'),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: t('settings'),
      menus: [
        {
          href: '/team',
          label: t('team'),
          active: pathname.includes('/team'),
          icon: Users,
          submenus: [],
        },
        {
          href: '/account',
          label: t('account'),
          active: pathname.includes('/account'),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
