import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArticlesList } from '@/components/materials/ArticlesList';

export function MaterialsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Материалы</h1>
      
      <Tabs defaultValue="articles">
        <TabsList>
          <TabsTrigger value="articles">Статьи</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="media">Видео и аудио</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <ArticlesList />
        </TabsContent>
        
        <TabsContent value="documents">
          <div>Раздел документов в разработке</div>
        </TabsContent>
        
        <TabsContent value="media">
          <div>Раздел видео и аудио в разработке</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
