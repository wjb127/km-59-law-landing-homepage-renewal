'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Eye, EyeOff, Clock } from 'lucide-react';
import { Inquiry } from '@/types';

interface Stats {
  total: number;
  unread: number;
  read: number;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0, read: 0 });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allRes, unreadRes] = await Promise.all([
          fetch('/api/inquiries?limit=5'),
          fetch('/api/inquiries?is_read=false&limit=5'),
        ]);

        const allData = await allRes.json();
        const unreadData = await unreadRes.json();

        const total = allData.total || 0;
        const unread = unreadData.total || 0;

        setStats({ total, unread, read: total - unread });
        setRecentInquiries(allData.data || []);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const statCards = [
    {
      label: '전체 문의',
      value: stats.total,
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: '미확인',
      value: stats.unread,
      icon: EyeOff,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: '확인 완료',
      value: stats.read,
      icon: Eye,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-[#1a365d]">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="h-16 bg-gray-100 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#1a365d]">대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${card.bg}`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            최근 문의
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentInquiries.length === 0 ? (
            <p className="text-gray-500 text-sm py-4 text-center">
              아직 문의가 없습니다.
            </p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        inquiry.is_read ? 'bg-green-400' : 'bg-red-400'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {inquiry.name || '이름 없음'}
                      </p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">
                        {inquiry.message || '메시지 없음'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
