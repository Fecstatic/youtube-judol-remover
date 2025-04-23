import type { LocalePrefix } from 'next-intl/routing';

import { BILLING_INTERVAL, type PricingPlan } from '@/types/Subscription';

const localePrefix: LocalePrefix = 'always';

export const AppConfig = {
  name: 'Fecstatic',
  description: 'The most advanced NextJS boilerplate in the world.',
  locales: [
    {
      id: 'en',
      name: 'English',
    },
    { id: 'id', name: 'Bahasa' },
  ],
  defaultLocale: 'en',
  localePrefix,
};

export const AllLocales = AppConfig.locales.map((locale) => locale.id);

export const PLAN_ID = {
  FREE: 'free',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
} as const;

export const PricingPlanList: Array<PricingPlan> = [
  {
    id: PLAN_ID.FREE,
    price: 100,
    interval: BILLING_INTERVAL.OTP,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 2,
      website: 2,
      storage: 2,
      transfer: 2,
    },
  },
  {
    id: PLAN_ID.PREMIUM,
    price: 399,
    interval: BILLING_INTERVAL.OTP,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 5,
      website: 5,
      storage: 5,
      transfer: 5,
    },
  },
  {
    id: PLAN_ID.ENTERPRISE,
    price: 'Custom',
    interval: BILLING_INTERVAL.OTP,
    testPriceId: '',
    devPriceId: '',
    prodPriceId: '',
    features: {
      teamMember: 100,
      website: 100,
      storage: 100,
      transfer: 100,
    },
  },
];
