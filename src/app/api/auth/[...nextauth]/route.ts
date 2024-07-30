/* eslint-disable no-param-reassign */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import { getAccountByUserId } from '@/account';
import { db } from '@/libs/Db';
import { LoginSchema } from '@/schemas';
import { getTwoFactorConfirmationByUserId } from '@/services/TwoFactorConfirmation';
import { getUserByEmail, getUserById } from '@/services/User';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  events: {
    async linkAccount({ user }: any) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'secret',
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      type: 'credentials',
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            cookies().set({
              name: 'next-auth.session-id',
              value: user.id as string,
              path: '/',
              secure: true,
            });
            cookies().set({
              name: 'next-auth.session-email',
              value: user.email as string,
              path: '/',
              secure: true,
            });
            cookies().set({
              name: 'next-auth.session-name',
              value: user.name as string,
              path: '/',
              secure: true,
            });
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider !== 'credentials') return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, session }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }: any) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
    // encode: async ({ secret, token }) => {
    //   const DEFAULT_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
    //   // eslint-disable-next-line no-bitwise
    //   const now = () => (Date.now() / 1000) | 0;

    //   const encryptionSecret = await getDerivedEncryptionKey(secret);

    //   const encodedToken = await new EncryptJWT(token)
    //     .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    //     .setIssuedAt()
    //     .setExpirationTime(now() + DEFAULT_MAX_AGE)
    //     .setJti(uuid())
    //     .encrypt(encryptionSecret);
    //   return encodedToken;
    // },
    // decode: async ({ secret, token }) => {
    //   if (!token) return null;
    //   const encryptionSecret = await getDerivedEncryptionKey(secret);
    //   const { payload } = await jwtDecrypt(token, encryptionSecret, {
    //     clockTolerance: 15,
    //   });
    //   return payload;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
