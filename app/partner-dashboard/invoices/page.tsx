'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Invoice {
  id: number;
  invoice_number: string;
  customer_name: string;
  project_name: string;
  grand_total: number;
  issue_date: string;
  due_date: string;
  status: string;
}

export default function InvoiceListPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchInvoices();
  }, [status, search, page]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (status !== 'all') params.append('status', status);
      if (search) params.append('search', search);
      params.append('page', page.toString());
      params.append('limit', limit.toString());

      const res = await fetch(`/api/partner/invoices?${params}`);
      const data = await res.json();

      if (data.success) {
        setInvoices(data.data.invoices);
        setTotal(data.data.total);
      }
    } catch (error) {
      console.error('請求書一覧の取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      DRAFT: 'secondary',
      UNPAID: 'outline',
      PAID: 'default',
      OVERDUE: 'destructive',
      CANCELLED: 'outline',
    };

    const labels: { [key: string]: string } = {
      DRAFT: '下書き',
      UNPAID: '未払い',
      PAID: '支払い済み',
      OVERDUE: '遅延',
      CANCELLED: 'キャンセル',
    };

    return <Badge variant={variants[status] || 'default'}>{labels[status] || status}</Badge>;
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">請求管理</h1>
        <Button onClick={() => router.push('/partner-dashboard/invoices/new')}>
          新規作成
        </Button>
      </div>

      {/* フィルター */}
      <div className="flex gap-4">
        <Input
          placeholder="顧客名、案件名で検索"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={(value) => {
          setStatus(value);
          setPage(1);
        }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="DRAFT">下書き</SelectItem>
            <SelectItem value="UNPAID">未払い</SelectItem>
            <SelectItem value="PAID">支払い済み</SelectItem>
            <SelectItem value="OVERDUE">遅延</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* テーブル */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">請求書がありません</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>請求書番号</TableHead>
                  <TableHead>顧客名</TableHead>
                  <TableHead>案件名</TableHead>
                  <TableHead className="text-right">請求額</TableHead>
                  <TableHead>発行日</TableHead>
                  <TableHead>支払期日</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.customer_name}</TableCell>
                    <TableCell>{invoice.project_name}</TableCell>
                    <TableCell className="text-right">
                      ¥{invoice.grand_total.toLocaleString()}
                    </TableCell>
                    <TableCell>{invoice.issue_date}</TableCell>
                    <TableCell>{invoice.due_date}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/partner-dashboard/invoices/${invoice.id}`)}
                      >
                        詳細
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ページネーション */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                前へ
              </Button>
              <span className="px-4 py-2 text-sm">
                {page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                次へ
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
