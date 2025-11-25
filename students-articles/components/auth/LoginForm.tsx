"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface LoginActionProps {
  loginAction: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string; user?: any }>;
}

interface LoginState {
  success: boolean;
  error?: string;
  user?: any;
}

export default function LoginForm() {
  const router = useRouter();
  const initialState: LoginState = {
    success: false,
    error: "",
    user: undefined,
  };

  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    initialState
  );

  useEffect(() => {
    console.log("State changed:", state);
    if (state.success && state.user) {
      // Store user data in localStorage for dashboard
      const userData = {
        email: state.user.email,
        fullName: state.user.fullName,
        role: state.user.role,
        university: state.user.university,
        field: state.user.field,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User data stored in localStorage:", userData);
      router.push("/dashboard");
    }
  }, [state.success, state.user, router]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          required
          className="text-right"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="رمز عبور خود را وارد کنید"
          required
          className="text-right"
        />
      </div>

      {state.error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {state.error}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="flex-1 w-full">
        {isPending ? "در حال ورود..." : "ورود"}
      </Button>
    </form>
  );
}
