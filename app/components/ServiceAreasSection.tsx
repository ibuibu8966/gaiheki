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
    <section id="service-areas" className="relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{backgroundImage: 'url(/service-areas-bg.jpg)'}}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* タイトル */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 animate-fadeIn drop-shadow-2xl px-4">全国対応エリア</h2>
          <p className="text-sm md:text-base text-white/90 mb-4 md:mb-6 animate-fadeIn drop-shadow-lg px-4">
            お住まいの地域に対応した信頼できる業者をご紹介
          </p>
          <div className="inline-block bg-white/90 backdrop-blur-sm text-blue-600 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold text-sm md:text-base border border-white/30 animate-fadeIn shadow-lg mx-4">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">北海道から沖縄まで、全国47都道府県対応</span>
            </span>
          </div>
        </div>

        {/* 都道府県グリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 md:gap-3">
          {prefectures.map((prefecture, index) => (
            <Link
              key={index}
              href={`/areas/${prefecture.key}`}
              className="group relative bg-white/50 backdrop-blur-sm hover:bg-white/70 text-slate-800 hover:text-blue-600 py-2.5 md:py-3 px-3 md:px-4 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 border border-white/30 hover:border-blue-400 text-center shadow-md hover:shadow-xl animate-fadeIn"
              style={{animationDelay: `${index * 0.02}s`}}
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
