'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Inquiry } from '@/types';
import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const limit = 15;

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (filter === 'unread') params.set('is_read', 'false');
      if (filter === 'read') params.set('is_read', 'true');

      const res = await fetch(`/api/inquiries?${params}`);
      const data = await res.json();
      setInquiries(data.data || []);
      setTotal(data.total || 0);
    } catch {
      toast.error('문의 목록을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  }, [page, filter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleMarkRead = async (id: string, isRead: boolean) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: isRead }),
      });
      if (!res.ok) throw new Error();
      toast.success(isRead ? '읽음 처리되었습니다.' : '미읽음 처리되었습니다.');
      fetchInquiries();
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) =>
          prev ? { ...prev, is_read: isRead } : null
        );
      }
    } catch {
      toast.error('상태 변경에 실패했습니다.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      toast.success('문의가 삭제되었습니다.');
      setSelectedInquiry(null);
      fetchInquiries();
    } catch {
      toast.error('삭제에 실패했습니다.');
    }
  };

  const openDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.is_read) {
      handleMarkRead(inquiry.id, true);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a365d]">문의 관리</h1>
        <Select value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="unread">미확인</SelectItem>
            <SelectItem value="read">확인 완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            총 {total}건
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-100 animate-pulse rounded" />
              ))}
            </div>
          ) : inquiries.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              문의가 없습니다.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">상태</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead className="w-28">날짜</TableHead>
                    <TableHead className="w-24 text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow
                      key={inquiry.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => openDetail(inquiry)}
                    >
                      <TableCell>
                        <Badge
                          variant={inquiry.is_read ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {inquiry.is_read ? '확인' : '미확인'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {inquiry.name || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {inquiry.phone || inquiry.email || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                        {inquiry.message || '-'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString('ko-KR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleMarkRead(inquiry.id, !inquiry.is_read)
                            }
                            title={inquiry.is_read ? '미읽음으로' : '읽음으로'}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>문의 삭제</AlertDialogTitle>
                                <AlertDialogDescription>
                                  이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(inquiry.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  삭제
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedInquiry}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>문의 상세</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">이름</span>
                  <p className="font-medium">{selectedInquiry.name || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500">상태</span>
                  <p>
                    <Badge
                      variant={
                        selectedInquiry.is_read ? 'secondary' : 'destructive'
                      }
                    >
                      {selectedInquiry.is_read ? '확인' : '미확인'}
                    </Badge>
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">연락처</span>
                  <p className="font-medium">{selectedInquiry.phone || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500">이메일</span>
                  <p className="font-medium">{selectedInquiry.email || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500">유형</span>
                  <p className="font-medium">
                    {selectedInquiry.lead_type || '-'}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">날짜</span>
                  <p className="font-medium">
                    {new Date(selectedInquiry.created_at).toLocaleString(
                      'ko-KR'
                    )}
                  </p>
                </div>
              </div>

              {selectedInquiry.custom_fields &&
                Object.keys(selectedInquiry.custom_fields).length > 0 && (
                  <div className="text-sm">
                    <span className="text-gray-500">추가 정보</span>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg space-y-1">
                      {Object.entries(selectedInquiry.custom_fields).map(
                        ([key, value]) => (
                          <p key={key}>
                            <span className="text-gray-500">{key}:</span>{' '}
                            {String(value)}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                )}

              <div className="text-sm">
                <span className="text-gray-500">내용</span>
                <p className="mt-1 p-3 bg-gray-50 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.message || '내용 없음'}
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleMarkRead(
                      selectedInquiry.id,
                      !selectedInquiry.is_read
                    )
                  }
                >
                  {selectedInquiry.is_read
                    ? '미읽음으로 변경'
                    : '읽음으로 변경'}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      삭제
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>문의 삭제</AlertDialogTitle>
                      <AlertDialogDescription>
                        이 문의를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(selectedInquiry.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
