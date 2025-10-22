'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InvoiceItem {
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
  amount: number;
}

interface Order {
  id: number;
  quotations: {
    diagnosis_requests: {
      customers: {
        customer_name: string;
      };
    };
  };
  construction_amount: number;
}

export default function NewInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, unit: '式', unit_price: 0, amount: 0 },
  ]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // 施工完了済みで請求書未作成の受注を取得
      const res = await fetch('/api/partner/orders?status=COMPLETED');
      const data = await res.json();
      if (data.success) {
        setOrders(data.data || []);
      }
    } catch (error) {
      console.error('受注一覧の取得に失敗しました:', error);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unit: '式', unit_price: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // 金額を自動計算
    if (field === 'quantity' || field === 'unit_price') {
      newItems[index].amount = newItems[index].quantity * newItems[index].unit_price;
    }

    setItems(newItems);
  };

  const calculateTotals = () => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = Math.floor(totalAmount * 0.1);
    const grandTotal = totalAmount + taxAmount;
    return { totalAmount, taxAmount, grandTotal };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/partner/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: parseInt(selectedOrderId),
          issue_date: issueDate,
          due_date: dueDate,
          items: items.filter(item => item.description && item.amount > 0),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('請求書を作成しました');
        router.push('/partner-dashboard/invoices');
      } else {
        alert(data.error || '請求書の作成に失敗しました');
      }
    } catch (error) {
      console.error('請求書作成エラー:', error);
      alert('請求書の作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const { totalAmount, taxAmount, grandTotal } = calculateTotals();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">請求書作成</h1>
        <Button variant="outline" onClick={() => router.back()}>
          キャンセル
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報 */}
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="order">案件選択</Label>
              <Select value={selectedOrderId} onValueChange={setSelectedOrderId} required>
                <SelectTrigger>
                  <SelectValue placeholder="施工完了案件を選択" />
                </SelectTrigger>
                <SelectContent>
                  {orders.map((order) => (
                    <SelectItem key={order.id} value={order.id.toString()}>
                      受注ID: {order.id} - {order.quotations?.diagnosis_requests?.customers?.customer_name || '不明'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issue_date">発行日</Label>
                <Input
                  id="issue_date"
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="due_date">支払期日</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 請求項目 */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>請求項目</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                + 項目を追加
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label>品目</Label>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                    placeholder="外壁塗装工事一式"
                    required
                  />
                </div>
                <div className="w-24">
                  <Label>数量</Label>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div className="w-20">
                  <Label>単位</Label>
                  <Input
                    value={item.unit}
                    onChange={(e) => updateItem(index, 'unit', e.target.value)}
                    placeholder="式"
                    required
                  />
                </div>
                <div className="w-32">
                  <Label>単価</Label>
                  <Input
                    type="number"
                    value={item.unit_price}
                    onChange={(e) => updateItem(index, 'unit_price', parseInt(e.target.value))}
                    min="0"
                    required
                  />
                </div>
                <div className="w-32">
                  <Label>金額</Label>
                  <Input
                    type="number"
                    value={item.amount}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                {items.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeItem(index)}
                  >
                    削除
                  </Button>
                )}
              </div>
            ))}
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
              <span className="font-medium">¥{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>消費税（10%）:</span>
              <span className="font-medium">¥{taxAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>合計（税込）:</span>
              <span>¥{grandTotal.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* アクション */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            キャンセル
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? '作成中...' : '下書き保存'}
          </Button>
        </div>
      </form>
    </div>
  );
}
