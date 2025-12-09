import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';

export default function Index() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar onChatSelect={setSelectedChatId} selectedChatId={selectedChatId} />
      <ChatWindow chatId={selectedChatId} />
    </div>
  );
}
