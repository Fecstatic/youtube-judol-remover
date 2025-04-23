import Link from 'next/link';

import { badgeVariants } from '@/components/ui/badge';

const CenteredHero = (props: {
  banner: {
    href: string;
    text: React.ReactNode;
  };
  title: string;
  description: string;
  buttons: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <>
    <div className="animate-fade-up text-center opacity-0 [--animation-delay:150ms] [perspective:2000px]">
      <Link
        className={badgeVariants({
          variant: 'banner',
          className: 'bg-red-500 hover:bg-red-600',
        })}
        href={props.banner.href}
        target="_blank"
        rel="noopener"
      >
        {props.banner.text}
      </Link>
    </div>

    <h1 className="animate-fade-up py-5 text-center text-3xl font-bold text-black opacity-0 [--animation-delay:200ms] [perspective:2000px] dark:text-white lg:text-7xl">
      {props.title}
    </h1>

    <div className="mx-auto mt-5 max-w-screen-md">
      <h2 className="animate-fade-up text-center text-xl font-semibold text-gray-700 opacity-0 drop-shadow-sm [--animation-delay:250ms] [perspective:2000px] dark:text-gray-300">
        {props.description}
      </h2>
    </div>

    <div className="mt-8 flex animate-fade-up justify-center gap-x-5 gap-y-3 opacity-0 [--animation-delay:300ms] [perspective:2000px] max-sm:flex-col">
      {props.buttons}
    </div>

    <div className="-mb-5 flex justify-center lg:-mb-14">{props.children}</div>
  </>
);

export { CenteredHero };
