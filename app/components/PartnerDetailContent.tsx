"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DesignatedDiagnosisForm from "./DesignatedDiagnosisForm";

interface Review {
  customerName: string;
  rating: number | null;
  reviewTitle: string | null;
  review: string | null;
  reviewDate: string | null;
  constructionType: string;
  constructionAmount: number;
}

interface PartnerDetail {
  id: number;
  companyName: string;
  address: string;
  phoneNumber: string;
  faxNumber: string | null;
  websiteUrl: string | null;
  representativeName: string;
  businessDescription: string;
  appealText: string;
  businessHours: string | null;
  closedDays: string | null;
  averageRating: number;
  reviewCount: number;
  supportedPrefectures: string[];
  reviews: Review[];
}

interface PartnerDetailContentProps {
  partnerId: string;
}

const PartnerDetailContent = ({ partnerId }: PartnerDetailContentProps) => {
  const [partner, setPartner] = useState<PartnerDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartnerDetail();
  }, [partnerId]);

  const fetchPartnerDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/partners/${partnerId}`);
      const result = await response.json();

      if (result.success) {
        setPartner(result.data);
      } else {
        console.error("Failed to fetch partner detail:", result.error);
      }
    } catch (error) {
      console.error("Error fetching partner detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-detail">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#e5e7eb" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path fill="url(#half-detail)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  const getConstructionTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      EXTERIOR_PAINTING: "外壁塗装",
      ROOF_PAINTING: "屋根塗装",
      EXTERIOR_AND_ROOF: "外壁・屋根塗装",
      PARTIAL_REPAIR: "部分補修",
      WATERPROOFING: "防水工事",
      SIDING_REPLACEMENT: "サイディング張替",
      FULL_REPLACEMENT: "全面改装"
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-xl text-gray-600">加盟店が見つかりませんでした</p>
          <Link href="/" className="mt-6 inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* パンくずナビ */}
        <nav className="mb-6">
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">加盟店一覧に戻る</span>
          </Link>
        </nav>

        {/* メインコンテンツ */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 左カラム: 会社情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 会社名と評価 */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {partner.companyName}
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    {renderStars(partner.averageRating)}
                    <span className="text-2xl font-bold text-gray-900">
                      {partner.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    {partner.reviewCount}件のレビュー
                  </span>
                </div>

                {/* アピール文章 */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 p-5 rounded-r-lg mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-800 leading-relaxed">{partner.appealText}</p>
                  </div>
                </div>

                {/* 事業内容 */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    事業内容
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{partner.businessDescription}</p>
                </div>
              </div>
            </div>

            {/* レビュー */}
            {partner.reviews.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    お客様の声
                  </h2>
                  <div className="space-y-8">
                    {partner.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {review.rating && renderStars(review.rating)}
                              <span className="text-sm font-medium text-gray-900">{review.rating?.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span className="font-medium">{review.customerName} さん</span>
                              <span className="text-gray-400">•</span>
                              <span>{review.reviewDate}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {getConstructionTypeLabel(review.constructionType)}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              ¥{review.constructionAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {review.reviewTitle && (
                          <h3 className="font-bold text-gray-900 mb-2 text-lg">
                            {review.reviewTitle}
                          </h3>
                        )}
                        {review.review && (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                            {review.review}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 右カラム: 連絡先・営業情報 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 連絡先 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  会社情報
                </h2>

                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">代表者</p>
                    <p className="font-semibold text-gray-900">{partner.representativeName}</p>
                  </div>

                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">所在地</p>
                    <p className="text-gray-800 text-sm leading-relaxed">{partner.address}</p>
                  </div>

                  <div className="pb-4 border-b border-gray-100">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">電話番号</p>
                    <a href={`tel:${partner.phoneNumber}`} className="text-xl font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2 group">
                      <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {partner.phoneNumber}
                    </a>
                  </div>

                  {partner.faxNumber && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">FAX番号</p>
                      <p className="text-gray-800 font-medium">{partner.faxNumber}</p>
                    </div>
                  )}

                  {partner.businessHours && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">営業時間</p>
                      <p className="text-gray-800 font-medium">{partner.businessHours}</p>
                    </div>
                  )}

                  {partner.closedDays && (
                    <div className="pb-4 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">定休日</p>
                      <p className="text-gray-800 font-medium">{partner.closedDays}</p>
                    </div>
                  )}

                  {partner.websiteUrl && (
                    <div className="pt-2">
                      <a
                        href={partner.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-all hover:shadow-sm"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        公式サイトを見る
                      </a>
                    </div>
                  )}

                  {partner.supportedPrefectures.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        対応エリア
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {partner.supportedPrefectures.map((pref, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-medium border border-gray-200"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <a
                      href="#diagnosis-form"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      無料診断を申し込む
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 診断申込フォーム */}
        <div id="diagnosis-form" className="mt-12 scroll-mt-8">
          <DesignatedDiagnosisForm
            partnerId={partner.id}
            partnerName={partner.companyName}
            supportedPrefectures={partner.supportedPrefectures}
            onSuccess={() => {
              alert('診断依頼を受け付けました');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailContent;
