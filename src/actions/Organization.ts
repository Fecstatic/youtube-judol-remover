'use server';

import type { OrgRole } from '@prisma/client';
import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { ChangeNameSchema, OrganizationSchema } from '@/schemas';

export const getOrganizationById = async () => {
  const t = await getTranslations('Organization');
  try {
    const email = cookies().get('next-auth.session-email')?.value;
    const user = await db.user.findUnique({ where: { email } });
    const userId = user?.id;
    const org = await db.role.findMany({
      where: { user_id: userId },
    });
    const teams = org.map((o) => {
      return {
        label: o.org_name,
        picture: o.picture,
        value: o.org_id,
        role: o.role,
      };
    });
    const list = [
      {
        label: t('account'),
        teams: [
          {
            label: user?.name,
            picture: user?.image,
            value: 'personal',
            role: 'USER',
          },
        ],
      },
      {
        label: t('teams'),
        teams,
      },
    ];
    return list;
  } catch {
    return null;
  }
};

export const getOrganizationByIdOnlyTeam = async () => {
  const t = await getTranslations('Organization');
  try {
    const email = cookies().get('next-auth.session-email')?.value;
    const user = await db.user.findUnique({ where: { email } });
    const userId = user?.id;
    const org = await db.role.findMany({
      where: { user_id: userId },
    });
    const teams = org.map((o) => {
      return {
        label: o.org_name,
        picture: o.picture,
        value: o.org_id,
        role: o.role,
      };
    });
    const list = [
      {
        label: t('teams'),
        teams,
      },
    ];
    return list;
  } catch {
    return null;
  }
};

export const getOrganizationDoubleName = async (name: string) => {
  const t = await getTranslations('Organization');
  try {
    const email = cookies().get('next-auth.session-email')?.value;
    const user = await db.user.findUnique({ where: { email } });
    const userId = user?.id;
    const orgs = await db.organization.findFirst({
      where: { owner_user_id: userId, name },
    });
    if (orgs) return { error: t('team_exists') };
    return { success: t('team_available') };
  } catch {
    return null;
  }
};

export const newOrganization = async (
  values: z.infer<typeof OrganizationSchema>,
) => {
  const t = await getTranslations('Organization');
  const validatedFields = OrganizationSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { name, email, picture } = validatedFields.data;
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return { error: t('user_not_valid') };
  const userId = user?.id;
  const org = await db.organization.create({
    data: {
      name,
      owner_user_id: userId,
      picture,
    },
  });
  await db.role.create({
    data: {
      org_id: org.id,
      org_name: org.name,
      user_id: org.owner_user_id,
      email,
      picture,
    },
  });
  return { success: t('team_created'), list: org };
};

export const getMemberList = async (org_id: string) => {
  try {
    const list = await db.role.findMany({ where: { org_id } });
    const need = list.map((r) => r.user_id);
    const users = await db.user.findMany({ where: { id: { in: need } } });
    const members = users.map((u) => {
      return {
        id: u.id,
        roleId: list.find((l) => l.user_id === u.id)?.id,
        email: u.email,
        name: u.name,
        picture: u.image,
        role: list.find((l) => l.user_id === u.id)?.role,
      };
    });
    return members;
  } catch {
    return [];
  }
};

export const changeAvatar = async (avatar: string, org_id: string) => {
  const t = await getTranslations('Account');

  const existingUser = await db.organization.findUnique({
    where: { id: org_id },
  });

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const newData = await db.organization.update({
    where: { id: existingUser.id },
    data: { picture: avatar },
  });

  return { success: t('avatar_updated'), data: newData };
};

export const changeName = async (
  values: z.infer<typeof ChangeNameSchema>,
  id: string,
) => {
  const t = await getTranslations('Account');

  const validatedFields = ChangeNameSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: t('invalid_fields') };
  }

  const { name } = validatedFields.data;

  const existingUser = await db.organization.findUnique({
    where: { id },
  });

  if (!existingUser) {
    return { error: t('email_not_exist') };
  }

  const newData = await db.organization.update({
    where: { id: existingUser.id },
    data: { name },
  });

  return { success: t('name_updated'), data: newData };
};

export const changeMemberRole = async (id: string, role: OrgRole) => {
  const t = await getTranslations('Organization');
  const existingOrg = await db.role.findFirst({ where: { id } });
  if (!existingOrg) {
    return { error: t('organization_not_exist') };
  }
  await db.role.update({ where: { id }, data: { role } });
  return { success: t('role_changed') };
};

export const deleteOrganization = async (id: string) => {
  const t = await getTranslations('Organization');
  const existingUser = await db.organization.findUnique({ where: { id } });
  if (!existingUser) {
    return { error: t('email_not_exist') };
  }
  await db.organization.delete({ where: { id } });
  return { success: t('team_deleted') };
};

export const deleteMember = async (id: string) => {
  const t = await getTranslations('Organization');
  const existingOrg = await db.role.findUnique({ where: { id } });
  if (!existingOrg) {
    return { error: t('organization_not_exist') };
  }
  await db.role.delete({ where: { id } });
  return { success: t('member_kicked') };
};
