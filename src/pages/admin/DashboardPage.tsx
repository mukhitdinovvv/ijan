import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart } from '@/components/ui/charts';
import { AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const stats = [
  { name: 'Всего запросов', value: '250', icon: AlertCircle, change: '+12%', changeType: 'positive' },
  { name: 'Новые запросы', value: '50', icon: Clock, change: '+5%', changeType: 'positive' },
  { name: 'В процессе', value: '50', icon: Zap, change: '-2%', changeType: 'negative' },
  { name: 'Закрытые', value: '150', icon: CheckCircle, change: '+8%', changeType: 'positive' },
];

const bullyingTypes = [
  { name: 'Психологический', value: 100, color: 'bg-blue-500' },
  { name: 'Физическое насилие', value: 120, color: 'bg-red-500' },
  { name: 'Кибербуллинг', value: 30, color: 'bg-purple-500' },
];

const regions = [
  { name: 'Город А', value: 80 },
  { name: 'Город Б', value: 60 },
  { name: 'Город В', value: 40 },
  { name: 'Город Г', value: 35 },
  { name: 'Город Д', value: 25 },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change} с прошлой недели
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Запросы по регионам</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              data={regions}
              index="name"
              categories={['Запросы']}
              colors={['#3b82f6']}
              valueFormatter={(value) => `${value} запросов`}
              className="h-80"
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Типы буллинга</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={bullyingTypes}
              category="value"
              index="name"
              colors={['#3b82f6', '#ef4444', '#8b5cf6']}
              valueFormatter={(value) => `${value} запросов`}
              className="h-80"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Последние запросы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">Запрос #{1000 + i}</p>
                    <p className="text-sm text-gray-500">Школа №{10 + i}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {['Психологический', 'Физическое насилие', 'Кибербуллинг'][i % 3]}
                    </p>
                    <p className="text-xs text-gray-500">{i + 1} дней назад</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Статус запросов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: 'Новые', value: 50, color: 'bg-blue-500' },
                { status: 'В процессе', value: 50, color: 'bg-yellow-500' },
                { status: 'Закрытые', value: 150, color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.status}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${item.color} h-2.5 rounded-full`}
                      style={{ width: `${(item.value / 250) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
