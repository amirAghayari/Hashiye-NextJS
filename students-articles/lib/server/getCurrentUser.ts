import { cookies } from "next/headers";
import { verifyToken } from "@/lib/server/auth/auth";
import connectDB from "@/lib/server/mongoose";
import { User } from "@/models/User";

async function lookupUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) return { error: "کاربر وارد نشده است" } as const;

  const decoded = verifyToken(token);
  if (!decoded) return { error: "توکن نامعتبر است" } as const;

  await connectDB();
  const user = await User.findById(decoded.userId);
  if (!user) return { error: "کاربر یافت نشد" } as const;

  return { user } as const;
}

/** For pages: returns the signed-in user, or null for a logged-out visitor. */
export async function getCurrentUser() {
  const result = await lookupUser();
  return "user" in result ? result.user : null;
}

/** For server actions: throws when nobody is signed in (message is surfaced by the action's catch). */
export async function requireUser() {
  const result = await lookupUser();
  if ("error" in result) throw new Error(result.error);
  return result.user;
}
