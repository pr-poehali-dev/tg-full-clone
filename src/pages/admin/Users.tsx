import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'blocked' | 'offline';
  lastSeen: string;
  messages: number;
  joinDate: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Александр Петров', email: 'alex@example.com', status: 'active', lastSeen: 'Онлайн', messages: 1245, joinDate: '15.01.2024' },
  { id: 2, name: 'Мария Иванова', email: 'maria@example.com', status: 'active', lastSeen: '5 минут назад', messages: 892, joinDate: '20.01.2024' },
  { id: 3, name: 'Дмитрий Смирнов', email: 'dmitry@example.com', status: 'offline', lastSeen: '2 часа назад', messages: 634, joinDate: '03.02.2024' },
  { id: 4, name: 'Елена Козлова', email: 'elena@example.com', status: 'blocked', lastSeen: 'Заблокирован', messages: 156, joinDate: '10.02.2024' },
  { id: 5, name: 'Игорь Волков', email: 'igor@example.com', status: 'active', lastSeen: 'Онлайн', messages: 2134, joinDate: '25.12.2023' },
  { id: 6, name: 'Анна Соколова', email: 'anna@example.com', status: 'offline', lastSeen: '1 день назад', messages: 445, joinDate: '05.03.2024' },
];

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBlockUser = (userId: number) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: user.status === 'blocked' ? 'offline' : 'blocked' as const } : user
    ));
  };

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Онлайн</Badge>;
      case 'offline':
        return <Badge variant="secondary">Не в сети</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Заблокирован</Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Управление пользователями</h1>
          <p className="text-muted-foreground">Список всех зарегистрированных пользователей</p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Пользователи ({filteredUsers.length})</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск по имени или email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button className="gap-2">
                  <Icon name="UserPlus" size={18} />
                  Добавить
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Последняя активность</TableHead>
                  <TableHead>Сообщений</TableHead>
                  <TableHead>Дата регистрации</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{user.lastSeen}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.messages}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreHorizontal" size={18} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Icon name="Eye" size={16} />
                            Просмотр профиля
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Icon name="MessageSquare" size={16} />
                            История сообщений
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Icon name="Edit" size={16} />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleBlockUser(user.id)}
                          >
                            <Icon name={user.status === 'blocked' ? 'Check' : 'Ban'} size={16} />
                            {user.status === 'blocked' ? 'Разблокировать' : 'Заблокировать'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
