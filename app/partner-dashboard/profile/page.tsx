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
    businessContent: "外壁塗装、屋根塗装、防水工事を専門とする総合塗装業。戸建住宅から大型建築物まで幅広く対応し、高品質な素材と熟練の技術で長期保証を提供しています。",
    appeal: "創業30年の実績と信頼。お客様満足度95%以上を誇る外壁塗装専門店です。地域密着のサービスで、アフターフォローも万全です。",
    loginEmail: "admin@yamada-tosou.co.jp",
    rating: 4.5,
    reviewCount: 128,
    workCount: 450,
    serviceAreas: ["東京都", "神奈川県", "埼玉県"]
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">会社情報</h2>
            <p className="text-gray-600 mt-2">お客様に表示される会社情報を管理できます。</p>
          </div>
          <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
            編集
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 基本情報 */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 mr-2 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="font-medium text-gray-900">基本情報</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">会社名</label>
                    <div className="text-gray-900">{companyInfo.companyName}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">代表者名</label>
                    <div className="text-gray-900">{companyInfo.representativeName}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">メールアドレス</label>
                    <div className="text-gray-900">{companyInfo.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">電話番号</label>
                    <div className="text-gray-900">{companyInfo.phone}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">FAX番号</label>
                    <div className="text-gray-900">{companyInfo.fax}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">ウェブサイト</label>
                    <div className="text-blue-600">{companyInfo.website}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">住所</label>
                  <div className="text-gray-900">{companyInfo.address}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">営業時間</label>
                    <div className="text-gray-900">{companyInfo.businessHours}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">定休日</label>
                    <div className="text-gray-900">{companyInfo.holidays}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">事業内容</label>
                  <div className="text-gray-900">{companyInfo.businessContent}</div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">アピール文章</label>
                  <div className="text-gray-900">{companyInfo.appeal}</div>
                </div>
              </div>
            </div>

            {/* ログイン情報 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">ログイン情報</h3>
              <div>
                <label className="block text-sm text-gray-600 mb-1">ログインメールアドレス</label>
                <div className="text-gray-900">{companyInfo.loginEmail}</div>
              </div>
            </div>
          </div>

          {/* サイドバー情報 */}
          <div className="space-y-6">
            {/* 実績・評価 */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                <h3 className="font-medium text-gray-900">実績・評価</h3>
              </div>

              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-orange-500">{companyInfo.rating}</div>
                <div className="flex justify-center items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className={`w-4 h-4 ${star <= Math.floor(companyInfo.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-600">{companyInfo.reviewCount}件のレビュー</div>
              </div>

              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">{companyInfo.workCount}件</div>
                  <div className="text-sm text-gray-600">施工実績</div>
                </div>
              </div>
            </div>

            {/* 対応エリア */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">対応エリア</h3>
              <div className="flex flex-wrap gap-2">
                {companyInfo.serviceAreas.map((area) => (
                  <span key={area} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
