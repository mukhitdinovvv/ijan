import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { materialsService, type Article, type Document, type Media } from '@/services/materialsService';
import { FileText, Download, Video, Headphones } from 'lucide-react';

type ResourceType = 'article' | 'document' | 'video' | 'audio';

interface Resource {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: ResourceType;
  tags?: string[];
  created_at?: string;
}

interface ResourceCardProps {
  resource: Resource;
  type: ResourceType;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'article':
        return <FileText className="h-6 w-6" />;
      case 'document':
        return <Download className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'audio':
        return <Headphones className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          {resource.title}
        </CardTitle>
      </CardHeader>
      {resource.description && (
        <CardContent>
          <p>{resource.description}</p>
        </CardContent>
      )}
      <CardFooter className="flex justify-end gap-2">
        {type === 'document' ? (
          <Button asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Скачать PDF
            </a>
          </Button>
        ) : type === 'video' || type === 'audio' ? (
          <>
            <Button variant="outline" asChild>
              <Link to={`/media/${resource.id}`}>Подробнее</Link>
            </Button>
            <Button asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                {type === 'video' ? 'Смотреть видео' : 'Слушать аудио'}
              </a>
            </Button>
          </>
        ) : (
          <Button variant="outline" asChild>
            <Link to={`/resources/article/${resource.id}`}>Подробнее</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Resources: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesData, documentsData, mediaData] = await Promise.all([
          materialsService.getAllArticles(),
          materialsService.getAllDocuments(),
          materialsService.getAllMedia()
        ]);

        setArticles(articlesData);
        setDocuments(documentsData);
        setMedia(mediaData);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processArticles = (articles: Article[]): Resource[] => {
    return articles.map(item => ({
      id: item.id,
      title: item.title || 'Без названия',
      description: item.content || 'Содержание отсутствует',
      type: 'article' as ResourceType,
      tags: item.tags || [],
      url: `/articles/${item.id}`,
      created_at: item.created_at || ''
    }));
  };

  const processDocuments = (documents: Document[]): Resource[] => {
    return documents.map(item => ({
      id: item.id,
      title: item.title || 'Без названия',
      description: item.description || 'Описание отсутствует',
      type: 'document' as ResourceType,
      tags: item.tags || [],
      url: item.file_url || '',
      created_at: item.created_at || ''
    }));
  };

  const processMedia = (media: Media[]): Resource[] => {
    return media.map(item => ({
      id: item.id,
      title: item.title || 'Без названия',
      description: item.description || 'Описание отсутствует',
      type: (item.type || 'video') as ResourceType,
      tags: item.tags || [],
      url: item.media_url || '',
      created_at: item.created_at || ''
    }));
  };

  if (loading) {
    return (
      <Layout>
        <div>Загрузка...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-red-500">{error}</div>
      </Layout>
    );
  }

  const processedArticles = processArticles(articles);
  const processedDocuments = processDocuments(documents);
  const processedMedia = processMedia(media);
  const videoMedia = processedMedia.filter(item => item.type === 'video');
  const audioMedia = processedMedia.filter(item => item.type === 'audio');

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ресурсы</h1>
        <Tabs defaultValue="articles">
          <TabsList className="mb-4">
            <TabsTrigger value="articles">Статьи</TabsTrigger>
            <TabsTrigger value="documents">Документы</TabsTrigger>
            <TabsTrigger value="video">Видео</TabsTrigger>
            <TabsTrigger value="audio">Аудио</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processedArticles.map(article => (
                <ResourceCard
                  key={article.id}
                  resource={article}
                  type={article.type}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            {processedDocuments.map(document => (
              <ResourceCard
                key={document.id}
                resource={document}
                type="document"
              />
            ))}
          </TabsContent>

          <TabsContent value="video">
            {videoMedia.map(video => (
              <ResourceCard
                key={video.id}
                resource={video}
                type="video"
              />
            ))}
          </TabsContent>

          <TabsContent value="audio">
            {audioMedia.map(audio => (
              <ResourceCard
                key={audio.id}
                resource={audio}
                type="audio"
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
