import Link from "next/link";
import JapanMap from "./JapanMap";

const ServiceAreasSection = () => {
  const regions = [
    {
      name: "北海道・東北",
      prefectures: [
        { name: "北海道", key: "Hokkaido" },
        { name: "青森県", key: "Aomori" },
        { name: "岩手県", key: "Iwate" },
        { name: "宮城県", key: "Miyagi" },
        { name: "秋田県", key: "Akita" },
        { name: "山形県", key: "Yamagata" },
        { name: "福島県", key: "Fukushima" },
      ]
    },
    {
      name: "関東",
      prefectures: [
        { name: "茨城県", key: "Ibaraki" },
        { name: "栃木県", key: "Tochigi" },
        { name: "群馬県", key: "Gunma" },
        { name: "埼玉県", key: "Saitama" },
        { name: "千葉県", key: "Chiba" },
        { name: "東京都", key: "Tokyo" },
        { name: "神奈川県", key: "Kanagawa" },
      ]
    },
    {
      name: "中部",
      prefectures: [
        { name: "新潟県", key: "Niigata" },
        { name: "富山県", key: "Toyama" },
        { name: "石川県", key: "Ishikawa" },
        { name: "福井県", key: "Fukui" },
        { name: "山梨県", key: "Yamanashi" },
        { name: "長野県", key: "Nagano" },
        { name: "岐阜県", key: "Gifu" },
        { name: "静岡県", key: "Shizuoka" },
        { name: "愛知県", key: "Aichi" },
      ]
    },
    {
      name: "近畿",
      prefectures: [
        { name: "三重県", key: "Mie" },
        { name: "滋賀県", key: "Shiga" },
        { name: "京都府", key: "Kyoto" },
        { name: "大阪府", key: "Osaka" },
        { name: "兵庫県", key: "Hyogo" },
        { name: "奈良県", key: "Nara" },
        { name: "和歌山県", key: "Wakayama" },
      ]
    },
    {
      name: "中国・四国",
      prefectures: [
        { name: "鳥取県", key: "Tottori" },
        { name: "島根県", key: "Shimane" },
        { name: "岡山県", key: "Okayama" },
        { name: "広島県", key: "Hiroshima" },
        { name: "山口県", key: "Yamaguchi" },
        { name: "徳島県", key: "Tokushima" },
        { name: "香川県", key: "Kagawa" },
        { name: "愛媛県", key: "Ehime" },
        { name: "高知県", key: "Kochi" },
      ]
    },
    {
      name: "九州・沖縄",
      prefectures: [
        { name: "福岡県", key: "Fukuoka" },
        { name: "佐賀県", key: "Saga" },
        { name: "長崎県", key: "Nagasaki" },
        { name: "熊本県", key: "Kumamoto" },
        { name: "大分県", key: "Oita" },
        { name: "宮崎県", key: "Miyazaki" },
        { name: "鹿児島県", key: "Kagoshima" },
        { name: "沖縄県", key: "Okinawa" },
      ]
    }
  ];

  return (
    <section id="service-areas" className="bg-[#f7f4f0] py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            全国<span className="text-[#f16f21]">対応</span>エリア
          </h2>
          <p className="text-gray-600 mb-4">
            お住まいの地域に対応した信頼できる業者をご紹介
          </p>
          <div className="inline-flex items-center gap-2 bg-white text-[#f16f21] px-4 py-2 rounded-lg font-medium text-sm shadow-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            北海道から沖縄まで、全国47都道府県対応
          </div>
        </div>

        {/* メインコンテンツ: 地図 + 地域リスト */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* 左: SVG地図 */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <p className="text-center text-sm text-gray-500 mb-4">
              地図をクリックしてエリアを選択
            </p>
            <JapanMap />
          </div>

          {/* 右: 地域別リスト */}
          <div className="space-y-4">
            {regions.map((region, regionIndex) => (
              <div key={regionIndex} className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                  {region.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {region.prefectures.map((prefecture, prefIndex) => (
                    <Link
                      key={prefIndex}
                      href={`/areas/${prefecture.key}`}
                      className="text-sm text-gray-600 hover:text-[#f16f21] hover:bg-[#f16f21]/5 px-3 py-1.5 rounded-md transition-colors duration-200"
                    >
                      {prefecture.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;
