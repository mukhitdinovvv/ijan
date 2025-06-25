import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { materialsService, type Article } from '@/services/materialsService';
import { Tag } from 'lucide-react';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (!id) return;
        const data = await materialsService.getArticleById(id);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Ошибка при загрузке статьи');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <Layout><div className="container py-8">Загрузка...</div></Layout>;
  if (error) return <Layout><div className="container py-8 text-red-500">{error}</div></Layout>;
  if (!article) return <Layout><div className="container py-8">Статья не найдена</div></Layout>;

  return (
    <Layout>
      <div className="container py-8">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold mb-6">{article.title}</h1>
          
          {article.author && (
            <div className="text-gray-600 mb-4">
              Автор: {article.author}
            </div>
          )}

          {article.created_at && (
            <div className="text-gray-600 mb-6">
              Дата: {new Date(article.created_at).toLocaleDateString('ru-RU')}
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-2 mb-8">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
                >
                  <Tag className="h-4 w-4" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {article.image_url && (
            <img 
              src={article.image_url} 
              alt={article.title}
              className="w-full rounded-lg mb-8 max-h-96 object-cover"
            />
          )}

          <div className="whitespace-pre-wrap">
            {article.content}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default ArticlePage;
