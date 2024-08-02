import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import { getPasswordResetTokenByEmail } from '@/services/PasswordResetToken';
import { getTwoFactorTokenByEmail } from '@/services/TwoFactorToken';
import { getVerificationTokenByEmail } from '@/services/VerificationToken';

import { db } from './Db';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateInviteToken = async (email: string, org_id: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await db.invite.findFirst({ where: { email, org_id } });

  if (existingToken) {
    await db.invite.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = {
    token,
    expires,
  };

  return passwordResetToken;
};
