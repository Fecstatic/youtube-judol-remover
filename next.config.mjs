/* eslint-disable import/no-extraneous-dependencies, import/extensions */

import { fileURLToPath } from 'node:url';
import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import createJiti from 'jiti';
import withNextIntl from 'next-intl/plugin';
import withPWAInit from 'next-pwa';

const jiti = createJiti(fileURLToPath(import.meta.url));
jiti('./src/libs/Env');
const withNextIntlConfig = withNextIntl('./src/libs/i18n.ts');
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
export default withSentryConfig(
  withPWA(
    bundleAnalyzer(
      withNextIntlConfig({
        eslint: {
          dirs: ['.'],
        },
        poweredByHeader: false,
        reactStrictMode: true,
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'robohash.org',
            },
            {
              protocol: 'https',
              hostname: 'utfs.io',
            },
          ],
        },
      }),
    ),
    {
      // For all available options, see:
      // https://github.com/getsentry/sentry-webpack-plugin#options

      // Suppresses source map uploading logs during build
      silent: true,
      // FIXME: Add your Sentry organization and project names
      org: 'fecstatic',
      project: 'saas-boilerplate',
      enabled: process.env.NODE_ENV === 'production',
    },
    {
      // For all available options, see:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
      tunnelRoute: '/monitoring',

      // Upload a larger set of source maps for prettier stack traces (increases build time)
      widenClientFileUpload: true,
      // Transpiles SDK to be compatible with IE11 (increases bundle size)
      transpileClientSDK: true,
      // Hides source maps from generated client bundles
      hideSourceMaps: true,
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      disableLogger: true,
      // Enables automatic instrumentation of Vercel Cron Monitors.
      // See the following for more information:
      // https://docs.sentry.io/product/crons/
      // https://vercel.com/docs/cron-jobs
      automaticVercelMonitors: true,
    },
  ),
);
