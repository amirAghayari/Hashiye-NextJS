"use server";

import { createUser, authenticateUser } from "@/lib/server/auth/auth";
import connectDB from "@/lib/server/mongoose";
import { UserSchema } from "@/lib/validations/userValidation";
import { cookies } from "next/headers";

export async function register(formData: FormData) {
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    university: formData.get("university"),
    field: formData.get("field"),
  };

  try {
    await connectDB();

    const validatedData = UserSchema.register.parse(data);

    const result = await createUser(validatedData);

    const cookieStore = await cookies();

    cookieStore.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function login(formData: FormData) {
  try {
    const validatedData = UserSchema.login.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const result = await authenticateUser(
      validatedData.email,
      validatedData.password
    );

    const cookieStore = await cookies();

    cookieStore.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("auth-token");
  return { success: true };
}
