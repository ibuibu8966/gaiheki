"use client";

import { useState } from "react";
import Link from "next/link";

interface Prefecture {
  id: string;
  name: string;
  nameEn: string;
  path: string;
}

const prefectures: Prefecture[] = [
  // 北海道
  { id: "hokkaido", name: "北海道", nameEn: "Hokkaido", path: "M570,80 L620,60 L680,70 L720,100 L700,150 L650,180 L600,160 L560,130 Z" },
  // 東北
  { id: "aomori", name: "青森県", nameEn: "Aomori", path: "M580,200 L620,190 L650,210 L640,250 L600,260 L570,240 Z" },
  { id: "iwate", name: "岩手県", nameEn: "Iwate", path: "M600,260 L640,250 L660,290 L650,340 L610,350 L590,310 Z" },
  { id: "miyagi", name: "宮城県", nameEn: "Miyagi", path: "M590,350 L630,340 L650,380 L620,400 L580,390 Z" },
  { id: "akita", name: "秋田県", nameEn: "Akita", path: "M550,270 L590,260 L600,310 L580,350 L540,340 L530,300 Z" },
  { id: "yamagata", name: "山形県", nameEn: "Yamagata", path: "M540,350 L580,340 L590,390 L560,420 L520,400 Z" },
  { id: "fukushima", name: "福島県", nameEn: "Fukushima", path: "M520,400 L580,390 L610,430 L580,470 L520,460 L500,430 Z" },
  // 関東
  { id: "ibaraki", name: "茨城県", nameEn: "Ibaraki", path: "M550,470 L590,460 L610,500 L580,530 L540,520 Z" },
  { id: "tochigi", name: "栃木県", nameEn: "Tochigi", path: "M510,450 L550,440 L570,480 L540,510 L500,500 Z" },
  { id: "gunma", name: "群馬県", nameEn: "Gunma", path: "M460,450 L500,440 L520,480 L490,510 L450,500 Z" },
  { id: "saitama", name: "埼玉県", nameEn: "Saitama", path: "M470,510 L520,500 L540,540 L500,560 L460,550 Z" },
  { id: "chiba", name: "千葉県", nameEn: "Chiba", path: "M540,540 L580,530 L610,580 L580,620 L530,600 Z" },
  { id: "tokyo", name: "東京都", nameEn: "Tokyo", path: "M490,550 L530,540 L550,580 L520,600 L480,590 Z" },
  { id: "kanagawa", name: "神奈川県", nameEn: "Kanagawa", path: "M470,590 L520,580 L540,620 L500,650 L460,630 Z" },
  // 中部
  { id: "niigata", name: "新潟県", nameEn: "Niigata", path: "M420,380 L480,360 L520,400 L500,450 L440,460 L400,420 Z" },
  { id: "toyama", name: "富山県", nameEn: "Toyama", path: "M380,450 L420,440 L440,480 L410,510 L370,500 Z" },
  { id: "ishikawa", name: "石川県", nameEn: "Ishikawa", path: "M340,420 L380,400 L400,450 L370,490 L330,470 Z" },
  { id: "fukui", name: "福井県", nameEn: "Fukui", path: "M320,490 L360,480 L380,520 L350,560 L310,540 Z" },
  { id: "yamanashi", name: "山梨県", nameEn: "Yamanashi", path: "M440,540 L480,530 L500,570 L470,600 L430,590 Z" },
  { id: "nagano", name: "長野県", nameEn: "Nagano", path: "M400,480 L450,470 L480,530 L450,580 L400,570 L380,520 Z" },
  { id: "gifu", name: "岐阜県", nameEn: "Gifu", path: "M350,520 L400,510 L420,560 L380,600 L340,580 Z" },
  { id: "shizuoka", name: "静岡県", nameEn: "Shizuoka", path: "M420,600 L480,590 L510,640 L460,680 L410,660 Z" },
  { id: "aichi", name: "愛知県", nameEn: "Aichi", path: "M370,600 L420,590 L440,640 L400,680 L360,660 Z" },
  // 近畿
  { id: "mie", name: "三重県", nameEn: "Mie", path: "M350,640 L390,630 L410,690 L370,730 L330,710 Z" },
  { id: "shiga", name: "滋賀県", nameEn: "Shiga", path: "M330,580 L360,570 L380,610 L350,640 L320,620 Z" },
  { id: "kyoto", name: "京都府", nameEn: "Kyoto", path: "M290,560 L330,550 L350,600 L320,640 L280,620 Z" },
  { id: "osaka", name: "大阪府", nameEn: "Osaka", path: "M300,640 L340,630 L360,670 L330,700 L290,690 Z" },
  { id: "hyogo", name: "兵庫県", nameEn: "Hyogo", path: "M250,600 L300,590 L320,650 L280,700 L230,680 Z" },
  { id: "nara", name: "奈良県", nameEn: "Nara", path: "M320,680 L350,670 L370,710 L340,750 L310,730 Z" },
  { id: "wakayama", name: "和歌山県", nameEn: "Wakayama", path: "M290,720 L330,710 L350,760 L310,800 L270,780 Z" },
  // 中国
  { id: "tottori", name: "鳥取県", nameEn: "Tottori", path: "M210,580 L260,570 L280,610 L250,640 L200,620 Z" },
  { id: "shimane", name: "島根県", nameEn: "Shimane", path: "M140,560 L200,550 L230,600 L190,640 L130,620 Z" },
  { id: "okayama", name: "岡山県", nameEn: "Okayama", path: "M200,640 L250,630 L270,680 L230,720 L180,700 Z" },
  { id: "hiroshima", name: "広島県", nameEn: "Hiroshima", path: "M130,640 L190,630 L210,690 L160,730 L110,710 Z" },
  { id: "yamaguchi", name: "山口県", nameEn: "Yamaguchi", path: "M60,660 L120,650 L140,710 L100,750 L50,730 Z" },
  // 四国
  { id: "tokushima", name: "徳島県", nameEn: "Tokushima", path: "M240,740 L280,730 L300,770 L270,800 L230,790 Z" },
  { id: "kagawa", name: "香川県", nameEn: "Kagawa", path: "M200,710 L240,700 L260,740 L230,770 L190,760 Z" },
  { id: "ehime", name: "愛媛県", nameEn: "Ehime", path: "M140,740 L190,730 L210,790 L160,830 L120,810 Z" },
  { id: "kochi", name: "高知県", nameEn: "Kochi", path: "M160,800 L230,790 L260,850 L200,890 L140,860 Z" },
  // 九州
  { id: "fukuoka", name: "福岡県", nameEn: "Fukuoka", path: "M60,750 L110,740 L130,790 L90,830 L50,810 Z" },
  { id: "saga", name: "佐賀県", nameEn: "Saga", path: "M30,790 L70,780 L90,820 L60,850 L20,840 Z" },
  { id: "nagasaki", name: "長崎県", nameEn: "Nagasaki", path: "M0,820 L40,810 L60,870 L30,910 L0,890 Z" },
  { id: "kumamoto", name: "熊本県", nameEn: "Kumamoto", path: "M60,850 L110,840 L130,900 L90,940 L50,920 Z" },
  { id: "oita", name: "大分県", nameEn: "Oita", path: "M100,790 L150,780 L170,830 L140,870 L90,850 Z" },
  { id: "miyazaki", name: "宮崎県", nameEn: "Miyazaki", path: "M110,870 L160,860 L180,930 L140,970 L100,950 Z" },
  { id: "kagoshima", name: "鹿児島県", nameEn: "Kagoshima", path: "M50,940 L100,930 L120,1000 L70,1040 L30,1020 Z" },
  { id: "okinawa", name: "沖縄県", nameEn: "Okinawa", path: "M0,1100 L50,1090 L70,1130 L40,1160 L0,1150 Z" },
];

