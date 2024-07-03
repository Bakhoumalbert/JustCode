import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {

    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    theme: {
        logo: '/images/logo.png',
    },
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID,
            clientSecret: env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            session.user.image = user.image;
            session.user.email = user.email;
            return session;
        },
    },
};

export default NextAuth(authOptions);
