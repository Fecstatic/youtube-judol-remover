import { NextResponse } from 'next/server';

import { destroySession } from '@/actions/session';

export async function POST() {
  destroySession();
  return NextResponse.json({ success: true });
}
