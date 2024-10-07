import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import bcryptjs from "bcryptjs";
import { error } from "console";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        type: { type: "string" },
      },
      authorize: async (credentials) => {
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
            console.log("User Logged in");
            return user;
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
            console.log("User Logged in");
            return user;
          } else throw new Error("Credentials required");
        }
        return null;
      },
    }),
  ],
  pages: { signIn: "/student/signin" },

  session: { strategy: "jwt" },
});
