"use client";

const HeroSection = () => {
  const scrollToDiagnosisForm = () => {
    const element = document.getElementById('diagnosis-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-12 md:py-20 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: 'url(/hero-bg.jpg)'}}
        />
        {/* オーバーレイ */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* メインビジュアル */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* 左側: キャッチコピーと統計情報 */}
          <div className="flex-1 w-full lg:w-1/2 animate-fadeIn" style={{animationDelay: '0.2s'}}>
            {/* メインキャッチコピー */}
            <div className="mb-6 md:mb-8">
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-4">
                信頼と安心の<br className="hidden sm:block"/>全国ネットワーク
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium drop-shadow-md">
                比較で納得、直営で安心
              </p>
            </div>

            {/* サブキャッチコピー */}
            <div className="mb-6 md:mb-10">
              <p className="text-base md:text-lg text-white/80 leading-relaxed">
                日本全国<span className="inline-block mx-1 px-2 py-1 bg-[#f16f21] text-white font-bold rounded">5,500社</span>以上の<br className="hidden sm:block"/>
                優良施工店をご紹介いたします
              </p>
            </div>

            {/* 統計情報 */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg inline-block">
              <div className="flex items-center gap-6 md:gap-10">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">利用者満足度</p>
                  <p className="text-3xl md:text-4xl font-bold text-[#f16f21]">
                    97<span className="text-xl">%</span>
                  </p>
                </div>

                <div className="w-px h-12 bg-gray-300"></div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">提携業者数</p>
                  <p className="text-3xl md:text-4xl font-bold text-[#f16f21]">
                    5,500<span className="text-lg">社</span>
                  </p>
                </div>

                <div className="w-px h-12 bg-gray-300"></div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">ご紹介実績</p>
                  <p className="text-3xl md:text-4xl font-bold text-[#f16f21]">
                    10万<span className="text-lg">件</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 右側: 簡易診断フォーム */}
          <div className="w-full lg:w-auto animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl max-w-md mx-auto lg:mx-0">
              {/* フォームヘッダー */}
              <div className="text-center mb-6">
                <div className="inline-block bg-[#f16f21] text-white text-sm font-bold px-4 py-1 rounded-full mb-3">
                  簡単60秒
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  無料相場診断
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  お電話での相談も受付中
                </p>
              </div>

              {/* CTAボタン */}
              <button
                onClick={scrollToDiagnosisForm}
                className="w-full bg-[#f16f21] hover:bg-[#e05a10] text-white font-bold py-4 px-6 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
              >
                今すぐ相場を診断する
              </button>

              {/* 電話番号 */}
              <div className="text-center border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-500 mb-1">お電話でのご相談</p>
                <a href="tel:0120-945-990" className="text-xl font-bold text-[#f16f21] hover:text-[#e05a10] transition-colors">
                  0120-945-990
                </a>
                <p className="text-xs text-gray-500 mt-1">受付時間 9:00〜18:00（土日祝除く）</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3つの特徴 */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">
          {/* 特徴1 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            <div className="w-16 h-16 mx-auto mb-4 bg-[#f16f21]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">専門アドバイザー在籍</h3>
            <p className="text-sm text-gray-600">外壁のプロが最適な施工店をご提案</p>
          </div>

          {/* 特徴2 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.7s'}}>
            <div className="w-16 h-16 mx-auto mb-4 bg-[#f16f21]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">優良施工店5,500社以上</h3>
            <p className="text-sm text-gray-600">厳選された信頼できる業者のみ</p>
          </div>

          {/* 特徴3 */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300 animate-fadeIn" style={{animationDelay: '0.8s'}}>
            <div className="w-16 h-16 mx-auto mb-4 bg-[#f16f21]/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">複数社の見積り比較</h3>
            <p className="text-sm text-gray-600">最大3社から無料でお見積り</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
