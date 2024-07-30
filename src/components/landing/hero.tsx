import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import DotPattern from '@/components/ui/dot-pattern';
import { CenteredHero } from '@/features/landing/CenteredHero';
import { AppConfig } from '@/utils/AppConfig';
import { cn } from '@/utils/Helpers';

import ImageShowcase from './image';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <div className="mx-3 max-w-screen-xl py-8 lg:mx-auto lg:py-14">
      <CenteredHero
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-white dark:text-black"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M92.8 145.6a8 8 0 1 1-9.6 12.8l-32-24a8 8 0 0 1 0-12.8l32-24a8 8 0 0 1 9.6 12.8L69.33 128Zm58.89-71.4l-32 112a8 8 0 1 1-15.38-4.4l32-112a8 8 0 0 1 15.38 4.4m53.11 60.2l-32 24a8 8 0 0 1-9.6-12.8l23.47-17.6l-23.47-17.6a8 8 0 1 1 9.6-12.8l32 24a8 8 0 0 1 0 12.8"
            />
          </svg>
        }
        name={AppConfig.name}
        banner={{
          href: 'https://instagram.com/fecstatic',
          text: (
            <>
              <InstagramLogoIcon className="mr-1 size-5" />{' '}
              {t('follow_twitter')}
            </>
          ),
        }}
        title={t('title')}
        description={t('description')}
        buttons={
          <>
            <Link
              className={buttonVariants({ variant: 'shimmer', size: 'lg' })}
              href="https://github.com/frxldi-xyz/SaaS-Faster"
            >
              {t('primary_button')}
            </Link>

            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="https://github.com/frxldi-xyz/SaaS-Faster"
            >
              <GitHubLogoIcon className="mr-2 size-5" />
              {t('secondary_button')}
            </Link>
          </>
        }
      >
        <ImageShowcase />
      </CenteredHero>
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] lg:[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]',
        )}
      />
    </div>
  );
};

export { Hero };
