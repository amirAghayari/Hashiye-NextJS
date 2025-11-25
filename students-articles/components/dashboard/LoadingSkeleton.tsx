import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={`loading-${i}`}>
          <CardHeader>
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="h-20 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
