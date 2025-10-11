"use client";

const HeroSection = () => {
  const scrollToDiagnosisForm = () => {
    const element = document.getElementById('diagnosis-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
      {/* 装飾的な背景要素 - より控えめに */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* メインコンテンツ */}
        <div className="text-center mb-20">
          {/* メインタイトル */}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl font-black mb-12 leading-tight tracking-wider">
            <span className="block text-white drop-shadow-2xl">外壁のお悩み、</span>
            <span className="block bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
              すべて解決します。
            </span>
          </h1>

          {/* サービス名とバッジ */}
          <div className="relative bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-amber-500/50 inline-block px-12 py-8 rounded-2xl mb-16 shadow-[0_0_50px_rgba(251,191,36,0.3)] backdrop-blur-sm">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-2xl blur opacity-20"></div>
            <h2 className="relative font-serif text-4xl font-black mb-8 text-amber-400 tracking-[0.2em]">プロタッチ外壁塗装</h2>
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-8 text-base">
              <div className="flex items-center text-gray-200">
                <svg className="w-6 h-6 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium tracking-wide">利用者満足度<span className="text-amber-400 text-2xl font-bold ml-2">97%</span></span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"></div>
              <div className="flex items-center text-gray-200">
                <svg className="w-6 h-6 mr-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium tracking-wide">提携業者数<span className="text-amber-400 text-2xl font-bold ml-2">3,500社</span>超</span>
              </div>
            </div>
            <p className="relative text-sm mt-6 text-gray-400 font-light tracking-[0.3em]">信頼と実績の外壁塗装マッチングサービス</p>
          </div>
        </div>

        {/* 3つの特徴 */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          <div className="group text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-100 text-lg font-medium tracking-wide leading-relaxed">透明な料金体系で安心</p>
            </div>
          </div>
          <div className="group text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-100 text-lg font-medium tracking-wide leading-relaxed">技術力の高い職人をご紹介</p>
            </div>
          </div>
          <div className="group text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-8 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(251,191,36,0.5)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 text-black" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
                </svg>
              </div>
              <p className="text-gray-100 text-lg font-medium tracking-wide leading-relaxed">アフターフォローまで完全サポート</p>
            </div>
          </div>
        </div>

        {/* 注記 */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-600 tracking-wider">※2024年度お客様満足度調査結果より</p>
        </div>

        {/* 診断フォームボックス */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-white via-amber-50 to-white rounded-3xl p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-2 border-amber-400/30">
            <div className="absolute -inset-px bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-3xl blur-sm opacity-20"></div>
            <p className="relative text-amber-700 text-sm font-bold mb-4 tracking-[0.3em] uppercase">無料診断はたった30秒！</p>
            <h3 className="relative font-serif text-4xl font-black text-gray-900 mb-10 leading-tight tracking-wide">今すぐ外壁の状態を<br />チェック</h3>
            <button
              onClick={scrollToDiagnosisForm}
              className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-black font-black py-6 px-12 rounded-full text-2xl w-full mb-8 transition-all duration-300 shadow-[0_10px_40px_rgba(251,191,36,0.5)] hover:shadow-[0_15px_50px_rgba(251,191,36,0.7)] hover:scale-105 tracking-wider"
            >
              無料診断を始める
            </button>
            <div className="relative flex items-center justify-center text-sm text-gray-800 bg-white/80 backdrop-blur-sm rounded-2xl py-4 px-6 shadow-lg border border-amber-400/20">
              <svg className="w-6 h-6 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-bold tracking-wide">初回診断完了でQUOカード<span className="text-amber-700 font-black text-lg mx-1">2,000円分</span>をプレゼント！</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;