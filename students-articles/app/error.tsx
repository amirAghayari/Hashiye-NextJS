"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h3 className="text-lg font-semibold">خطایی رخ داده است</h3>
      <Link href="/dashboard">
        <Button>بازگشت به داشبورد</Button>
      </Link>
    </div>
  );
};

export default error;
