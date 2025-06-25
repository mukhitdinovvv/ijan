import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download } from 'lucide-react';

const statuses = [
  { value: 'all', label: 'Все статусы' },
  { value: 'new', label: 'Новые' },
  { value: 'in_progress', label: 'В процессе' },
  { value: 'resolved', label: 'Решено' },
];

const bullyingTypes = [
  { value: 'all', label: 'Все типы' },
  { value: 'psychological', label: 'Психологический' },
  { value: 'physical', label: 'Физическое насилие' },
  { value: 'cyber', label: 'Кибербуллинг' },
];

const mockRequests = Array(15).fill(0).map((_, i) => ({
  id: `REQ-${1000 + i}`,
  date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU'),
  school: `Школа №${Math.floor(Math.random() * 50) + 1}`,
  region: ['Город А', 'Город Б', 'Город В', 'Город Г'][Math.floor(Math.random() * 4)],
  type: ['Психологический', 'Физическое насилие', 'Кибербуллинг'][Math.floor(Math.random() * 3)],
  status: ['Новый', 'В процессе', 'Решено'][Math.floor(Math.random() * 3)],
  description: 'Описание инцидента с пострадавшим и подробностями ситуации.',
}));

export const RequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'new' && request.status === 'Новый') ||
      (statusFilter === 'in_progress' && request.status === 'В процессе') ||
      (statusFilter === 'resolved' && request.status === 'Решено');
    
    const matchesType = typeFilter === 'all' || 
      (typeFilter === 'psychological' && request.type === 'Психологический') ||
      (typeFilter === 'physical' && request.type === 'Физическое насилие') ||
      (typeFilter === 'cyber' && request.type === 'Кибербуллинг');
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 text-xs rounded-full';
    switch (status) {
      case 'Новый':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
      case 'В процессе':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
      case 'Решено':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100`}>{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Управление запросами</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="ml-auto h-9">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск по ID, школе или региону..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Тип буллинга" />
                </SelectTrigger>
                <SelectContent>
                  {bullyingTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Школа/Регион</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <div className="font-medium">{request.school}</div>
                        <div className="text-sm text-muted-foreground">{request.region}</div>
                      </TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Просмотр
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Запросы не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
