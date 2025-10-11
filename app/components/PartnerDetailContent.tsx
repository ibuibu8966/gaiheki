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
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);

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
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg className="w-6 h-6 text-yellow-400" viewBox="0 0 20 20">
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
          <svg key={`empty-${i}`} className="w-6 h-6 text-gray-300 fill-current" viewBox="0 0 20 20">
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-gray-500">読み込み中...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 text-lg">加盟店が見つかりませんでした。</p>
            <Link href="/" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* パンくずナビ */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            ホームに戻る
          </Link>
        </div>

        {/* メインコンテンツ */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左カラム: 会社情報 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 会社名と評価 */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {partner.companyName}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                {renderStars(partner.averageRating)}
                <span className="text-xl font-semibold text-gray-700">
                  {partner.averageRating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({partner.reviewCount}件のレビュー)
                </span>
              </div>

              {/* アピール文章 */}
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
                <p className="text-gray-800">{partner.appealText}</p>
              </div>

              {/* 事業内容 */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">事業内容</h2>
                <p className="text-gray-700 whitespace-pre-line">{partner.businessDescription}</p>
              </div>
            </div>

            {/* レビュー */}
            {partner.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">お客様の声</h2>
                <div className="space-y-6">
                  {partner.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            {review.rating && renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-gray-600">
                            {review.customerName} さん | {review.reviewDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {getConstructionTypeLabel(review.constructionType)}
                          </p>
                          <p className="text-sm font-medium text-gray-700">
                            {review.constructionAmount.toLocaleString()}円
                          </p>
                        </div>
                      </div>
                      {review.reviewTitle && (
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {review.reviewTitle}
                        </h3>
                      )}
                      {review.review && (
                        <p className="text-gray-700 whitespace-pre-line">
                          {review.review}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 右カラム: 連絡先・営業情報 */}
          <div className="space-y-6">
            {/* 連絡先 */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">会社情報</h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">代表者</p>
                  <p className="font-medium text-gray-800">{partner.representativeName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">所在地</p>
                  <p className="text-gray-800">{partner.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">電話番号</p>
                  <p className="text-lg font-semibold text-orange-600">
                    {partner.phoneNumber}
                  </p>
                </div>

                {partner.faxNumber && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">FAX番号</p>
                    <p className="text-gray-800">{partner.faxNumber}</p>
                  </div>
                )}

                {partner.businessHours && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">営業時間</p>
                    <p className="text-gray-800">{partner.businessHours}</p>
                  </div>
                )}

                {partner.closedDays && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">定休日</p>
                    <p className="text-gray-800">{partner.closedDays}</p>
                  </div>
                )}

                {partner.websiteUrl && (
                  <div className="pt-4">
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gray-100 hover:bg-gray-200 text-center text-gray-700 font-medium py-3 rounded-lg transition-colors"
                    >
                      公式サイトを見る
                    </a>
                  </div>
                )}

                <div className="pt-4">
                  <button
                    onClick={() => setShowDiagnosisForm(!showDiagnosisForm)}
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-center text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    {showDiagnosisForm ? "フォームを閉じる" : "無料診断を申し込む"}
                  </button>
                </div>
              </div>
            </div>

            {/* 診断フォーム */}
            {showDiagnosisForm && (
              <DesignatedDiagnosisForm
                partnerId={partner.id}
                partnerName={partner.companyName}
                onSuccess={() => setShowDiagnosisForm(false)}
              />
            )}

            {/* 対応エリア */}
            {partner.supportedPrefectures.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">対応エリア</h2>
                <div className="flex flex-wrap gap-2">
                  {partner.supportedPrefectures.map((pref, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailContent;
