import { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="h-screen flex overflow-hidden relative">
      <Sidebar onChatSelect={setSelectedChatId} selectedChatId={selectedChatId} />
      <ChatWindow chatId={selectedChatId} />
      
      <Link to="/admin" className="absolute bottom-6 right-6">
        <Button size="lg" className="gap-2 shadow-lg rounded-full px-6">
          <Icon name="Shield" size={20} />
          Админ-панель
        </Button>
      </Link>
    </div>
  );
}