export interface Article {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id: string;
    fullName: string;
    university: string;
    field: string;
  };
  grades: Array<{
    _id: string;
    professor: {
      _id: string;
      fullName: string;
    };
    score: number;
    comment?: string;
    gradedAt: string;
  }>;
  averageScore: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ArticlesState {
  success: boolean;
  error: string | undefined;
  articles: Article[] | undefined;
  pagination:
    | {
        page: number;
        limit: number;
        total: number;
        pages: number;
      }
    | undefined;
}
