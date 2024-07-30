/* eslint-disable no-param-reassign */
// @ts-nocheck

'use server';

import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { sendVerificationEmail } from '@/libs/Mail';
import { generateVerificationToken } from '@/libs/Tokens';
import type { SettingsSchema } from '@/schemas';
import {
  ChangeEmailSchema,
  ChangeNameSchema,
  ChangePasswordSchema,
} from '@/schemas';
import { getId } from '@/services/Account';
import { getUserById } from '@/services/User';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const id = await getId();
  const dbUser = await getUserById(id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings Updated!' };
};

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  const id = await getId();
  const t = await getTranslations('NewPassword');

  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { password, newPassword } = validatedFields.data;

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const validatedPassword = await bcrypt.compare(
    password,
    existingUser.password,
  );
  if (!validatedPassword) {
    return { error: t('password_incorrect') };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  return { success: t('password_updated') };
};

export const changeName = async (values: z.infer<typeof ChangeNameSchema>) => {
  const id = await getId();
  const t = await getTranslations('Account');

  const validatedFields = ChangeNameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { name } = validatedFields.data;

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const newData = await db.user.update({
    where: { id: existingUser.id },
    data: { name },
  });

  cookies().set({
    name: 'next-auth.session-name',
    value: name,
    path: '/',
    secure: true,
  });

  return { success: t('name_updated'), data: newData };
};

export const changeEmail = async (
  values: z.infer<typeof ChangeEmailSchema>,
  id?: string | null,
) => {
  const t = await getTranslations('Account');

  const validatedFields = ChangeEmailSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { email: newEmail } = validatedFields.data;

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const newData = await db.user.update({
    where: { id: existingUser.id },
    data: { email: newEmail, emailVerified: null },
  });

  cookies().set({
    name: 'next-auth.session-email',
    value: newEmail,
    path: '/',
    secure: true,
  });

  const verificationToken = await generateVerificationToken(newEmail);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: t('confirmation_email_sent'), data: newData };
};

export const changePicture = async (avatar: string) => {
  const id = await getId();
  const t = await getTranslations('Account');

  const existingUser = await getUserById(id);

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const newData = await db.user.update({
    where: { id: existingUser.id },
    data: { image: avatar },
  });

  return { success: t('avatar_updated'), data: newData };
};
