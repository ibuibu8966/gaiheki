"use client";
import { useState } from "react";
export default function DiagnosesPage() {
  const [diagnoses] = useState([
    { id: "GH-00001", prefecture: "東京都", issue: "他社から見積もりを貰った", workType: "外壁と屋根の塗装", date: "2024年03月01日", status: "見積もり比較中" },
    { id: "GH-00002", prefecture: "神奈川県", issue: "価格の相場が気になっている", workType: "屋根の塗装", date: "2024年02月28日", status: "業者指定" }
  ]);
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">診断管理</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">診断ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">都道府県</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {diagnoses.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{d.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{d.prefecture}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
