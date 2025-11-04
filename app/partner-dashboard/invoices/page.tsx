'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CustomerInvoice {
  id: number;
  invoice_number: string;
  order_id: number;
  customer_name: string;
  project_name: string;
  issue_date: string;
  due_date: string;
  grand_total: number;
  status: string;
}

export default function PartnerInvoicesPage() {
  const [invoices, setInvoices] = useState<CustomerInvoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('/api/partner/invoices');

      // 認証エラーの場合はログインページにリダイレクト
      if (response.status === 401) {
        window.location.href = '/auth/partner-login';
        return;
      }

      if (response.ok) {
        const data = await response.json();

        // APIのレスポンス形式: { success: true, data: { invoices: [...], total, page, limit } }
        if (data.success && data.data && Array.isArray(data.data.invoices)) {
          setInvoices(data.data.invoices);
        } else if (Array.isArray(data)) {
          // 後方互換性のため
          setInvoices(data);
        } else if (data.data && Array.isArray(data.data)) {
          setInvoices(data.data);
        } else if (data.invoices && Array.isArray(data.invoices)) {
          setInvoices(data.invoices);
        } else {
          console.error('Unexpected data format:', data);
          setInvoices([]);
        }
      } else {
        console.error('API error:', response.status);
        setInvoices([]);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (invoiceId: number) => {
    try {
      const response = await fetch(`/api/partner/invoices/${invoiceId}/pdf`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert('PDFのダウンロードに失敗しました');
      }
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('PDFのダウンロードに失敗しました');
    }
  };

  const handleStatusChange = async (invoiceId: number, newStatus: string) => {
    if (!confirm('ステータスを変更しますか？')) return;

    try {
      const response = await fetch(`/api/partner/invoices/${invoiceId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        alert('ステータスを更新しました');
        fetchInvoices(); // リロード
      } else {
        alert(data.error || 'ステータスの更新に失敗しました');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('ステータスの更新に失敗しました');
    }
  };

  const getStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
      UNPAID: '未払い',
      PAID: '支払済',
      OVERDUE: '期限切れ',
      CANCELLED: 'キャンセル',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: { [key: string]: string } = {
      UNPAID: 'bg-yellow-100 text-yellow-800',
      PAID: 'bg-green-100 text-green-800',
      OVERDUE: 'bg-red-100 text-red-800',
      CANCELLED: 'bg-gray-100 text-gray-800',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">顧客請求書管理</h1>
        <Link
          href="/partner-dashboard/invoices/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + 新規請求書作成
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          請求書がありません
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  請求書番号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  顧客名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  発行日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  支払期限
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  合計金額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ステータス
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.customer_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.issue_date).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.due_date).toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                    ¥{invoice.grand_total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={invoice.status}
                      onChange={(e) => handleStatusChange(invoice.id, e.target.value)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold border-0 ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      <option value="UNPAID">未払い</option>
                      <option value="PAID">支払済</option>
                      <option value="OVERDUE">期限切れ</option>
                      <option value="CANCELLED">キャンセル</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDownloadPDF(invoice.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      PDF
                    </button>
                    <Link
                      href={`/partner-dashboard/invoices/${invoice.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

