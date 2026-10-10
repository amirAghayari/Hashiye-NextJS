"use server";

import { createUser, authenticateUser } from "@/lib/server/auth/auth";
import connectDB from "@/lib/server/mongoose";
import { UserSchema } from "@/lib/validations/userValidation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  error?: string;
  message?: string;
  user?: any; // Replace 'any' with your actual User type if available
};

export async function register(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
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
export async function login(
  prevState: { success: boolean; error?: string },
  formData: FormData
) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const validatedData = UserSchema.login.parse(data);

    const result = await authenticateUser(
      validatedData.email,
      validatedData.password
    );

    const cookieStore = await cookies();
    cookieStore.set("auth-token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    return { success: true, error: undefined, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message || "خطایی رخ داد" };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("auth-token");
  return { success: true };
}
