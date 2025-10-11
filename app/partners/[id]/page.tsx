import PartnerDetailContent from "@/app/components/PartnerDetailContent";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/partners/${id}`, {
      cache: 'no-store'
    });
    const result = await response.json();

    if (result.success) {
      return {
        title: `${result.data.companyName} - 外壁塗装の窓口`,
        description: result.data.appealText.substring(0, 150),
      };
    }
  } catch (error) {
    console.error('Metadata fetch error:', error);
  }

  return {
    title: "加盟店詳細 - 外壁塗装の窓口",
    description: "信頼できる外壁塗装業者の詳細情報をご覧ください。",
  };
}

export default async function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PartnerDetailContent partnerId={id} />;
}
