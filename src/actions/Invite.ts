'use server';

import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { sendInviteEmail } from '@/libs/Mail';
import { generateInviteToken } from '@/libs/Tokens';
import { InviteSchema } from '@/schemas';

export const getInviteList = async (org_id: string) => {
  try {
    const list = await db.invite.findMany({ where: { org_id } });
    return list;
  } catch {
    return [];
  }
};

export const inviteTeam = async (
  values: z.infer<typeof InviteSchema>,
  org_id: string,
) => {
  const t = await getTranslations('Organization');

  const validatedFields = InviteSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { email, role } = validatedFields.data;

  const existingOrg = await db.organization.findUnique({
    where: { id: org_id },
  });
  if (!existingOrg) {
    return { error: t('organization_not_exist') };
  }

  const inviteToken = await generateInviteToken(email, org_id);

  await db.invite.create({
    data: {
      email,
      token: inviteToken.token,
      role,
      org_id,
      expires: inviteToken.expires,
    },
  });

  await sendInviteEmail(email, inviteToken.token);

  return { success: t('team_invited') };
};

export const deleteInvite = async (id: string) => {
  const t = await getTranslations('Organization');

  const existingInvite = await db.invite.findUnique({ where: { id } });
  if (!existingInvite) {
    return { error: t('invite_not_exist') };
  }
  await db.invite.delete({ where: { id } });

  return { success: t('invite_deleted') };
};

export const acceptInvite = async (token: string) => {
  const t = await getTranslations('Organization');
  const invite = await db.invite.findUnique({ where: { token } });
  if (!invite) {
    return { error: t('invite_not_exist') };
  }

  const existingOrg = await db.organization.findUnique({
    where: { id: invite.org_id },
  });
  if (!existingOrg) {
    return { error: t('organization_not_exist') };
  }

  const existingUser = await db.user.findUnique({
    where: { email: invite.email },
  });
  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const hasExpired = new Date(invite.expires) < new Date();
  if (hasExpired) {
    return { error: t('token_expired') };
  }

  await db.invite.delete({ where: { id: invite.id } });

  await db.role.create({
    data: {
      org_id: invite.org_id,
      user_id: existingUser.id,
      org_name: existingOrg.name,
      email: invite.email,
      role: invite.role,
      picture: existingOrg.picture,
    },
  });
  return { success: t('invite_accepted') };
};
