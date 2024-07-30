'use server';

import { cookies } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import type * as z from 'zod';

import { db } from '@/libs/Db';
import { OrganizationSchema } from '@/schemas';

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

// export const getUserById = async (id: string | undefined) => {
//   try {
//     const user = await db.user.findUnique({ where: { id } });

//     return user;
//   } catch {
//     return null;
//   }
// };
