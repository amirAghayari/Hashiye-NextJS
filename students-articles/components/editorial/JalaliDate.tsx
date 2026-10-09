"use client";

import { useSyncExternalStore } from "react";

const format = () =>
  new Intl.DateTimeFormat("fa-IR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Tehran",
  }).format(new Date());

const subscribe = () => () => {};

/** Today's Jalali date. Rendered on the client so a cached page never shows a stale day. */
export function JalaliDate({ className }: { className?: string }) {
  const text = useSyncExternalStore(subscribe, format, () => "");
  return <span className={className}>{text || "\u00a0"}</span>;
}
