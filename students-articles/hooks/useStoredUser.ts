"use client";

import { useSyncExternalStore } from "react";

export type StoredUser = {
  id?: string;
  fullName: string;
  email: string;
  role: "student" | "professor";
  university?: string;
  field?: string;
};

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cachedUser: StoredUser | null = null;

function read(): StoredUser | null {
  const raw = localStorage.getItem("user");
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedUser = raw ? (JSON.parse(raw) as StoredUser) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The user the login/register forms keep in localStorage. null on the server and when signed out. */
export function useStoredUser() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function setStoredUser(user: StoredUser) {
  localStorage.setItem("user", JSON.stringify(user));
  listeners.forEach((notify) => notify());
}

export function clearStoredUser() {
  localStorage.removeItem("user");
  listeners.forEach((notify) => notify());
}
