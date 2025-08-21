"use client";

import { useState } from "react";

interface Partner {
  id: number;
  companyName: string;
  email: string;
  phone: string;
  prefecture: string;
  status: string;
  registrationDate: string;
}

const PartnersView = () => {
  const [partnerFilter, setPartnerFilter] = useState("すべて");
  const [partnerSearch, setPartnerSearch] = useState("");

  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, companyName: "株式会社山田塗装", email: "info@yamada-tosou.co.jp", phone: "03-1234-5678", prefecture: "東京都", status: "表示", registrationDate: "2024年01月15日" },
    { id: 2, companyName: "田中建装株式会社", email: "contact@tanaka-kensou.com", phone: "06-9876-5432", prefecture: "大阪府", status: "表示", registrationDate: "2024年01月20日" },
    { id: 3, companyName: "佐藤塗装工業", email: "info@sato-tosou.jp", phone: "045-1111-2222", prefecture: "神奈川県", status: "表示", registrationDate: "2024年01月25日" },
    { id: 4, companyName: "鈴木リフォーム", email: "suzuki@reform.co.jp", phone: "043-3333-4444", prefecture: "千葉県", status: "表示", registrationDate: "2024年02月01日" },
    { id: 5, companyName: "高橋塗装店", email: "takahashi@paint.com", phone: "048-5555-6666", prefecture: "埼玉県", status: "表示", registrationDate: "2024年02月05日" },
    { id: 6, companyName: "伊藤建設", email: "ito@kensetsu.jp", phone: "052-7777-8888", prefecture: "愛知県", status: "表示", registrationDate: "2024年02月10日" },
    { id: 7, companyName: "渡辺塗装", email: "watanabe@tosou.net", phone: "022-9999-0000", prefecture: "宮城県", status: "表示", registrationDate: "2024年02月15日" },
    { id: 8, companyName: "中村ペイント", email: "nakamura@paint.org", phone: "092-1111-2222", prefecture: "福岡県", status: "表示", registrationDate: "2024年02月20日" },
    { id: 9, companyName: "小林工務店", email: "kobayashi@koumuten.com", phone: "076-3333-4444", prefecture: "石川県", status: "表示", registrationDate: "2024年02月25日" },
    { id: 10, companyName: "加藤塗装工業", email: "kato@tosou-kogyo.jp", phone: "054-5555-6666", prefecture: "静岡県", status: "表示", registrationDate: "2024年03月01日" },
    { id: 11, companyName: "松本建装", email: "matsumoto@kensou.co.jp", phone: "026-7777-8888", prefecture: "長野県", status: "非表示", registrationDate: "2024年03月05日" },
    { id: 12, companyName: "井上塗装", email: "inoue@paint.ne.jp", phone: "087-9999-0000", prefecture: "香川県", status: "非表示", registrationDate: "2024年03月10日" }
  ]);

  const handlePartnerStatusChange = (partnerId: number, newStatus: string) => {
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">加盟店管理</h2>
        </div>
        
        {/* ツールバー */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium">
                新規追加
              </button>
              <select
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="すべて">すべて</option>
                <option value="表示">表示</option>
                <option value="非表示">非表示</option>
              </select>
              <div className="relative">
                <input
                  type="text"
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                  placeholder="検索..."
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm w-64"
                />
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-500">20</div>
              <div className="text-sm text-gray-500">登録加盟店数</div>
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会社名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">都道府県</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.filter(partner => {
                const matchesFilter = partnerFilter === "すべて" || partner.status === partnerFilter;
                const matchesSearch = partner.companyName.toLowerCase().includes(partnerSearch.toLowerCase()) ||
                                    partner.email.toLowerCase().includes(partnerSearch.toLowerCase());
                return matchesFilter && matchesSearch;
              }).map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {partner.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {partner.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {partner.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {partner.prefecture}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={partner.status}
                      onChange={(e) => handlePartnerStatusChange(partner.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-md border-0 ${
                        partner.status === "表示" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="表示">表示</option>
                      <option value="非表示">非表示</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {partner.registrationDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 text-sm">詳細</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                      削除
                    </button>
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

export default PartnersView;