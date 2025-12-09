import StatsCard from '@/components/admin/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Activity {
  id: number;
  user: string;
  action: string;
  time: string;
  type: 'user' | 'message' | 'channel' | 'warning';
}

const recentActivities: Activity[] = [
  { id: 1, user: 'Александр Петров', action: 'создал новый чат', time: '2 минуты назад', type: 'message' },
  { id: 2, user: 'Мария Иванова', action: 'зарегистрировалась', time: '15 минут назад', type: 'user' },
  { id: 3, user: 'Рабочий чат', action: 'получил 45 новых сообщений', time: '1 час назад', type: 'message' },
  { id: 4, user: 'Модератор', action: 'заблокировал пользователя', time: '2 часа назад', type: 'warning' },
  { id: 5, user: 'Канал новостей', action: 'опубликовал новый пост', time: '3 часа назад', type: 'channel' },
];

const topChats = [
  { name: 'Рабочий чат', messages: 1254, members: 24 },
  { name: 'Семья ❤️', messages: 892, members: 5 },
  { name: 'Книжный клуб', messages: 634, members: 15 },
  { name: 'IT-сообщество', messages: 521, members: 89 },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Дашборд</h1>
          <p className="text-muted-foreground">Обзор активности платформы</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Всего пользователей"
            value="12,845"
            icon="Users"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Активных чатов"
            value="3,421"
            icon="MessageSquare"
            trend={{ value: 8.3, isPositive: true }}
          />
          <StatsCard
            title="Сообщений за день"
            value="45,678"
            icon="Send"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatsCard
            title="Каналов"
            value="156"
            icon="Radio"
            trend={{ value: 2.1, isPositive: false }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Activity" size={20} />
                Последняя активность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[350px]">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          activity.type === 'user'
                            ? 'bg-blue-500/10 text-blue-500'
                            : activity.type === 'message'
                            ? 'bg-green-500/10 text-green-500'
                            : activity.type === 'channel'
                            ? 'bg-purple-500/10 text-purple-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        <Icon
                          name={
                            activity.type === 'user'
                              ? 'UserPlus'
                              : activity.type === 'message'
                              ? 'MessageCircle'
                              : activity.type === 'channel'
                              ? 'Radio'
                              : 'AlertTriangle'
                          }
                          size={18}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="TrendingUp" size={20} />
                Топ чатов по активности
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topChats.map((chat, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-bold rounded-full flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{chat.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="MessageSquare" size={12} />
                          {chat.messages}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Users" size={12} />
                          {chat.members}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary">{chat.messages}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Онлайн сейчас</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">4,532</div>
              <p className="text-sm text-muted-foreground">пользователей активны</p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[65%] animate-fade-in"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Новых регистраций</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">342</div>
              <p className="text-sm text-muted-foreground">за последние 24 часа</p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[45%] animate-fade-in"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-base">Жалобы на модерацию</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground mb-2">23</div>
              <p className="text-sm text-muted-foreground">требуют проверки</p>
              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-[15%] animate-fade-in"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
