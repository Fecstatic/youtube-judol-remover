import jwt from 'jwt-simple';
import { cookies } from 'next/headers';

const secret = 'FECSTATIC_JUDOL_REMOVER';

export const createSession = async (user: any) => {
  const token = jwt.encode(user, secret);
  const store = await cookies();
  store.set('yt_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 1 day
    path: '/',
  });
};

export const getSession = async () => {
  const store = await cookies();
  const token = store.get('yt_session')?.value;
  if (!token) return null;

  try {
    return jwt.decode(token, secret);
  } catch {
    return null;
  }
};

export const destroySession = async () => {
  const store = await cookies();
  store.delete('yt_session');
};
