import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: 'LayoutDashboard', label: 'Дашборд', path: '/admin' },
  { icon: 'Users', label: 'Пользователи', path: '/admin/users' },
  { icon: 'MessageSquare', label: 'Чаты', path: '/admin/chats' },
  { icon: 'Radio', label: 'Каналы', path: '/admin/channels' },
  { icon: 'ShieldAlert', label: 'Модерация', path: '/admin/moderation' },
  { icon: 'BarChart3', label: 'Аналитика', path: '/admin/analytics' },
  { icon: 'Settings', label: 'Настройки', path: '/admin/settings' },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">Telegram Clone</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  isActive ? 'bg-primary/10 text-primary hover:bg-primary/20' : ''
                }`}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link to="/">
          <Button variant="outline" className="w-full justify-start gap-3">
            <Icon name="ArrowLeft" size={20} />
            Вернуться в чат
          </Button>
        </Link>
      </div>
    </div>
  );
}
