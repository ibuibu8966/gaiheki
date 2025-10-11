const HowToUseSection = () => {
  const steps = [
    {
      number: "1",
      title: "無料診断フォームに入力",
      description: "お住まいの状況や外壁の気になるポイントを簡単なフォームに入力。たった30秒で完了します。"
    },
    {
      number: "2",
      title: "専門アドバイザーがヒアリング",
      description: "経験豊富な専門スタッフが、お客様のご要望を丁寧にお伺いし、最適なプランをご提案いたします。"
    },
    {
      number: "3",
      title: "最適な業者をご紹介",
      description: "お客様のご希望に合わせて、厳選された優良業者の中から最適な施工店を2〜3社ご提案いたします。複数社の見積もり比較も可能です。"
    }
  ];

  return (
    <section className="relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: 'url(/how-to-use-bg.jpg)'}}
        ></div>
        <div className="absolute inset-0 bg-white/85"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* タイトル */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4 animate-fadeIn px-4">
            ご利用の手順
          </h2>
          <p className="text-sm md:text-base text-slate-600 animate-fadeIn px-4">
            簡単3ステップで、最適な業者をご紹介
          </p>
        </div>

        {/* ステップ */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-8 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center animate-fadeInUp" style={{animationDelay: `${0.1 + index * 0.1}s`}}>
                {/* ステップ番号 */}
                <div className="relative mb-6 md:mb-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-blue-600 rounded-full flex items-center justify-center bg-white shadow-lg relative z-10">
                    <span className="text-3xl md:text-4xl font-bold text-blue-600">{step.number}</span>
                  </div>

                  {/* 矢印（最後のステップ以外） - デスクトップのみ表示 */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100vw/3-6rem)] max-w-[200px] z-0">
                      <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
                          </marker>
                        </defs>
                        <line
                          x1="0"
                          y1="10"
                          x2="100"
                          y2="10"
                          stroke="#3b82f6"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          markerEnd={`url(#arrowhead-${index})`}
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* コンテンツカード */}
                <div className="w-full bg-white border-2 border-blue-100 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 md:mb-4 text-center">
                    {step.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
