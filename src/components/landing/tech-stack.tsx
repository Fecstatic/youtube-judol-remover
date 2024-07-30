'use client';

import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Background } from '@/components/background';
import {
  CardBody,
  CardContainer,
  CardItem,
  Container,
} from '@/components/ui/3d-card';
import { Carousel, CarouselMainContainer } from '@/components/ui/carousel';
import { Section } from '@/features/landing/Section';

const TechStack = () => {
  const t = useTranslations('TechStack');

  const items = [
    {
      title: t('feature1_title'),
      description: t('feature1_description'),
      className: 'border transition-colors duration-500 hover:border-cyan-500',
      color: 'bg-cyan-500',
      border: 'hover:shadow-cyan-500/[0.25] dark:hover:shadow-cyan-500/[0.25]',
      category: 'CSS',
      icon: (
        <Container>
          <Image
            src="/techstack/tailwind.svg"
            alt="Tailwind CSS"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature2_title'),
      description: t('feature2_description'),
      className:
        'border transition-colors duration-500 hover:border-black dark:hover:border-white',
      color: 'bg-black dark:bg-white dark:text-black',
      border: 'hover:shadow-black/[0.25] dark:hover:shadow-black/[0.25]',
      category: 'UI Components',
      icon: (
        <Container>
          <Image
            src="/techstack/shadcn.svg"
            alt="Shadcn UI"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature3_title'),
      description: t('feature3_description'),
      className:
        'border transition-colors duration-500 hover:border-indigo-700',
      color: 'bg-indigo-700',
      border:
        'hover:shadow-indigo-700/[0.25] dark:hover:shadow-indigo-700/[0.25]',
      category: 'Linting',
      icon: (
        <Container>
          <Image
            src="/techstack/eslint.svg"
            alt="ESLint"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature4_title'),
      description: t('feature4_description'),
      className: 'border transition-colors duration-500 hover:border-pink-300',
      color: 'bg-pink-300',
      border: 'hover:shadow-pink-300/[0.25] dark:hover:shadow-pink-300/[0.25]',
      category: 'Beautify',
      icon: (
        <Container>
          <Image
            src="/techstack/prettier.svg"
            alt="Prettier"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature5_title'),
      description: t('feature5_description'),
      className: 'border transition-colors duration-500 hover:border-gray-300',
      color: 'bg-gray-300 dark:text-black',
      border: 'hover:shadow-gray-300/[0.25] dark:hover:shadow-gray-300/[0.25]',
      category: 'Database',
      icon: (
        <Container>
          <Image
            src="/techstack/prisma.svg"
            alt="Prisma"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature6_title'),
      description: t('feature6_description'),
      className:
        'border transition-colors duration-500 hover:border-black dark:hover:border-white',
      color: 'bg-black dark:bg-white dark:text-black',
      border: 'hover:shadow-black/[0.25] dark:hover:shadow-black/[0.25]',
      category: 'Git Hooks',
      icon: (
        <Container>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="47.56"
            height="50"
            viewBox="0 0 487 512"
          >
            <path
              fill="currentColor"
              d="M433.564 329.127c-.446 17.167-33.615 29.09-20.112 46.152c29.805 4.185 16.249 23.939 32.578 30.662c-28.865 47.002-75.448 52.873-119.742 23.44c-12.886-7.684-27.396-10.94-39.291-7.736c-6.776 10.84 3.305 12.118 9.732 13.688c31.15 6.201 62.553 54.347 167.968 8.487c14.046-5.912 11.916-23.308 5.834-36.985c11.683-4.978 12.384-17.96 14.106-34.646c11.46-37.616-26.181-34.365-51.073-43.062m-165.728-81.688c-12.854.288-31.777 12.464-44.28 18.524c17.643 10.378 24.651 22.727 44.28 18.87c19.636-3.856 19.278-16.5 11.553-31.189c-2.423-4.607-6.523-6.317-11.553-6.205M350.783.014c-23.986 1.1-44.619 65.358-69.083 110.904c-70.332 29.251-87.93-8.677-110.895-2.439C131.69 28.753 73.613-51.179 57.92 43.822c3.47 71.804-25.19 77.72-22.655 180.173c0 0-51.119 102.887-30.263 193.927c14.695 64.151 66.371 88.362 101.08 94.078c3.592-26.24 44.78-85.41 33.515-99.217c-28.108-34.451-19.29-118.846 51.948-127.569c9.732-70.992 58.03-57.629 53.089-78.164c-15.482-64.332 51.32-34.302 62.531-13.222c20.144 33.427 34.308 66.281 50.774 81.853c20.941 19.805 49.347 30.623 51.01 31.247c-5.968-3.73-57.183-47.055-72.168-81.854c-9.012-20.93-8.106-68.08-8.106-68.08c25.985-4.065 36.469 39.655 64.69 79.32c1.168 2.857.962 5.144 0 7.05c-3.893-2.053-5.246-7.202-9.918-7.82c-4.254 0-7.703 6.036-7.703 13.479s5.614 10.1 13.347 13.58c10.781 18.973 21.986 25.945 32.767 30.699L387.07 191.65c-1.29-63.662 5.444-127.327-31.442-190.99a13.923 13.923 0 0 0-4.845-.646m.333 20.297c1.927-.033 3.707 1.267 5.282 4.227c19.253 36.195 19.963 121.15 19.831 151.184c-9.143-20.808-22.843-55.803-66.035-66.473c0 0 25.231-88.665 40.922-88.938M92.392 28.385c8.777-.037 18.752 5.106 30.324 26.207c18.515 33.762 31.801 56.222 38.25 67.847c13.201 23.796-5.78 4.98-11.722 66.035c-1.174 12.056-5.726 17.854-14.65 23.973c-19.315-19.306-32.938-52.81-42.343-92.643c-18.44 27.387 11.933 69.735 12.473 105.95c-20.488 4.683-33.772 3.045-41.352.518c-9.505-4.752-12.637-62.723 4.994-107.725C83.052 81.063 76.071 33.4 82.6 31.323c4.492-1.43 4.525-2.916 9.792-2.938"
            />
          </svg>
        </Container>
      ),
    },
    {
      title: t('feature7_title'),
      description: t('feature7_description'),
      className:
        'border transition-colors duration-500 hover:border-indigo-900',
      color: 'bg-indigo-900',
      border:
        'hover:shadow-indigo-900/[0.25] dark:hover:shadow-indigo-900/[0.25]',
      category: 'Error Tracking',
      icon: (
        <Container>
          <Image
            src="/techstack/sentry.svg"
            alt="Sentry"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature8_title'),
      description: t('feature8_description'),
      className: 'border transition-colors duration-500 hover:border-red-700',
      color: 'bg-red-700',
      border: 'hover:shadow-red-700/[0.25] dark:hover:shadow-red-700/[0.25]',
      category: 'Testing',
      icon: (
        <Container>
          <Image src="/techstack/jest.svg" alt="Jest" width="50" height="50" />
        </Container>
      ),
    },
    {
      title: t('feature9_title'),
      description: t('feature9_description'),
      className: 'border transition-colors duration-500 hover:border-green-900',
      color: 'bg-green-900',
      border:
        'hover:shadow-green-900/[0.25] dark:hover:shadow-green-900/[0.25]',
      category: 'i18n',
      icon: (
        <Container>
          <Image
            src="/techstack/crowdin.svg"
            alt="Crowdin"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature10_title'),
      description: t('feature10_description'),
      className: 'border transition-colors duration-500 hover:border-blue-400',
      color: 'bg-blue-400',
      border: 'hover:shadow-blue-400/[0.25] dark:hover:shadow-blue-400/[0.25]',
      category: 'Deployment',
      icon: (
        <Container>
          <Image
            src="/techstack/docker.svg"
            alt="Docker"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature11_title'),
      description: t('feature11_description'),
      className: 'border transition-colors duration-500 hover:border-blue-700',
      color: 'bg-blue-700',
      border: 'hover:shadow-blue-700/[0.25] dark:hover:shadow-blue-700/[0.25]',
      category: 'Validation',
      icon: (
        <Container>
          <Image src="/techstack/zod.svg" alt="Zod" width="50" height="50" />
        </Container>
      ),
    },
    {
      title: t('feature12_title'),
      description: t('feature12_description'),
      className: 'border transition-colors duration-500 hover:border-blue-600',
      color: 'bg-blue-600',
      border: 'hover:shadow-blue-600/[0.25] dark:hover:shadow-blue-600/[0.25]',
      category: 'Beautify',
      icon: (
        <Container>
          <Image
            src="/techstack/checkly.svg"
            alt="Checkly"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature13_title'),
      description: t('feature13_description'),
      className:
        'border transition-colors duration-500 hover:border-yellow-500',
      color: 'bg-yellow-500',
      border:
        'hover:shadow-yellow-500/[0.25] dark:hover:shadow-yellow-500/[0.25]',
      category: 'Analytics',
      icon: (
        <Container>
          <Image
            src="/techstack/posthog.svg"
            alt="PostHog"
            width="50"
            height="50"
          />
        </Container>
      ),
    },
    {
      title: t('feature14_title'),
      description: t('feature14_description'),
      className:
        'border transition-colors duration-500 hover:border-violet-500',
      color: 'bg-violet-500',
      border:
        'hover:shadow-violet-500/[0.25] dark:hover:shadow-violet-500/[0.25]',
      category: 'Lint',
      icon: (
        <Container>
          <svg viewBox="0 0 170 119" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M43.2861 100.407C50.9973 89.3692 66.6897 81.813 84.794 81.813C102.898 81.813 118.591 89.3692 126.302 100.407C118.591 111.444 102.898 119 84.794 119C66.6897 119 50.9973 111.444 43.2861 100.407Z"
              fill="url(#paint0_radial_1449_2)"
            />
            <path
              d="M43.006 18.3961C50.7123 7.47595 66.3946 0 84.4874 0C102.58 0 118.263 7.47595 125.969 18.3961C118.263 29.3163 102.58 36.7922 84.4874 36.7922C66.3946 36.7922 50.7123 29.3163 43.006 18.3961Z"
              fill="url(#paint1_radial_1449_2)"
            />
            <path
              d="M85.2801 59.7175C74.0684 70.5465 58.8619 76.6302 43.006 76.6302C27.1502 76.6302 11.9437 70.5465 0.731934 59.7175L43.006 18.3961L85.2801 59.7175Z"
              fill="url(#paint2_radial_1449_2)"
            />
            <path
              d="M168.344 59.7378C157.132 70.5668 141.925 76.6505 126.07 76.6505C110.214 76.6505 95.0073 70.5668 83.7955 59.7378L126.07 18.3961L168.344 59.7378Z"
              fill="url(#paint3_radial_1449_2)"
            />
            <defs>
              <radialGradient
                id="paint0_radial_1449_2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(84.794 100.406) rotate(92.849) scale(12.0136 26.7792)"
              >
                <stop stopColor="#845CE7" />
                <stop offset="1" stopColor="#AF73D8" />
              </radialGradient>
              <radialGradient
                id="paint1_radial_1449_2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)"
              >
                <stop stopColor="#845CE7" />
                <stop offset="1" stopColor="#AF73D8" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_1449_2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)"
              >
                <stop stopColor="#845CE7" />
                <stop offset="1" stopColor="#AF73D8" />
              </radialGradient>
              <radialGradient
                id="paint3_radial_1449_2"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(84.5378 38.3252) rotate(92.7908) scale(24.7615 54.0709)"
              >
                <stop stopColor="#845CE7" />
                <stop offset="1" stopColor="#AF73D8" />
              </radialGradient>
            </defs>
          </svg>
        </Container>
      ),
    },
  ];

  const itemFirst = items.slice(0, 8);
  const itemSecond = items.slice(8, 16);

  return (
    <Background className="bg-background">
      <Section
        subtitle={t('section_subtitle')}
        title={t('section_title')}
        description={t('section_description')}
      >
        <div className="relative flex w-fit flex-col items-center justify-center overflow-hidden">
          <Carousel
            plugins={[
              AutoScroll({
                speed: 1,
              }),
            ]}
            carouselOptions={{
              loop: true,
              duration: 40,
            }}
          >
            <CarouselMainContainer className="flex gap-4 p-2">
              {itemFirst.map((item) => (
                <CardContainer key={item.title}>
                  <CardBody
                    className={`group/card relative flex flex-col justify-center rounded-md ${item.className} bg-background p-5 hover:shadow-2xl dark:hover:shadow-2xl ${item.border} min-h-[21.5rem] max-w-72 cursor-pointer`}
                  >
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-card-foreground"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="mt-2 max-w-sm text-sm text-card-foreground"
                    >
                      {item.description}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      rotateX={25}
                      rotateZ={5}
                      className="mt-4 w-full"
                    >
                      {item.icon}
                    </CardItem>
                    <div className="mt-10 flex items-center justify-between">
                      <CardItem
                        translateZ={20}
                        as="button"
                        className={`rounded-md ${item.color} px-4 py-2 text-xs font-bold text-white`}
                      >
                        {item.category}
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </CarouselMainContainer>
          </Carousel>
          <Carousel
            plugins={[
              AutoScroll({
                speed: 1,
              }),
            ]}
            carouselOptions={{
              loop: true,
              duration: 60,
            }}
          >
            <CarouselMainContainer className="flex gap-4 p-2">
              {itemSecond.map((item) => (
                <CardContainer key={item.title}>
                  <CardBody
                    className={`group/card relative flex flex-col justify-center rounded-md ${item.className} bg-background p-5 hover:shadow-2xl dark:hover:shadow-2xl ${item.border} min-h-[21.5rem] max-w-72 cursor-pointer`}
                  >
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-card-foreground"
                    >
                      {item.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="mt-2 max-w-sm text-sm text-card-foreground"
                    >
                      {item.description}
                    </CardItem>
                    <CardItem
                      translateZ="100"
                      rotateX={25}
                      rotateZ={5}
                      className="mt-4 w-full"
                    >
                      {item.icon}
                    </CardItem>
                    <div className="mt-10 flex items-center justify-between">
                      <CardItem
                        translateZ={20}
                        as="button"
                        className={`rounded-md ${item.color} px-4 py-2 text-xs font-bold text-white`}
                      >
                        {item.category}
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </CarouselMainContainer>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background" />
        </div>
      </Section>
    </Background>
  );
};

export { TechStack };
