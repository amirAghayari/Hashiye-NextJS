import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  userRole?: string;
  onCreateArticle?: () => void;
}

export default function EmptyState({
  userRole,
  onCreateArticle,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-gray-500 text-lg">مقاله‌ای یافت نشد</div>
      {userRole === "student" && (
        <Button onClick={onCreateArticle} className="mt-4">
          ایجاد اولین مقاله
        </Button>
      )}
    </div>
  );
}
