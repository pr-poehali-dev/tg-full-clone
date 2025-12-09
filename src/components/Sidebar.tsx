import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  onChatSelect: (chatId: number) => void;
  selectedChatId: number | null;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  avatar?: string;
  online?: boolean;
}

const mockChats: Chat[] = [
  { id: 1, name: 'Избранное', lastMessage: 'Сохраненные сообщения', time: '12:45', avatar: '⭐' },
  { id: 2, name: 'Александр Петров', lastMessage: 'Привет! Как дела?', time: '11:30', unread: 3, online: true },
  { id: 3, name: 'Рабочий чат', lastMessage: 'Встреча в 15:00', time: '10:15', unread: 12 },
  { id: 4, name: 'Мария Иванова', lastMessage: 'Спасибо за помощь!', time: 'Вчера' },
  { id: 5, name: 'Семья ❤️', lastMessage: 'Фото: IMG_2034.jpg', time: 'Вчера' },
  { id: 6, name: 'Канал новостей', lastMessage: 'Последние события дня', time: 'Пн' },
  { id: 7, name: 'Дмитрий Смирнов', lastMessage: 'Звонок (5:23)', time: 'Пт', online: true },
  { id: 8, name: 'Книжный клуб', lastMessage: 'Анна: Отличная книга!', time: '12/12' },
];

export default function Sidebar({ onChatSelect, selectedChatId }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'channels'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[420px] h-screen border-r border-border bg-background flex flex-col">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-accent"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name="Menu" size={24} />
        </Button>
        <div className="relative flex-1">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 rounded-full bg-muted border-0"
          />
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-4 top-16 w-64 bg-popover border border-border rounded-lg shadow-lg z-50 animate-scale-in">
          <div className="p-2">
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent">
              <Icon name="User" size={20} />
              Профиль
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent">
              <Icon name="Users" size={20} />
              Контакты
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent">
              <Icon name="Settings" size={20} />
              Настройки
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent">
              <Icon name="Moon" size={20} />
              Ночной режим
            </Button>
            <div className="h-px bg-border my-2" />
            <Button variant="ghost" className="w-full justify-start gap-3 hover:bg-accent">
              <Icon name="Radio" size={20} />
              Каналы
            </Button>
          </div>
        </div>
      )}

      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('chats')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'chats'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Чаты
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Контакты
        </button>
        <button
          onClick={() => setActiveTab('channels')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'channels'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Каналы
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors text-left ${
                selectedChatId === chat.id ? 'bg-accent' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {chat.avatar || chat.name[0]}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-medium text-foreground truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate flex-1">
                    {chat.lastMessage}
                  </p>
                  {chat.unread && (
                    <div className="ml-2 min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center justify-center flex-shrink-0">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
