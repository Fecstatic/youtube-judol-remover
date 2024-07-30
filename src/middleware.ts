// @ts-nocheck
import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from '@/routes';

import { locales } from './navigation';
import { AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default async function middleware(req: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicRoutes
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isPublicRoute = publicPathnameRegex.test(req.nextUrl.pathname);

  const authPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${authRoutes
      .flatMap((p) => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i',
  );
  const isAuthRoute = authPathnameRegex.test(req.nextUrl.pathname);
  if (!isPublicRoute && !isAuthRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  return intlMiddleware(req);
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
