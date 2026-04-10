import NextAuth from "next-auth";
import { authOptions, logAuthConfigWarnings } from "@/lib/auth";

logAuthConfigWarnings();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
