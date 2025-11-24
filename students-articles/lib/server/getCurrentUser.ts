import { verifyToken } from "@/lib/server/auth/auth";
import { cookies } from "next/headers";
import connectDB from "./mongoose";
import { User } from "@/models/User";


export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) {
    throw new Error("کاربر وارد نشده است");
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new Error("توکن نامعتبر است");
  }

  await connectDB();
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new Error("کاربر یافت نشد");
  }

  return user;
}