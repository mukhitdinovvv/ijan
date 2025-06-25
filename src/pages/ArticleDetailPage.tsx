import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { fetchArticleById } from '../services/materialsService'; // Предполагаем, что такая функция будет

interface Article {
  id: string;
  title: string;
  content: string; // Или более сложная структура, если нужно
  // другие поля...
}

const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (articleId) {
      const loadArticle = async () => {
        try {
          setLoading(true);
          const data = await fetchArticleById(articleId); 
          setArticle(data);
          setError(null);
        } catch (err) {
          setError('Не удалось загрузить статью.');
          console.error(err);
        }
        setLoading(false);
      };
      loadArticle();
    }
  }, [articleId]);

  if (loading) {
    return <Layout><div className="container mx-auto px-4 py-8 text-center">Загрузка...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div></Layout>;
  }

  if (!article) {
    return <Layout><div className="container mx-auto px-4 py-8 text-center">Статья не найдена.</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <article className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{article.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: article.content }} />
          {/* Если контент не HTML, а простой текст:
          <p className="text-gray-700 whitespace-pre-line">{article.content}</p> 
          */}
        </article>
      </div>
    </Layout>
  );
};

export default ArticleDetailPage;
