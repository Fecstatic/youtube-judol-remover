'use server';

import { cookies } from 'next/headers';

export const getEmail = async () => {
  return cookies().get('next-auth.session-email')?.value;
};

export const getName = async () => {
  return cookies().get('next-auth.session-name')?.value;
};

export const getId = async () => {
  return cookies().get('next-auth.session-id')?.value;
};
