'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface InvoiceItem {
  id: number;
  description: string;
  amount: number;
  related_order_id: number | null;
}

interface Partner {
  company_name: string;
  address: string;
  phone: string;
}

interface CompanyInvoice {
  id: number;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  billing_period_start: string;
  billing_period_end: string;
  total_amount: number;
  tax_amount: number;
  grand_total: number;
  status: 'DRAFT' | 'UNPAID' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  payment_date: string | null;
  partner: Partner;
  items: InvoiceItem[];
}

export default function CompanyInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [invoice, setInvoice] = useState<CompanyInvoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoice();
  }, [resolvedParams.id]);

  const fetchInvoice = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/partner/company-invoices/${resolvedParams.id}`);
      const data = await res.json();

      if (data.success) {
        setInvoice(data.data);
      } else {
        console.error('請求書の取得に失敗しました');
      }
    } catch (error) {
      console.error('請求書の取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return '下書き';
      case 'UNPAID':
        return '未払い';
      case 'PAID':
        return '支払済';
      case 'OVERDUE':
        return '期限超過';
      case 'CANCELLED':
        return 'キャンセル';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-700';
      case 'UNPAID':
        return 'bg-yellow-100 text-yellow-700';
      case 'PAID':
        return 'bg-green-100 text-green-700';
      case 'OVERDUE':
        return 'bg-red-100 text-red-700';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="p-6">
        <p className="text-center text-red-500">請求書が見つかりません</p>
        <div className="mt-4 text-center">
          <button
            onClick={() => router.push('/partner-dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ダッシュボードに戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">請求書詳細</h1>
          <p className="text-gray-500 mt-1">
            請求書番号: {invoice.invoice_number}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push('/partner-dashboard')}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            戻る
          </button>
          <a
            href={`/api/partner/company-invoices/${invoice.id}/pdf`}
            download
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            PDFダウンロード
          </a>
        </div>
      </div>

      {/* 請求書情報カード */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>請求書情報</CardTitle>
            <span
              className={`px-3 py-1 text-sm rounded-full ${getStatusColor(
                invoice.status
              )}`}
            >
              {getStatusLabel(invoice.status)}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                請求先情報
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">会社名</p>
                  <p className="font-semibold">{invoice.partner.company_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">住所</p>
                  <p>{invoice.partner.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">電話番号</p>
                  <p>{invoice.partner.phone}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-3">
                請求情報
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">発行日</p>
                  <p className="font-semibold">{invoice.issue_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">支払期日</p>
                  <p className="font-semibold">{invoice.due_date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">請求期間</p>
                  <p>
                    {invoice.billing_period_start} 〜{' '}
                    {invoice.billing_period_end}
                  </p>
                </div>
                {invoice.payment_date && (
                  <div>
                    <p className="text-sm text-gray-500">支払日</p>
                    <p className="font-semibold text-green-600">
                      {invoice.payment_date}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 請求明細 */}
      <Card>
        <CardHeader>
          <CardTitle>請求明細</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    明細
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                    金額
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-gray-900">
                      ¥{item.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 合計 */}
          <div className="mt-6 border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>小計（税抜）：</span>
              <span className="font-medium">
                ¥{invoice.total_amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>消費税（10%）：</span>
              <span className="font-medium">
                ¥{invoice.tax_amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t pt-2">
              <span>合計（税込）：</span>
              <span>¥{invoice.grand_total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
