"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Notice } from "@/components/editorial/Notice";
import { setStoredUser } from "@/hooks/useStoredUser";

interface LoginState {
  success: boolean;
  error?: string;
  user?: any;
}

const initialState: LoginState = { success: false, error: "", user: undefined };

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    initialState
  );

  useEffect(() => {
    if (state.success && state.user) {
      const userData = {
        email: state.user.email,
        fullName: state.user.fullName,
        role: state.user.role,
        university: state.user.university,
        field: state.user.field,
      };
      setStoredUser(userData);
      router.push("/dashboard");
    }
  }, [state.success, state.user, router]);

  return (
    <form action={formAction} className="grid gap-6">
      <Field label="ایمیل" htmlFor="email">
        <Input id="email" name="email" type="email" dir="ltr" placeholder="example@email.com" autoComplete="email" required className="text-end" />
      </Field>
      <Field label="رمز عبور" htmlFor="password">
        <Input id="password" name="password" type="password" dir="ltr" autoComplete="current-password" required className="text-end" />
      </Field>

      {state.error ? <Notice tone="error">{state.error}</Notice> : null}

      <Button type="submit" size="lg" disabled={isPending}>
        {isPending ? "در حال ورود…" : "ورود"}
      </Button>
    </form>
  );
}
