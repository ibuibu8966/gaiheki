"use client";

import { useState } from "react";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  date: string;
  status: string;
}

const InquiriesView = () => {
  const [inquiryFilter, setInquiryFilter] = useState("すべて");
  const [inquiries, setInquiries] = useState<Inquiry[]>([
    { id: 1, name: "山田太郎", email: "yamada@example.com", subject: "外壁塗装の見積もりについて", date: "2024年03月01日", status: "未対応" },
    { id: 2, name: "田中花子", email: "tanaka@example.com", subject: "屋根の修理について", date: "2024年02月28日", status: "対応中" },
    { id: 3, name: "佐藤次郎", email: "sato@example.com", subject: "防水工事の相談", date: "2024年02月25日", status: "対応完了" }
  ]);

  const handleInquiryStatusChange = (inquiryId: number, newStatus: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "未対応":
        return "bg-red-100 text-red-800";
      case "対応中":
      case "審査中":
        return "bg-yellow-100 text-yellow-800";
      case "完了":
      case "承認済み":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">お問い合わせ管理</h2>
        </div>
        
        {/* ステータスフィルタータブ */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-2">
            {["すべて", "未対応", "対応中", "対応完了"].map((filter) => (
              <button
                key={filter}
                onClick={() => setInquiryFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  inquiryFilter === filter
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名前</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">件名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inquiries.filter(inquiry => {
                return inquiryFilter === "すべて" || inquiry.status === inquiryFilter;
              }).map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {inquiry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {inquiry.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {inquiry.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {inquiry.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">詳細</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={inquiry.status}
                      onChange={(e) => handleInquiryStatusChange(inquiry.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-md border-0 ${getStatusColor(inquiry.status)}`}
                    >
                      <option value="未対応">未対応</option>
                      <option value="対応中">対応中</option>
                      <option value="対応完了">対応完了</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InquiriesView;