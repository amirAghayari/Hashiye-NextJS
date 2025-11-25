import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  onViewDetails: (id: string) => void;
}

export default function ArticleCard({
  article,
  onViewDetails,
}: ArticleCardProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fa-IR");

  const getScoreColor = (score: number) => {
    if (score >= 17) return "text-green-600";
    if (score >= 14) return "text-blue-600";
    if (score >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg line-clamp-2">
            {article.title}
          </CardTitle>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {article.category}
          </span>
        </div>

        <CardDescription>
          <div className="flex items-center justify-between text-sm">
            <span>نویسنده: {article.author.fullName}</span>
            <span>{formatDate(article.createdAt)}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {article.author.university} - {article.author.field}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {article.content}
        </p>

        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <div
              className={`text-2xl font-bold ${getScoreColor(
                article.averageScore
              )}`}
            >
              {article.averageScore.toFixed(1)}
            </div>
            <div className="text-xs text-gray-500">میانگین نمره</div>
          </div>

          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">
              {article.grades.length}
            </div>
            <div className="text-xs text-gray-500">تعداد نمرات</div>
          </div>
        </div>

        <Button
          onClick={() => onViewDetails(article._id)}
          className="w-full"
          variant="outline"
        >
          مشاهده جزئیات
        </Button>
      </CardContent>
    </Card>
  );
}
