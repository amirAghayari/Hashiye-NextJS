import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/states/StateMessage";

type EmptyIndexProps =
  | { kind: "empty"; role: string }
  | { kind: "filtered"; onReset: () => void };

export function EmptyIndex(props: EmptyIndexProps) {
  if (props.kind === "filtered") {
    return (
      <StateMessage
        title="نتیجه‌ای پیدا نشد."
        description="عبارت جست‌وجو یا دستهٔ دیگری را امتحان کنید."
      >
        <Button variant="outline" onClick={props.onReset}>
          پاک‌کردن فیلترها
        </Button>
      </StateMessage>
    );
  }

  if (props.role === "student") {
    return (
      <StateMessage
        title="هنوز مقاله‌ای نگارش نکرده‌اید."
        description="اولین مقاله‌تان را ثبت کنید تا استادان بتوانند نمره دهند و در حاشیه بازخورد بنویسند."
      >
        <Button asChild size="lg">
          <Link href="/articles/create">نوشتن مقاله</Link>
        </Button>
      </StateMessage>
    );
  }

  return (
    <StateMessage
      title="هنوز مقاله‌ای ثبت نشده است."
      description="وقتی دانشجویان مقاله منتشر کنند، اینجا در فهرست ظاهر می‌شوند."
    />
  );
}
