import { GitHubLogoIcon, VideoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { getGoogleAuthURL } from '@/actions/auth';
import { buttonVariants } from '@/components/ui/button';
import { CenteredHero } from '@/features/landing/CenteredHero';

const Hero = () => {
  const t = useTranslations('Hero');
  const googleAuthURL = getGoogleAuthURL();

  return (
    <div className="mx-3 flex max-w-screen-xl flex-col place-content-center items-center py-8 lg:mx-auto lg:py-48">
      <CenteredHero
        banner={{
          href: 'https://instagram.com/fecstatic',
          text: (
            <>
              <VideoIcon className="mr-1 size-5" /> {t('follow_twitter')}
            </>
          ),
        }}
        title={t('title')}
        description={t('description')}
        buttons={
          <>
            <Link
              className={buttonVariants({ variant: 'shimmer', size: 'lg' })}
              href={googleAuthURL}
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
      />
    </div>
  );
};

export { Hero };
