import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/infrastructure/database/prisma.client';
import { requirePartnerAuth } from '@/lib/utils/partnerAuth';

/**
 * パートナー向け会社請求書詳細API
 * GET /api/partner/company-invoices/[id]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoiceId = parseInt(id);

    // 認証チェック
    const { error, partnerId } = await requirePartnerAuth();
    if (error) return error;

    // 請求書データを取得（権限チェック込み）
    const invoice = await prisma.company_invoices.findFirst({
      where: {
        id: invoiceId,
        partner_id: partnerId, // 自分の会社の請求書のみ閲覧可能
      },
      include: {
        partner: {
          include: {
            partner_details: {
              select: {
                company_name: true,
                address: true,
                phone_number: true,
              },
            },
          },
        },
        invoice_items: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: '請求書が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: invoice.id,
        invoice_number: invoice.invoice_number,
        issue_date: invoice.issue_date.toISOString().split('T')[0],
        due_date: invoice.due_date.toISOString().split('T')[0],
        billing_period_start: invoice.billing_period_start.toISOString().split('T')[0],
        billing_period_end: invoice.billing_period_end.toISOString().split('T')[0],
        total_amount: invoice.total_amount,
        tax_amount: invoice.tax_amount,
        grand_total: invoice.grand_total,
        status: invoice.status,
        payment_date: invoice.payment_date
          ? invoice.payment_date.toISOString().split('T')[0]
          : null,
        partner: {
          company_name: invoice.partner.partner_details?.company_name || '',
          address: invoice.partner.partner_details?.address || '',
          phone: invoice.partner.partner_details?.phone_number || '',
        },
        items: invoice.invoice_items.map((item) => ({
          id: item.id,
          description: item.description,
          amount: item.amount,
          related_order_id: item.related_order_id,
        })),
      },
    });
  } catch (error) {
    console.error('Company invoice detail API error:', error);
    return NextResponse.json(
      { success: false, error: '請求書詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}
