/* eslint-disable consistent-return */

'use server';

import bcrypt from 'bcryptjs';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/libs/Mail';
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from '@/libs/Tokens';
import { LoginSchema } from '@/schemas';
import { getTwoFactorConfirmationByUserId } from '@/services/TwoFactorConfirmation';
import { getTwoFactorTokenByEmail } from '@/services/TwoFactorToken';
import { getUserByEmail } from '@/services/User';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const t = await getTranslations('Login');
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: t('email_not_exist') };
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    return { error: t('password_incorrect') };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: t('confirmation_email_sent') };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: t('invalid_code') };
      }

      if (twoFactorToken.token !== code) {
        return { error: t('invalid_code') };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: t('code_expired') };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id,
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }
  return { success: t('login_success') };
};
