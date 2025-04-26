import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getGoogleUser } from '@/actions/auth';
import { createSession } from '@/actions/session';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/error');
  }

  try {
    const { user, tokens } = await getGoogleUser(code);
    await createSession({ user, accessToken: tokens.access_token });

    return NextResponse.redirect('/dashboard');
  } catch (error) {
    return NextResponse.redirect('/error');
  }
}
