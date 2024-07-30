import { LapTimerIcon } from '@radix-ui/react-icons';
import { Codesandbox, Phone, Share2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import Meteors from '@/components/ui/meteors';
import { VelocityScroll } from '@/components/ui/scroll-based-velocity';
import { Section } from '@/features/landing/Section';

import { AnimatedBeamMultipleOutput } from './animated-beam';
import { FileTree } from './file-tree';

const Overview = () => {
  const t = useTranslations('Overview');

  const features = [
    {
      Icon: LapTimerIcon,
      name: t('save_time'),
      description: t('save_time_description'),
      href: '#',
      cta: t('learn_more'),
      className: 'col-span-3 lg:col-span-1',
      background: (
        <div className="bottom-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-110">
          <VelocityScroll
            text="Build Faster"
            default_velocity={7}
            className="text-center text-7xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-9xl md:leading-[5rem]"
          />
        </div>
      ),
    },
    {
      Icon: Share2Icon,
      name: t('integrations'),
      description: t('integrations_description'),
      href: '#',
      cta: t('learn_more'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <div className="relative inset-x-0 top-0 h-[150px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-110 md:h-[200px]">
          <AnimatedBeamMultipleOutput className="scale-125" />
        </div>
      ),
    },
    {
      Icon: Codesandbox,
      name: t('best_practices'),
      description: t('best_practices_description'),
      href: '#',
      cta: t('learn_more'),
      className: 'col-span-3 lg:col-span-2',
      background: (
        <div className="relative h-[135px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_1%,#000_100%)] group-hover:scale-110 md:h-[170px]">
          <FileTree />
        </div>
      ),
    },
    {
      Icon: Phone,
      name: t('247_support'),
      description: t('247_support_description'),
      className: 'col-span-3 lg:col-span-1',
      href: '#',
      cta: t('contact'),
      background: (
        <div className="relative inset-x-0 top-0 h-[200px] transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)] group-hover:scale-110">
          <Meteors number={100} />
        </div>
      ),
    },
  ];

  return (
    <Section
      subtitle={t('section_subtitle')}
      title={t('section_title')}
      description={t('section_description')}
    >
      <BentoGrid>
        {features.map((feature, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </Section>
  );
};

export { Overview };
