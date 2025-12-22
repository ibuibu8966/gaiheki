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
    <section className="relative bg-slate-50 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* メインタイトル */}
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-900 animate-fadeInUp">
          外壁のお悩み、
          <br className="md:hidden" />
          今すぐ解決しませんか？
        </h2>

        {/* サブテキスト */}
        <p className="text-lg md:text-xl mb-10 text-slate-700 leading-relaxed animate-fadeInUp" style={{animationDelay: '0.1s'}}>
          無料診断で最適な業者をご紹介。安心の施工で住まいを美しく保護します。
        </p>

        {/* ボタンエリア */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <button
            onClick={scrollToDiagnosisForm}
            className="bg-[#f16f21] hover:bg-[#e05a10] text-white font-bold py-4 px-10 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            無料診断を始める
          </button>
          <Link
            href="/contact"
            className="border-2 border-[#f16f21] text-[#f16f21] hover:bg-[#f16f21] hover:text-white font-bold py-4 px-10 rounded-full text-base transition-all duration-300"
          >
            お電話で相談する
          </Link>
        </div>

        {/* 営業時間情報 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-slate-600 animate-fadeIn" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#f16f21]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>受付時間：平日 9:00～18:00</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-slate-300"></div>
          <div>
            <span>📧 メール相談は24時間受付</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
