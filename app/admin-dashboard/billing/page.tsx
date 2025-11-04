'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '../../components/Admin/Common/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import dynamic from 'next/dynamic';

// PDFコンポーネントは動的にインポート（SSRを無効化）
// サーバーサイドPDF生成に変更したため、これらは不要
// const PDFDownloadLink = dynamic(
//   () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
//   { ssr: false, loading: () => <Button variant="outline" disabled>PDF準備中...</Button> }
// );
// const CompanyInvoicePDF = dynamic(() => import('@/app/components/Admin/Invoice/CompanyInvoicePDFSimple'), {
//   ssr: false,
// });

interface Invoice {
  id: number;
  invoice_number: string;
  partner_id: number;
  company_name: string;
  billing_period_start: string;
  billing_period_end: string;
  grand_total: number;
  issue_date: string;
  due_date: string;
  status: string;
}

interface GeneratedInvoice {
  partner_id: number;
  company_name: string;
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  items: Array<{
    description: string;
    amount: number;
  }>;
}

interface InvoiceDetail {
  id: number;
  invoice_number: string;
  partner: {
    id: number;
    company_name: string;
    email: string;
    phone: string;
    address: string;
  };
  billing_period_start: string;
  billing_period_end: string;
  issue_date: string;
  due_date: string;
  items: Array<{
    id: number;
    description: string;
    amount: number;
    related_order_id: number | null;
  }>;
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  status: string;
  payment_date: string | null;
}

