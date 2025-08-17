"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminDashboardContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("partner-management");

  // フィルター状態
  const [partnerFilter, setPartnerFilter] = useState("すべて");
  const [partnerSearch, setPartnerSearch] = useState("");
  const [columnFilter, setColumnFilter] = useState("すべて");
  const [columnSearch, setColumnSearch] = useState("");
  const [inquiryFilter, setInquiryFilter] = useState("すべて");
  const [orderFilter, setOrderFilter] = useState("すべて");
  const [diagnosisFilter, setDiagnosisFilter] = useState("すべて");
  const [applicationFilter, setApplicationFilter] = useState("すべて");

  // サンプルデータ
  const [partners, setPartners] = useState([
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

  const [columns, setColumns] = useState([
    { id: 1, thumbnail: "/api/placeholder/100/60", title: "外壁塗装の基本知識：初心者向けガイド", category: "外壁塗装の基礎知識", status: "表示", publishDate: "2024年03月01日" },
    { id: 2, thumbnail: "/api/placeholder/100/60", title: "シリコン塗料とウレタン塗料の違いとは？", category: "塗料の種類と特徴", status: "非表示", publishDate: "2024年02月28日" }
  ]);

  const [inquiries, setInquiries] = useState([
    { id: 1, name: "山田太郎", email: "yamada@example.com", subject: "外壁塗装の見積もりについて", date: "2024年03月01日", status: "未対応" },
    { id: 2, name: "田中花子", email: "tanaka@example.com", subject: "屋根の修理について", date: "2024年02月28日", status: "対応中" },
    { id: 3, name: "佐藤次郎", email: "sato@example.com", subject: "防水工事の相談", date: "2024年02月25日", status: "対応完了" }
  ]);

  const [orders] = useState([
    { id: "GH-00001", customerName: "田中一郎", phone: "03-1111-2222", email: "tanaka@example.com", address: "東京都渋谷区1-1-1", amount: "¥850,000", contractor: "山田塗装", status: "施工中" },
    { id: "GH-00002", customerName: "佐藤花子", phone: "045-3333-4444", email: "sato@example.com", address: "神奈川県横浜市2-2-2", amount: "¥720,000", contractor: "田中建装", status: "施工完了" }
  ]);

  const [diagnoses] = useState([
    { id: "GH-00001", customerName: "高橋太", age: "101～150平米 (31～45坪)", issue: "劣化が少し気になる", workType: "外壁全面の塗装", requestDate: "2024年03月01日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00002", customerName: "田中陽", age: "51～100平米 (16～30坪)", issue: "色褪せや汚れが気になる", workType: "屋根の塗装", requestDate: "2024年02月28日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00003", customerName: "鈴木賢", age: "151～200平米 (46～61坪)", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年02月25日", status: "対応中", isUrgent: false },
    { id: "GH-00004", customerName: "千葉真", age: "201～250平米 (61～76坪)", issue: "ひび割れや破損したところがある", workType: "補修・防水", requestDate: "2024年02月20日", status: "対応中", isUrgent: false },
    { id: "GH-00005", customerName: "東京悟", age: "～50平米 (15坪) 以下", issue: "工事中心", workType: "外壁の塗り替え（サイディング）", requestDate: "2024年02月18日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00006", customerName: "大阪昭", age: "251～300平米 (76～91坪)", issue: "工事をも考えた", workType: "屋根の塗り替え（屋根替え）", requestDate: "2024年02月10日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00007", customerName: "横浜慎", age: "301～350平米 (91～106坪)", issue: "劣化が少し気になる", workType: "全面の塗り替え", requestDate: "2024年02月05日", status: "対応中", isUrgent: false },
    { id: "GH-00008", customerName: "名古屋真", age: "351～400平米 (106～121坪)", issue: "色褪せや汚れが気になる", workType: "外壁塗装", requestDate: "2024年01月30日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00009", customerName: "神戸賢", age: "401～450平米 (121～136坪)", issue: "ひび割れや破損したところがある", workType: "屋根の塗装", requestDate: "2024年01月25日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00010", customerName: "京都健", age: "451～500平米 (136～151坪)", issue: "工事中心", workType: "外壁全面の塗装", requestDate: "2024年01月20日", status: "対応中", isUrgent: false },
    { id: "GH-00011", customerName: "北海道太", age: "501平米 (152坪) 以上", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年01月18日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00012", customerName: "青森賢", age: "わからない", issue: "劣化が少し気になる", workType: "屋根の塗装", requestDate: "2024年01月15日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00013", customerName: "岩手健", age: "101～150平米 (31～45坪)", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年01月05日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00014", customerName: "秋田真", age: "151～200平米 (46～61坪)", issue: "ひび割れや破損したところがある", workType: "外壁の塗り替え（サイディング）", requestDate: "2023年12月30日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00015", customerName: "山形昭", age: "201～250平米 (61～76坪)", issue: "工事中心", workType: "屋根の塗り替え（屋根替え）", requestDate: "2023年12月25日", status: "見積もり完了", isUrgent: false }
  ]);

  const [applications] = useState([
    { id: 1, companyName: "佐藤塗装工業", representative: "佐藤太郎", address: "神奈川県横浜市青葉区1-1-1", phone: "045-123-4567", email: "info@sato-tosou.co.jp", website: "サイト", status: "審査中" },
    { id: 2, companyName: "田中建装株式会社", representative: "田中花子", address: "大阪府大阪市中央区2-2-2", phone: "06-234-5678", email: "contact@tanaka-kensou.com", website: "サイト", status: "審査中" },
    { id: 3, companyName: "山田ペイント", representative: "山田次郎", address: "愛知県名古屋市中区3-3-3", phone: "052-345-6789", email: "yamada@paint.jp", website: "サイト", status: "審査中" },
    { id: 4, companyName: "鈴木リフォーム", representative: "鈴木三郎", address: "千葉県千葉市中央区4-4-4", phone: "043-456-7890", email: "suzuki@reform.co.jp", website: "サイト", status: "審査中" },
    { id: 5, companyName: "高橋塗装店", representative: "高橋四郎", address: "埼玉県さいたま市大宮区5-5-5", phone: "048-567-8901", email: "takahashi@tosou.net", website: "サイト", status: "審査中" },
    { id: 6, companyName: "伊藤建設", representative: "伊藤五郎", address: "静岡県静岡市駿河区6-6-6", phone: "054-678-9012", email: "ito@kensetsu.com", website: "サイト", status: "審査中" },
    { id: 7, companyName: "渡辺塗装工業", representative: "渡辺六郎", address: "宮城県仙台市青葉区7-7-7", phone: "022-789-0123", email: "watanabe@tosou-kogyo.jp", website: "サイト", status: "審査中" },
    { id: 8, companyName: "中村ペイント", representative: "中村七郎", address: "福岡県福岡市博多区8-8-8", phone: "092-890-1234", email: "nakamura@paint.org", website: "サイト", status: "審査中" },
    { id: 9, companyName: "小林工務店", representative: "小林八郎", address: "石川県金沢市林業9-9-9", phone: "076-901-2345", email: "kobayashi@koumuten.co.jp", website: "サイト", status: "審査中" },
    { id: 10, companyName: "加藤塗装", representative: "加藤九郎", address: "広島県広島市中区10-10-10", phone: "082-012-3456", email: "kato@tosou.hiroshima.jp", website: "サイト", status: "審査中" },
    { id: 11, companyName: "松本建装", representative: "松本一郎", address: "長野県長野市光寺11-11-11", phone: "026-123-4567", email: "matsumoto@kensou.nagano.jp", website: "サイト", status: "承認" },
    { id: 12, companyName: "井上塗装", representative: "井上二郎", address: "香川県高松市丸亀町12-12-12", phone: "087-234-5678", email: "inoue@paint.kagawa.jp", website: "サイト", status: "承認" },
    { id: 13, companyName: "木村リフォーム", representative: "木村三郎", address: "青森県青森市本町13-13-13", phone: "017-345-6789", email: "kimura@reform.aomori.jp", website: "サイト", status: "承認" },
    { id: 14, companyName: "林塗装店", representative: "林四郎", address: "宮崎県宮崎市橘通14-14-14", phone: "0985-456-7890", email: "hayashi@tosou.miyazaki.jp", website: "サイト", status: "承認" }
  ]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push("/auth/admin-login");
    }
  };

  const handlePartnerStatusChange = (partnerId: number, newStatus: string) => {
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const handleInquiryStatusChange = (inquiryId: number, newStatus: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  const handleColumnStatusChange = (columnId: number, newStatus: string) => {
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, status: newStatus } : column
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

  const menuItems = [
    {
      id: "partner-management",
      label: "加盟店管理",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: "partner-applications",
      label: "加盟店申請",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6-4h6m2 5l-3-3 3-3m-6 8.5a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
      )
    },
    {
      id: "diagnosis-management",
      label: "診断管理",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: "order-management",
      label: "受注管理",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
      )
    },
    {
      id: "inquiry-management",
      label: "お問い合わせ管理",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: "column-management",
      label: "コラム管理",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* サイドバー */}
      <aside className="w-64 min-w-64 bg-white shadow-sm flex-shrink-0">
        {/* サイドバーヘッダー */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">管理ダッシュボード</h1>
        </div>

        {/* メニューリスト */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-md transition-colors ${
                    activeTab === item.id
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 whitespace-nowrap">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* トップ画面・ログアウトボタン */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center px-4 py-3 text-left rounded-md transition-colors text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="ml-3">トップ画面に戻る</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-left rounded-md transition-colors text-gray-700 hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="ml-3">ログアウト</span>
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-8 min-w-0">
        {/* 加盟店管理タブ */}
        {activeTab === "partner-management" && (
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
        )}

        {/* 加盟店申請タブ */}
        {activeTab === "partner-applications" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">加盟店申請</h2>
              </div>
              
              {/* ステータスフィルタータブ */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex space-x-2">
                  {["すべて", "審査中", "承認", "却下"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setApplicationFilter(filter)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        applicationFilter === filter
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">会社名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">代表者名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">住所</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">HP</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.filter(application => {
                      return applicationFilter === "すべて" || application.status === applicationFilter;
                    }).map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {application.companyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.representative}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {application.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">{application.website}</button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">詳細</button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-md ${
                            application.status === "審査中" ? "bg-yellow-100 text-yellow-800" :
                            application.status === "承認" ? "bg-green-100 text-green-800" :
                            application.status === "却下" ? "bg-red-100 text-red-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {application.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 診断管理タブ */}
        {activeTab === "diagnosis-management" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">診断管理</h2>
              </div>
              
              {/* ステータスフィルタータブ */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex space-x-2">
                  {["すべて", "業者選定", "見積もり対応中", "見積もり対応完了", "見積もり完了"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setDiagnosisFilter(filter)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        diagnosisFilter === filter
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">診断ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">顧客名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">延床面積</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在の状況</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工事箇所</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">診断依頼日</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">見積もり詳細</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {diagnoses.filter(diagnosis => {
                      return diagnosisFilter === "すべて" || diagnosis.status === diagnosisFilter;
                    }).map((diagnosis) => (
                      <tr key={diagnosis.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {diagnosis.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {diagnosis.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {diagnosis.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {diagnosis.issue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {diagnosis.workType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {diagnosis.requestDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-md ${
                            diagnosis.status === "業者選定" ? "bg-blue-100 text-blue-800" :
                            diagnosis.status === "見積もり対応中" || diagnosis.status === "対応中" ? "bg-yellow-100 text-yellow-800" :
                            diagnosis.status === "見積もり対応完了" ? "bg-yellow-100 text-yellow-800" :
                            diagnosis.status.includes("見積もり完了") ? "bg-green-100 text-green-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {diagnosis.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">詳細</button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">見積もり詳細</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 受注管理タブ */}
        {activeTab === "order-management" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">受注管理</h2>
              </div>
              
              {/* ステータスフィルタータブ */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex space-x-2">
                  {["すべて", "受注", "施工中", "施工完了", "評価完了", "キャンセル"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setOrderFilter(filter)}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        orderFilter === filter
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">診断ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">顧客名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話番号</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">メールアドレス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">施工住所</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">施工金額</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">施工業者</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.filter(order => {
                      return orderFilter === "すべて" || order.status === orderFilter;
                    }).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.address}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.contractor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-md ${
                            order.status === "施工中" ? "bg-orange-100 text-orange-800" :
                            order.status === "施工完了" ? "bg-green-100 text-green-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">詳細</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* お問い合わせ管理タブ */}
        {activeTab === "inquiry-management" && (
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
        )}

        {/* コラム管理タブ */}
        {activeTab === "column-management" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">コラム管理</h2>
              </div>
              
              {/* ツールバー */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  {/* ステータスフィルター */}
                  <div className="flex space-x-2">
                    {["すべて", "表示", "非表示"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setColumnFilter(filter)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          columnFilter === filter
                            ? "bg-gray-800 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  
                  {/* 新規作成ボタン */}
                  <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium">
                    新規作成
                  </button>
                  
                  {/* 検索バー */}
                  <div className="relative">
                    <input
                      type="text"
                      value={columnSearch}
                      onChange={(e) => setColumnSearch(e.target.value)}
                      placeholder="コラム検索..."
                      className="pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm w-64"
                    />
                    <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* テーブル */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">サムネイル</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {columns.filter(column => {
                      const matchesFilter = columnFilter === "すべて" || column.status === columnFilter;
                      const matchesSearch = column.title.toLowerCase().includes(columnSearch.toLowerCase());
                      return matchesFilter && matchesSearch;
                    }).map((column) => (
                      <tr key={column.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            {/* カラフルなタイル表示 */}
                            <div className="grid grid-cols-3 gap-1 w-12 h-8">
                              <div className="bg-blue-400 rounded-sm"></div>
                              <div className="bg-yellow-400 rounded-sm"></div>
                              <div className="bg-red-400 rounded-sm"></div>
                              <div className="bg-green-400 rounded-sm"></div>
                              <div className="bg-orange-400 rounded-sm"></div>
                              <div className="bg-blue-600 rounded-sm"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                          <div className="truncate">{column.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {column.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={column.status}
                            onChange={(e) => handleColumnStatusChange(column.id, e.target.value)}
                            className={`px-3 py-1 text-xs font-medium rounded-md border-0 ${
                              column.status === "表示" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <option value="表示">表示</option>
                            <option value="非表示">非表示</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {column.publishDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 text-sm">閲覧</button>
                            <select className="text-blue-600 border-0 bg-transparent text-sm">
                              <option>編集</option>
                            </select>
                            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                              削除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboardContent;