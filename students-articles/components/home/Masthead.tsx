import { JalaliDate } from "@/components/editorial/JalaliDate";

export function Masthead() {
  return (
    <div className="border-b">
      <div className="page flex items-center justify-between gap-4 py-3 type-label">
        <span>حاشیه — نشریهٔ مقالات دانشجویی</span>
        <JalaliDate />
      </div>
    </div>
  );
}
