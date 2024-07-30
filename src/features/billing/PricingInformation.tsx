import { useTranslations } from 'next-intl';

import { PricingCard } from '@/features/billing/PricingCard';
import { PricingFeature } from '@/features/billing/PricingFeature';
import type { PlanId } from '@/types/Subscription';
import { PricingPlanList } from '@/utils/AppConfig';

const PricingInformation = (props: {
  buttonList: Record<PlanId, React.ReactNode>;
}) => {
  const t = useTranslations('PricingPlan');

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-8 pt-5 lg:grid-cols-3">
      {PricingPlanList.map((plan) => (
        <PricingCard
          key={plan.id}
          planId={plan.id}
          price={plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}
          // interval={plan.interval}
          button={props.buttonList[plan.id]}
          className={
            // eslint-disable-next-line no-nested-ternary
            plan.id === 'premium'
              ? 'border-primary lg:scale-[102.55%]'
              : plan.id === 'enterprise'
                ? 'bg-foreground'
                : ''
          }
          classTitle={plan.id === 'enterprise' ? 'text-background' : ''}
          classDescription={
            plan.id === 'enterprise'
              ? 'text-background'
              : 'text-muted-foreground'
          }
          classPrice={plan.id === 'enterprise' ? 'text-background' : ''}
        >
          <PricingFeature>
            {t('feature_team_member', {
              number: plan.features.teamMember,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_website', {
              number: plan.features.website,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_storage', {
              number: plan.features.storage,
            })}
          </PricingFeature>

          <PricingFeature>
            {t('feature_transfer', {
              number: plan.features.transfer,
            })}
          </PricingFeature>

          <PricingFeature>{t('feature_email_support')}</PricingFeature>
        </PricingCard>
      ))}
    </div>
  );
};

export { PricingInformation };
