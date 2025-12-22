const AboutServiceSection = () => {
  return (
    <section className="relative bg-white py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 px-2">
            業界の"常識"を変える、透明なプラットフォーム
          </h2>
        </div>

        {/* メインコンテンツ */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center mb-16">
          {/* 左側：画像 */}
          <div className="relative order-1">
            <div
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-cover bg-center bg-no-repeat rounded-xl shadow-xl"
              style={{backgroundImage: 'url(/about-service-bg.jpg)'}}
            ></div>
          </div>

          {/* 右側：カード */}
          <div className="space-y-4 md:space-y-5 order-2">
            {/* カード1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4">紹介だけで費用がかかる仕組みをやめました</h4>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3 md:mb-4">
                一般的な見積サイトでは、受注が決まる前の"紹介"だけで、施工会社→紹介元へ数万円〜十数万円の手数料が発生し、見積りに価格転嫁されがち。私たちはこの前提を見直しています。
              </p>
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安心：</span>手数料都合の押し込みが起きにくく、納得いくまで比較できる。</p>
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安い：</span>余計な紹介コストが乗りにくく、見積りが適正価格に近づく。</p>
              </div>
            </div>

            {/* カード2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4">"多重下請け"で間を抜かれない、施工店と直結</h4>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3 md:mb-4">
                何社も通して仕事が下ろされると、途中で中間マージンが差し引かれ、いわゆる<span className="font-bold">"間を抜かれる"</span>状態に。私たちは<span className="font-bold">一次施工店と直接</span>つながる前提で、価格と責任の見通しを良くします。
              </p>
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安心：</span>誰が工事するか、責任の所在と品質が明確。</p>
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安い：</span>中間マージンを最小化し、同じ予算でも材料・手間に再配分できる。</p>
              </div>
            </div>

            {/* カード3 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 lg:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4">一度の入力で複数社、内訳まで横並び比較</h4>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3 md:mb-4">
                条件入力は1回。下地補修、塗料グレード、足場、保証などを同一フォーマットで見比べられます。
              </p>
              <div className="space-y-1.5 md:space-y-2">
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安心：</span><span className="font-bold">"なぜ安い／高い"</span>が内訳で分かり、納得して選べる。</p>
                <p className="text-xs md:text-sm text-slate-800"><span className="font-bold text-[#f16f21]">だから安い：</span>同一条件の健全な競争で、相場から外れた高値を避けやすい。</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutServiceSection;
