import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getGoogleUser } from '@/actions/auth';
import { createSession } from '@/actions/session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const origin = request.headers.get('origin') || new URL(request.url).origin;

  if (!code) {
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('error', 'missing_code');
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { user, tokens } = await getGoogleUser(code);
    await createSession({ user, accessToken: tokens.access_token });

    const dashboardUrl = new URL('/dashboard', origin);
    return NextResponse.redirect(dashboardUrl);
  } catch (error) {
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('error', 'auth_failed');
    return NextResponse.redirect(loginUrl);
  }
}
