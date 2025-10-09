import Link from "next/link";

const ServiceAreasSection = () => {
  const prefectures = [
    { name: "北海道", key: "Hokkaido" },
    { name: "青森県", key: "Aomori" },
    { name: "岩手県", key: "Iwate" },
    { name: "宮城県", key: "Miyagi" },
    { name: "秋田県", key: "Akita" },
    { name: "山形県", key: "Yamagata" },
    { name: "福島県", key: "Fukushima" },
    { name: "茨城県", key: "Ibaraki" },
    { name: "栃木県", key: "Tochigi" },
    { name: "群馬県", key: "Gunma" },
    { name: "埼玉県", key: "Saitama" },
    { name: "千葉県", key: "Chiba" },
    { name: "東京都", key: "Tokyo" },
    { name: "神奈川県", key: "Kanagawa" },
    { name: "新潟県", key: "Niigata" },
    { name: "富山県", key: "Toyama" },
    { name: "石川県", key: "Ishikawa" },
    { name: "福井県", key: "Fukui" },
    { name: "山梨県", key: "Yamanashi" },
    { name: "長野県", key: "Nagano" },
    { name: "岐阜県", key: "Gifu" },
    { name: "静岡県", key: "Shizuoka" },
    { name: "愛知県", key: "Aichi" },
    { name: "三重県", key: "Mie" },
    { name: "滋賀県", key: "Shiga" },
    { name: "京都府", key: "Kyoto" },
    { name: "大阪府", key: "Osaka" },
    { name: "兵庫県", key: "Hyogo" },
    { name: "奈良県", key: "Nara" },
    { name: "和歌山県", key: "Wakayama" },
    { name: "鳥取県", key: "Tottori" },
    { name: "島根県", key: "Shimane" },
    { name: "岡山県", key: "Okayama" },
    { name: "広島県", key: "Hiroshima" },
    { name: "山口県", key: "Yamaguchi" },
    { name: "徳島県", key: "Tokushima" },
    { name: "香川県", key: "Kagawa" },
    { name: "愛媛県", key: "Ehime" },
    { name: "高知県", key: "Kochi" },
    { name: "福岡県", key: "Fukuoka" },
    { name: "佐賀県", key: "Saga" },
    { name: "長崎県", key: "Nagasaki" },
    { name: "熊本県", key: "Kumamoto" },
    { name: "大分県", key: "Oita" },
    { name: "宮崎県", key: "Miyazaki" },
    { name: "鹿児島県", key: "Kagoshima" },
    { name: "沖縄県", key: "Okinawa" }
  ];

  return (
    <section id="service-areas" className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* タイトル */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">全国対応エリア</h2>
          <p className="text-lg text-gray-600 mb-2">
            お住まいの地域に対応した信頼できる業者をご紹介
          </p>
          <p className="text-lg text-orange-500 font-semibold">
            <span className="text-orange-600">北海道から沖縄まで、全国47都道府県対応</span>
          </p>
        </div>

        {/* 都道府県グリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
          {prefectures.map((prefecture, index) => (
            <Link
              key={index}
              href={`/areas/${prefecture.key}`}
              className="bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-gray-700 py-3 px-4 rounded-lg text-sm font-medium transition-colors border border-gray-200 hover:border-orange-200 text-center"
            >
              {prefecture.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasSection;