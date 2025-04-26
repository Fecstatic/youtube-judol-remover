import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getGoogleUser } from '@/actions/auth';
import { createSession } from '@/actions/session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    const loginUrl = new URL('/login', process.env.BASE_URL);
    loginUrl.searchParams.set('error', 'missing_code');
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { user, tokens } = await getGoogleUser(code);
    await createSession({ user, accessToken: tokens.access_token });

    const dashboardUrl = new URL('/dashboard', process.env.BASE_URL);
    return NextResponse.redirect(dashboardUrl);
  } catch (error) {
    const loginUrl = new URL('/login', process.env.BASE_URL);
    loginUrl.searchParams.set('error', 'auth_failed');
    return NextResponse.redirect(loginUrl);
  }
}
