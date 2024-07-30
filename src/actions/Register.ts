'use server';

import bcrypt from 'bcryptjs';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { sendVerificationEmail } from '@/libs/Mail';
import { generateVerificationToken } from '@/libs/Tokens';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/services/User';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const t = await getTranslations('Register');
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: t('email_already_taken') };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: t('confirmation_email_sent') };
};
