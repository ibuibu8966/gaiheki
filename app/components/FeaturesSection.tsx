const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      title: "高い顧客満足度97%を維持",
      description: "お客様からの高い評価をいただいており、継続的な品質向上に努めています。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
        </svg>
      ),
      title: "厳格な審査基準をクリアした優良業者のみ",
      description: "独自の審査基準により、技術力・信頼性の高い業者のみを厳選してご紹介します。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "施工後の保証制度も充実",
      description: "工事完了後も安心していただけるよう、充実した保証制度をご用意しています。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
      title: "専任コンシェルジュによる手厚いサポート",
      description: "専門知識を持つスタッフが、お客様のご要望から完工まで一貫してサポートします。"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: "中間マージン削減で適正価格を実現",
      description: "無駄な中間マージンを削減し、お客様により適正な価格でサービスを提供します。"
    }
  ];

  return (
    <section className="relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: 'url(/features-bg.jpg)'}}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* タイトル */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 animate-fadeIn drop-shadow-2xl px-4">
            選ばれる理由
          </h2>
        </div>

        {/* 特徴グリッド - 2行レイアウト */}
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* 上段：3つのカード */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={index}
                className="animate-fadeIn"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-8 shadow-md hover:shadow-xl hover:bg-white/60 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 下段：2つのカード（中央寄せ） */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <div
                key={index + 3}
                className="animate-fadeIn"
                style={{animationDelay: `${(index + 3) * 0.1}s`}}
              >
                <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-6 md:p-10 shadow-md hover:shadow-xl hover:bg-white/60 transition-all duration-300 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 md:mb-5 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 md:mb-3 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-800 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
