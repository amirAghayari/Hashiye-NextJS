"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "@/actions/articles";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { MarginNote } from "@/components/editorial/MarginNote";
import { Notice } from "@/components/editorial/Notice";
import { PageHeader } from "@/components/editorial/PageHeader";
import { Spread } from "@/components/editorial/Spread";
import { TagInput } from "@/components/form/TagInput";
import { CATEGORIES } from "@/lib/categories";

const initialState = {
  success: false,
  error: "",
};

export default function CreateArticlePage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createArticle,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      router.push("/dashboard");
    }
  }, [state.success, router]);

  return (
    <>
      <PageHeader
        title="نوشتهٔ تازه"
        deck="عنوان، دسته‌بندی، متن و برچسب‌ها را وارد کنید."
      />
      <div className="page">
        <Spread
          mainClassName="py-10 md:py-16"
          marginClassName="py-8 lg:py-16"
          main={
            <form action={formAction} className="grid max-w-3xl gap-10">
              <Field label="عنوان" htmlFor="title">
                <Input
                  id="title"
                  name="title"
                  type="text"
                  minLength={5}
                  maxLength={200}
                  required
                  placeholder="عنوان نوشته"
                  className="h-auto py-3 font-serif text-title font-bold"
                />
              </Field>
              <Field label="دسته‌بندی" htmlFor="category">
                <NativeSelect
                  id="category"
                  name="category"
                  required
                  className="bg-primary-foreground p-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    انتخاب کنید
                  </option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </NativeSelect>
              </Field>
              <Field label="متن نوشته" htmlFor="content">
                <Textarea
                  id="content"
                  name="content"
                  rows={14}
                  minLength={100}
                  required
                  placeholder="متن کامل نوشته را اینجا بنویسید…"
                  className="min-h-96 leading-[2.05]"
                />
              </Field>
              <Field label="برچسب‌ها" htmlFor="tags-draft">
                <TagInput name="tags" />
              </Field>

              {state.error ? <Notice tone="error">{state.error}</Notice> : null}

              <div className="flex flex-wrap gap-3">
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? "در حال ثبت…" : "ثبت نوشته"}
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">انصراف</Link>
                </Button>
              </div>
            </form>
          }
          margin={
            <div className="grid gap-6 lg:sticky lg:top-24">
              <MarginNote n={1}>عنوان باید بین ۵ تا ۲۰۰ نویسه باشد.</MarginNote>
              <MarginNote n={2}>
                متن نوشته باید حداقل ۱۰۰ و حداکثر ۱۰٬۰۰۰ نویسه باشد.
              </MarginNote>
              <MarginNote n={3}>
                تا ۱۰ برچسب بنویسید؛ هر برچسب حداکثر ۵۰ نویسه.
              </MarginNote>
              <MarginNote n={4}>
                پس از ثبت، استادان می‌توانند نمره دهند و در حاشیه بازخورد
                بنویسند.
              </MarginNote>
            </div>
          }
        />
      </div>
    </>
  );
}
