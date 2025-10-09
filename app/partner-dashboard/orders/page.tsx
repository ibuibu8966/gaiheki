"use client";
import { useState } from "react";
export default function OrdersPage() {
  const [orders] = useState([
    { id: "DIAG-001", customerName: "田中太郎", address: "東京都渋谷区", amount: "¥1,200,000", status: "受注", date: "2024-01-15" }
  ]);
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">受注管理</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">診断ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">顧客名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{o.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
