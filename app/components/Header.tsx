"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const scrollToDiagnosisForm = () => {
    // トップページ以外にいる場合は、まずトップページに遷移
    if (pathname !== '/') {
      router.push('/#diagnosis-form');
      // 遷移後にスクロール
      setTimeout(() => {
        const element = document.getElementById('diagnosis-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // すでにトップページにいる場合は直接スクロール
      const element = document.getElementById('diagnosis-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const getLinkClass = (path: string) => {
    const baseClass = "px-2 py-2 text-sm font-medium transition-all duration-300";
    const activeClass = "text-amber-400 border-b-2 border-amber-400";
    const inactiveClass = "text-gray-300 hover:text-amber-400";

    return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
  };

  return (
    <header className="bg-black shadow-[0_4px_20px_rgba(251,191,36,0.15)] border-b border-amber-500/20 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="font-serif text-xl font-black bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 bg-clip-text text-transparent cursor-pointer tracking-wide hover:scale-105 transition-transform duration-300">外壁塗装の窓口</h1>
            </Link>
          </div>

          {/* ナビゲーションメニュー */}
          <nav className="hidden md:flex items-center space-x-6 whitespace-nowrap">
            <Link href="/#service-areas" className={getLinkClass('/#service-areas')}>
              施工店舗一覧
            </Link>
            <Link href="/columns" className={getLinkClass('/columns')}>
              外壁塗装コラム
            </Link>
            <Link href="/contact" className={getLinkClass('/contact')}>
              お問い合わせ
            </Link>
            <Link href="/partner-registration" className={getLinkClass('/partner-registration')}>
              加盟店様はこちら（登録）
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/auth/admin-login" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                管理者
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/auth/partner-login" className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300">
                加盟店様
              </Link>
            </div>
          </nav>

          {/* 電話番号と相談ボタン */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">お電話でのご相談はこちら</p>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-amber-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:0120-945-990" className="text-lg font-bold text-amber-400 hover:text-amber-300 transition-colors duration-300">
                  0120-945-990
                </a>
              </div>
            </div>
            <button
              onClick={scrollToDiagnosisForm}
              className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-black px-6 py-2 rounded-lg text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.6)] hover:scale-105"
            >
              今すぐ相談する
            </button>
          </div>

          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-amber-400 transition-colors duration-300 p-2"
              aria-label="メニュー"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-amber-500/20 py-4">
            <nav className="flex flex-col space-y-3 px-4">
              <Link
                href="/#service-areas"
                className="text-gray-300 hover:text-amber-400 py-2 text-sm font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                施工店舗一覧
              </Link>
              <Link
                href="/columns"
                className="text-gray-300 hover:text-amber-400 py-2 text-sm font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                外壁塗装コラム
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-amber-400 py-2 text-sm font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              <Link
                href="/partner-registration"
                className="text-gray-300 hover:text-amber-400 py-2 text-sm font-medium transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                加盟店様はこちら（登録）
              </Link>

              <div className="border-t border-amber-500/20 pt-3 mt-3">
                <p className="text-xs text-gray-400 mb-2">ログイン</p>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/auth/admin-login"
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    管理者ログイン
                  </Link>
                  <Link
                    href="/auth/partner-login"
                    className="text-gray-400 hover:text-amber-400 text-sm transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    加盟店様ログイン
                  </Link>
                </div>
              </div>

              <div className="border-t border-amber-500/20 pt-3 mt-3">
                <p className="text-xs text-gray-400 mb-2">お電話でのご相談</p>
                <a href="tel:0120-945-990" className="flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-300 py-2">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-bold">0120-945-990</span>
                </a>
                <button
                  onClick={() => {
                    scrollToDiagnosisForm();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-black px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 shadow-[0_4px_15px_rgba(251,191,36,0.4)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.6)] mt-2"
                >
                  今すぐ相談する
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;