const HowToUseSection = () => {
  const steps = [
    {
      number: "1",
      title: "無料診断フォームに入力",
      description: "お住まいの築年数、外壁の材質、気になる箇所などを簡単なフォームに入力いただきます。スマホからでも30秒で完了します。"
    },
    {
      number: "2", 
      title: "専門スタッフによる詳細ヒアリング",
      description: "外壁塗装の専門知識を持つスタッフが、お客様のご要望や予算について詳しくお聞きします。半数分程度でもお気軽にご相談ください。"
    },
    {
      number: "3",
      title: "最適な施工業者をマッチング", 
      description: "お客様のご希望に合わせて、厳選された優良業者の中から最適な施工店を2〜3社ご提案いたします。複数社の見積もり比較も可能です。"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-20">
          <p className="text-amber-600 text-sm font-bold mb-4 tracking-[0.3em] uppercase">How To Use</p>
          <h2 className="font-serif text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-wide">ご利用の手順</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
        </div>

        {/* ステップ */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* ステップ番号 */}
              <div className="relative mb-10">
                <div className="w-28 h-28 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(251,191,36,0.5)]">
                  <span className="font-serif text-5xl font-black text-black">{step.number}</span>
                </div>
                {/* 矢印（最後のステップ以外） */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-1/2 transform translate-x-12 w-20 h-1 bg-gradient-to-r from-amber-400 to-amber-500"></div>
                )}
              </div>

              {/* コンテンツ */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-amber-400/50">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 leading-tight tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed tracking-wide">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;