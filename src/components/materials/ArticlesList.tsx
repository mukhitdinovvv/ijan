import { useEffect, useState } from 'react';
import { Article, materialsService } from '@/services/materialsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await materialsService.getAllArticles();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке статей');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ScrollArea className="h-[600px] w-full rounded-md border p-4">
      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <CardDescription>
                Автор: {article.author || 'Не указан'} | 
                Дата: {new Date(article.created_at).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{article.content}</p>
              {article.tags && article.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {article.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
