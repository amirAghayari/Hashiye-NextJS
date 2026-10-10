"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/form/TagInput";
import { CATEGORIES } from "@/lib/categories";
import type { Article } from "@/types/article";

type ArticleEditorProps = {
  article: Article;
  action: (formData: FormData) => void;
  pending: boolean;
  onCancel: () => void;
};

/** One form for every editable field (the title, category, tags and text all submit together). */
export function ArticleEditor({
  article,
  action,
  pending,
  onCancel,
}: ArticleEditorProps) {
  return (
    <div className="page py-10 md:py-16">
      <form action={action} className="grid max-w-3xl gap-10">
        <Field label="عنوان" htmlFor="edit-title">
          <Input
            id="edit-title"
            name="title"
            defaultValue={article.title}
            minLength={5}
            maxLength={200}
            required
            dir="auto"
            className="h-auto py-3 font-serif text-title font-bold"
          />
        </Field>
        <Field label="دسته‌بندی" htmlFor="edit-category">
          <NativeSelect
            id="edit-category"
            name="category"
            defaultValue={article.category}
            required
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field
          label="برچسب‌ها"
          htmlFor="tags-draft"
          hint="حداکثر ۱۰ برچسب، هر برچسب تا ۵۰ نویسه"
        >
          <TagInput name="tags" defaultTags={article.tags} />
        </Field>
        <Field label="متن نوشته" htmlFor="edit-content">
          <Textarea
            id="edit-content"
            name="content"
            defaultValue={article.content}
            minLength={100}
            maxLength={10000}
            required
            dir="auto"
            className="min-h-96 leading-[2.05]"
          />
        </Field>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "در حال ذخیره…" : "ذخیرهٔ تغییرات"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={pending}
          >
            انصراف
          </Button>
        </div>
      </form>
    </div>
  );
}
