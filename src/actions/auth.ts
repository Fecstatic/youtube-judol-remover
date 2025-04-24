'use server';

import { google } from 'googleapis';
import { cookies } from 'next/headers';

export const setCredentials = async (id: string, secret: string) => {
  const cookieStore = await cookies();
  cookieStore.set('client_id', id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
  cookieStore.set('client_secret', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
};

export const getGoogleAuthURL = async () => {
  const cookieStore = await cookies();
  if (
    !cookieStore.get('client_id')?.value ||
    !cookieStore.get('client_secret')?.value
  ) {
    throw new Error('Credentials not set');
  }

  const client = new google.auth.OAuth2(
    cookieStore.get('client_id')?.value as string,
    cookieStore.get('client_secret')?.value as string,
    process.env.GOOGLE_REDIRECT_URI,
  );

  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
    ],
  });
};

export const getGoogleUser = async (code: string) => {
  const cookieStore = await cookies();
  if (
    !cookieStore.get('client_id')?.value ||
    !cookieStore.get('client_secret')?.value
  ) {
    throw new Error('Credentials not set');
  }

  try {
    const client = new google.auth.OAuth2(
      cookieStore.get('client_id')?.value as string,
      cookieStore.get('client_secret')?.value as string,
      process.env.GOOGLE_REDIRECT_URI,
    );

    const { tokens } = await client.getToken(code);
    if (!tokens.access_token) {
      throw new Error('Failed to get access token');
    }

    client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      version: 'v2',
      auth: client,
    });

    const { data } = await oauth2.userinfo.get();
    return {
      user: data,
      tokens,
    };
  } catch (error) {
    throw new Error(
      'Authentication failed. Please check your credentials and try again.',
    );
  }
};
