/* eslint-disable */
'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { cn } from '@/utils/Helpers';

import type { BillingInterval, PlanId } from '@/types/Subscription';
import { MagicCard } from '@/components/ui/magic-card';
import { useTheme } from 'next-themes';

const PricingCard = (props: {
  planId: PlanId;
  price: string;
  interval?: BillingInterval;
  button: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  classTitle?: string;
  classDescription?: string;
  classPrice?: string;
}) => {
  const t = useTranslations('PricingPlan');
  const { theme } = useTheme();

  return (
    <MagicCard
      className={cn("rounded-lg border border-border p-8", props.className)}
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    >
      {props.planId === 'premium' && <div className="absolute inset-x-0 -top-8 uppercase bg-foreground rounded-b-xl py-1 px-3 text-sm font-semibold place-self-center text-background mb-3">
        {t('most_popular')}
      </div>}

      <div className={cn("text-2xl font-semibold", props.classTitle)}>
        {t(`${props.planId}_plan_name`)}
      </div>

      <div className={cn("mt-2 text-sm text-muted-foreground", props.classDescription)}>
        {t(`${props.planId}_plan_description`)}
      </div>

      <div className="m-5 flex items-center justify-center">
        <div className={cn("text-5xl font-bold", props.classPrice)}>{props.price}</div>

        {props.interval && <div className="ml-1 text-muted-foreground">
          / {t(`plan_interval_${props.interval}`)}
        </div>}
      </div>

      {props.button}

      <ul className="mt-8 space-y-3">{props.children}</ul>
    </MagicCard>
  );
};

export { PricingCard };
