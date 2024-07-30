import { db } from '@/libs/Db';

export const getDatabase = async (sessionToken: string) => {
  try {
    const user = await db.session.findUnique({ where: { sessionToken } });

    return user;
  } catch {
    return null;
  }
};

export const addDatabase = async (
  email: string,
  sessionToken: string,
  expires: Date,
) => {
  try {
    const data = await db.user.findFirst({ where: { email } });
    if (!data) return null;
    const userId = data?.id;
    const user = await db.session.findFirst({
      where: { userId },
    });
    if (user) {
      await db.session.deleteMany({
        where: { id: user.id },
      });
    }
    const userCreated = await db.session.create({
      data: { sessionToken, expires, userId },
    });

    return userCreated;
  } catch {
    return null;
  }
};
