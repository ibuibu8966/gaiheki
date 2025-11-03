"use client";

import Image from 'next/image';

const BeforeAfterSection = () => {
  const cases = [
    {
      id: 1,
      title: "外壁塗装（一般住宅）",
      description: "経年劣化による色褪せとひび割れを修復。美観と耐久性を回復しました。",
      before: "/before-after/1before.jpg",
      after: "/before-after/1after.jpg",
    },
    {
      id: 2,
      title: "外壁塗装（一般住宅）",
      description: "汚れと色褪せが目立っていた外壁を一新。建物全体の印象が大きく変わりました。",
      before: "/before-after/2before.jpg",
      after: "/before-after/2after.jpg",
    },
    {
      id: 3,
      title: "外壁塗装（一般住宅）",
      description: "古くなった外壁を塗り替え。清潔感のある美しい外観に生まれ変わりました。",
      before: "/before-after/3before.jpg",
      after: "/before-after/3after.jpg",
    },
    {
      id: 4,
      title: "外壁塗装（一般住宅）",
      description: "経年による劣化が進んでいた外壁を修復。防水性能も向上しました。",
      before: "/before-after/4before.jpg",
      after: "/before-after/4after.jpg",
    },
    {
      id: 5,
      title: "屋根塗装（遮熱・断熱塗料）",
      description: "遮熱・断熱塗料を使用した屋根塗装。赤外線サーモカメラで施工後の温度低減効果を確認しました。",
      before: "/before-after/5before.jpg",
      after: "/before-after/5after.jpg",
      isSpecial: true,
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            施工事例
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            実際の施工現場のビフォーアフター写真をご覧ください
          </p>
        </div>

        {/* 事例一覧 */}
        <div className="space-y-12 md:space-y-16">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* 画像比較エリア */}
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before */}
                <div className="relative group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={caseItem.before}
                      alt={`${caseItem.title} - 施工前`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                      施工前
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="relative group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-100">
                    <Image
                      src={caseItem.after}
                      alt={`${caseItem.title} - 施工後`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg z-10">
                      施工後
                    </div>
                  </div>
                </div>
              </div>

              {/* 説明エリア */}
              <div className="p-6 md:p-8 border-t border-gray-100">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {caseItem.title}
                      </h3>
                      {caseItem.isSpecial && (
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          サーモカメラ撮影
                        </span>
                      )}
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                      {caseItem.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      事例 {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
