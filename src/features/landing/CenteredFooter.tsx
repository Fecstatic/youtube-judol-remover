import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

const CenteredFooter = (props: {
  logo: React.ReactNode;
  name: string;
  iconList: React.ReactNode;
  legalLinks: React.ReactNode;
  socialLinks: React.ReactNode;
  resourcesLinks: React.ReactNode;
  // eslint-disable-next-line react/no-unused-prop-types
  children?: React.ReactNode;
}) => {
  const t = useTranslations('Footer');

  return (
    <footer>
      <div className="lg:flex lg:justify-between">
        <div className="mb-6 lg:mb-0">{props.logo}</div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Resources</h2>
            <ul className="flex flex-col gap-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-70">
              {props.resourcesLinks}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Follow us</h2>
            <ul className="flex flex-col gap-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-70">
              {props.socialLinks}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
            <ul className="flex flex-col gap-4 font-medium [&_a:hover]:opacity-100 [&_a]:opacity-70">
              {props.legalLinks}
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span>
          Copyright © {new Date().getFullYear()} {props.name}.{' '}
          {t.rich('created_by', {
            author: () => (
              <Link
                className="text-primary"
                href="https://studio.fecstatic.tech"
              >
                Ferdi Rahmad Rizaldi
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
