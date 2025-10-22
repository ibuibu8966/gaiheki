"use client";

const HeroSection = () => {
  const scrollToDiagnosisForm = () => {
    const element = document.getElementById('diagnosis-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: 'url(/hero-bg.jpg)'}}
        />
        {/* 黒いオーバーレイでぼかし効果 */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* メインビジュアル - 重なり合うレイアウト */}
        <div className="relative mb-16 md:mb-32 min-h-[500px] md:min-h-[700px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* 左側: サブキャッチコピーと統計情報 */}
          <div className="flex-1 w-full animate-fadeIn" style={{animationDelay: '0.2s'}}>
            {/* サブキャッチコピー */}
            <div className="mb-8 md:mb-16">
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light drop-shadow-lg">
                日本全国<span className="inline-block mx-1 md:mx-2 px-3 py-1 md:px-4 md:py-2 bg-white text-slate-900 font-bold text-xl md:text-2xl lg:text-3xl rounded-lg md:rounded-xl shadow-xl">3,500社</span>の厳選された職人が<br className="hidden md:block"/>
                あなたの大切な住まいを最高の品質で守ります
              </p>
            </div>

            {/* 統計情報 */}
            <div className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-2xl md:rounded-3xl p-6 md:p-8 modern-shadow-lg w-full md:inline-block">
              <div className="flex items-center justify-around gap-6 md:gap-12">
                <div className="text-center">
                  <p className="text-xs text-slate-600 tracking-wider mb-2 md:mb-3 font-semibold uppercase">利用者満足度</p>
                  <p className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    97<span className="text-2xl md:text-3xl lg:text-4xl">%</span>
                  </p>
                </div>

                <div className="w-px h-16 md:h-20 bg-gradient-to-b from-transparent via-slate-300 to-transparent"></div>

                <div className="text-center">
                  <p className="text-xs text-slate-600 tracking-wider mb-2 md:mb-3 font-semibold uppercase">提携業者数</p>
                  <p className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                    3,500<span className="text-xl md:text-2xl lg:text-3xl">社</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 中央寄り: 縦書きタイトル */}
          <div className="animate-fadeInUp mr-0 md:mr-16 lg:mr-32">
            <div className="flex items-start gap-4 md:gap-6 lg:gap-8">
              {/* 縦書きタイトル - すべて解決します */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl" style={{writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.2em', textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
                すべて解決します
              </h1>

              {/* 縦書きタイトル - 外壁のお悩み */}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white drop-shadow-2xl" style={{writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '0.2em', textShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
                外壁のお悩み
              </h1>
            </div>
          </div>

        </div>


        {/* 3つの特徴 - シンプルでヒューマンなデザイン */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 md:mb-32">
          {/* カード1 */}
          <div className="group text-center relative animate-fadeIn" style={{animationDelay: '0.8s'}}>
            <div className="relative bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-10 transition-all duration-300 shadow-md hover:shadow-lg hover:bg-white/60">
              {/* アイコン */}
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                <img src="/icons/home.jpg" alt="料金システム" className="w-14 h-14 object-cover rounded-lg" />
              </div>

              {/* タイトル */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                完全透明な
                <br/>
                料金システム
              </h3>

              {/* 説明文 */}
              <p className="text-sm text-slate-800 leading-relaxed">
                追加費用は一切なし。
                <br/>
                明瞭会計で安心の品質をお約束
              </p>
            </div>
          </div>

          {/* カード2 */}
          <div className="group text-center relative animate-fadeIn" style={{animationDelay: '0.9s'}}>
            <div className="relative bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-10 transition-all duration-300 shadow-md hover:shadow-lg hover:bg-white/60">
              {/* アイコン */}
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                <img src="/icons/prof.jpg" alt="プロフェッショナル" className="w-14 h-14 object-cover rounded-lg" />
              </div>

              {/* タイトル */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                厳選された
                <br/>
                プロフェッショナル
              </h3>

              {/* 説明文 */}
              <p className="text-sm text-slate-800 leading-relaxed">
                豊富な実績と確かな技術を持つ
                <br/>
                一流職人のみをご紹介
              </p>
            </div>
          </div>

          {/* カード3 */}
          <div className="group text-center relative animate-fadeIn" style={{animationDelay: '1s'}}>
            <div className="relative bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-10 transition-all duration-300 shadow-md hover:shadow-lg hover:bg-white/60">
              {/* アイコン */}
              <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center">
                <img src="/icons/bookmark.jpg" alt="アフターケア" className="w-14 h-14 object-cover rounded-lg" />
              </div>

              {/* タイトル */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                万全の
                <br/>
                アフターケア体制
              </h3>

              {/* 説明文 */}
              <p className="text-sm text-slate-800 leading-relaxed">
                施工後も末永く。
                <br/>
                充実の保証とサポートで安心
              </p>
            </div>
          </div>
        </div>

        {/* 診断フォームボックス - シンプルなデザイン */}
        <div className="max-w-3xl mx-auto animate-fadeIn" style={{animationDelay: '1.2s'}}>
          <div className="relative bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-5">
              今すぐ外壁の状態を<span className="text-blue-600">チェック</span>
            </h3>

            <button
              onClick={scrollToDiagnosisForm}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-3.5 px-8 md:px-12 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              無料診断を始める
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
