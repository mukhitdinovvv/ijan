import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar, BarChart2, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const reportTemplates = [
  {
    id: 1,
    title: 'Ежемесячный отчет по буллингу',
    description: 'Полный отчет по всем случаям буллинга за выбранный месяц',
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    type: 'monthly',
  },
  {
    id: 2,
    title: 'Анализ по регионам',
    description: 'Детальный анализ случаев буллинга по регионам',
    icon: <BarChart2 className="h-5 w-5 text-green-500" />,
    type: 'region',
  },
  {
    id: 3,
    title: 'Отчет по типам буллинга',
    description: 'Статистика по различным типам буллинга',
    icon: <BarChart2 className="h-5 w-5 text-purple-500" />,
    type: 'type',
  },
  {
    id: 4,
    title: 'Отчет по школам',
    description: 'Анализ случаев буллинга по школам',
    icon: <FileText className="h-5 w-5 text-amber-500" />,
    type: 'school',
  },
];

const generatedReports = [
  {
    id: 'RPT-2023-06-01',
    title: 'Ежемесячный отчет за Май 2023',
    date: '01.06.2023',
    type: 'monthly',
    status: 'completed',
    url: '#',
  },
  {
    id: 'RPT-2023-05-15',
    title: 'Анализ по регионам - Апрель 2023',
    date: '15.05.2023',
    type: 'region',
    status: 'completed',
    url: '#',
  },
  {
    id: 'RPT-2023-05-01',
    title: 'Ежемесячный отчет за Апрель 2023',
    date: '01.05.2023',
    type: 'monthly',
    status: 'completed',
    url: '#',
  },
];

export const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Отчетность</h2>
          <p className="text-muted-foreground">Генерация и управление отчетами</p>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Шаблоны отчетов</TabsTrigger>
          <TabsTrigger value="history">История отчетов</TabsTrigger>
          <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="flex flex-col">
                <CardHeader className="flex-1">
                  <div className="flex items-center space-x-2">
                    {template.icon}
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите период" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">За неделю</SelectItem>
                        <SelectItem value="month">За месяц</SelectItem>
                        <SelectItem value="quarter">За квартал</SelectItem>
                        <SelectItem value="year">За год</SelectItem>
                        <SelectItem value="custom">Произвольный период</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Сгенерировать отчет
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>История отчетов</CardTitle>
                  <CardDescription>
                    Просмотр и загрузка ранее сгенерированных отчетов
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select>
                      <SelectTrigger className="w-[180px] pl-8">
                        <SelectValue placeholder="Все типы" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="monthly">Ежемесячные</SelectItem>
                        <SelectItem value="region">По регионам</SelectItem>
                        <SelectItem value="type">По типам</SelectItem>
                        <SelectItem value="school">По школам</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Select>
                      <SelectTrigger className="w-[180px] pl-8">
                        <SelectValue placeholder="За все время" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">За все время</SelectItem>
                        <SelectItem value="week">За неделю</SelectItem>
                        <SelectItem value="month">За месяц</SelectItem>
                        <SelectItem value="quarter">За квартал</SelectItem>
                        <SelectItem value="year">За год</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-accent/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-md bg-blue-100 p-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Создан: {report.date} • ID: {report.id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Скачать
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Запланированные отчеты</CardTitle>
              <CardDescription>
                Управление автоматически генерируемыми отчетами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-6">
                <div className="text-center">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Нет запланированных отчетов</h3>
                  <p className="text-muted-foreground mt-1 mb-4">
                    У вас пока нет запланированных отчетов. Настройте автоматическую генерацию отчетов.
                  </p>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Создать расписание
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
