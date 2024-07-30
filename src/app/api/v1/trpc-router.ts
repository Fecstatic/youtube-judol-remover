import { createServerSideHelpers } from '@trpc/react-query/server';
import SuperJSON from 'superjson';

import { t } from '@/utils/TrpcServer';

const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(() => {
    return {
      status: 'success',
      message: 'Welcome to trpc with Next.js 14 and React Query',
    };
  }),
});

export const appRouter = t.mergeRouters(healthCheckerRouter);

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: () => {},
  });

export type AppRouter = typeof appRouter;
