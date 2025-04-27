import { GitHubLogoIcon, VideoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { CenteredHero } from '@/features/landing/CenteredHero';

import GetStarted from './get-started-button';

const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <div className="mx-3 flex max-w-screen-xl flex-col place-content-center items-center py-8 lg:mx-auto lg:py-48">
      <CenteredHero
        banner={{
          href: 'https://youtu.be/l7qqP1-awq4',
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
            <GetStarted text={t('primary_button')} />

            <Link
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
              href="https://github.com/Fecstatic/youtube-judol-remover"
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
