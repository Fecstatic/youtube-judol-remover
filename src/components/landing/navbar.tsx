'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import { ModeToggle } from '@/components/ui/dark-mode';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { AppConfig } from '@/utils/AppConfig';

import { Logo } from './logo';

const Navbar = () => {
  const t = useTranslations('Navbar');

  const firstcomponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: t('tech_stack'),
      href: '#techstack',
      description: t('tech_stack_description'),
    },
    {
      title: t('price'),
      href: '#techstack',
      description: t('price_description'),
    },
    {
      title: t('faq'),
      href: '#faq',
      description: t('faq_description'),
    },
  ];

  const secondcomponents: {
    title: string;
    href: string;
    description: string;
  }[] = [
    {
      title: 'Alert Dialog',
      href: '/docs/primitives/alert-dialog',
      description:
        'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
      title: 'Hover Card',
      href: '/docs/primitives/hover-card',
      description:
        'For sighted users to preview content available behind a link.',
    },
    {
      title: 'Progress',
      href: '/docs/primitives/progress',
      description:
        'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
      title: 'Scroll-area',
      href: '/docs/primitives/scroll-area',
      description: 'Visually or semantically separates content.',
    },
    {
      title: 'Tabs',
      href: '/docs/primitives/tabs',
      description:
        'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
      title: 'Tooltip',
      href: '/docs/primitives/tooltip',
      description:
        'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
  ];

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
              <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex size-full select-none flex-col justify-end rounded-sm bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Logo />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {AppConfig.name}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {t('description')}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {firstcomponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {secondcomponents.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Documentation
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
