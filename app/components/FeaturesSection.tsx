const FeaturesSection = () => {
  const features = [
    {
      title: "専門アドバイザー在籍",
      description: "外壁塗装のプロが、お客様のご要望に合わせて最適な施工店をご提案いたします。",
      icon: (
        <svg className="w-10 h-10 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "優良施工店5,500社以上",
      description: "厳格な審査基準をクリアした信頼できる優良業者のみをご紹介しています。",
      icon: (
        <svg className="w-10 h-10 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "複数社の見積り比較",
      description: "最大3社から無料でお見積りを取得でき、比較検討が可能です。",
      icon: (
        <svg className="w-10 h-10 text-[#f16f21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#f7f4f0] py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            選ばれる<span className="text-[#f16f21]">3つ</span>の理由
          </h2>
          <p className="text-gray-600">
            外壁塗装の窓口が多くのお客様から選ばれる理由
          </p>
        </div>

        {/* 特徴グリッド - 3列 */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center animate-fadeIn"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              {/* 円形アイコン */}
              <div className="w-20 h-20 mx-auto mb-6 bg-[#f16f21]/10 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>

              {/* タイトル */}
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>

              {/* 説明文 */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