export default function BillingManagementPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('all');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [generatedResult, setGeneratedResult] = useState<{
    generated: number;
    invoices: GeneratedInvoice[];
  } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState<number[]>([]);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIssueDate, setEditedIssueDate] = useState('');
  const [editedDueDate, setEditedDueDate] = useState('');
  const [editedItems, setEditedItems] = useState<Array<{
    id: number;
    description: string;
    amount: number;
    related_order_id: number | null;
  }>>([]);

  useEffect(() => {
    fetchInvoices();
  }, [status]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: '1', limit: '50' });
      if (status !== 'all') params.append('status', status);

      const res = await fetch(`/api/admin/invoices?${params}`);
      const data = await res.json();

      if (data.success) {
        setInvoices(data.data.invoices);
      }
    } catch (error) {
      console.error('請求書一覧の取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoiceDetail = async (invoiceId: number) => {
    try {
      setLoadingDetail(true);
      const res = await fetch(`/api/admin/invoices/${invoiceId}`);
      const data = await res.json();

      if (data.success) {
        setSelectedInvoice(data.data);
        setEditedIssueDate(data.data.issue_date);
        setEditedDueDate(data.data.due_date);
        setEditedItems([...data.data.items]);
        setIsEditing(false);
        setIsDetailModalOpen(true);
      } else {
        alert('請求書詳細の取得に失敗しました');
      }
    } catch (error) {
      console.error('請求書詳細の取得に失敗しました:', error);
      alert('請求書詳細の取得に失敗しました');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleGenerateMonthly = async () => {
    try {
      setGenerating(true);
      const res = await fetch('/api/admin/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'monthly',
          year: selectedYear,
          month: selectedMonth,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedResult(data.data);
        setIsGenerateModalOpen(true);
        fetchInvoices();
      } else {
        alert(data.error || '請求書の生成に失敗しました');
      }
    } catch (error) {
      console.error('請求書生成エラー:', error);
      alert('請求書の生成に失敗しました');
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateUnbilled = async () => {
    if (!confirm('未請求分の請求書を生成しますか？')) {
      return;
    }

    try {
      setGenerating(true);
      const res = await fetch('/api/admin/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'unbilled',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedResult(data.data);
        setIsGenerateModalOpen(true);
        fetchInvoices();
      } else {
        alert(data.error || '請求書の生成に失敗しました');
      }
    } catch (error) {
      console.error('請求書生成エラー:', error);
      alert('請求書の生成に失敗しました');
    } finally {
      setGenerating(false);
    }
  };

  const handleIssueInvoices = async (invoiceIds: number[]) => {
    if (invoiceIds.length === 0) {
      alert('発行する請求書を選択してください');
      return;
    }

    if (!confirm(`${invoiceIds.length}件の請求書を発行しますか？`)) {
      return;
    }

    try {
      const res = await fetch('/api/admin/invoices/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoice_ids: invoiceIds,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`${data.data.issued}件の請求書を発行しました`);
        setSelectedInvoiceIds([]);
        fetchInvoices();
      } else {
        alert(data.error || '請求書の発行に失敗しました');
      }
    } catch (error) {
      console.error('請求書発行エラー:', error);
      alert('請求書の発行に失敗しました');
    }
  };

  const handleIssueAll = () => {
    const draftInvoices = invoices.filter((inv) => inv.status === 'DRAFT');
    handleIssueInvoices(draftInvoices.map((inv) => inv.id));
  };

  const handleIssueSelected = () => {
    handleIssueInvoices(selectedInvoiceIds);
  };

  const handleDownloadPDF = async () => {
    if (selectedInvoiceIds.length === 0) {
      alert('請求書を選択してください');
      return;
    }

    // 現在は1件のみ対応
    if (selectedInvoiceIds.length > 1) {
      alert('現在は1件ずつのダウンロードのみ対応しています');
      return;
    }

    const invoiceId = selectedInvoiceIds[0];

    try {
      setDownloadingPDF(true);

      // サーバーサイドでPDFを生成してダウンロード
      const response = await fetch(`/api/admin/invoices/${invoiceId}/pdf`);
      
      if (!response.ok) {
        throw new Error('PDF生成に失敗しました');
      }

      // PDFをBlobとして取得
      const blob = await response.blob();
      
      // ダウンロードリンクを作成
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice_${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // クリーンアップ
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // 選択をクリア
      setSelectedInvoiceIds([]);
    } catch (error) {
      console.error('PDFダウンロードエラー:', error);
      alert('PDFのダウンロードに失敗しました');
    } finally {
      setDownloadingPDF(false);
    }
  };

  const toggleSelectInvoice = (id: number) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((invId) => invId !== id) : [...prev, id]
    );
  };

  const handleEditStart = () => {
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    if (selectedInvoice) {
      setEditedIssueDate(selectedInvoice.issue_date);
      setEditedDueDate(selectedInvoice.due_date);
      setEditedItems([...selectedInvoice.items]);
    }
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (!selectedInvoice) return;

    try {
      const totalAmount = editedItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = Math.floor(totalAmount * 0.1);
      const grandTotal = totalAmount + taxAmount;

      const res = await fetch(`/api/admin/invoices/${selectedInvoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue_date: editedIssueDate,
          due_date: editedDueDate,
          items: editedItems,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('請求書を更新しました');
        setIsEditing(false);
        // 詳細を再取得
        await fetchInvoiceDetail(selectedInvoice.id);
        // 一覧も更新
        fetchInvoices();
      } else {
        alert(data.error || '請求書の更新に失敗しました');
      }
    } catch (error) {
      console.error('更新エラー:', error);
      alert('請求書の更新に失敗しました');
    }
  };

  const handleItemChange = (index: number, field: 'description' | 'amount', value: string | number) => {
    const newItems = [...editedItems];
    if (field === 'description') {
      newItems[index].description = value as string;
    } else {
      newItems[index].amount = typeof value === 'string' ? parseInt(value) || 0 : value;
    }
    setEditedItems(newItems);
  };

  const handleAddItem = () => {
    setEditedItems([
      ...editedItems,
      { id: Date.now(), description: '', amount: 0, related_order_id: null },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setEditedItems(editedItems.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const items = isEditing ? editedItems : selectedInvoice?.items || [];
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = Math.floor(totalAmount * 0.1);
    const grandTotal = totalAmount + taxAmount;
    return { totalAmount, taxAmount, grandTotal };
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

    const customClasses: { [key: string]: string } = {
      UNPAID: 'border-orange-500 text-orange-700 bg-orange-50',
      CANCELLED: 'border-gray-400 text-gray-700 bg-gray-50',
    };

    return (
      <Badge
        variant={variants[status] || 'default'}
        className={customClasses[status] || ''}
      >
        {labels[status] || status}
      </Badge>
    );
  };

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const draftCount = invoices.filter((inv) => inv.status === 'DRAFT').length;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      <main className="flex-1 p-8 min-w-0 overflow-y-auto h-screen">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">手数料請求管理</h1>
          </div>

          {/* 請求書生成セクション */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl font-bold text-gray-800">請求書下書き生成</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 月別生成 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">月別請求書生成</h3>
                    <div className="flex gap-3 items-end">
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-700">年</Label>
                        <Select
                          value={selectedYear.toString()}
                          onValueChange={(val) => setSelectedYear(parseInt(val))}
                        >
                          <SelectTrigger className="mt-1.5 bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}年
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium text-gray-700">月</Label>
                        <Select
                          value={selectedMonth.toString()}
                          onValueChange={(val) => setSelectedMonth(parseInt(val))}
                        >
                          <SelectTrigger className="mt-1.5 bg-white border-gray-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month} value={month.toString()}>
                                {month}月
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleGenerateMonthly}
                    disabled={generating}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    {generating ? '生成中...' : `${selectedYear}年${selectedMonth}月分の下書きを生成`}
                  </Button>
                </div>

                {/* 未請求分生成 */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">未請求分生成</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      これまでに請求書を発行していない全ての成約手数料を集計して請求書を生成します。
                    </p>
                  </div>
                  <Button
                    onClick={handleGenerateUnbilled}
                    disabled={generating}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    {generating ? '生成中...' : '未請求分の下書きを生成'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 発行アクション */}
          {draftCount > 0 && (
            <Card className="shadow-sm border-gray-200 bg-blue-50">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      下書き請求書: {draftCount}件
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      選択中: {selectedInvoiceIds.length}件
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleIssueSelected}
                      disabled={selectedInvoiceIds.length === 0}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
                    >
                      選択したものを発行
                    </Button>
                    <Button
                      onClick={handleIssueAll}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      すべて発行
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* フィルター */}
          <Card className="shadow-sm border-gray-200">
            <CardContent className="pt-6">
              <div className="flex gap-4 justify-between items-end">
                <div className="w-48">
                  <Label className="text-sm font-medium text-gray-700">ステータスで絞り込み</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="mt-1.5 bg-white border-gray-300 hover:border-gray-400">
                      <SelectValue placeholder="すべて" />
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
                <Button
                  onClick={handleDownloadPDF}
                  disabled={selectedInvoiceIds.length === 0 || downloadingPDF}
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  {downloadingPDF ? 'PDF生成中...' : '選択した請求書をPDFダウンロード'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 請求書一覧 */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <CardTitle className="text-xl font-bold text-gray-800">請求書一覧</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  <p className="mt-2 text-gray-600">読み込み中...</p>
                </div>
              ) : invoices.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            checked={
                              selectedInvoiceIds.length > 0 &&
                              invoices.every((inv) => selectedInvoiceIds.includes(inv.id))
                            }
                            onChange={(e) => {
                              if (e.target.checked) {
                                const allIds = invoices.map((inv) => inv.id);
                                setSelectedInvoiceIds(allIds);
                              } else {
                                setSelectedInvoiceIds([]);
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">請求書番号</TableHead>
                        <TableHead className="font-semibold text-gray-700">加盟店名</TableHead>
                        <TableHead className="font-semibold text-gray-700">請求期間</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">請求額</TableHead>
                        <TableHead className="font-semibold text-gray-700">発行日</TableHead>
                        <TableHead className="font-semibold text-gray-700">支払期日</TableHead>
                        <TableHead className="font-semibold text-gray-700">ステータス</TableHead>
                        <TableHead className="font-semibold text-gray-700">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedInvoiceIds.includes(invoice.id)}
                              onChange={() => toggleSelectInvoice(invoice.id)}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className="font-mono">{invoice.invoice_number}</TableCell>
                          <TableCell>{invoice.company_name}</TableCell>
                          <TableCell className="text-sm">
                            {invoice.billing_period_start} 〜 {invoice.billing_period_end}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ¥{invoice.grand_total.toLocaleString()}
                          </TableCell>
                          <TableCell>{invoice.issue_date}</TableCell>
                          <TableCell>{invoice.due_date}</TableCell>
                          <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchInvoiceDetail(invoice.id)}
                              disabled={loadingDetail}
                              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-white"
                            >
                              {loadingDetail ? '読込中...' : '詳細'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">請求書がありません</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* 生成結果モーダル */}
      <Dialog open={isGenerateModalOpen} onOpenChange={setIsGenerateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>請求書生成完了</DialogTitle>
          </DialogHeader>
          {generatedResult && (
            <div className="space-y-4">
              <p className="text-lg font-semibold text-green-600">
                {generatedResult.generated}件の請求書下書きを生成しました
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {generatedResult.invoices.map((invoice, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-gray-50">
                    <p className="font-semibold">{invoice.company_name}</p>
                    <p className="text-sm text-gray-600">
                      請求額: ¥{invoice.grand_total.toLocaleString()}（税込）
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      {invoice.items.map((item, i) => (
                        <div key={i}>
                          {item.description}: ¥{item.amount.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={() => setIsGenerateModalOpen(false)} className="w-full">
                閉じる
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 請求書詳細モーダル */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedInvoice?.invoice_number}
            </DialogTitle>
          </DialogHeader>
          {selectedInvoice && (
            <div className="space-y-6">
              {/* ステータスバッジとアクションボタン */}
              <div className="flex justify-between items-center">
                <div>{getStatusBadge(selectedInvoice.status)}</div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleEditCancel}>
                        キャンセル
                      </Button>
                      <Button size="sm" onClick={handleEditSave}>
                        保存
                      </Button>
                    </>
                  ) : (
                    <>
                      {selectedInvoice.status === 'DRAFT' && (
                        <>
                          <Button variant="outline" size="sm" onClick={handleEditStart}>
                            編集
                          </Button>
                          <Button
                            size="sm"
                            onClick={async () => {
                              if (confirm('請求書を発行しますか？')) {
                                try {
                                  const res = await fetch(`/api/admin/invoices/${selectedInvoice.id}/status`, {
                                    method: 'PUT',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ status: 'UNPAID' }),
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    alert('請求書を発行しました');
                                    setIsDetailModalOpen(false);
                                    fetchInvoices();
                                  }
                                } catch (error) {
                                  alert('発行に失敗しました');
                                }
                              }
                            }}
                          >
                            発行
                          </Button>
                        </>
                      )}
                      {selectedInvoice.status === 'UNPAID' && (
                        <Button
                          size="sm"
                          onClick={async () => {
                            if (confirm('入金確認を行いますか？')) {
                              try {
                                const today = new Date().toISOString().split('T')[0];
                                const res = await fetch(`/api/admin/invoices/${selectedInvoice.id}/status`, {
                                  method: 'PUT',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: 'PAID', payment_date: today }),
                                });
                                const data = await res.json();
                                if (data.success) {
                                  alert('入金確認しました');
                                  setIsDetailModalOpen(false);
                                  fetchInvoices();
                                }
                              } catch (error) {
                                alert('入金確認に失敗しました');
                              }
                            }
                          }}
                        >
                          入金確認
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* 加盟店情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>加盟店情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">会社名:</span>
                      <p className="mt-1">{selectedInvoice.partner.company_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">電話番号:</span>
                      <p className="mt-1">{selectedInvoice.partner.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">メールアドレス:</span>
                      <p className="mt-1">{selectedInvoice.partner.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">住所:</span>
                      <p className="mt-1">{selectedInvoice.partner.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 請求情報 */}
              <Card>
                <CardHeader>
                  <CardTitle>請求情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-700">請求期間:</span>
                      <p className="mt-1">{selectedInvoice.billing_period_start} 〜 {selectedInvoice.billing_period_end}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">発行日:</span>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedIssueDate}
                          onChange={(e) => setEditedIssueDate(e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1">{selectedInvoice.issue_date}</p>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">支払期日:</span>
                      {isEditing ? (
                        <Input
                          type="date"
                          value={editedDueDate}
                          onChange={(e) => setEditedDueDate(e.target.value)}
                          className="mt-1"
                        />
                      ) : (
                        <p className="mt-1">{selectedInvoice.due_date}</p>
                      )}
                    </div>
                    {selectedInvoice.payment_date && (
                      <div>
                        <span className="font-medium text-gray-700">入金日:</span>
                        <p className="mt-1">{selectedInvoice.payment_date}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* 請求項目 */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>請求項目</CardTitle>
                    {isEditing && (
                      <Button size="sm" onClick={handleAddItem}>
                        項目追加
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-bold text-gray-800">項目</TableHead>
                        <TableHead className="text-right font-bold text-gray-800">金額</TableHead>
                        {isEditing && <TableHead className="w-[100px] font-bold text-gray-800">操作</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(isEditing ? editedItems : selectedInvoice.items).map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {isEditing ? (
                              <Input
                                type="text"
                                value={item.description}
                                onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                className="w-full"
                              />
                            ) : (
                              item.description
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            {isEditing ? (
                              <Input
                                type="number"
                                value={item.amount}
                                onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
                                className="w-full text-right"
                              />
                            ) : (
                              `¥${item.amount.toLocaleString()}`
                            )}
                          </TableCell>
                          {isEditing && (
                            <TableCell>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleRemoveItem(index)}
                              >
                                削除
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* 合計 */}
              <Card>
                <CardHeader>
                  <CardTitle>合計</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>小計（税抜）:</span>
                    <span className="font-medium">¥{selectedInvoice.total_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>消費税（10%）:</span>
                    <span className="font-medium">¥{selectedInvoice.tax_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>合計（税込）:</span>
                    <span>¥{selectedInvoice.grand_total.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  閉じる
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

