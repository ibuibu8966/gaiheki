"use client";

import { useState } from "react";

interface Column {
  id: number;
  thumbnail: string;
  title: string;
  category: string;
  status: string;
  publishDate: string;
}

const ColumnsView = () => {
  const [columnFilter, setColumnFilter] = useState("すべて");
  const [columnSearch, setColumnSearch] = useState("");
  const [columns, setColumns] = useState<Column[]>([
    { id: 1, thumbnail: "/api/placeholder/100/60", title: "外壁塗装の基本知識：初心者向けガイド", category: "外壁塗装の基礎知識", status: "表示", publishDate: "2024年03月01日" },
    { id: 2, thumbnail: "/api/placeholder/100/60", title: "シリコン塗料とウレタン塗料の違いとは？", category: "塗料の種類と特徴", status: "非表示", publishDate: "2024年02月28日" }
  ]);

  const handleColumnStatusChange = (columnId: number, newStatus: string) => {
    setColumns(columns.map(column => 
      column.id === columnId ? { ...column, status: newStatus } : column
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">コラム管理</h2>
        </div>
        
        {/* ツールバー */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {/* ステータスフィルター */}
            <div className="flex space-x-2">
              {["すべて", "表示", "非表示"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setColumnFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    columnFilter === filter
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            {/* 新規作成ボタン */}
            <button className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium">
              新規作成
            </button>
            
            {/* 検索バー */}
            <div className="relative">
              <input
                type="text"
                value={columnSearch}
                onChange={(e) => setColumnSearch(e.target.value)}
                placeholder="コラム検索..."
                className="pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm w-64"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">サムネイル</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">タイトル</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">カテゴリ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {columns.filter(column => {
                const matchesFilter = columnFilter === "すべて" || column.status === columnFilter;
                const matchesSearch = column.title.toLowerCase().includes(columnSearch.toLowerCase());
                return matchesFilter && matchesSearch;
              }).map((column) => (
                <tr key={column.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {/* カラフルなタイル表示 */}
                      <div className="grid grid-cols-3 gap-1 w-12 h-8">
                        <div className="bg-blue-400 rounded-sm"></div>
                        <div className="bg-yellow-400 rounded-sm"></div>
                        <div className="bg-red-400 rounded-sm"></div>
                        <div className="bg-green-400 rounded-sm"></div>
                        <div className="bg-orange-400 rounded-sm"></div>
                        <div className="bg-blue-600 rounded-sm"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                    <div className="truncate">{column.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={column.status}
                      onChange={(e) => handleColumnStatusChange(column.id, e.target.value)}
                      className={`px-3 py-1 text-xs font-medium rounded-md border-0 ${
                        column.status === "表示" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <option value="表示">表示</option>
                      <option value="非表示">非表示</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {column.publishDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 text-sm">閲覧</button>
                      <select className="text-blue-600 border-0 bg-transparent text-sm">
                        <option>編集</option>
                      </select>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                        削除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ColumnsView;