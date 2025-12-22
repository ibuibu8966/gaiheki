const HowToUseSection = () => {
  const steps = [
    {
      number: "1",
      title: "建物状況を入力",
      description: "お住まいの状況や外壁の気になるポイントを簡単なフォームに入力。たった60秒で完了します。",
      icon: (
        <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "2",
      title: "アドバイザーがご相談",
      description: "経験豊富な専門スタッフがお電話にてお客様のご要望を丁寧にお伺いし、最適なプランをご提案。",
      icon: (
        <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      number: "3",
      title: "施工店紹介・お見積り",
      description: "お客様のご希望に合わせて、厳選された優良業者の中から最適な施工店を最大3社ご紹介いたします。",
      icon: (
        <svg className="w-8 h-8 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            ご相談の<span className="text-[#f16f21]">流れ</span>
          </h2>
          <p className="text-gray-600">
            簡単3ステップで、最適な業者をご紹介
          </p>
        </div>

        {/* ステップ */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center animate-fadeIn" style={{animationDelay: `${index * 0.1}s`}}>
                {/* ステップ番号 */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 md:w-24 md:h-24 border-4 border-[#f16f21] rounded-full flex items-center justify-center bg-white shadow-lg relative z-10">
                    <span className="text-3xl md:text-4xl font-bold text-[#f16f21]">{step.number}</span>
                  </div>

                  {/* 矢印（最後のステップ以外） - デスクトップのみ表示 */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+3rem)] w-[calc(100vw/3-6rem)] max-w-[200px] z-0">
                      <svg className="w-full h-6" viewBox="0 0 100 20" preserveAspectRatio="none">
                        <defs>
                          <marker id={`arrowhead-${index}`} markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#f16f21" />
                          </marker>
                        </defs>
                        <line
                          x1="0"
                          y1="10"
                          x2="100"
                          y2="10"
                          stroke="#f16f21"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          markerEnd={`url(#arrowhead-${index})`}
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* コンテンツカード */}
                <div className="w-full bg-white border-2 border-[#f16f21]/20 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl hover:border-[#f16f21]/40 transition-all duration-300">
                  {/* アイコン */}
                  <div className="w-14 h-14 mx-auto mb-4 bg-[#f16f21]/10 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 text-center">
                    {step.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed text-center">
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
