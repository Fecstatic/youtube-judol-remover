import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

// Don't add NODE_ENV into T3 Env, it changes the tree-shaking behavior
export const Env = createEnv({
  server: {
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAURL_URL: z.string().optional(),
    LOGTAIL_SOURCE_TOKEN: z.string().optional(),
    BILLING_PLAN_ENV: z.enum(['dev', 'test', 'prod']),
    HOST_EMAIL: z.string().min(1),
    PORT_EMAIL: z.string().min(1),
    USER_EMAIL: z.string().min(1).email(),
    PASS_EMAIL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().optional(),
  },
  // You need to destructure all the keys manually
  runtimeEnv: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAURL_URL: process.env.NEXTAURL_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    BILLING_PLAN_ENV: process.env.BILLING_PLAN_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    HOST_EMAIL: process.env.HOST_EMAIL,
    PORT_EMAIL: process.env.PORT_EMAIL,
    USER_EMAIL: process.env.USER_EMAIL,
    PASS_EMAIL: process.env.PASS_EMAIL,
  },
});
