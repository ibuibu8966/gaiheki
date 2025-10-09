"use client";
import { useState } from "react";
export default function ProfilePage() {
  const [companyInfo] = useState({
    companyName: "株式会社山田塗装",
    representativeName: "山田太郎",
    email: "info@yamada-tosou.co.jp",
    phone: "03-1234-5678",
    fax: "03-1234-5679",
    website: "https://yamada-tosou.co.jp",
    address: "東京都渋谷区渋谷1-1-1ビル3F",
    businessHours: "平日 8:00-18:00 / 土曜 8:00-17:00",
    holidays: "日曜・祝日・年末年始",
    businessContent: "外壁塗装、屋根塗装、防水工事を専門とする総合塗装業。",
    appeal: "創業30年の実績と信頼。",
    loginEmail: "admin@yamada-tosou.co.jp",
    rating: 4.5,
    reviewCount: 128,
    workCount: 450,
    serviceAreas: ["東京都", "神奈川県", "埼玉県"]
  });
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">会社情報</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-4">
            <div><label className="block text-sm text-gray-600 mb-1">会社名</label><div className="text-gray-900">{companyInfo.companyName}</div></div>
            <div><label className="block text-sm text-gray-600 mb-1">代表者名</label><div className="text-gray-900">{companyInfo.representativeName}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
