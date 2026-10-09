import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/states/StateMessage";

export default function NotFound() {
  return (
    <div className="page py-16">
      <StateMessage
        title="این صفحه پیدا نشد."
        description="نشانی را بررسی کنید یا به فهرست مقاله‌ها برگردید."
      >
        <Button asChild>
          <Link href="/dashboard">مقاله‌ها</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">صفحهٔ اصلی</Link>
        </Button>
      </StateMessage>
    </div>
  );
}
