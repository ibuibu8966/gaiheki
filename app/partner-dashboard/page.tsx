'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface KPI {
  inquiries: number;
  orders: number;
  completed: number;
  revenue: number;
  unpaid: number;
}

interface RevenueTrend {
  month: string;
  revenue: number;
}

interface StatusDistribution {
  inquiries: number;
  quotations: number;
  orders: number;
  in_progress: number;
  completed: number;
}

interface DashboardData {
  kpi: KPI;
  revenue_trend: RevenueTrend[];
  status_distribution: StatusDistribution;
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
}

export default function PartnerDashboardPage() {
  const [period, setPeriod] = useState('current_month');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [companyInvoices, setCompanyInvoices] = useState<CompanyInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [invoicesLoading, setInvoicesLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData(period);
    fetchCompanyInvoices();
  }, [period]);

  // 日時をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 7) return `${diffDays}日前`;

    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const fetchDashboardData = async (selectedPeriod: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/partner/dashboard?period=${selectedPeriod}`);
      const data = await res.json();

      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('ダッシュボードデータの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyInvoices = async () => {
    try {
      setInvoicesLoading(true);
      const res = await fetch('/api/partner/company-invoices?limit=5');
      const data = await res.json();

      if (data.success) {
        setCompanyInvoices(data.data.invoices);
      }
    } catch (error) {
      console.error('会社請求書の取得に失敗しました:', error);
    } finally {
      setInvoicesLoading(false);
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
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6">
        <p className="text-center text-gray-600">データの取得に失敗しました</p>
      </div>
    );
  }

  // 円グラフの色設定
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  // ステータス分布を配列に変換
  const statusCountsArray = dashboardData.status_distribution ? [
    { status: '問い合わせ', count: dashboardData.status_distribution.inquiries },
    { status: '見積提出', count: dashboardData.status_distribution.quotations },
    { status: '受注', count: dashboardData.status_distribution.orders },
    { status: '施工中', count: dashboardData.status_distribution.in_progress },
    { status: '完了', count: dashboardData.status_distribution.completed },
  ].filter(item => item.count > 0) : [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="期間を選択" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current_month">今月</SelectItem>
            <SelectItem value="last_month">先月</SelectItem>
            <SelectItem value="current_year">今年</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPIサマリーカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">
              問い合わせ件数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900">
              {dashboardData.kpi.inquiries}
            </p>
            <p className="text-xs text-blue-600 mt-1">件</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">
              受注件数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900">
              {dashboardData.kpi.orders}
            </p>
            <p className="text-xs text-green-600 mt-1">件</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">
              施工完了件数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900">
              {dashboardData.kpi.completed}
            </p>
            <p className="text-xs text-purple-600 mt-1">件</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              売上
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-900">
              ¥{dashboardData.kpi.revenue.toLocaleString()}
            </p>
            <p className="text-xs text-orange-600 mt-1">税込</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-white border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">
              未入金額
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-900">
              ¥{dashboardData.kpi.unpaid.toLocaleString()}
            </p>
            <p className="text-xs text-red-600 mt-1">税込</p>
          </CardContent>
        </Card>
      </div>

      {/* グラフエリア */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月次売上推移グラフ */}
        <Card>
          <CardHeader>
            <CardTitle>月次売上推移</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.revenue_trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const [year, month] = value.split('-');
                    return `${month}月`;
                  }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `¥${(value / 10000).toFixed(0)}万`}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `¥${value.toLocaleString()}`,
                    '売上',
                  ]}
                  labelFormatter={(label) => {
                    const [year, month] = label.split('-');
                    return `${year}年${month}月`;
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 案件ステータス別件数グラフ */}
        <Card>
          <CardHeader>
            <CardTitle>案件ステータス別件数</CardTitle>
          </CardHeader>
          <CardContent>
            {statusCountsArray.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusCountsArray}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, count, percent }) =>
                      `${status}: ${count}件 (${(percent * 100).toFixed(0)}%)`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statusCountsArray.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value}件`,
                      name,
                    ]}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                データがありません
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 請求書履歴 */}
      <Card>
        <CardHeader>
          <CardTitle>請求書履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {invoicesLoading ? (
            <p className="text-center text-gray-500 py-8">読み込み中...</p>
          ) : companyInvoices.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              まだ請求書がありません
            </p>
          ) : (
            <div className="space-y-3">
              {companyInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-gray-900">
                        {invoice.invoice_number}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          invoice.status
                        )}`}
                      >
                        {getStatusLabel(invoice.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex gap-4">
                        <span>発行日: {invoice.issue_date}</span>
                        <span>支払期日: {invoice.due_date}</span>
                      </div>
                      <div className="font-semibold text-gray-900">
                        金額: ¥{invoice.grand_total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`/partner-dashboard/company-invoices/${invoice.id}`}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      閲覧
                    </a>
                    <a
                      href={`/api/partner/company-invoices/${invoice.id}/pdf`}
                      download
                      className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      ダウンロード
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
