
import { useState, useEffect } from 'react';
import { getRecords } from '@/services/airtableService';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

interface GenericRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

const AdminDataViewer = () => {
  const [bullyingReports, setBullyingReports] = useState<GenericRecord[]>([]);
  const [contactRequests, setContactRequests] = useState<GenericRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchData = async (tableName: string) => {
    setIsLoading(true);
    try {
      const records = await getRecords(tableName);
      if (tableName === 'BullyingReports') {
        setBullyingReports(records);
      } else if (tableName === 'ContactRequests') {
        setContactRequests(records);
      }
      toast({
        title: "Данные загружены",
        description: `Данные из таблицы ${tableName} успешно загружены`,
      });
    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: `Не удалось загрузить данные из ${tableName}`,
        variant: "destructive",
      });
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Панель администратора</h2>

      <Tabs defaultValue="bullying">
        <TabsList className="mb-4">
          <TabsTrigger value="bullying">Сообщения о буллинге</TabsTrigger>
          <TabsTrigger value="contacts">Запросы на консультацию</TabsTrigger>
        </TabsList>

        <TabsContent value="bullying">
          <div className="mb-4">
            <Button 
              onClick={() => fetchData('BullyingReports')}
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Загрузить сообщения о буллинге'}
            </Button>
          </div>

          {bullyingReports.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Школа/Организация</TableHead>
                  <TableHead>Тип буллинга</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Имя жертвы</TableHead>
                  <TableHead>Дата получения</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bullyingReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.fields.schoolName}</TableCell>
                    <TableCell>{report.fields.bullyingType === 'physical' ? 'Физический' : 
                              report.fields.bullyingType === 'psychological' ? 'Психологический' : 
                              'Кибербуллинг'}</TableCell>
                    <TableCell className="max-w-xs truncate">{report.fields.description}</TableCell>
                    <TableCell>{report.fields.victimName || '-'}</TableCell>
                    <TableCell>{formatDate(report.createdTime)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Нет данных для отображения</p>
          )}
        </TabsContent>

        <TabsContent value="contacts">
          <div className="mb-4">
            <Button 
              onClick={() => fetchData('ContactRequests')}
              disabled={isLoading}
            >
              {isLoading ? 'Загрузка...' : 'Загрузить запросы на консультацию'}
            </Button>
          </div>

          {contactRequests.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Контакт</TableHead>
                  <TableHead>Тип консультации</TableHead>
                  <TableHead>Сообщение</TableHead>
                  <TableHead>Предпочтительная дата</TableHead>
                  <TableHead>Предпочтительное время</TableHead>
                  <TableHead>Дата запроса</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contactRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.fields.name}</TableCell>
                    <TableCell>
                      {request.fields.contactPreference === 'email' 
                        ? request.fields.email 
                        : request.fields.phone}
                    </TableCell>
                    <TableCell>{request.fields.consultationType}</TableCell>
                    <TableCell className="max-w-xs truncate">{request.fields.message}</TableCell>
                    <TableCell>{request.fields.preferredDate || '-'}</TableCell>
                    <TableCell>{request.fields.preferredTime || '-'}</TableCell>
                    <TableCell>{formatDate(request.createdTime)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>Нет данных для отображения</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDataViewer;
