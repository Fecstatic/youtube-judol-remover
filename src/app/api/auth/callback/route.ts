import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getGoogleUser } from '@/actions/auth';
import { createSession } from '@/actions/session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(
      new URL('/login?error=missing_code', request.url),
    );
  }

  try {
    const { user, tokens } = await getGoogleUser(code);
    await createSession({ user, accessToken: tokens.access_token });

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error) {
    return NextResponse.redirect(
      new URL('/login?error=auth_failed', request.url),
    );
  }
}
