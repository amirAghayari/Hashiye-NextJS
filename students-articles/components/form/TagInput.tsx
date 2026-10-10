"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { faNum } from "@/lib/format";

type TagInputProps = {
  /** Name of the hidden field submitted with the form: tags joined by ", ". */
  name: string;
  defaultTags?: string[];
  max?: number;
};

const MAX_TAG_LENGTH = 50;

/** Tags as boxed words. Enter, comma or Persian comma adds one. */
export function TagInput({ name, defaultTags = [], max = 10 }: TagInputProps) {
  const [tags, setTags] = useState<string[]>(defaultTags);
  const [draft, setDraft] = useState("");

  const commit = () => {
    const tag = draft.trim();
    if (tag && !tags.includes(tag) && tags.length < max) setTags([...tags, tag]);
    setDraft("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === "،") {
      event.preventDefault();
      commit();
    } else if (event.key === "Backspace" && !draft && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  return (
    <div>
      <input type="hidden" name={name} value={tags.join(", ")} />
      <Input
        id={`${name}-draft`}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        maxLength={MAX_TAG_LENGTH}
        disabled={tags.length >= max}
        dir="auto"
        placeholder={
          tags.length >= max ? `حداکثر ${faNum(max)} برچسب` : "یک برچسب بنویسید و Enter بزنید"
        }
        autoComplete="off"
      />
      {tags.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="برچسب‌های انتخاب‌شده">
          {tags.map((tag) => (
            <li key={tag} className="tag type-meta gap-2 ps-3 pe-1" dir="auto">
              <span>{tag}</span>
              <button
                type="button"
                aria-label={`حذف برچسب ${tag}`}
                onClick={() => setTags(tags.filter((t) => t !== tag))}
                className="grid size-8 place-items-center hover:bg-muted"
              >
                <X className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
