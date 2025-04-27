'use client';

import Link from 'next/link';
import React from 'react';

import { ModeToggle } from '@/components/ui/dark-mode';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { CenteredMenu } from '@/features/landing/CenteredMenu';

import { Logo } from './logo';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 mx-auto w-screen border-b bg-background px-3 py-5">
      <CenteredMenu
        className="mx-auto max-w-screen-xl"
        logo={<Logo />}
        rightMenu={
          <>
            <li>
              <LocaleSwitcher />
            </li>
            <li>
              <ModeToggle />
            </li>
          </>
        }
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="https://youtu.be/l7qqP1-awq4" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Tutorial
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </CenteredMenu>
    </div>
  );
};

export { Navbar };
