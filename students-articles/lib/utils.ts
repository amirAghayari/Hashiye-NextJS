import type { CSSProperties } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Stagger index for the CSS `.rise` / `.pen-intro` entrance classes. */
export function stagger(index: number) {
  return { "--i": index } as CSSProperties;
}
