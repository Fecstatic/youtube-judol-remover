'use server';

import { getTranslations } from 'next-intl/server';

import { db } from '@/libs/Db';
import { getUserByEmail } from '@/services/User';
import { getVerificationTokenByToken } from '@/services/VerificationToken';

export const newVerification = async (token: string) => {
  const t = await getTranslations('Verification');
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: t('token_not_exist') };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: t('token_expired') };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: t('email_verified') };
};
