import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { materialsService, type Media } from '@/services/materialsService';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Video, Headphones } from 'lucide-react';

const MediaPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState<Media | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        if (!id) throw new Error('ID не указан');
        
        // Загружаем все медиа и находим нужное по ID
        const allMedia = await materialsService.getAllMedia();
        const mediaItem = allMedia.find(item => item.id === id);
        
        if (!mediaItem) {
          throw new Error('Медиа не найдено');
        }

        setMedia(mediaItem);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching media:', err);
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке медиа');
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  if (loading) return <Layout><div className="container py-8">Загрузка...</div></Layout>;
  if (error) return <Layout><div className="container py-8 text-red-500">{error}</div></Layout>;
  if (!media) return <Layout><div className="container py-8">Медиа не найдено</div></Layout>;

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="max-w-3xl mx-auto">
          {/* Заголовок */}
          <h1 className="text-3xl font-bold mb-6">{media.title}</h1>

          {/* Метаданные */}
          <div className="mb-8 text-sm text-gray-500">
            <p>Тип: {media.type === 'video' ? 'Видео' : 'Аудио'}</p>
            {media.created_at && <p>Дата создания: {media.created_at}</p>}
            {media.duration && <p>Длительность: {media.duration} мин.</p>}
          </div>

          {/* Описание */}
          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-4">Описание</h2>
            <p className="whitespace-pre-wrap">{media.description}</p>
          </div>

          {/* Теги */}
          {media.tags && media.tags.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Теги</h2>
              <div className="flex flex-wrap gap-2">
                {media.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Кнопка для просмотра/прослушивания */}
          {media.media_url && (
            <div className="mt-8">
              <a
                href={media.media_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  {media.type === 'video' ? (
                    <>
                      <Video className="h-5 w-5" />
                      Смотреть видео
                    </>
                  ) : (
                    <>
                      <Headphones className="h-5 w-5" />
                      Слушать аудио
                    </>
                  )}
                </Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MediaPage;
