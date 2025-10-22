const FeaturesSection = () => {
  const features = [
    {
      icon: "/icons/star.jpg",
      title: "高い顧客満足度97%を維持",
      description: "お客様からの高い評価をいただいており、継続的な品質向上に努めています。"
    },
    {
      icon: "/icons/check.jpg",
      title: "厳格な審査基準をクリアした優良業者のみ",
      description: "独自の審査基準により、技術力・信頼性の高い業者のみを厳選してご紹介します。"
    },
    {
      icon: "/icons/home2.jpg",
      title: "施工後の保証制度も充実",
      description: "工事完了後も安心していただけるよう、充実した保証制度をご用意しています。"
    },
    {
      icon: "/icons/profs.jpg",
      title: "専任コンシェルジュによる手厚いサポート",
      description: "専門知識を持つスタッフが、お客様のご要望から完工まで一貫してサポートします。"
    },
    {
      icon: "/icons/doll.jpg",
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
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                      <img src={feature.icon} alt={feature.title} className="w-full h-full object-cover rounded-lg" />
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
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-4 md:mb-5">
                      <img src={feature.icon} alt={feature.title} className="w-full h-full object-cover rounded-lg" />
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
