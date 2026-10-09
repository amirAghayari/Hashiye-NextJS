"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type DeleteArticleProps = {
  id: string;
  action: (formData: FormData) => void;
  pending: boolean;
};

/** Deleting asks twice: the first press only reveals the confirmation. */
export function DeleteArticle({ id, action, pending }: DeleteArticleProps) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Button variant="outline" size="sm" onClick={() => setConfirming(true)}>
        حذف مقاله
      </Button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="id" value={id} />
      <span role="alert" className="type-meta">
        مقاله برای همیشه حذف شود؟
      </span>
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        {pending ? <Spinner /> : "بله، حذف شود"}
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={() => setConfirming(false)} disabled={pending}>
        انصراف
      </Button>
    </form>
  );
}
