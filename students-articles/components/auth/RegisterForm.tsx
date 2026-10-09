"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Notice } from "@/components/editorial/Notice";
import { setStoredUser } from "@/hooks/useStoredUser";

const initialState = {
  success: false,
  error: "",
  message: "",
};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success && state.user) {
      setStoredUser(state.user);
      router.push("/dashboard");
    }
  }, [state.success, state.user, router]);

  const errorText = !state.success ? state.message || state.error : "";

  return (
    <form action={formAction} className="grid gap-6">
      <Field label="نام و نام خانوادگی" htmlFor="fullName">
        <Input id="fullName" name="fullName" type="text" autoComplete="name" required />
      </Field>
      <Field label="ایمیل" htmlFor="email">
        <Input id="email" name="email" type="email" dir="ltr" placeholder="example@email.com" autoComplete="email" required className="text-end" />
      </Field>
      <Field label="رمز عبور" htmlFor="password">
        <Input id="password" name="password" type="password" dir="ltr" autoComplete="new-password" required className="text-end" />
      </Field>
      <Field label="نقش" htmlFor="role">
        <NativeSelect id="role" name="role" required defaultValue="student">
          <option value="student">دانشجو</option>
          <option value="professor">استاد</option>
        </NativeSelect>
      </Field>
      <Field label="دانشگاه" htmlFor="university">
        <Input id="university" name="university" type="text" required />
      </Field>
      <Field label="رشتهٔ تحصیلی" htmlFor="field">
        <Input id="field" name="field" type="text" required />
      </Field>

      {errorText ? <Notice tone="error">{errorText}</Notice> : null}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "در حال ثبت‌نام…" : "ثبت‌نام"}
      </Button>
    </form>
  );
}
