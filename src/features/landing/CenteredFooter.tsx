'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

const CenteredFooter = (props: { iconList: React.ReactNode }) => {
  const t = useTranslations('Footer');

  return (
    <footer>
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <div className="mx-auto flex max-w-screen-xl place-content-center items-center justify-between">
        <span>
          Copyright © {new Date().getFullYear()}.{' '}
          {t.rich('created_by', {
            author: () => (
              <Link
                className="text-primary"
                href="https://studio.fecstatic.tech"
              >
                Fecstatic
              </Link>
            ),
          })}
          .
        </span>
        <div className="mt-4 flex flex-row gap-x-5 text-muted-foreground [&_svg:hover]:text-primary [&_svg:hover]:opacity-100 [&_svg]:size-5 [&_svg]:fill-current [&_svg]:opacity-70">
          {props.iconList}
        </div>
      </div>
    </footer>
  );
};

export { CenteredFooter };
