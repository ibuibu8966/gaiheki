const AboutServiceSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-50 text-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-16">
          <p className="text-amber-600 text-sm font-semibold mb-3 tracking-widest uppercase">About Service</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">外壁塗装の窓口について</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8"></div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-3 text-gray-700 leading-relaxed">全国3,500社以上の厳選された建築専門業者とパートナーシップを構築し、</p>
            <p className="text-lg text-gray-700 leading-relaxed">完全中立の立場からお客様の条件に最適な施工会社を無料でご紹介する専門サービスです。</p>
          </div>
        </div>

        {/* 3つのカード */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* お客様カード */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">お客様</h3>
            <p className="text-sm mb-2 text-gray-600">外壁の悩みを相談したい</p>
            <p className="text-sm text-gray-600">適切な見積もりを比較したい</p>
          </div>

          {/* 外壁塗装の窓口カード */}
          <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-8 text-center relative shadow-2xl border-2 border-amber-400/50 transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-sm px-6 py-2 rounded-full font-bold shadow-lg">
              外壁塗装の窓口
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-6 shadow-lg shadow-amber-500/50">
              <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-left">
                <svg className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">専門アドバイザーによる無料相談</span>
              </div>
              <div className="flex items-center text-left">
                <svg className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">厳選された優良業者のみご紹介</span>
              </div>
              <div className="flex items-center text-left">
                <svg className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-200">最大3社まで一括見積もり対応</span>
              </div>
            </div>
          </div>

          {/* 認定パートナー業者カード */}
          <div className="bg-white text-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">認定パートナー業者</h3>
            <p className="text-sm text-gray-600">高品質な施工をお約束</p>
          </div>
        </div>

        {/* 底部のメッセージ */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg border border-amber-400/30">
          <p className="text-xl font-medium text-gray-900">
            品質重視の外壁塗装を、透明性のある適正価格でお届けします
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutServiceSection;