import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  reactions?: string[];
}

interface ChatWindowProps {
  chatId: number | null;
}

const mockMessages: Record<number, Message[]> = {
  1: [
    { id: 1, text: 'Важная заметка для себя', time: '14:30', isOwn: true },
    { id: 2, text: 'Не забыть про встречу завтра', time: '15:45', isOwn: true },
  ],
  2: [
    { id: 1, text: 'Привет! Как дела?', time: '11:28', isOwn: false },
    { id: 2, text: 'Привет! Всё отлично, спасибо! А у тебя как?', time: '11:30', isOwn: true, reactions: ['👍', '❤️'] },
    { id: 3, text: 'Тоже хорошо! Может созвонимся сегодня вечером?', time: '11:32', isOwn: false },
  ],
  3: [
    { id: 1, text: 'Встреча в 15:00', time: '10:12', isOwn: false },
    { id: 2, text: 'Принято, буду!', time: '10:15', isOwn: true },
  ],
};

const chatNames: Record<number, { name: string; status: string }> = {
  1: { name: 'Избранное', status: 'сохраненные сообщения' },
  2: { name: 'Александр Петров', status: 'был(а) в сети недавно' },
  3: { name: 'Рабочий чат', status: '24 участника' },
};

export default function ChatWindow({ chatId }: ChatWindowProps) {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Record<number, Message[]>>(mockMessages);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
  const [reactingMessageId, setReactingMessageId] = useState<number | null>(null);

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[hsl(var(--telegram-bg))]">
        <div className="text-center space-y-4">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={64} className="text-primary" />
          </div>
          <h2 className="text-2xl font-medium text-foreground">Выберите чат</h2>
          <p className="text-muted-foreground">Начните общение или выберите существующий чат</p>
        </div>
      </div>
    );
  }

  const currentChat = chatNames[chatId];
  const currentMessages = messages[chatId] || [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), newMessage],
    }));
    setMessageText('');
  };

  const handleAddReaction = (messageId: number, emoji: string) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: prev[chatId].map(msg => 
        msg.id === messageId 
          ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
          : msg
      ),
    }));
    setReactingMessageId(null);
  };

  const emojiReactions = ['👍', '❤️', '😂', '😮', '😢', '🔥', '👏'];

  return (
    <div className="flex-1 flex flex-col bg-[hsl(var(--telegram-chat-bg))]">
      <div className="h-16 px-4 border-b border-border bg-background flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {currentChat.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="font-medium text-foreground">{currentChat.name}</h2>
          <p className="text-xs text-muted-foreground">{currentChat.status}</p>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="Search" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="Phone" size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2 max-w-4xl mx-auto">
          {currentMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
            >
              <div className="relative group max-w-[70%]">
                {hoveredMessageId === message.id && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 right-2 w-8 h-8 rounded-full bg-background shadow-md hover:bg-accent z-10"
                    onClick={() => setReactingMessageId(message.id)}
                  >
                    <Icon name="Smile" size={16} />
                  </Button>
                )}
                
                {reactingMessageId === message.id && (
                  <div className="absolute -top-12 right-0 bg-popover border border-border rounded-full px-3 py-2 shadow-lg flex gap-2 animate-scale-in z-20">
                    {emojiReactions.map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => handleAddReaction(message.id, emoji)}
                        className="text-xl hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? 'bg-[hsl(var(--telegram-outgoing-msg))] text-foreground rounded-br-sm'
                      : 'bg-[hsl(var(--telegram-incoming-msg))] text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.text}</p>
                  <span className="text-xs text-muted-foreground mt-1 block text-right">
                    {message.time}
                  </span>
                </div>

                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {message.reactions.map((reaction, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-background border border-border rounded-full text-sm animate-bounce-in"
                      >
                        {reaction}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-background">
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent flex-shrink-0">
            <Icon name="Paperclip" size={20} />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Написать сообщение..."
              className="rounded-full pr-20 py-5 border-0 bg-muted"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full hover:bg-accent"
            >
              <Icon name="Smile" size={20} />
            </Button>
          </div>
          {messageText.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="rounded-full w-10 h-10 flex-shrink-0"
            >
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-accent flex-shrink-0"
            >
              <Icon name="Mic" size={20} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