const JapanMap = () => {
  const [hoveredPref, setHoveredPref] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const getHoveredPrefName = () => {
    const pref = prefectures.find(p => p.id === hoveredPref);
    return pref?.name || "";
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* ツールチップ */}
      {hoveredPref && (
        <div
          className="fixed z-50 bg-gray-800 text-white px-3 py-1 rounded text-sm pointer-events-none"
          style={{
            left: tooltipPos.x + 10,
            top: tooltipPos.y - 30,
          }}
        >
          {getHoveredPrefName()}
        </div>
      )}

      <svg
        viewBox="0 0 720 1200"
        className="w-full h-auto"
        onMouseMove={handleMouseMove}
        role="img"
        aria-label="日本地図 - 都道府県を選択してください"
      >
        <title>都道府県別施工店マップ</title>
        {prefectures.map((pref) => (
          <Link key={pref.id} href={`/areas/${pref.nameEn}`}>
            <path
              d={pref.path}
              fill={hoveredPref === pref.id ? "#f16f21" : "#9e9790"}
              stroke="#ffffff"
              strokeWidth="2"
              className="cursor-pointer transition-colors duration-200"
              onMouseEnter={() => setHoveredPref(pref.id)}
              onMouseLeave={() => setHoveredPref(null)}
              aria-label={pref.name}
            />
          </Link>
        ))}
      </svg>
    </div>
  );
};

export default JapanMap;
