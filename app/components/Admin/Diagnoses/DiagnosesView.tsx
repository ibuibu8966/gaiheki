"use client";

import { useState } from "react";

interface Diagnosis {
  id: string;
  customerName: string;
  age: string;
  issue: string;
  workType: string;
  requestDate: string;
  status: string;
  isUrgent: boolean;
}

const DiagnosesView = () => {
  const [diagnosisFilter, setDiagnosisFilter] = useState("すべて");

  const [diagnoses] = useState<Diagnosis[]>([
    { id: "GH-00001", customerName: "高橋太", age: "101～150平米 (31～45坪)", issue: "劣化が少し気になる", workType: "外壁全面の塗装", requestDate: "2024年03月01日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00002", customerName: "田中陽", age: "51～100平米 (16～30坪)", issue: "色褪せや汚れが気になる", workType: "屋根の塗装", requestDate: "2024年02月28日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00003", customerName: "鈴木賢", age: "151～200平米 (46～61坪)", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年02月25日", status: "対応中", isUrgent: false },
    { id: "GH-00004", customerName: "千葉真", age: "201～250平米 (61～76坪)", issue: "ひび割れや破損したところがある", workType: "補修・防水", requestDate: "2024年02月20日", status: "対応中", isUrgent: false },
    { id: "GH-00005", customerName: "東京悟", age: "～50平米 (15坪) 以下", issue: "工事中心", workType: "外壁の塗り替え（サイディング）", requestDate: "2024年02月18日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00006", customerName: "大阪昭", age: "251～300平米 (76～91坪)", issue: "工事をも考えた", workType: "屋根の塗り替え（屋根替え）", requestDate: "2024年02月10日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00007", customerName: "横浜慎", age: "301～350平米 (91～106坪)", issue: "劣化が少し気になる", workType: "全面の塗り替え", requestDate: "2024年02月05日", status: "対応中", isUrgent: false },
    { id: "GH-00008", customerName: "名古屋真", age: "351～400平米 (106～121坪)", issue: "色褪せや汚れが気になる", workType: "外壁塗装", requestDate: "2024年01月30日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00009", customerName: "神戸賢", age: "401～450平米 (121～136坪)", issue: "ひび割れや破損したところがある", workType: "屋根の塗装", requestDate: "2024年01月25日", status: "見積もり完了", isUrgent: false },
    { id: "GH-00010", customerName: "京都健", age: "451～500平米 (136～151坪)", issue: "工事中心", workType: "外壁全面の塗装", requestDate: "2024年01月20日", status: "対応中", isUrgent: false },
    { id: "GH-00011", customerName: "北海道太", age: "501平米 (152坪) 以上", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年01月18日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00012", customerName: "青森賢", age: "わからない", issue: "劣化が少し気になる", workType: "屋根の塗装", requestDate: "2024年01月15日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00013", customerName: "岩手健", age: "101～150平米 (31～45坪)", issue: "色褪せや汚れが気になる", workType: "外壁の塗装", requestDate: "2024年01月05日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00014", customerName: "秋田真", age: "151～200平米 (46～61坪)", issue: "ひび割れや破損したところがある", workType: "外壁の塗り替え（サイディング）", requestDate: "2023年12月30日", status: "見積もり対応完了", isUrgent: true },
    { id: "GH-00015", customerName: "山形昭", age: "201～250平米 (61～76坪)", issue: "工事中心", workType: "屋根の塗り替え（屋根替え）", requestDate: "2023年12月25日", status: "見積もり完了", isUrgent: false }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">診断管理</h2>
        </div>
        
        {/* ステータスフィルタータブ */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-2">
            {["すべて", "業者選定", "見積もり対応中", "見積もり対応完了", "見積もり完了"].map((filter) => (
              <button
                key={filter}
                onClick={() => setDiagnosisFilter(filter)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  diagnosisFilter === filter
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">診断ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">顧客名</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">延床面積</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">現在の状況</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工事箇所</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">診断依頼日</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">詳細</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">見積もり詳細</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {diagnoses.filter(diagnosis => {
                return diagnosisFilter === "すべて" || diagnosis.status === diagnosisFilter;
              }).map((diagnosis) => (
                <tr key={diagnosis.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {diagnosis.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {diagnosis.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {diagnosis.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {diagnosis.issue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {diagnosis.workType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {diagnosis.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-md ${
                      diagnosis.status === "業者選定" ? "bg-blue-100 text-blue-800" :
                      diagnosis.status === "見積もり対応中" || diagnosis.status === "対応中" ? "bg-yellow-100 text-yellow-800" :
                      diagnosis.status === "見積もり対応完了" ? "bg-yellow-100 text-yellow-800" :
                      diagnosis.status.includes("見積もり完了") ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {diagnosis.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">詳細</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">見積もり詳細</button>
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

export default DiagnosesView;