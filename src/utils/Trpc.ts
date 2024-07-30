import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@/app/api/v1/trpc-router';

export const trpc = createTRPCReact<AppRouter>();
