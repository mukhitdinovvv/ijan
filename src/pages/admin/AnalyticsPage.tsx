import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, LineChart } from '@/components/ui/charts';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bullyingTypes = [
  { name: 'Психологический', value: 45, color: 'bg-blue-500' },
  { name: 'Физическое насилие', value: 35, color: 'bg-red-500' },
  { name: 'Кибербуллинг', value: 20, color: 'bg-purple-500' },
];

const regions = [
  { name: 'Город А', value: 80 },
  { name: 'Город Б', value: 60 },
  { name: 'Город В', value: 40 },
  { name: 'Город Д', value: 25 },
];

const monthlyData = [
  { name: 'Янв', value: 65 },
  { name: 'Фев', value: 59 },
  { name: 'Мар', value: 80 },
  { name: 'Апр', value: 81 },
  { name: 'Май', value: 56 },
  { name: 'Июн', value: 55 },
  { name: 'Июл', value: 40 },
];

const schoolData = [
  { name: 'Школа №22', value: 28 },
  { name: 'Школа №15', value: 25 },
  { name: 'Школа-лицей №1', value: 20 },
  { name: 'Гимназия №5', value: 18 },
  { name: 'Школа-гимназия №3', value: 15 },
];

const statusData = [
  { name: 'Новые', value: 50, color: 'bg-blue-500' },
  { name: 'В процессе', value: 50, color: 'bg-yellow-500' },
  { name: 'Решено', value: 150, color: 'bg-green-500' },
];

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Аналитика и статистика</h2>
        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="mr-2 h-4 w-4" />
          Экспорт отчетов
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="types">По типам</TabsTrigger>
          <TabsTrigger value="regions">По регионам</TabsTrigger>
          <TabsTrigger value="schools">По школам</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Всего случаев</CardTitle>
                <span className="text-2xl font-bold">250</span>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+12% с прошлого месяца</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Среднее время решения</CardTitle>
                <span className="text-2xl font-bold">3.2 дн</span>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">-0.5 дня за месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Завершено</CardTitle>
                <span className="text-2xl font-bold">150</span>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+8% с прошлого месяца</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">В процессе</CardTitle>
                <span className="text-2xl font-bold">50</span>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">+2 с прошлой недели</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Динамика обращений</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <LineChart
                  data={monthlyData}
                  index="name"
                  categories={['Обращения']}
                  colors={['#3b82f6']}
                  valueFormatter={(value) => `${value} случаев`}
                  className="h-80"
                />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Статус обращений</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <PieChart
                  data={statusData}
                  category="value"
                  index="name"
                  colors={['#3b82f6', '#eab308', '#10b981']}
                  valueFormatter={(value) => `${value} случаев`}
                  className="h-64 w-64"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="types" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Распределение по типам буллинга</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {bullyingTypes.map((type, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center">
                        <div className={`h-3 w-3 rounded-full ${type.color} mr-2`}></div>
                        <span className="text-sm font-medium">{type.name}</span>
                      </div>
                      <div className="text-2xl font-bold">{type.value}%</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <PieChart
                    data={bullyingTypes}
                    category="value"
                    index="name"
                    colors={['#3b82f6', '#ef4444', '#8b5cf6']}
                    className="h-48 w-48"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Динамика по типам</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: 'Янв', 'Психологический': 25, 'Физическое насилие': 20, 'Кибербуллинг': 10 },
                    { name: 'Фев', 'Психологический': 30, 'Физическое насилие': 25, 'Кибербуллинг': 12 },
                    { name: 'Мар', 'Психологический': 45, 'Физическое насилие': 35, 'Кибербуллинг': 15 },
                    { name: 'Апр', 'Психологический': 40, 'Физическое насилие': 42, 'Кибербуллинг': 18 },
                    { name: 'Май', 'Психологический': 35, 'Физическое насилие': 38, 'Кибербуллинг': 22 },
                  ]}
                  index="name"
                  categories={['Психологический', 'Физическое насилие', 'Кибербуллинг']}
                  colors={['#3b82f6', '#ef4444', '#8b5cf6']}
                  valueFormatter={(value) => `${value} случаев`}
                  className="h-80"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Распределение по регионам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {regions.map((region, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{region.name}</span>
                        <span className="text-sm text-muted-foreground">{region.value} случаев</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(region.value / 80) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground">Карта регионов</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Топ школ по количеству обращений</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {schoolData.map((school, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{school.name}</span>
                        <span className="text-sm text-muted-foreground">{school.value} случаев</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(school.value / 30) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center">
                  <BarChart
                    data={schoolData}
                    index="name"
                    categories={['Количество случаев']}
                    colors={['#10b981']}
                    valueFormatter={(value) => `${value} случаев`}
                    className="h-64 w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
