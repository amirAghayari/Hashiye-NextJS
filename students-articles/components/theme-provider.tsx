"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Using type assertion to bypass the type checking for the attribute prop
  const themeProviderProps = {
    attribute: "class" as const,
    defaultTheme: "system" as const,
    enableSystem: true,
    disableTransitionOnChange: true,
    ...props,
  };

  return (
    <NextThemesProvider {...themeProviderProps}>{children}</NextThemesProvider>
  );
}
