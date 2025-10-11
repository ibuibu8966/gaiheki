const AboutServiceSection = () => {
  return (
    <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
      {/* 装飾的な背景 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* タイトル */}
        <div className="text-center mb-20">
          <p className="text-amber-400 text-sm font-bold mb-4 tracking-[0.3em] uppercase">About Service</p>
          <h2 className="font-serif text-5xl md:text-6xl font-black mb-10 text-white tracking-wide">外壁塗装の窓口について</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-12"></div>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl mb-4 text-gray-300 leading-relaxed tracking-wide">全国3,500社以上の厳選された建築専門業者とパートナーシップを構築し、</p>
            <p className="text-xl text-gray-300 leading-relaxed tracking-wide">完全中立の立場からお客様の条件に最適な施工会社を無料でご紹介する専門サービスです。</p>
          </div>
        </div>

        {/* 3つのカード */}
        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {/* お客様カード */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border-2 border-zinc-800 hover:border-amber-500/50 text-white rounded-3xl p-10 text-center shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-6 text-white tracking-wide">お客様</h3>
              <p className="text-base mb-3 text-gray-300 tracking-wide">外壁の悩みを相談したい</p>
              <p className="text-base text-gray-300 tracking-wide">適切な見積もりを比較したい</p>
            </div>
          </div>

          {/* 外壁塗装の窓口カード */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-amber-500 text-black rounded-3xl p-10 text-center shadow-[0_20px_60px_rgba(251,191,36,0.4)] transform group-hover:scale-105 transition-all duration-300">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-black text-amber-400 text-sm px-8 py-3 rounded-full font-black shadow-xl border-2 border-amber-400 tracking-wider">
                外壁塗装の窓口
              </div>
              <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mx-auto mb-8 mt-6 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <svg className="w-10 h-10 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="space-y-4 text-base">
                <div className="flex items-center text-left">
                  <svg className="w-6 h-6 text-black mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium tracking-wide">専門アドバイザーによる無料相談</span>
                </div>
                <div className="flex items-center text-left">
                  <svg className="w-6 h-6 text-black mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium tracking-wide">厳選された優良業者のみご紹介</span>
                </div>
                <div className="flex items-center text-left">
                  <svg className="w-6 h-6 text-black mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium tracking-wide">最大3社まで一括見積もり対応</span>
                </div>
              </div>
            </div>
          </div>

          {/* 認定パートナー業者カード */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border-2 border-zinc-800 hover:border-amber-500/50 text-white rounded-3xl p-10 text-center shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(251,191,36,0.5)]">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl font-bold mb-6 text-white tracking-wide">認定パートナー業者</h3>
              <p className="text-base text-gray-300 tracking-wide">高品質な施工をお約束</p>
            </div>
          </div>
        </div>

        {/* 底部のメッセージ */}
        <div className="text-center relative">
          <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-amber-500/50 rounded-3xl p-10 shadow-[0_0_50px_rgba(251,191,36,0.2)]">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl blur opacity-20"></div>
            <p className="relative font-serif text-2xl font-bold text-white tracking-wide leading-relaxed">
              品質重視の外壁塗装を、透明性のある適正価格でお届けします
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutServiceSection;