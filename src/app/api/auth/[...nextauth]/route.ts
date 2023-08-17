import { authenticationOptions } from "@/lib/nextAuth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authenticationOptions);

export { handler as GET, handler as POST };
