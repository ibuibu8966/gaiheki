"use client";

const HeroSection = () => {
  const scrollToDiagnosisForm = () => {
    const element = document.getElementById('diagnosis-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 px-4 overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* メインコンテンツ */}
        <div className="text-center mb-16">
          {/* メインタイトル */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-white">外壁のお悩み、</span>
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
              すべて解決します。
            </span>
          </h1>

          {/* サービス名とバッジ */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-400/30 inline-block px-10 py-6 rounded-xl mb-12 shadow-2xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-amber-400 tracking-wide">プロタッチ外壁塗装</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-medium">利用者満足度<span className="text-amber-400 text-lg font-bold ml-1">97%</span></span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">提携業者数<span className="text-amber-400 text-lg font-bold ml-1">3,500社</span>超</span>
              </div>
            </div>
            <p className="text-sm mt-4 text-gray-400 font-light tracking-wider">信頼と実績の外壁塗装マッチングサービス</p>
          </div>
        </div>

        {/* 3つの特徴 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/50">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="flex items-center justify-center text-gray-200 text-lg font-medium">
              <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              透明な料金体系で安心
            </p>
          </div>
          <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/50">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="flex items-center justify-center text-gray-200 text-lg font-medium">
              <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              技術力の高い職人をご紹介
            </p>
          </div>
          <div className="text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-amber-400/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/50">
              <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
              </svg>
            </div>
            <p className="flex items-center justify-center text-gray-200 text-lg font-medium">
              <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              アフターフォローまで完全サポート
            </p>
          </div>
        </div>

        {/* 注記 */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500">※2024年度お客様満足度調査結果より</p>
        </div>

        {/* 診断フォームボックス */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-10 text-center shadow-2xl border-2 border-amber-400/20">
            <p className="text-amber-600 text-sm font-semibold mb-3 tracking-wider uppercase">無料診断はたった30秒！</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">今すぐ外壁の状態を<br />チェック</h3>
            <button
              onClick={scrollToDiagnosisForm}
              className="bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-black font-bold py-5 px-10 rounded-full text-xl w-full mb-6 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              無料診断を始める
            </button>
            <div className="flex items-center justify-center text-sm text-gray-700 bg-amber-50 rounded-lg py-3 px-4">
              <svg className="w-5 h-5 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">初回診断完了でQUOカード<span className="text-amber-600 font-bold">2,000円分</span>をプレゼント！</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;