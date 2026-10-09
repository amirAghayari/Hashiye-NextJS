"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/states/StateMessage";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page py-16">
      <StateMessage
        tone="error"
        title="خطایی رخ داد."
        description="صفحه بارگذاری نشد. دوباره تلاش کنید یا به فهرست مقاله‌ها برگردید."
      >
        <Button onClick={reset}>تلاش دوباره</Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">مقاله‌ها</Link>
        </Button>
      </StateMessage>
    </div>
  );
}
