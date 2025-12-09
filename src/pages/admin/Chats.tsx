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

interface Chat {
  id: number;
  name: string;
  type: 'private' | 'group' | 'channel';
  members: number;
  messages: number;
  lastActivity: string;
  status: 'active' | 'archived' | 'reported';
}

const mockChats: Chat[] = [
  { id: 1, name: 'Рабочий чат', type: 'group', members: 24, messages: 1254, lastActivity: '5 мин назад', status: 'active' },
  { id: 2, name: 'Семья ❤️', type: 'group', members: 5, messages: 892, lastActivity: '10 мин назад', status: 'active' },
  { id: 3, name: 'Канал новостей', type: 'channel', members: 5420, messages: 234, lastActivity: '1 час назад', status: 'active' },
  { id: 4, name: 'Книжный клуб', type: 'group', members: 15, messages: 634, lastActivity: '2 часа назад', status: 'active' },
  { id: 5, name: 'IT-сообщество', type: 'group', members: 89, messages: 2134, lastActivity: '3 часа назад', status: 'active' },
  { id: 6, name: 'Спам-группа', type: 'group', members: 12, messages: 45, lastActivity: '1 день назад', status: 'reported' },
  { id: 7, name: 'Старый проект', type: 'group', members: 8, messages: 567, lastActivity: '1 неделю назад', status: 'archived' },
];

export default function Chats() {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>(mockChats);

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArchiveChat = (chatId: number) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId ? { ...chat, status: chat.status === 'archived' ? 'active' : 'archived' as const } : chat
    ));
  };

  const getTypeBadge = (type: Chat['type']) => {
    switch (type) {
      case 'private':
        return <Badge variant="outline">Личный</Badge>;
      case 'group':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Группа</Badge>;
      case 'channel':
        return <Badge className="bg-purple-500 hover:bg-purple-600">Канал</Badge>;
    }
  };

  const getStatusBadge = (status: Chat['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Активный</Badge>;
      case 'archived':
        return <Badge variant="secondary">Архив</Badge>;
      case 'reported':
        return <Badge variant="destructive">Жалоба</Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Управление чатами</h1>
          <p className="text-muted-foreground">Все чаты, группы и каналы</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего чатов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{chats.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Групповых чатов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {chats.filter(c => c.type === 'group').length}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Каналов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {chats.filter(c => c.type === 'channel').length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Список чатов ({filteredChats.length})</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Поиск чатов"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
                <Button className="gap-2">
                  <Icon name="Plus" size={18} />
                  Создать
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Участники</TableHead>
                  <TableHead>Сообщений</TableHead>
                  <TableHead>Последняя активность</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredChats.map((chat) => (
                  <TableRow key={chat.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {chat.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{chat.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(chat.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={14} className="text-muted-foreground" />
                        <span>{chat.members}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{chat.messages}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{chat.lastActivity}</TableCell>
                    <TableCell>{getStatusBadge(chat.status)}</TableCell>
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
                            Просмотр
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Icon name="Users" size={16} />
                            Участники
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Icon name="MessageSquare" size={16} />
                            История
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => handleArchiveChat(chat.id)}
                          >
                            <Icon name="Archive" size={16} />
                            {chat.status === 'archived' ? 'Восстановить' : 'В архив'}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Icon name="Trash2" size={16} />
                            Удалить
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
