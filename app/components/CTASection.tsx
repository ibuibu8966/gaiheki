"use client";

import Link from "next/link";

const CTASection = () => {
  const scrollToDiagnosisForm = () => {
    const element = document.getElementById('diagnosis-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative bg-black text-white py-24 px-4 overflow-hidden">
      {/* 装飾的な背景 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* メインタイトル */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl font-black mb-10 leading-tight tracking-wide">
          外壁のお悩み、<br className="md:hidden" />今すぐ解決しませんか？
        </h2>

        {/* サブテキスト */}
        <p className="text-xl md:text-2xl mb-12 text-gray-300 tracking-wide leading-relaxed">
          無料診断で最適な業者をご紹介。安心の施工で住まいを美しく保護します。
        </p>

        {/* ボタンエリア */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <button
            onClick={scrollToDiagnosisForm}
            className="relative bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-black font-black py-5 px-12 rounded-full text-xl transition-all duration-300 shadow-[0_10px_40px_rgba(251,191,36,0.5)] hover:shadow-[0_15px_50px_rgba(251,191,36,0.7)] hover:scale-105 tracking-wider"
          >
            無料診断を始める
          </button>
          <Link
            href="/contact"
            className="relative border-2 border-amber-400 text-white hover:bg-amber-400 hover:text-black font-bold py-5 px-12 rounded-full text-xl transition-all duration-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_10px_40px_rgba(251,191,36,0.5)] hover:scale-105 tracking-wider"
          >
            お電話で相談する
          </Link>
        </div>

        {/* 営業時間情報 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="tracking-wide">受付時間：平日 9:00～18:00</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center">
            <span className="tracking-wide">📧 メール相談は24時間受付</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;