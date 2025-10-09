"use client";

import { useEffect, useState } from "react";

interface PreviewData {
  title: string;
  category: string;
  categoryLabel: string;
  content: string;
  thumbnailImage: string;
}

export default function ArticlePreviewPage() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("articlePreview");
    if (data) {
      setPreviewData(JSON.parse(data));
    }
  }, []);

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">プレビューデータが見つかりません</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm">
        プレビューモード - このページは公開されていません
      </div>

      {/* 記事コンテンツ */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg my-8 rounded-lg overflow-hidden">
        {/* サムネイル画像 */}
        {previewData.thumbnailImage && (
          <div className="w-full h-96 overflow-hidden">
            <img
              src={previewData.thumbnailImage}
              alt={previewData.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* 記事本文 */}
        <div className="p-8">
          {/* カテゴリ */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
              {previewData.categoryLabel}
            </span>
          </div>

          {/* タイトル */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {previewData.title}
          </h1>

          {/* 本文 */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: previewData.content }}
          />
        </div>
      </div>
    </div>
  );
}
