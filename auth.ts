import { PrismaAdapter } from "@auth/prisma-adapter";
import bcryptjs from "bcryptjs";
import NextAuth, { DefaultSession, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma/prisma";

declare module "next-auth" {
  interface Session {
    user: {
      type: string;
    } & DefaultSession["user"];
  }
}

interface User extends NextAuthUser {
  type: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        type: { type: "string" },
      },
      authorize: async (credentials): Promise<User | null> => {
        let user;
        if (!credentials) throw new Error("Credentials required");
        if (credentials.type == "student") {
          const user = await prisma.student
            .findUnique({
              where: { email: String(credentials.email) },
            })
            .catch((e) => {
              throw new Error("User wasn't found");
            });
          if (
            await bcryptjs.compare(
              String(credentials.password),
              user?.password!
            )
          ) {
            return { ...user, type: "student", id: user?.id! } as User;
          } else throw new Error("Credentials required");
        } else if (credentials.type == "staff") {
          const user = await prisma.staff
            .findUnique({
              where: { email: String(credentials.email) },
            })
            .catch((e) => {
              throw new Error("User wasn't found");
            });
          if (
            await bcryptjs.compare(
              String(credentials.password),
              user?.password!
            )
          ) {
            return { ...user, type: credentials.type, id: user?.id, name:user?.staffName } as User;
          } else throw new Error("Credentials required");
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.type = (user as User).type;
        token.id = user.id; 
        token.name = user.name; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.type = token.type as string;
        session.user.id = token.id as string; 
        session.user.name = token.name as string; 
      }
      return session;
    },
  },
  pages: { signIn: "/student/signin" },
  session: { strategy: "jwt" },
});
