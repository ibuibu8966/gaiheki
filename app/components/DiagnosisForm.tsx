"use client";

import { useState } from "react";

const DiagnosisForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    prefecture: "",
    floorArea: "",
    currentSituation: "",
    constructionType: "",
    phone: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/diagnoses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(`診断依頼を受け付けました。\n診断番号: ${result.data.diagnosisNumber}\n\n業者からの見積もりをお待ちください。`);

        // フォームをリセット
        setFormData({
          name: "",
          prefecture: "",
          floorArea: "",
          currentSituation: "",
          constructionType: "",
          phone: "",
          email: ""
        });
      } else {
        alert("送信に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      console.error("Error submitting diagnosis:", error);
      alert("送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <section id="diagnosis-form" className="relative bg-white py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* フォームカード */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          {/* カード内の背景画像 */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{backgroundImage: 'url(/diagnosis-bg.png)'}}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
          </div>

          {/* カード内コンテンツ */}
          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            {/* タイトル */}
            <div className="text-center mb-8 md:mb-10 animate-fadeIn">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 drop-shadow-2xl px-2">今すぐ無料診断</h2>
              <p className="text-sm md:text-base text-white/90 drop-shadow-lg px-2">
                簡単な質問にお答えいただくだけで、最適な業者をご紹介します
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* お名前 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                お名前 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="山田 太郎"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 placeholder-slate-400 transition-all duration-300"
                required
              />
            </div>

            {/* 都道府県 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                都道府県 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <select
                name="prefecture"
                value={formData.prefecture}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              >
                <option value="">選択してください</option>
                <option value="Hokkaido">北海道</option>
                <option value="Aomori">青森県</option>
                <option value="Iwate">岩手県</option>
                <option value="Miyagi">宮城県</option>
                <option value="Akita">秋田県</option>
                <option value="Yamagata">山形県</option>
                <option value="Fukushima">福島県</option>
                <option value="Ibaraki">茨城県</option>
                <option value="Tochigi">栃木県</option>
                <option value="Gunma">群馬県</option>
                <option value="Saitama">埼玉県</option>
                <option value="Chiba">千葉県</option>
                <option value="Tokyo">東京都</option>
                <option value="Kanagawa">神奈川県</option>
                <option value="Niigata">新潟県</option>
                <option value="Toyama">富山県</option>
                <option value="Ishikawa">石川県</option>
                <option value="Fukui">福井県</option>
                <option value="Yamanashi">山梨県</option>
                <option value="Nagano">長野県</option>
                <option value="Gifu">岐阜県</option>
                <option value="Shizuoka">静岡県</option>
                <option value="Aichi">愛知県</option>
                <option value="Mie">三重県</option>
                <option value="Shiga">滋賀県</option>
                <option value="Kyoto">京都府</option>
                <option value="Osaka">大阪府</option>
                <option value="Hyogo">兵庫県</option>
                <option value="Nara">奈良県</option>
                <option value="Wakayama">和歌山県</option>
                <option value="Tottori">鳥取県</option>
                <option value="Shimane">島根県</option>
                <option value="Okayama">岡山県</option>
                <option value="Hiroshima">広島県</option>
                <option value="Yamaguchi">山口県</option>
                <option value="Tokushima">徳島県</option>
                <option value="Kagawa">香川県</option>
                <option value="Ehime">愛媛県</option>
                <option value="Kochi">高知県</option>
                <option value="Fukuoka">福岡県</option>
                <option value="Saga">佐賀県</option>
                <option value="Nagasaki">長崎県</option>
                <option value="Kumamoto">熊本県</option>
                <option value="Oita">大分県</option>
                <option value="Miyazaki">宮崎県</option>
                <option value="Kagoshima">鹿児島県</option>
                <option value="Okinawa">沖縄県</option>
              </select>
            </div>

            {/* 延床面積 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                延床面積 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <select
                name="floorArea"
                value={formData.floorArea}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              >
                <option value="">選択してください</option>
                <option value="UNKNOWN">分からない</option>
                <option value="UNDER_80">80㎡未満</option>
                <option value="FROM_80_TO_100">80〜100㎡</option>
                <option value="FROM_100_TO_120">100〜120㎡</option>
                <option value="FROM_120_TO_140">120〜140㎡</option>
                <option value="FROM_140_TO_160">140〜160㎡</option>
                <option value="FROM_160_TO_180">160〜180㎡</option>
                <option value="FROM_180_TO_200">180〜200㎡</option>
                <option value="OVER_200">200㎡以上</option>
              </select>
            </div>

            {/* 現在の状況 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                現在の状況 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <select
                name="currentSituation"
                value={formData.currentSituation}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              >
                <option value="">選択してください</option>
                <option value="MARKET_RESEARCH">情報収集中</option>
                <option value="CONSIDERING_CONSTRUCTION">工事を検討中</option>
                <option value="COMPARING_CONTRACTORS">業者を比較中</option>
                <option value="READY_TO_ORDER">すぐに発注したい</option>
              </select>
            </div>

            {/* 工事種別 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                工事種別 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <select
                name="constructionType"
                value={formData.constructionType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              >
                <option value="">選択してください</option>
                <option value="EXTERIOR_PAINTING">外壁塗装</option>
                <option value="ROOF_PAINTING">屋根塗装</option>
                <option value="EXTERIOR_AND_ROOF">外壁・屋根塗装</option>
                <option value="PARTIAL_REPAIR">部分補修</option>
                <option value="WATERPROOFING">防水工事</option>
                <option value="SIDING_REPLACEMENT">サイディング張替</option>
                <option value="FULL_REPLACEMENT">全面改装</option>
              </select>
            </div>

            {/* 電話番号 */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                電話番号 <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="090-1234-5678"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 placeholder-gray-400 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              />
            </div>

            {/* メールアドレス */}
            <div className="group">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                メールアドレス <span className="text-[#f16f21] text-xs">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f16f21] focus:border-[#f16f21] text-slate-900 placeholder-gray-400 transition-all duration-300 hover:border-[#f16f21]/50 shadow-sm"
                required
              />
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="text-center pt-4 md:pt-6">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#f16f21] hover:bg-[#e05a10] text-white font-bold py-3.5 md:py-4 px-8 md:px-12 rounded-full text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              無料診断を開始する
            </button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisForm;
