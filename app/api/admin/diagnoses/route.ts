import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 診断依頼一覧取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    // ステータスフィルター
    if (status && status !== 'all') {
      where.status = status;
    }

    // 検索条件
    if (search) {
      where.customers = {
        OR: [
          { customer_name: { contains: search, mode: 'insensitive' } },
          { customer_email: { contains: search, mode: 'insensitive' } },
          { customer_phone: { contains: search, mode: 'insensitive' } }
        ]
      };
    }

    const diagnoses = await prisma.diagnosis_requests.findMany({
      where,
      include: {
        customers: {
          select: {
            customer_name: true,
            customer_email: true,
            customer_phone: true,
            construction_address: true
          }
        },
        quotations: {
          include: {
            partners: {
              include: {
                partner_details: {
                  select: {
                    company_name: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    const formattedDiagnoses = diagnoses.map(diag => {
      // 見積もりを金額順にソート
      const sortedQuotations = [...diag.quotations].sort((a, b) =>
        a.quotation_amount - b.quotation_amount
      );

      // 最安値を取得
      const lowestAmount = sortedQuotations.length > 0
        ? sortedQuotations[0].quotation_amount
        : null;

      return {
        id: diag.id,
        diagnosisNumber: diag.diagnosis_number,
        customerId: diag.customer_id,
        customerName: diag.customers.customer_name,
        customerEmail: diag.customers.customer_email,
        customerPhone: diag.customers.customer_phone,
        address: diag.customers.construction_address,
        prefecture: diag.prefecture,
        floorArea: diag.floor_area,
        currentSituation: diag.current_situation,
        constructionType: diag.construction_type,
        status: diag.status,
        statusLabel: getStatusLabel(diag.status),
        quotationCount: sortedQuotations.length,
        quotations: sortedQuotations.map(q => ({
          id: q.id,
          partnerId: q.partner_id,
          partnerName: q.partners.partner_details?.company_name || '未設定',
          amount: q.quotation_amount,
          appealText: q.appeal_text,
          isSelected: q.is_selected,
          isLowest: lowestAmount !== null && q.quotation_amount === lowestAmount
        })),
        createdAt: diag.created_at.toISOString().split('T')[0]
      };
    });

    return NextResponse.json({
      success: true,
      data: formattedDiagnoses,
      count: formattedDiagnoses.length
    });

  } catch (error) {
    console.error('Diagnoses fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch diagnoses',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    DESIGNATED: '指定',
    RECRUITING: '募集中',
    COMPARING: '比較中',
    DECIDED: '決定',
    CANCELLED: 'キャンセル'
  };
  return labels[status] || status;
}
