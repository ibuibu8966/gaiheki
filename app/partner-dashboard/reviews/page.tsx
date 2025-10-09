"use client";
import { useState } from "react";
export default function ReviewsPage() {
  const [reviews] = useState([
    { id: 1, customerName: "田中雄", rating: 5.0, title: "とても満足", content: "職人さんの技術が高く、仕上がりがとても綺麗でした。", date: "2024年03月02日" }
  ]);
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">口コミ情報管理</h2>
        <div className="space-y-6">
          {reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between mb-4">
                <h4 className="font-medium text-gray-900">{r.customerName}</h4>
                <span className="text-sm text-gray-500">{r.date}</span>
              </div>
              <p className="text-sm text-gray-700">{r.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
