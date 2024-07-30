'use server';

import type * as z from 'zod';

import { sendPasswordResetEmail } from '@/libs/Mail';
import { generatePasswordResetToken } from '@/libs/Tokens';
import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/services/User';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: 'Reset email sent!' };
};
